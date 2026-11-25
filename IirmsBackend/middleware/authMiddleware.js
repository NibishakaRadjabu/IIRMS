const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ReviewerApplication = require('../models/ReviewerApplication');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      if (decoded.reviewer_application_id) {
        const application = await ReviewerApplication.findOne({
          where: { application_id: decoded.reviewer_application_id, status: 'accepted' },
        });
        if (!application) return res.status(401).json({ message: 'Reviewer access is no longer active.' });
        req.user = {
          user_id: application.application_id,
          name: application.full_name,
          email: application.email,
          role: 'reviewer',
        };
        return next();
      }
      const user = await User.findByPk(decoded.id);
      if (!user) return res.status(401).json({ message: 'Not authorized' });
      if (user.approval_status !== 'approved') {
        return res.status(403).json({ message: 'Your account is not approved for access.' });
      }
      req.user = user.toJSON();
      delete req.user.password_hash;
      return next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  next();
};

const requireAdminOrDepartmentManager = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  if (req.user.role === 'admin') return next();
  if (req.user.role === 'scientific_staff' && req.user.can_manage_department) return next();
  return res.status(403).json({ message: 'Admin permission is required to edit or delete this resource.' });
};

const requireScientificStaff = (req, res, next) => {
  if (!req.user || req.user.role !== 'scientific_staff') {
    return res.status(403).json({ message: 'Access denied: scientific staff only.' });
  }
  if (!req.user.department_id) {
    return res.status(403).json({ message: 'No department assigned to your account.' });
  }
  next();
};

const requireLeadership = (req, res, next) => {
  if (!req.user || req.user.role !== 'scientific_staff' || !req.user.is_leader) {
    return res.status(403).json({ message: 'Leadership access is required.' });
  }
  if (!req.user.department_id) return res.status(403).json({ message: 'No department is assigned to your account.' });
  next();
};

const requireScientificDepartmentManager = (req, res, next) => {
  if (!req.user || req.user.role !== 'scientific_staff') {
    return res.status(403).json({ message: 'Access denied: scientific staff only.' });
  }
  if (!req.user.department_id) {
    return res.status(403).json({ message: 'No department assigned to your account.' });
  }
  if (!req.user.can_manage_department) {
    return res.status(403).json({ message: 'Ask an admin to grant department-management permission before editing.' });
  }
  next();
};

module.exports = {
  protect,
  requireAdmin,
  requireAdminOrDepartmentManager,
  requireScientificStaff,
  requireLeadership,
  requireScientificDepartmentManager,
};
