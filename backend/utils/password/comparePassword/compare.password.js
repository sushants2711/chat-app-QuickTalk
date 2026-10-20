import bcrypt from "bcryptjs";

export const verifyPassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
