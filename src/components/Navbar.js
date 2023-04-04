import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <nav className="bg-gray-700 flex gap-1">
        <ul className="flex flex-row space-x-4 p-4 mt-5">
          <li>
            <NavLink
              to="/"
              className="block py-2 pl-3 pr-4 text-gray-700 rounded dark:text-gray-300"
            >
              random poem
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className="block py-2 pl-3 pr-4 text-gray-700 rounded dark:text-gray-300"
            >
              search for poems
            </NavLink>
          </li>
          <li>
            {user && (
              <NavLink
                to="user/collection"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded dark:text-gray-300"
              >
                my collection
              </NavLink>
            )}
          </li>
          <li>
            {user ? (
              <button
                className="block py-2 pl-3 pr-4 text-gray-700 rounded dark:text-gray-300"
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      setUser(null);
                      console.log("sign out successful");
                    })
                    .catch((error) => console.log(error));
                }}
              >
                log out
              </button>
            ) : (
              <NavLink
                to="/user"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded dark:text-gray-300"
              >
                log in
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
