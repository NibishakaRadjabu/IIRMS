# Password reset email setup

Password reset uses EmailJS from the backend. Configure these values in the backend environment, then restart the backend:

```env
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_RESET_TEMPLATE_ID=your_password_reset_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
EMAILJS_PRIVATE_KEY=your_emailjs_private_key
FRONTEND_URL=http://localhost:5173
```

Create an EmailJS template addressed to `{{to_email}}`. Include a reset button or link using `{{reset_url}}`; the template also receives `{{user_name}}` and `{{expires_in}}`. The link expires after one hour and can only be used once. In production, set `FRONTEND_URL` to the public HTTPS website address.

The forgot-password endpoint always returns the same confirmation message, whether or not the address belongs to an account.