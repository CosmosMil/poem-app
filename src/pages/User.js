import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';


function User() {

  const { user, logIn } = useContext(AuthContext);


  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    logIn(inputEmail, inputPassword)
  }

  const handleInputEmail = (event) => {
    console.log(event.target.value);
    setInputEmail(event.target.value);

  }

  const handleInputPassword = (event) => {
    setInputPassword(event.target.value);
  }

  return (
    <>
      
      <div className='grid min-h-screen justify-center'>
        
        
        <div className='mx-auto p-10'>
        <h1 className='text-3xl text-center font-bold p-10 text-lime-400'>log in</h1>
<form onSubmit={handleSubmit} className='p-10'>
  <div className="mb-6 w-60">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-lime-400">Your email</label>
    <input type="email" id="email" onChange={handleInputEmail} value={inputEmail} className="text-white text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" placeholder="" required/>
  </div>
  <div className="mb-6 w-60">
    <label htmlFor="password" className="block mb-2 text-sm font-medium  text-lime-400">Your password</label>
    <input type="password" id="password" onChange={handleInputPassword} value={inputPassword} className=" text-white text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" required/>
  </div>

  <button type="submit" className="text-gray-500 bg-lime-400 hover:bg-lime-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </form>
        </div>
      

           <div className='mx-auto p-10'>
        <h1 className='text-3xl text-center font-bold p-10 text-lime-400'>register</h1>
<form className='p-10'>
  <div className="mb-6 w-60">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-lime-400">Your email</label>
    <input type="email" id="registerEmail" onChange={handleInputEmail} value={inputEmail} className="text-white text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" placeholder="" required/>
  </div>
  <div className="mb-6 w-60">
    <label htmlFor="password" className="block mb-2 text-sm font-medium  text-lime-400">Your password</label>
    <input type="password" id="registerPassword" onChange={handleInputPassword} value={inputPassword} className=" text-white text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" required/>
  </div>

  <button type="submit" className="text-gray-500 bg-lime-400 hover:bg-lime-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </form>
        </div>
        </div>
    
      

      
      </> 

  )
}

export default User