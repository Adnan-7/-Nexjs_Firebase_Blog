import React ,{useState} from 'react'
import  Link from 'next/link'
import {auth} from '../firebase'

const Signup = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('')
const [name, setName] = useState('')

const onHandleSubmit= async (e) => {
  e.preventDefault();

  try{
  const result = await auth.createUserWithEmailAndPassword(email,password);
  await result.user.updateProfile({
      displayName:name
  })
  M.toast({html:`welcome ${result.user.displayName}`, classes:'green'})
}catch(err){
    M.toast({html:err.message, classes:'red'})
}
}

    return (
        <div className='container center'>
            <h3>Please Signup!!!</h3>
            <form onSubmit={(e)=>onHandleSubmit(e)}> 
                <div className="input-field">
                     <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="email"  placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
                </div>
                <button type='submit' className='btn #388e3c green darken-2'>Login</button>
                <br /><br />
                <Link href='/login'><a><h6>Already have an Account</h6></a></Link>
            </form>
            
        </div>
    )
}

export default Signup;
