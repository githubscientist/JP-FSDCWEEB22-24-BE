const express = require('express');

const applicationRouter = express.Router();
const { isAuthenticated, allowRoles } = require('../middlewares/auth');
const { applyForJob, getUserApplications, updateApplicationStatus, getApplicationById } = require('../controllers/applicationController');

applicationRouter.use(isAuthenticated);

// user routes
applicationRouter.post('/:jobId/apply', allowRoles(['user']), applyForJob);
applicationRouter.get('/', allowRoles(['user']), getUserApplications);

// recruiter routes
applicationRouter.put('/:id/status', allowRoles(['recruiter']), updateApplicationStatus);

// shared routes --user and recruiter
applicationRouter.get('/:id', allowRoles(['user', 'recruiter']), getApplicationById);

module.exports = applicationRouter;