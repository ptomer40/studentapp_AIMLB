import React, { useState } from 'react'

function StudentAdmin() {
    const [alldata, setAllData]=useState([]);
    async function getData(e){
       e.preventDefault();
      const sid= e.target.sid.value;
      //alert(sid)
      if(sid=='*'){
      const response=await fetch("https://studentapp-aimlb.onrender.com/admin/show");
           const res=await response.json();

           console.log(res.message);
           setAllData(res.message);
    }
    else{
        const response=await fetch(`https://studentapp-aimlb.onrender.com/admin/searchbyemail/${sid}`);
           const res=await response.json();

           console.log(res.message);
           setAllData(Array.isArray(res.message)?res.message:[res.message]);// convert the data into array type if not
    }
}
function handleDelete(email){
alert("delete"+email);
}

function handleUpdate(email){
    alert("update"+email);
}
  return (
    <div>
        <div>StudentAdmin</div>
        <form onSubmit={getData}>
        <div>
            <input type="text" name='sid' placeholder='enter * or student email id' />
            
        </div>
        <div><button>ShowData</button></div>
        </form>
        <div className='container'>
            {
            alldata && alldata.length>0?(
                <table border={2}>
                    <thead>
                        <tr><th>Name</th><th>Email</th></tr>
                    </thead>
                    <tbody>
                        {
                           alldata.map((student,index)=>(
                            <tr key= {index}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td><button onClick={()=>handleDelete(student.email)}>Delete</button></td>
                                <td><button onClick={()=>handleUpdate(student.email)}>Update</button></td>
                            </tr>
                           )) 
                        }
                    </tbody>
                </table>
            ):(<h2>No data found</h2>)

            }
        </div>

    </div>
  )
}

export default StudentAdmin