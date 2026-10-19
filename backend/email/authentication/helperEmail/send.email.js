import { SMTP_NAME, SMTP_USER } from "../../../config/constantData/constant.js";
import { transporter } from "../../../config/nodemailer/nodemailer.config.js";

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"${SMTP_NAME}" <${SMTP_USER}>`,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    throw new Error(error.message, { cause: error });
  }
};
