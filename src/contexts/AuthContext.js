import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { auth } from "../firebase";


export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    
    const [user, setUser] = useState(null);

    const logIn = (email, password) => {
        const newUser = {
            email: email,
            password: password
        }
        setUser(newUser);
        console.log('user logged in')
        console.log(user)
    }

    const logOut = () => {
        setUser(null);
        console.log('user logged out')
    }


    console.log('current user: ', user);

     useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }

        });
        return () => {
            listen()
        }
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, logIn, logOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}

