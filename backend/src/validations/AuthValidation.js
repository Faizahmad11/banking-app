const { body } = require('express-validator');

class AuthValidation {
   static loginUser=[
        body("email").isEmail().withMessage("Email is required").toLowerCase().trim(),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ]


   static registerUser=[
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Email is required").toLowerCase().trim(),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        body("ac_type").notEmpty().withMessage("Account type is required").isIn(["current", "savings"]).withMessage("Account should be a saving or current account"),
    ]
}


module.exports = AuthValidation;