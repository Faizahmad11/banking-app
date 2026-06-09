const jwt = require("jsonwebtoken");

const jwt_secret = "!@#$$%^&*()*&^%$#@!";

class JwtService {
  
  static generateToken(user) {
    const token = jwt.sign(
      { user },
      jwt_secret,
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );

    return token;
  }

  static ValidateToken(token) {
     const data = jwt.verify(token, jwt_secret,
        {
            algorithms: ["HS256"],
        }
);
    return data;
}
}

module.exports = JwtService;    