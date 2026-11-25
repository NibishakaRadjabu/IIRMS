// routes/verification.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { protect, requireAdmin, requireScientificStaff } = require("../middleware/authMiddleware");

// Professors self-verify (scientific_staff)
router.post("/scientificStaff/verify", protect, requireScientificStaff, async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({ where: { verification_code: code, role: 'scientific_staff' } });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification code" });
    }

    // Ensure the professor is verifying their own account
    if (user.user_id !== req.user.user_id) {
      return res.status(403).json({ message: "You can only verify your own account." });
    }

    user.verified = true;
    await user.save();

    return res.json({ message: "Professor self-verification successful!" });
  } catch (err) {
    console.error("Verification error:", err);
    return res.status(500).json({ message: "Server error during verification" });
  }
});

// Admin verifies professors
router.post("/admin/professor/verify", protect, requireAdmin, async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({ where: { verification_code: code, role: 'scientific_staff' } });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification code" });
    }

    user.verified = true;
    await user.save();

    return res.json({ message: "Professor verified by admin!" });
  } catch (err) {
    console.error("Admin verification error:", err);
    return res.status(500).json({ message: "Server error during verification" });
  }
});

module.exports = router;
