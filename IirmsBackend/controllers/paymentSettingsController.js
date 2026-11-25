const PaymentSettings = require('../models/PaymentSettings');

// The settings feature can be deployed to an existing database. Ensure its
// single table exists even when the server was started before this model was
// added to the global sync list.
let settingsTableReady;
const ensureSettingsTable = () => {
  if (!settingsTableReady) settingsTableReady = PaymentSettings.sync();
  return settingsTableReady;
};

const publicFields = [
  'paypal_enabled', 'paypal_email', 'card_enabled', 'card_checkout_url',
  'bank_enabled', 'bank_name', 'bank_account_name', 'bank_account_number',
  'bank_branch_code', 'bank_reference_note',
];

exports.getPublicSettings = async (_req, res) => {
  try {
    await ensureSettingsTable();
    const settings = await PaymentSettings.findByPk(1);
    res.json(settings ? settings.toJSON() : {});
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getSettings = async (_req, res) => {
  try {
    await ensureSettingsTable();
    const [settings] = await PaymentSettings.findOrCreate({ where: { payment_settings_id: 1 } });
    res.json(settings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateSettings = async (req, res) => {
  try {
    await ensureSettingsTable();
    const updates = Object.fromEntries(publicFields
      .filter((field) => field in req.body)
      .map((field) => [field, req.body[field]]));
    const [settings] = await PaymentSettings.findOrCreate({ where: { payment_settings_id: 1 } });
    await settings.update(updates);
    res.json(settings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
