const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');
const User = require('../models/User');

const resetAdminPassword = async () => {
  const email = String(process.env.INITIAL_ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.INITIAL_ADMIN_PASSWORD || '';

  if (!email || !password) {
    throw new Error('Set INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD in .env before running this command.');
  }
  if (password.length < 8) {
    throw new Error('INITIAL_ADMIN_PASSWORD must be at least 8 characters long.');
  }

  await sequelize.authenticate();
  const admin = await User.findOne({ where: { email, role: 'admin' } });
  if (!admin) {
    throw new Error(`No admin account found for ${email}. No account was changed.`);
  }

  admin.password_hash = await bcrypt.hash(password, 10);
  await admin.save({ fields: ['password_hash'] });
  console.log(`Administrator password reset successfully for ${email}.`);
};

resetAdminPassword()
  .catch((error) => {
    console.error('Admin password reset failed:', error.message);
    process.exitCode = 1;
  })
  .finally(() => sequelize.close());
