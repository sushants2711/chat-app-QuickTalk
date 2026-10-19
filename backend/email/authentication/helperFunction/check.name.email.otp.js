export const checkNameEmailAndOtp = (name, email, otp) => {
  if (!name) throw new Error("Name is missing");
  if (!email) throw new Error("Email Id is missing");
  if (!otp) throw new Error("OTP is missing");
};
