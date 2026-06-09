const { UserModel } = require("../models/User.models");
const ApiError = require("../utils/ApiError");
const bcryptjs = require("bcryptjs");
const JwtService = require("../utils/JwtService");

class AuthService {
  
  static async loginUser(body) {
    const { email, password } = body;

    const check_exist = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (!check_exist) {
      throw new ApiError(
        400,
        "No Account found with this email"
      );
    }

    const is_match = await bcryptjs.compare(
      password,
      check_exist.password
    );

    if (!is_match) {
      throw new ApiError(
        400,
        "Invalid email or password"
      );
    }

    // Generate JWT Token
    const token = JwtService.generateToken(
      check_exist._id
    );

    return {
      msg: "Login successful",
      token,
      user: {
        _id: check_exist._id,
        name: check_exist.name,
        email: check_exist.email,
        ac_type: check_exist.ac_type,
      },
    };
  }

  static async registerUser(body) {
    const { name, email, password, ac_type } =
      body;

    const check_exist = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (check_exist) {
      throw new ApiError(
        400,
        "Email already exists"
      );
    }



    // Hash Password
    const hashedPassword =
      await bcryptjs.hash(password, 10);

    const user = await UserModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      ac_type,
    });

    // Generate JWT Token
    const token = JwtService.generateToken(
      user._id
    );

    return {
      msg: "Register successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        ac_type: user.ac_type,
      },
    };
  }

  static async profileUser(userId) {

  const userData = await UserModel
    .findById(userId)
    .select(
      "name email ac_type createdAt -_id"
    );

  if (!userData) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  return userData;
}


}

module.exports = AuthService;