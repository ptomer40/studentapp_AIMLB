const mongoose=require('mongoose');

async function dbConn(){
   try{
      //mongodb+srv://tomer1580:admin@cluster0.8thnxca.mongodb.net/studentappcseb?retryWrites=true&w=majority&appName=Cluster0
      await  mongoose.connect('mongodb+srv://tomer1580:admin@cluster0.8thnxca.mongodb.net/studentappcseb?retryWrites=true&w=majority&appName=Cluster0');
      //await  mongoose.connect('mongodb://localhost:27017/cseaimlb');
    console.log("Database connected successfully");
   }catch(err){
    console.log(err.message);
   }

}
module.exports=dbConn;