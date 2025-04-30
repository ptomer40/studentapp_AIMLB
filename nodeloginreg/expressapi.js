const express=require('express');
const fs=require('fs').promises
const cors=require('cors');
const dbConn=require('./database/dbconn');
const student=require('./model/student');
const app=express();
const port=3001;

dbConn();
app.use(express.json());//middleware
app.use(cors())// middleware
app.get("/",(req,res)=>{
    try{
//res.send("<h2>Welcome to Express Server</h2>");
res.status(200).json({message:"This is defualt end point"});
    }catch(err){
        res.status(500).json({message:err});
    }
})


app.post("/register",async(req,res)=>{
    try{
        //let arr=[];

        const studentData=req.body;
       await student.create(studentData);
       return res.json({message:"Sucessfully registered"});
        //console.log(name+email+password);

        // const data=await fs.readFile('student.json',{encoding:'utf-8'});
        // arr=JSON.parse(data);
        // const status=arr.find((ele)=>ele.email==email);
        // if(status){
        //     return res.status(203).json({message:"Email is already registerd"});
        // }
        // else{
        //     arr.push({name,email,password});
        //     await fs.writeFile('student.json',JSON.stringify(arr,null,2));
        //     res.status(200).json({message:"register successfully"});
        // }


//res.send("<h2>Welcome to Express Server</h2>");

    }catch(err){
        res.status(500).json({message:err});
    }
})
app.post("/login",async(req,res)=>{
    try{
    //let arr=[];
const {email,password}=req.body;

       const sdata=await student.findOne({email:email});
       if(!sdata){
        return res.json({"message":"Email is not registered"});
       }else{
        if(sdata.password==password){
            res.json({"message":"success"});
        }else{
            res.json({"message":"Password is incorrect"});
        }
       }
// const data=await fs.readFile('student.json',{encoding:'utf-8'});
// arr=JSON.parse(data);

// const status=arr.find((ele)=>ele.email==email && ele.password==password);
//         if(status){
//             return res.json({"message":"success"});
//         }
//         else{
//             res.json({"message":"invalid user"});
//         }
    }catch(err){
        res.json({"message":err.message});
    }
})

app.get("/admin/show",async(req,res)=>{
    try{
       // console.log("Hi inside /show")
    // const data=await fs.readFile('student.json',{encoding:'utf-8'});
    
    // const arr=JSON.parse(data);
    // //console.log(arr);
    const sdata=await student.find();
    res.status(200).json({message:sdata});
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

app.get("/admin/searchbyemail/:email",async(req,res)=>{
//let arr=[];
    const id=req.params.email;
    const sdata=await student.findOne({email:id});
    if(!sdata){
        return res.json({message:"email not found"})
    }
    res.json({message:sdata})
// console.log(id);
// const data=await fs.readFile('student.json',{encoding:'utf-8'});
//  arr=JSON.parse(data);
//  const status=arr.find(ele=>ele.email==id);
//  if(!status){
//     res.json({message:"email not found"})
//  }
  //res.json({message:status});
         

})

app.delete("/admin/deletebyid/:email",async(req,res)=>{
   let arr=[];
    const id=req.params.email;
       const sdata=await student.deleteOne({email:id});
       if(sdata.deletedCount==0){
        res.json({message:"Data could't delete"})
       }
       res.json({message:"Data deleted successfully!!!"})

// const data=await fs.readFile('student.json',{encoding:'utf-8'});
//  arr=JSON.parse(data);
//        const index=arr.findIndex(ele=>ele.email==id);
//        if(index==-1){
//         res.json({message:"No records found to delete"})
//        }
//        arr.splice(index,1);
//        fs.writeFile('student.json',JSON.stringify(arr,null,2));
//        res.json({message:"data deleted successfully"})
})

app.patch("/admin/updatebyid/:email",async(req,res)=>{

const id=req.params.email;
const {name,password}=req.body;
const sdata=await student.updateOne({email:id},{$set:{name:name,password:password}});
if(sdata.matchedCount==0){
    res.json({message:"no email found to update data"})
}
res.json({message:"data updated successfully"})
// console.log(name+password+id);
// let arr=[];
// const data=await fs.readFile('student.json',{encoding:'utf-8'});
//  arr=JSON.parse(data);
//  const status=arr.find(ele=>ele.email==id);
//  if(!status){
//     res.json({message:"data not found to update"})
//  }
//  status.name=name;
//  status.password=password;
//  await fs.writeFile('student.json',JSON.stringify(arr,null,2));
 //res.json({message:"data updated successfully"})
})

app.listen(port,()=>{
    console.log("Express server is running on"+port);
})