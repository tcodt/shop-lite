export const authValidations = {
  username: /^[A-Za-z\s]+$/, // Letters and spaces only
  password: /^(?=.*[A-Za-z])(?=.*\d)/, // Letters, numbers, symbols (not required)
};
