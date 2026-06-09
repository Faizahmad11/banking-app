const ApiError = require("../utils/ApiError");
const JwtService = require("../utils/JwtService");

const AuthMiddleware = (req, res, next) => {
    try {
      const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
           throw new ApiError(401 ,"Please Login First");
        }
        const token = header.split(" ")[1];
        if (!token) {
           throw new ApiError(401 ,"Please Enter Valid Details");
        }
    
    const payload = JwtService.ValidateToken(token);
    req.useer = payload.user;
    next();
    
    
    }catch (error) {
       next(error);
    }
}

module.exports = AuthMiddleware;