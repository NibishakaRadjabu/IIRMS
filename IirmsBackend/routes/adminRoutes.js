const express = require('express');
const router = express.Router();
const {
  protect,
  requireAdmin,
  requireAdminOrDepartmentManager,
} = require('../middleware/authMiddleware');
const a = require('../controllers/adminController');
const { createCertificate } = require('../controllers/certificateController');

// Users
router.get('/users', protect, requireAdmin, a.getUsers);
router.post('/users', protect, requireAdmin, a.createUser);
router.put('/users/:id', protect, requireAdmin, a.updateUser);
router.patch('/users/:id/approval', protect, requireAdmin, a.setUserApproval);
router.delete('/users/:id', protect, requireAdmin, a.deleteUser);

// Departments
router.get('/departments', protect, a.getDepartments);
router.post('/departments', protect, requireAdmin, a.createDepartment);
router.put('/departments/:id', protect, requireAdminOrDepartmentManager, a.updateDepartment);
router.delete('/departments/:id', protect, requireAdminOrDepartmentManager, a.deleteDepartment);

// Students
router.get('/students', protect, requireAdmin, a.getStudents);
router.put('/students/:id', protect, requireAdminOrDepartmentManager, a.updateStudent);
router.delete('/students/:id', protect, requireAdminOrDepartmentManager, a.deleteStudent);

// Submissions
router.get('/submissions', protect, requireAdmin, a.getSubmissions);
router.put('/submissions/:id', protect, requireAdminOrDepartmentManager, a.updateSubmission);
router.delete('/submissions/:id', protect, requireAdminOrDepartmentManager, a.deleteSubmission);

// Certificates
router.get('/certificates', protect, requireAdmin, a.getCertificates);
router.post('/certificates', protect, requireAdmin, createCertificate);
router.put('/certificates/:id', protect, requireAdminOrDepartmentManager, a.updateCertificate);
router.delete('/certificates/:id', protect, requireAdminOrDepartmentManager, a.deleteCertificate);

// Payments
router.get('/payments', protect, requireAdmin, a.getPayments);
router.delete('/payments/:id', protect, requireAdmin, a.deletePayment);

// Projects and funding grants
router.get('/projects', protect, requireAdmin, a.getProjects);
router.get('/funding-grants', protect, requireAdmin, a.getFundingGrants);
router.post('/funding-grants', protect, requireAdminOrDepartmentManager, a.createFundingGrant);
router.delete('/funding-grants/:id', protect, requireAdminOrDepartmentManager, a.deleteFundingGrant);

// Notifications
router.get('/notifications', protect, requireAdmin, a.getNotifications);
router.post('/notifications', protect, requireAdmin, a.createNotification);
router.delete('/notifications/:id', protect, requireAdmin, a.deleteNotification);

module.exports = router;
