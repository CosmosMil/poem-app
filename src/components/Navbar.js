import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

function Navbar() {

    const { user, logIn, logOut } = useContext(AuthContext);

    return (
      <>
   
<nav className="bg-gray-700 rounded flex gap-1">
      <ul className="flex flex-row space-x-4 p-4 mt-5">
        <li>
          <NavLink to='/'className="block py-2 pl-3 pr-4 text-gray-700 rounded dark:text-gray-300">random poem</NavLink>
        </li>
        <li>
          <NavLink to='/search' className="block py-2 pl-3 pr-4 text-gray-700 rounded dark:text-gray-300">search for poems</NavLink>
        </li>
        <li>
          <NavLink to='/collection' className="block py-2 pl-3 pr-4 text-gray-700 rounded dark:text-gray-300">my collection</NavLink>
        </li>
        <li>
         {user ? <NavLink to='/user' className="block py-2 pl-3 pr-4 text-gray-700 rounded dark:text-gray-300">log out</NavLink> : <NavLink to='/user' className="block py-2 pl-3 pr-4 text-gray-700 rounded dark:text-gray-300">log in</NavLink>}
            
        </li>  
            </ul>  
    
            </nav>
            </>

  )
}

export default Navbar