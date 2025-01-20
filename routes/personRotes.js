const express=require('express');
const router=express.Router();
const Person=require('./../models/person');

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

router.get('/',async(req,res)=>{
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
router.post('/',async(req,res)=>{

    try{
      const data=req.body
      //newPerson ke andar sara inherit ho gye person schema se
      const newPerson=new Person(data);
      
      const response=await newPerson.save();
      console.log("data saved");
      res.status(200).json(response);
    
      
    }catch(error){
      console.log(error);
      res.status(500).json({error: "Internel server error"});
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