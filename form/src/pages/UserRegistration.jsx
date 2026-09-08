import { useState } from 'react';
import UserForm from '../components/UserForm';
import { initialFormValues } from '../constants/formConstants';
import { registerUser } from '../services/userService';
import { validateForm } from '../utils/validation';

export default function UserRegistration() {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setStatus(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;
    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus({ type: 'error', message: 'Please correct the highlighted fields.' });
      return;
    }

    setLoading(true);
    setErrors({});
    setStatus(null);
    const { termsAccepted, ...payload } = values;
    try {
      const result = await registerUser({ ...payload, fullName: payload.fullName.trim(), email: payload.email.trim(), address: payload.address.trim(), city: payload.city.trim() });
      setStatus({ type: 'success', message: result.message || 'User details saved successfully.', userId: result.userId });
      setValues(initialFormValues);
    } catch (error) {
      const message = error.message || 'Unable to connect to the server. Please try again.';
      if (/email.*exists/i.test(message)) setErrors({ email: message });
      setStatus({ type: 'error', message: error.status >= 500 ? 'Server error. Please try again later.' : message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="registration-card" aria-labelledby="page-title">
        <div className="intro-panel">
          <div className="brand-mark">Stackly</div>
          <p className="eyebrow">Welcome aboard</p>
          <h1 id="page-title">Create your account</h1>
          <p className="intro-copy">Register your details securely. It only takes a minute to get started.</p>
          <div className="intro-note"><span>✓</span><p>Your information is sent securely to our backend service.</p></div>
        </div>
        <div className="form-panel">
          {status && <div className={`notice ${status.type}`} role="alert"><strong>{status.type === 'success' ? 'Registration complete' : 'Registration could not be completed'}</strong><span>{status.message}{status.userId ? ` User ID: ${status.userId}` : ''}</span></div>}
          <div className="form-heading"><h2>Personal details</h2><p>Fields marked with <span>*</span> are required.</p></div>
          <UserForm values={values} errors={errors} loading={loading} onChange={handleChange} onSubmit={handleSubmit} />
        </div>
      </section>
    </main>
  );
}
