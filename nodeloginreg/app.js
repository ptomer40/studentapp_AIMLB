const http=require('http');

const fs=require('fs').promises;
const PORT=3001;

const server=http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-method','GET,POST,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');

 //res.end("Welcome to Node Server");
if(req.method=="OPTIONS"){
    res.writeHead(200,{'Content-Type':'text/html'});
    return res.end();
}

 if(req.url=='/register' && req.method=="POST"){
   let body='';
   let arr=[];

   req.on('data',chunk=>{
    body+=chunk;
   })

   req.on('end',async()=>{
    
    try{
        console.log(body);
        const {name,email,password}=JSON.parse(body);//convert into jSON object
        console.log(name);
           const data=await fs.readFile('student.json',{encoding:'utf-8'});
            arr=JSON.parse(data);
            const status=arr.find((ele)=>ele.email==email);
            if(status){
                return res.end(JSON.stringify({"message":"Email is already registerd"}));
            }
            else{
                arr.push({name,email,password});
                await fs.writeFile('student.json',JSON.stringify(arr,null,2));
                res.end(JSON.stringify({"message":"Registration successfully completed"}))
            }


    }catch(err){
       console.log("Error while writing the daat in registration"+err)
    }
   })


   // res.end(JSON.stringify({"message":"Successfully register"}));
 }


 if(req.url=='/login' && req.method=="POST"){
    let body='';
    let arr=[];
 
    req.on('data',chunk=>{
     body+=chunk;
    })

     req.on('end',async()=>{
        try{
        console.log(body);
        const {email,password}=JSON.parse(body);
        const data=await fs.readFile('student.json',{encoding:'utf-8'});
        arr=JSON.parse(data);
        const status=arr.find((ele)=>ele.email==email && ele.password==password);
        if(status){
            return res.end(JSON.stringify({"message":"success"}));
        }
        else{
            res.end(JSON.stringify({"message":"invalid user"}));
        }

        }catch(e){
            res.end(JSON.stringify({"message":e}));
        }
     })
     

 }


})

server.listen(PORT,()=>{
    
    console.log("Server is running on:"+PORT);
})
