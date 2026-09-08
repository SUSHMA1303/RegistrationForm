import { genderOptions, stateOptions } from '../constants/formConstants';
import InputField from './InputField';
import SelectField from './SelectField';

export default function UserForm({ values, errors, loading, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <InputField id="fullName" label="Full Name" required value={values.fullName} onChange={onChange} error={errors.fullName} autoComplete="name" />
        <InputField id="email" type="email" label="Email Address" required value={values.email} onChange={onChange} error={errors.email} autoComplete="email" />
        <InputField id="mobileNumber" label="Mobile Number" required value={values.mobileNumber} onChange={onChange} error={errors.mobileNumber} inputMode="numeric" maxLength={10} autoComplete="tel" />
        <InputField id="dateOfBirth" type="date" label="Date of Birth" value={values.dateOfBirth} onChange={onChange} error={errors.dateOfBirth} />
        <SelectField id="gender" label="Gender" required value={values.gender} onChange={onChange} error={errors.gender} options={genderOptions} />
        <InputField id="city" label="City" required value={values.city} onChange={onChange} error={errors.city} autoComplete="address-level2" />
        <SelectField id="state" label="State" required value={values.state} onChange={onChange} error={errors.state} options={stateOptions} />
        <InputField id="pincode" label="Pincode" required value={values.pincode} onChange={onChange} error={errors.pincode} inputMode="numeric" maxLength={6} autoComplete="postal-code" />
      </div>
      <div className="field full-width">
        <label htmlFor="address">Address <span aria-hidden="true">*</span></label>
        <textarea id="address" name="address" rows="4" maxLength="250" value={values.address} onChange={onChange} aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? 'address-error' : 'address-count'} />
        <div className="field-meta"><span>{values.address.length}/250</span>{errors.address && <p className="field-error" id="address-error" role="alert">{errors.address}</p>}</div>
      </div>
      <div className="terms full-width">
        <label className="checkbox-label">
          <input type="checkbox" name="termsAccepted" checked={values.termsAccepted} onChange={onChange} aria-invalid={Boolean(errors.termsAccepted)} />
          <span>I agree to the Terms & Conditions <span aria-hidden="true">*</span></span>
        </label>
        {errors.termsAccepted && <p className="field-error" role="alert">{errors.termsAccepted}</p>}
      </div>
      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? <><span className="spinner" aria-hidden="true" /> Saving...</> : 'Create Account'}
      </button>
    </form>
  );
}
