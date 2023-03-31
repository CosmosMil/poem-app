import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function MyCollection({poem}) {
  const { user } = useContext(AuthContext);
  const [favPoem, setFavPoem] = useState([]);
  
  
  return (
    <>
      <h1 className='text-3xl text-center font-bold p-10 text-lime-400'>my collection</h1>
       {favPoem.map((poem) => (
        <div key={poem.id}>
          <h2>{poem.title} by {poem.author}</h2>
          {poem.lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      ))}
  
    </>
  )
}

export default MyCollection