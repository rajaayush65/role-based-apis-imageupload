module.exports = async ({ username, password }) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username Cannot Be Empty";
  }

  if (password.trim() === "") {
    errors.password = "Password Cannot Be Empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
