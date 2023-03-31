import React, { useEffect, useState } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from '../firebase';

function Home() {
    const [poem, setPoem] = useState([]);
     const { user } = useContext(AuthContext);


    useEffect(() => {
        const fetchPoem = async () => {
            const response = await fetch('https://poetrydb.org/random');
            const result = await response.json();
            setPoem(result[0]);
            console.log('test result' , result);
            

        }
        fetchPoem()
    },   [])


        const handleClick = () => {
        window.location.assign('/collection');

    }
  
    async function addPoemToCollection() {
   
        const userEmail = user.email;
        const userId = user.uid;

    const poemData = {
        title: poem.title,
        author: poem.author,
        poem: poem.lines,
      userId: userId,
      userEmail: userEmail,
    
    };
    try {
      const docRef = await addDoc(collection(db, "fav.poem"), poemData);
      console.log("poem added - test");
    } catch (e) {
      console.error('Error adding poem');
    }
  }



    return (

        <>
      
            <div className='grid grid-col-1 justify-center w-full'>
                <h1 className='text-3xl text-center font-bold p-3 text-lime-400'>random poem</h1>
          
            <div className='text-center p-3'>
                    <div className='bg-lime-400 inline-block p-5 rounded'>
                        <div className='flex justify-end m-6'><button onClick={addPoemToCollection} className='  bg-gray-500 text-lime-400 rounded h-8 w-28'>save poem</button></div>
              <h2 className='text-xl text-gray-500'>{poem.title} by {poem.author}</h2><br/>
              
              <p className='text-gray-500'>{poem.lines && 
                  poem.lines.map((line, index) => (
                  <React.Fragment key={index}>
                      {line} <br />
                      </React.Fragment>
              ))}</p>
            </div>
        </div>
            </div>
            </>
        
  )
}

export default Home