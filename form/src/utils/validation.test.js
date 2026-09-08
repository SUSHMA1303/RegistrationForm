import { describe, expect, it } from 'vitest';
import { validateForm } from './validation';

const valid = { fullName: 'Rahul Kumar', email: 'rahul@example.com', mobileNumber: '9876543210', dateOfBirth: '1995-08-15', gender: 'Male', address: 'Hitech City', city: 'Hyderabad', state: 'Telangana', pincode: '500081', termsAccepted: true };

describe('validateForm', () => {
  it('accepts valid registration details', () => expect(validateForm(valid)).toEqual({}));
  it('rejects invalid email, mobile number, pincode, and terms', () => {
    const errors = validateForm({ ...valid, email: 'bad', mobileNumber: '123', pincode: '12', termsAccepted: false });
    expect(errors.email).toBeTruthy();
    expect(errors.mobileNumber).toBeTruthy();
    expect(errors.pincode).toBeTruthy();
    expect(errors.termsAccepted).toBeTruthy();
  });
});
