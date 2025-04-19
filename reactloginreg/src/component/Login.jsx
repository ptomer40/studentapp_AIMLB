import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom'
function Login() {
  const navigate=useNavigate();

    async function sendData(e){
        e.preventDefault();
         
         const email=e.target.email.value;
         const password=e.target.password.value;
         //console.log(name+email+password);
              const response=await fetch("https://studentapp-aimlb.onrender.com/login",{
                method:"POST",
                body:JSON.stringify({email,password}),
                headers:{'Content-Type':'application/json'}
              })
                 const res=await response.json();
                 alert(res.message);
                 if(res.message=='success'){
                  navigate('/dashboard');
                 }
        
        
        }
  return (
    <div>
        <div style={{backgroundColor:'brown', color:'white'}}>Login Form</div>
<form onSubmit={sendData}>
        
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
     
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
    </div>
  
    <button type="submit" class="btn btn-primary">Login</button>
  </form>

    </div>
  )
}

export default Login