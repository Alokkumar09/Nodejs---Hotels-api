const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person =require('../hotel/models/person');



passport.use(new LocalStrategy(async(UserName,password,done)=>{
    try {
      console.log("Recieved Creditials : ",UserName,password);
      const user=await Person.findOne({username:UserName});
      if(!user) 
        return done(null,false,{message:"Incorrect username"});
  
      const isPasswordMatch=user.comparePassword(password)
      if(isPasswordMatch){
        return done(null,user)
      }else{
        return done(null ,false,{message:"Incorrect Passsword"});
      }
    } catch (error) {
      return done(error);
    }
  }))

  module.exports=passport;
