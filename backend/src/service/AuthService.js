const { UserModel } = require("../models/User.models");
const ApiError = require("../utils/ApiError");
const bcryptjs = require("bcryptjs");

class AuthService {
 static async loginUser(body) {
  const { email, password } = body;

  const check_exist = await UserModel.findOne({
    email: email.toLowerCase(),
  });

  if (!check_exist) {
    throw new ApiError(400, "No Account found with this email");
  }

  const is_match = await bcryptjs.compare(
    password,
    check_exist.password
  );

  if (!is_match) {
    throw new ApiError(400, "Invalid email or password");
  }

  return {
    msg: "Login successful",
    token: "1234",
  };
}

  static async registerUser(body) {
    const { name, email, password, ac_type } = body;

    const check_exist = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (check_exist) {
      throw new ApiError(400, "Email already exists");
    }

    const user = await UserModel.create({
      name,
      email,
      password,
      ac_type,
    });

      return {
      msg: "Register successful",
      "token": "1234"
    }

  }
}

module.exports = AuthService;