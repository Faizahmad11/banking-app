const { UserModel } = require("../models/User.models");

class AuthService{
  static loginUser(body){
    return{
        msg:"Login Route",
    }
  }
  static async registerUser(body){
   const {name,email,password,ac_type} = body;
     
    const user = await UserModel.create({
        name,email,password,ac_type
    })


   }
}

module.exports = AuthService;