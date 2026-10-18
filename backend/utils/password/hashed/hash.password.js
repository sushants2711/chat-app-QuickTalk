import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const saltRound = 10;
  const hashingThePassword = bcrypt.hash(password, saltRound);
  return hashingThePassword;
};
