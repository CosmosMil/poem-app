import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

function Home() {
    const [poem, setPoem] = useState([]);

    useEffect(() => {
        const fetchPoem = async () => {
            const response = await fetch('https://poetrydb.org/random');
            const result = await response.json();
            setPoem(result[0]);
            console.log(result)

        }
        fetchPoem()
    },   [])


    return (

        <>
      
        <div className='grid grid-col-1 justify-center w-full'>
            {/* <div className='w-screen'>
             <Navbar /></div> */}
            

              <h1 className='text-3xl text-center font-bold p-10 text-lime-400'>random poem</h1>
          
            <div className='text-center p-10'>
                <div className='bg-lime-400 inline-block p-10'>
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