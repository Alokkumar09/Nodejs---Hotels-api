const express=require('express');
const router=express.Router();
const Person=require('./../models/person');
const { generateToken,jwtAuthMiddleware } = require('../jwt');

router.get('/:workType',async(req,res)=>{
    try{
  
      const workType=req.params.workType;
      if(workType=='manager' || workType=='chef' || workType=='waiter'){
        const response=await Person.find({work:workType});
        console.log("response fetch");
        
        res.status(200).json(response);
      }else{
        res.status(400).json({error:"Invalid work type"});
      }
    }catch(error){
      console.log(error);
      res.status(404).json({error:"Invalid server erro"});
      
    }
  })

router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try{
  const data=await Person.find();
  console.log("data fetched");
  res.status(200).json(data);
  
    }catch(error){
    console.log(error);
    res.status(500).json({error:"Internel server error"})
    
    }
  })

  //post
router.post('/signup',async(req,res)=>{

    try{
      const data=req.body
      //newPerson ke andar sara inherit ho gye person schema se
      const newPerson=new Person(data);
      
      const response=await newPerson.save();
      console.log("data saved");
      const payload={
        id:response.id,
        username:response.username
      }
      const token=generateToken(payload);
      console.log("token is :",token);
      
      res.status(200).json({response:response,token:token});
    
      
    }catch(error){
      console.log(error);
      res.status(500).json({error: "Internel server error"});
    }
    })
// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})
    //login

    router.post('/login',async(req,res)=>{

      try {
        const {username,password}=req.body;
        const user=await Person.findOne({username:username});
        if(!user || await !( user.comparePassword({password}))){
          return  res.status(401).json({error:"Invalid user or password"});
        }
        const payload={
          id:user.id,
          username:user.username
        }
        const token=generateToken(payload)
        res.json({token:token});
        
      } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server error"});
      }
      
    })
    
  router.put('/:id', async(req,res)=>{
    try{
      const personId=req.params.id;
      const updatedPerson=req.body;
      const response =   await Person.findByIdAndUpdate(personId,updatedPerson,{
      new:true,
      runValidators:true
      })
      if(!response){
        res.status(404).json({error:"Person not found"});
      }else{
        console.log("data updated successfully");
        
        res.status(200).json(response);
      }

    }catch(error){
      console.log(error);
      res.status(500).json({error:"Internel Server Error"});
      
    }
  })
  router.delete('/:id',async(req,res)=>{
    try{
const personID=req.params.id;
const response=await Person.findByIdAndDelete(personID);
if(!response){
  res.status(404).json({error:"Person not found"});
}else{
  console.log("Person deleted");
  res.status(200).json(message,"Successfully deleted ");
  
}
    }catch(error){
      console.log(error);
      res.status(500).json({error:"Internel Server erro"});
      
    }
  })



    module.exports=router;