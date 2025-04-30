import React from 'react'
import {Link,Outlet} from 'react-router-dom'
function Home() {
  return (
    <div>
    <div style={{backgroundColor:'#965954',color:'white',fontSize:'25px'}}>Welcome to Student App</div>
    <div>
        <nav>
          <div>
          <ul>
          <li><Link to='/studentadmin'>Admin</Link></li>
          </ul>
          </div>
            <ul>
       <li><Link to='/login'>Login</Link></li>
       <li><Link to='/register'>Registration</Link></li>

            </ul>
        </nav>
        <Outlet />
    </div>
    </div>
  )
}

export default Home