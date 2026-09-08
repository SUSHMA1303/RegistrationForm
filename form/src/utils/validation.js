export function validateForm(values) {
  const errors = {};
  const name = values.fullName.trim();
  const email = values.email.trim();
  const address = values.address.trim();
  const city = values.city.trim();

  if (!name) errors.fullName = 'Full name is required.';
  else if (name.length < 3 || name.length > 100) errors.fullName = 'Enter 3–100 characters.';

  if (!email) errors.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';

  if (!/^\d{10}$/.test(values.mobileNumber)) errors.mobileNumber = 'Enter exactly 10 digits.';

  if (values.dateOfBirth && Number.isNaN(Date.parse(values.dateOfBirth))) {
    errors.dateOfBirth = 'Enter a valid date.';
  }

  if (!values.gender) errors.gender = 'Please select a gender.';
  if (!address) errors.address = 'Address is required.';
  else if (address.length > 250) errors.address = 'Address cannot exceed 250 characters.';

  if (!city) errors.city = 'City is required.';
  else if (city.length < 2 || city.length > 50) errors.city = 'Enter 2–50 characters.';

  if (!values.state) errors.state = 'Please select a state.';
  if (!/^\d{6}$/.test(values.pincode)) errors.pincode = 'Enter exactly 6 digits.';
  if (!values.termsAccepted) errors.termsAccepted = 'You must accept the terms and conditions.';

  return errors;
}
