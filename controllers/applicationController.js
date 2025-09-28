const Application = require('../models/application');
const Job = require('../models/job');

const applyForJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;
        const { coverLetter } = req.body;

        // check if job exists and is active
        const job = await Job.findOne({ _id: jobId, status: 'active' });

        if (!job) {
            return res.status(404).json({ message: 'Job not found or not active' });
        }

        // check if user has already applied for this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        // check application deadline
        if (job.applicationDeadline && new Date() > job.applicationDeadline) {
            return res.status(400).json({ message: 'The application deadline for this job has passed' });
        }

        // create new application
        const newApplication = new Application({
            job: jobId,
            applicant: userId,
            coverLetter,
        });

        await newApplication.save();

        // update the job applications count
        await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } });

        // send a notification to the job poster
        // sendEmail(job.postedBy.email, 'New Job Application', `You have a new application for your job: ${job.title}`);

        res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserApplications = async (req, res) => {
    try {
        const userId = req.userId;
        const applications = await Application.find({ applicant: userId })
            .populate({
                path: 'job',
                populate: 'company',
                select: 'name logo'
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { notes, status } = req.body;

        const userId = req.userId;

        // find the application and verify if it belongs to a job posted by the user
        const application = await Application.findById(applicationId)
            .populate({
                path: 'job',
                populate: {
                    path: 'postedBy',
                }
            })
            .populate('applicant', 'name email');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (application.job.postedBy._id.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this application' });
        }

        // update application status and notes
        application.status = status;
        application.notes = notes;
        application.reviewedBy = userId;
        application.reviewedAt = new Date();

        await application.save();

        // notify the applicant about the status update
        // sendEmail(application.applicant.email, 'Application Status Update', `Your application for the job "${application.job.title}" has been updated to "${status}".`);

        res.status(200).json({ message: 'Application status updated successfully', application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getApplicationById = async (req, res) => {
    try {
        const { applicationId } = req.params;

        const userId = req.userId;
        const application = await Application.findById(applicationId)
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name logo'
                }
            })
            .populate('reviewedBy', 'name');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // ensure the user is either the applicant or the job poster
        if (application.applicant.toString() !== userId && application.job.postedBy.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to view this application' });
        }

        res.status(200).json({ application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    applyForJob,
    getUserApplications,
    updateApplicationStatus,
    getApplicationById
};