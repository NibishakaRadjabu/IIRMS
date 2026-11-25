// const Certificate = require('../models/Certificate');

// exports.createCertificate = async (req, res) => {
//   try {
//     if (!req.user || !req.user.user_id) {
//       return res.status(401).json({ message: 'User not authenticated' });
//     }
//     // Note: Certificates are created via submissions, not directly
//     const cert = await Certificate.create({ ...req.body });
//     res.status(201).json(cert);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getCertificates = async (req, res) => {
//   try {
//     if (!req.user || !req.user.user_id) {
//       return res.status(401).json({ message: 'User not authenticated' });
//     }
//     const userId = req.user.user_id;
//     const Op = require('sequelize').Op;
//     // Get user's submissions first, then get certificates for those submissions
//     const Submission = require('../models/Submission');
//     const submissions = await Submission.findAll({ where: { user_id: userId } });
//     const submissionIds = submissions.map(s => s.submission_id);
//     const certs = await Certificate.findAll({ 
//       where: { submission_id: { [Op.in]: submissionIds } } 
//     });
//     res.json(certs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getCertificate = async (req, res) => {
//   try {
//     const cert = await Certificate.findByPk(req.params.id);
//     if (!cert) return res.status(404).json({ message: 'Not found' });
//     res.json(cert);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const Certificate = require('../models/Certificate');
const Submission = require('../models/Submission');
const { Op } = require('sequelize');
// const { User, StudentProfile, Submission } = require('../models');


// Create certificate (admin issues certificate for a submission)
exports.createCertificate = async (req, res) => {
  try {
    const { submission_id, certificate_url } = req.body;

    const submission = await Submission.findByPk(submission_id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    if (submission.status !== 'approved') {
      return res.status(409).json({ message: 'A certificate can only be issued after reviewer acceptance.' });
    }

    const existing = await Certificate.findOne({ where: { submission_id } });
    if (existing) {
      return res.status(409).json({ message: 'A certificate already exists for this submission.', certificate: existing });
    }

    const cert = await Certificate.create({
      submission_id,
      issue_date: new Date(),
      payment_status: 'pending',
      certificate_url
    });

    res.status(201).json(cert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all certificates (admin view)
exports.getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.findAll({
      include: [{ model: Submission, as: 'submission' }]
    });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single certificate
exports.getCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findByPk(req.params.id, {
      include: [{ model: Submission, as: 'submission' }]
    });
    if (!cert) return res.status(404).json({ message: 'Not found' });
    res.json(cert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update certificate (payment_status, certificate_url, etc.)
exports.updateCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findByPk(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });

    await cert.update(req.body);
    res.json(cert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete certificate
exports.deleteCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findByPk(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });

    await cert.destroy();
    res.json({ message: 'Certificate deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
