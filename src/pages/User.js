import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase'
import { signInWithEmailAndPassword} from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';



function User() {
  const { user, logIn, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      }).catch((error) => {
        console.log(error)
      });
    // logIn(inputEmail, inputPassword)
  };

   const handleEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);

  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

   const handleSignUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        console.log(userCredential);
      }).catch((error) => {
      console.log(error)
    })
   }
  
  const handleRegisterEmail = (event) => {
    console.log(event.target.value);
    setRegisterEmail(event.target.value);

  }

  const handleRegisterPassword = (event) => {
    setRegisterPassword(event.target.value);
  }

 

  return (

  <>
      
      {!user ? <div className='grid min-h-screen justify-center'>
        
        
        <div className='mx-auto p-10'>
        <h1 className='text-3xl text-center font-bold p-10 text-lime-400'>log in</h1>
<form onSubmit={handleSignIn} className='p-10'>
  <div className="mb-6 w-60">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-lime-400">Your email</label>
    <input type="email" id="email" onChange={handleEmail} value={email} className="text-white text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" placeholder="" required/>
  </div>
  <div className="mb-6 w-60">
    <label htmlFor="password" className="block mb-2 text-sm font-medium  text-lime-400">Your password</label>
    <input type="password" id="password" onChange={handlePassword} value={password} className=" text-white text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" required/>
  </div>

  <button type="submit" className="text-gray-500 bg-lime-400 hover:bg-lime-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </form>
        </div>
      

           <div className='mx-auto p-10'>
        <h1 className='text-3xl text-center font-bold p-10 text-lime-400'>register</h1>
          <form onSubmit={handleSignUp} className='p-10'>
  <div className="mb-6 w-60">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-lime-400">Your email</label>
    <input type="email" id="registerEmail" onChange={handleRegisterEmail} value={registerEmail} className="text-white text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" placeholder="" required/>
  </div>
  <div className="mb-6 w-60">
    <label htmlFor="password" className="block mb-2 text-sm font-medium  text-lime-400">Your password</label>
    <input type="password" id="registerPassword" onChange={handleRegisterPassword} value={registerPassword} className=" text-white text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" required/>
  </div>

  <button type="submit" className="text-gray-500 bg-lime-400 hover:bg-lime-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </form>
        </div>
      </div> : <div className='grid min-h-screen justify-center'>
        
        
        <div className='mx-auto p-10'>
        <h1 className='text-3xl text-center font-bold p-10 text-lime-400'>log in successful :)</h1></div></div>}
    
</>

  )
}

export default User