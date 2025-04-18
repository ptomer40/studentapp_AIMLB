const express=require('express');
const cors=require('cors');
     const app=express();
     app.use(express.json());
     app.use(cors());
     
     app.post("/register",(req,res)=>{
        const {name,email,password}=req.body;
        console.log(name+email);
        res.send(JSON.stringify({message:"Register successfully"}));

     })

     app.listen(3001,()=>{
        console.log("Hii, Server is running on:"+3001);
     });