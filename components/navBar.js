import React from 'react'
import Link from 'next/link'
import { auth } from '../firebase'

const NavBar = ({user}) => {
    return (
        <div>
             <nav>
    <div className="nav-wrapper #388e3c green darken-2">
      <Link href='/'><a className="brand-logo">N-Logger</a></Link>
      <ul id="nav-mobile" className="right">

        {user ?  
        <>
        <li><Link href='/createblog'><a>Create Blog</a></Link></li>
      <li> <button className='btn red' onClick={()=>auth.signOut()}>LogOut</button></li> 
        </> :
      
      <>
      <li><Link href='/signup'><a>SignUp</a></Link></li>
      <li><Link href='/login'><a>LogIn</a></Link></li>
      </>
      }
      </ul>
    </div>
  </nav>
            
        </div>
    )
}

export default NavBar
