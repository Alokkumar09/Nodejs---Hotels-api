const express=require('express');
const router=express.Router();
const Menu=require('../models/Menu');
//post menu

router.post('/',async(req,res)=>{
    try{
  const data=req.body;
  const newMenu=new Menu(data);
  const response=await newMenu.save();
  console.log("Menu saved");
  res.status(200).json(response);
  
    }catch(error){
      console.log(error);
      res.status(500).json({error:"Internel Server Error"});
      
    }
  
  })
  
  
  router.get('/',async(req,res)=>{
    try{
  
      const data=await Menu.find();
      console.log("data fetched");
      res.status(200).json(data);
      
    }catch(error){
  console.log(error);
  res.status(500).json({error:"Internel Server error"});
  
    }
  })


  router.get('/:taste',async(req,res)=>{
    try{
        const tasteType=req.params.taste;
        if(tasteType=="spicy" || tasteType=="sweet"){
            const response=await Menu.find({taste:tasteType});
            console.log("data fetch");

            res.status(200).json(response);
            
        }else{
            res.status(400).json({error:"Invalid work type"});
          }

    }catch(error){
   console.log(error);
   res.status(404).json({error:"Internel Server Error"});
    }
  })

  router.put('/:id',async(req,res)=>{
    try{
      const menuId=req.params.id;
      const updatedMenu=req.body;
      const response=await Menu.findByIdAndUpdate(menuId,updatedMenu,{
        new:true,
        runValidators:true
      });
      if(!response){
        res.status(404).json({error:"Menu not found"});
      }else{
        console.log("Menu Updated Successfully");
        res.status(200).json(response);
        
      }

    }catch(error){
      console.log(error);
      res.status(500).json({error:"Internel Server error"});
      
    }
  })

  router.delete("/:id",async(req,res)=>{
    try{
      const menuId=req.params.id;
      const response=await Menu.findByIdAndDelete(menuId);
      if(!response){
        res.status(404).json({error:"Menu not found"});
      }else{
        console.log("Menu deleted ");
        res.status(200).json({message:"Menu deleted Successfully"});
        
      }

    }catch(error){
      console.log(error);
      res.status(500).json({error:"Internel Server Error"});
      
    }
  })

  module.exports=router;