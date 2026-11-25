const Payment = require('../models/Payment');

const baseUrl = () => process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

const getAccessToken = async () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !secret) throw new Error('PayPal is not configured.');

  const authorization = Buffer.from(`${clientId}:${secret}`).toString('base64');
  const response = await fetch(`${baseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${authorization}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error_description || 'Unable to authenticate with PayPal.');
  return data.access_token;
};

exports.getConfig = (_req, res) => {
  if (!process.env.PAYPAL_CLIENT_ID) return res.status(503).json({ message: 'PayPal is not configured.' });
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID, currency: 'USD' });
};

exports.createOrder = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount <= 0) return res.status(400).json({ message: 'A valid payment amount is required.' });
    const token = await getAccessToken();
    const response = await fetch(`${baseUrl()}/v2/checkout/orders`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{ description: 'IIRMS publication fee', amount: { currency_code: 'USD', value: amount.toFixed(2) } }],
      }),
    });
    const order = await response.json();
    if (!response.ok) return res.status(response.status).json({ message: order.message || 'Unable to create PayPal order.' });
    res.status(201).json({ id: order.id });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.captureOrder = async (req, res) => {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${baseUrl()}/v2/checkout/orders/${req.params.orderId}/capture`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: '{}',
    });
    const order = await response.json();
    const capture = order.purchase_units?.[0]?.payments?.captures?.[0];
    if (!response.ok || order.status !== 'COMPLETED' || capture?.status !== 'COMPLETED') {
      return res.status(400).json({ message: order.message || 'PayPal payment was not completed.' });
    }

    const method = req.body.method === 'credit_card' ? 'credit_card' : 'paypal';
    const [payment] = await Payment.findOrCreate({
      where: { transaction_id: capture.id },
      defaults: { user_id: req.user.user_id, amount: capture.amount.value, method, transaction_id: capture.id },
    });
    res.json({ payment_id: payment.payment_id, transaction_id: capture.id, amount: capture.amount.value });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
