import { useState, useEffect } from 'react';
import { useLanguage } from "../context/LanguageContext";

function ContactUs() {
  const { translate: tr } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector('script[data-emailjs="true"]');

    if (window.emailjs) {
      return;
    }

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.emailjs) {
          window.emailjs.init({ publicKey: 'OKSBoXaIWXZL_spyu' });
        }
      });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    script.dataset.emailjs = 'true';
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init({ publicKey: 'OKSBoXaIWXZL_spyu' });
      }
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const btn = document.getElementById('contact-submit-button');
    if (btn) btn.value = tr('Sending...');

    if (!window.emailjs) {
      alert(tr('Email service is not ready yet. Please try again in a moment.'));
      setIsSending(false);
      return;
    }

    const serviceID = 'default_service';
    const templateID = 'template_y6og4ac';

    window.emailjs
      .sendForm(serviceID, templateID, e.target)
      .then(() => {
        if (btn) btn.value = tr('Send Email');
        alert(tr('Sent!'));
        setForm({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        if (btn) btn.value = tr('Send Email');
        alert(JSON.stringify(err));
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const contactDetails = [
    { label: 'Email', value: 'support@iirms.edu', icon: '✉️' },
    { label: 'Phone', value: '+250795422221', icon: '📞' },
    { label: 'Address', value: 'Rubavu ,Gisenyi ,Rwanda', icon: '📍' },
    { label: tr('Office Hours'), value: tr('Mon - Fri, 8:00 AM - 5:00 PM'), icon: '🕒' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-slate-800">
      <div className="rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">{tr('Contact us')}</p>
        <h1 className="mt-3 text-4xl font-bold">{tr('We are here to help')}</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          {tr('Reach out for support, partnership opportunities, or assistance with your research publication needs.')}
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">{tr('Send us a message')}</h2>

          <form id="contact-form" onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{tr('Name')}</label>
              <input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder={tr('Your full name')}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{tr('Email')}</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder={tr('you@example.com')}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{tr('Message')}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder={tr('How can we help?')}
                required
              />
            </div>

            <button
              id="contact-submit-button"
              type="submit"
              value="Send Email"
              disabled={isSending}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
            >
              {isSending ? tr('Sending...') : tr('Send message')}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {contactDetails.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 text-slate-700">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
                  <p className="mt-1 text-lg font-medium text-slate-900">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
