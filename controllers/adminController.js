const Company = require('../models/company');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const createCompany = async (req, res) => {
    try {
        const { name, description, website, industry, location, size, foundedYear } = req.body;

        const newCompany = new Company({
            name,
            description,
            website,
            industry,
            location,
            size,
            foundedYear,
            createdBy: req.userId
        });

        const savedCompany = await newCompany.save();

        res.status(201).json({ message: 'Company created successfully', company: savedCompany });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllCompanies = async (req, res) => {
    try {
        // get all the companies in the database
        const companies = await Company.find().populate('createdBy', 'name');

        // return it as a response
        res.status(200).json({ companies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCompany = async (req, res) => {
    try {
        // get the id from the req.params
        const { id } = req.params;

        // get the company details from req.body
        const updates = req.body;

        // find the company by id and update it with the new details
        const company = await Company.findByIdAndUpdate(id, updates, { new: true });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // return the updated company as a response
        res.status(200).json({ message: 'Company updated successfully', company });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCompany = async (req, res) => {
    try {
        // get the id from req.params
        const { id } = req.params;

        // find the company by id and delete it
        const company = await Company.findByIdAndDelete(id);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // return a success message as a response
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// create a new recruiter (user) and assign to a company
const createRecruiter = async (req, res) => {
    try {
        // create a new user with the role 'recruiter' and assign to a company
        const { name, email, password, companyId } = req.body;

        // check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // check if the company exists
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newRecruiter = new User({
            name,
            email,
            password: hashedPassword,
            role: 'recruiter',
            assignedCompany: companyId
        });

        const savedRecruiter = await newRecruiter.save();

        // return the created recruiter as a response
        res.status(201).json({ message: 'Recruiter created successfully', recruiter: savedRecruiter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany,
    createRecruiter
}