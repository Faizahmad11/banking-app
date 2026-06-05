class AuthService{
  static loginUser(body){
    return{
        msg:"Login Route",
    }
  }
  static async registerUser(body){
   const {name,email,password,ac_type} = body;
   return{name,email,password,ac_type}
  }
}

module.exports = AuthService;