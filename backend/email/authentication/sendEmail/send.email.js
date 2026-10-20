import { checkNameEmailAndOtp } from "../helperFunction/check.name.email.otp.js";
import { checkNameAndEmail } from "../helperFunction/check.name.email.js";
import { sendEmail } from "../helperEmail/send.email.js";
import {
  getSignupOtpEmailTemplate,
  getSignupSuccessEmailTemplate,
  getForgotPasswordOtpEmailTemplate,
  getPasswordResetSuccessEmailTemplate,
  getAccountDeletionOtpEmailTemplate,
  getAccountDeletionSuccessEmailTemplate,
  getAccountRestoreOtpEmailTemplate,
  getAccountRestoreSuccessEmailTemplate,
  getLoginEmailTemplate,
} from "../emailTemplate/auth.email.template.js";

export const sendSignupVerificationEmail = async (name, email, otp) => {
  checkNameEmailAndOtp(name, email, otp);

  const emailInfo = await sendEmail(
    email,
    "Verify Your Email",
    getSignupOtpEmailTemplate(name, email, otp),
  );

  return emailInfo;
};

export const sendSignupSuccessEmail = async (name, email) => {
  checkNameAndEmail(name, email);

  const emailInfo = await sendEmail(
    email,
    "Registration Successful",
    getSignupSuccessEmailTemplate(name, email),
  );

  return emailInfo;
};

export const sendForgotPasswordEmail = async (name, email, otp) => {
  checkNameEmailAndOtp(name, email, otp);

  const emailInfo = await sendEmail(
    email,
    "Password Reset Request",
    getForgotPasswordOtpEmailTemplate(name, email, otp),
  );

  return emailInfo;
};

export const sendPasswordResetSuccessEmail = async (name, email) => {
  checkNameAndEmail(name, email);

  const emailInfo = await sendEmail(
    email,
    "Password Reset Successful",
    getPasswordResetSuccessEmailTemplate(name, email),
  );

  return emailInfo;
};

export const getAccountDeletionRequestEmail = async (name, email, otp) => {
  checkNameEmailAndOtp(name, email, otp);

  const emailInfo = await sendEmail(
    email,
    "Account Deletion Request",
    getAccountDeletionOtpEmailTemplate(name, email, otp),
  );

  return emailInfo;
};

export const getAccountDeletionSuccessEmail = async (name, email) => {
  checkNameAndEmail(name, email);

  const emailInfo = await sendEmail(
    email,
    "Account Deletion Success",
    getAccountDeletionSuccessEmailTemplate(name, email),
  );

  return emailInfo;
};

export const getAccountRestoreOtpEmail = async (name, email, otp) => {
  checkNameEmailAndOtp(name, email, otp);

  const emailInfo = await sendEmail(
    email,
    "Account Restore Request",
    getAccountRestoreOtpEmailTemplate(name, email, otp),
  );

  return emailInfo;
};

export const getAccountRestoreSuccessEmail = async (name, email) => {
  checkNameAndEmail(name, email);

  const emailInfo = await sendEmail(
    email,
    "Account Restore Success",
    getAccountRestoreSuccessEmailTemplate(name, email),
  );

  return emailInfo;
};

export const getLoginEmail = async (name, email) => {
  checkNameAndEmail(name, email);

  const emailInfo = await sendEmail(
    email,
    "Login Success",
    getLoginEmailTemplate(name, email),
  );
  return emailInfo;
};
