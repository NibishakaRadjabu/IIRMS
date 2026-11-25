const LeadershipApplication = require('../models/LeadershipApplication');
const User = require('../models/User');
const Department = require('../models/Department');

exports.apply = async (req, res) => {
  try {
    const { position, statement } = req.body;
    const department_id = req.body.department_id || req.user.department_id || null;
    if (!position || !statement) return res.status(400).json({ message: 'Position and leadership statement are required.' });
    const existing = await LeadershipApplication.findOne({ where: { user_id: req.user.user_id, status: 'pending' } });
    if (existing) return res.status(409).json({ message: 'You already have an application awaiting review.' });
    const application = await LeadershipApplication.create({ user_id: req.user.user_id, position: String(position).trim(), department_id, statement: String(statement).trim() });
    res.status(201).json({ message: 'Leadership application submitted for administrator review.', application });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMine = async (req, res) => {
  try { res.json(await LeadershipApplication.findAll({ where: { user_id: req.user.user_id }, order: [['created_at', 'DESC']] })); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAll = async (_req, res) => {
  try {
    res.json(await LeadershipApplication.findAll({
      include: [
        { model: User, as: 'applicant', attributes: ['user_id', 'name', 'email', 'department_id'] },
        { model: Department, as: 'department', attributes: ['department_id', 'faculties'] },
      ], order: [['created_at', 'DESC']],
    }));
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.review = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) return res.status(400).json({ message: 'Status must be approved or rejected.' });
    const application = await LeadershipApplication.findByPk(req.params.id);
    if (!application) return res.status(404).json({ message: 'Leadership application not found.' });
    if (application.status !== 'pending') return res.status(400).json({ message: 'This application has already been reviewed.' });
    await application.update({ status, reviewed_by: req.user.user_id, reviewed_at: new Date() });
    if (status === 'approved') await User.update({ is_leader: true, leadership_role: application.position }, { where: { user_id: application.user_id } });
    res.json({ message: `Leadership application ${status}.` });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
