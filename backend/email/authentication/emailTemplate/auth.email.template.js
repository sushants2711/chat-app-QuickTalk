// QuickTalk - transactional email templates

import {
  APP_NAME,
  CLIENT_URL,
  OTP_EXPIRY_MINUTES,
} from "../../../config/constantData/constant.js";

const COLORS = {
  bg: "#f4f5fb",
  card: "#ffffff",
  text: "#1f2037",
  muted: "#6b6f8a",
  primary: "#6c5ce7",
  primaryDark: "#4b3fd1",
  accent: "#00c2a8",
  danger: "#e5484d",
  border: "#e6e8f2",
  otpBg: "#f1efff",
};

// Prevents HTML injection through user-supplied values (e.g. username)
const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// ---------- Reusable building blocks ----------

const otpBlock = (otp) => `
    <div style="margin:24px 0;padding:18px 12px;background:${COLORS.otpBg};border:1px dashed ${COLORS.primary};border-radius:12px;text-align:center;">
        <div style="font-size:12px;color:${COLORS.muted};text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Your verification code</div>
        <div style="font-size:34px;font-weight:700;letter-spacing:8px;color:${COLORS.primaryDark};font-family:'Courier New',monospace;">${escapeHtml(otp)}</div>
    </div>
    <p style="margin:0 0 8px;font-size:14px;color:${COLORS.muted};">This code expires in <strong>${OTP_EXPIRY_MINUTES} minutes</strong>. Never share it with anyone.</p>
`;

const buttonBlock = (label, href) => `
    <div style="text-align:center;margin:28px 0 8px;">
        <a href="${escapeHtml(href)}" style="display:inline-block;background:${COLORS.primary};background-image:linear-gradient(135deg,${COLORS.primary},${COLORS.primaryDark});color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:13px 30px;border-radius:999px;">${escapeHtml(label)}</a>
    </div>
`;

const noticeBlock = (text, color = COLORS.muted) => `
    <p style="margin:20px 0 0;padding-top:16px;border-top:1px solid ${COLORS.border};font-size:13px;line-height:1.6;color:${color};">${text}</p>
`;

// ---------- Base layout ----------

const baseLayout = ({ title, heading, content }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)} - ${APP_NAME}</title>
    <style>
        @media only screen and (max-width: 620px) {
            .wrapper { padding: 16px 10px !important; }
            .body-pad { padding: 24px 20px !important; }
        }
    </style>
</head>
<body style="margin:0;padding:0;background:${COLORS.bg};font-family:'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${COLORS.text};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};">
        <tr>
            <td class="wrapper" align="center" style="padding:40px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${COLORS.card};border-radius:16px;overflow:hidden;box-shadow:0 6px 24px rgba(31,32,55,0.08);">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background:${COLORS.primary};background-image:linear-gradient(135deg,${COLORS.primary},${COLORS.primaryDark});padding:28px 20px;">
                            <div style="font-size:26px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">&#128172; ${APP_NAME}</div>
                            <div style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:4px;">Chat faster. Connect instantly.</div>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td class="body-pad" style="padding:36px 40px;line-height:1.65;font-size:15px;">
                            <h1 style="margin:0 0 18px;font-size:22px;color:${COLORS.text};">${heading}</h1>
                            ${content}
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background:#fafbff;border-top:1px solid ${COLORS.border};padding:20px;font-size:12px;color:${COLORS.muted};">
                            &copy; ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.<br>
                            This is an automated message, please do not reply.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

// ---------- Templates ----------

export const getSignupOtpEmailTemplate = (username, email, otp) =>
  baseLayout({
    title: "Verify your email",
    heading: `Welcome to ${APP_NAME}, ${escapeHtml(username)}! 👋`,
    content: `
            <p style="margin:0 0 8px;">Your account has been created with <strong>${escapeHtml(email)}</strong>. Enter the code below to verify your email and start chatting.</p>
            ${otpBlock(otp)}
            ${noticeBlock("If you didn't create a QuickTalk account, you can safely ignore this email.")}
        `,
  });

export const getSignupSuccessEmailTemplate = (username, email) =>
  baseLayout({
    title: "Registration successful",
    heading: `You're all set, ${escapeHtml(username)}! 🎉`,
    content: `
            <p style="margin:0 0 12px;">Your account <strong>${escapeHtml(email)}</strong> has been verified successfully.</p>
            <p style="margin:0;">You can now log in, find your friends, and start chatting on ${APP_NAME}.</p>
            ${buttonBlock("Open QuickTalk", CLIENT_URL)}
        `,
  });

