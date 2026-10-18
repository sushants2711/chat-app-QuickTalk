import otpGenerator from "otp-generator";

export const generateOTP = () => {
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });
  return otp;
};
