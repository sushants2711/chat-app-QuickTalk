export const checkNameAndEmail = (name, email) => {
  if (!name) throw new Error("Name is missing");
  if (!email) throw new Error("Email Id is missing");
};