export const getForgotPasswordOtpEmailTemplate = (username, email, otp) =>
  baseLayout({
    title: "Reset your password",
    heading: `Hi ${escapeHtml(username)}, let's reset your password`,
    content: `
            <p style="margin:0 0 8px;">We received a request to reset the password for your ${APP_NAME} account (<strong>${escapeHtml(email)}</strong>). Use the code below to continue.</p>
            ${otpBlock(otp)}
            ${noticeBlock("Didn't request this? Ignore this email, your account is still secure.")}
        `,
  });

export const getPasswordResetSuccessEmailTemplate = (username, email) =>
  baseLayout({
    title: "Password reset successful",
    heading: `Password updated, ${escapeHtml(username)} 🔐`,
    content: `
            <p style="margin:0 0 12px;">The password for <strong>${escapeHtml(email)}</strong> has been changed successfully.</p>
            <p style="margin:0;">You can now log in to ${APP_NAME} with your new password.</p>
            ${buttonBlock("Log in", CLIENT_URL)}
            ${noticeBlock("If you didn't make this change, please reset your password immediately and contact our support team.", COLORS.danger)}
        `,
  });

export const getAccountDeletionOtpEmailTemplate = (username, email, otp) =>
  baseLayout({
    title: "Confirm account deletion",
    heading: `Confirm account deletion, ${escapeHtml(username)}`,
    content: `
            <p style="margin:0 0 12px;">A request was made to delete the ${APP_NAME} account linked to <strong>${escapeHtml(email)}</strong>.</p>
            <p style="margin:0 0 8px;color:${COLORS.danger};"><strong>Warning:</strong> this action is irreversible. Your chats, contacts and profile will be removed.</p>
            ${otpBlock(otp)}
            ${noticeBlock("If you didn't request this, ignore this email and consider changing your password.", COLORS.danger)}
        `,
  });

export const getAccountDeletionSuccessEmailTemplate = (username, email) =>
  baseLayout({
    title: "Account deleted",
    heading: `Goodbye, ${escapeHtml(username)} 👋`,
    content: `
            <p style="margin:0 0 12px;">Your account <strong>${escapeHtml(email)}</strong> has been permanently deleted.</p>
            <p style="margin:0;">Your data has been removed from ${APP_NAME} in line with our privacy policy. Thanks for being part of us, you're always welcome back.</p>
        `,
  });

export const getAccountRestoreOtpEmailTemplate = (username, email, otp) =>
  baseLayout({
    title: "Restore your account",
    heading: `Hi ${escapeHtml(username)}, restore your account`,
    content: `
              <p style="margin:0 0 8px;">We received a request to restore your ${APP_NAME} account linked to <strong>${escapeHtml(email)}</strong>. Enter the code below to confirm and get your account back.</p>
              ${otpBlock(otp)}
              ${noticeBlock("If you didn't request this, ignore this email. Your account will stay deleted.", COLORS.danger)}
          `,
  });

export const getAccountRestoreSuccessEmailTemplate = (username, email) =>
  baseLayout({
    title: "Account restored",
    heading: `Welcome back, ${escapeHtml(username)}! 🎉`,
    content: `
            <p style="margin:0 0 12px;">Your ${APP_NAME} account <strong>${escapeHtml(email)}</strong> has been restored successfully.</p>
            <p style="margin:0;">Your profile and conversations are back, so you can log in and continue where you left off.</p>
            ${buttonBlock("Log in to QuickTalk", CLIENT_URL)}
            ${noticeBlock("If you didn't request this restoration, please reset your password and contact our support team right away.", COLORS.danger)}
        `,
  });

export const getLoginEmailTemplate = (username, email) =>
  baseLayout({
    title: "Login Success",
    heading: `Welcome back, ${escapeHtml(username)}! 🎉`,
    content: `
            <p style="margin:0 0 12px;">Your account <strong>${escapeHtml(email)}</strong> has been logged in successfully.</p>
            <p style="margin:0;">You can now chat with your friends on ${APP_NAME}.</p>
            ${buttonBlock("Open QuickTalk", CLIENT_URL)}
        `,
  });
