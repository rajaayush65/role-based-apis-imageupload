const User = require("../model/user-model");

module.exports = async ({
  name,
  username,
  password,
  email,
  confirmPassword,
}) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Name Must Not Be Empty";
  }
  if (username.trim() === "") {
    errors.username = "Username Must Not Be Empty";
  } else {
    const user = await User.findOne({ username: username });
    if (user) {
      errors.username =
        "Username Already Exists, Please Choose Another Username";
    }
  }
  if (email.trim() === "") {
    errors.email = "Email Must Not Be Empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email Must Be a Valid Email Address";
    }
    const user = await User.findOne({ email: email });
    if (user) {
      errors.email = "Email ID is already Taken Please Try Again";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password is Empty";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Password Mismatched";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
