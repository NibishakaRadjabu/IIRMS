// const StudentProfile = require('../models/Profile');
// const User = require('../models/User');

// exports.createOrUpdateProfile = async (req, res) => {
//   try {
//     const user_id = req.user.user_id;
//     let profile = await StudentProfile.findOne({ where: { user_id } });
//     if (profile) {
//       await profile.update(req.body);
//       return res.json(profile);
//     }
//     profile = await StudentProfile.create({ ...req.body, user_id });
//     res.status(201).json(profile);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getProfile = async (req, res) => {
//   try {
//     const profile = await StudentProfile.findOne({
//       where: { user_id: req.params.userId },
//       include: [{ model: User, as: 'user', attributes: ['user_id', 'name', 'email'] }],
//     });
//     if (!profile) return res.status(404).json({ message: 'Profile not found' });
//     res.json(profile);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getProfiles = async (req, res) => {
//   try {
//     const profiles = await StudentProfile.findAll({
//       include: [{ model: User, as: 'user', attributes: ['user_id', 'name', 'email'] }],
//     });
//     res.json(profiles);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const { StudentProfile, User } = require('../models');
// const { User, StudentProfile, Submission } = require('../models');

// Create or update student profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    let profile = await StudentProfile.findOne({ where: { user_id } });

    if (profile) {
      await profile.update(req.body);
      return res.json(profile);
    }

    profile = await StudentProfile.create({ ...req.body, user_id });
    res.status(201).json(profile);
  } catch (err) {
    console.error("Error creating/updating profile:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get single profile by userId
exports.getProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      where: { user_id: req.params.userId },
      include: [{ model: User, as: 'user', attributes: ['user_id', 'name', 'email'] }],
    });

    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all profiles
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await StudentProfile.findAll({
      include: [{ model: User, as: 'user', attributes: ['user_id', 'name', 'email'] }],
    });
    res.json(profiles);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ message: err.message });
  }
};
