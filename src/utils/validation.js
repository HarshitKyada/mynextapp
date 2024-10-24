export const validateRegistration = (formData) => {
  const errors = {};

  if (Object.keys(formData).includes("username") && !formData.username) {
    errors.username = "Full name is required";
  }
  if (Object.keys(formData).includes("email") && !formData.email) {
    errors.email = "Email is required";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) &&
    Object.keys(formData).includes("email")
  ) {
    errors.email = "Invalid email format";
  }
  if (Object.keys(formData).includes("phone") && !formData.phone) {
    errors.phone = "Phone number is required";
  } else if (
    !/^\d{10}$/.test(formData.phone) &&
    Object.keys(formData).includes("phone")
  ) {
    errors.phone = "Phone number must be 10 digits";
  }
  if (Object.keys(formData).includes("city") && !formData.city) {
    errors.city = "City is required";
  }
  if (Object.keys(formData).includes("pincode") && !formData.pincode) {
    errors.pincode = "Pincode is required";
  }
  if (Object.keys(formData).includes("state") && !formData.state) {
    errors.state = "State is required";
  }
  if (Object.keys(formData).includes("address") && !formData.address) {
    errors.address = "Address is required";
  }

  return errors;
};
