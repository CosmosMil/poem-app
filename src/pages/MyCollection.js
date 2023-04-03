import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, collection, getDocs } from 'firebase/firestore';



function MyCollection() {
  const { user } = useContext(AuthContext);
  const [favPoem, setFavPoem] = useState([]);

  console.log('authUser in MyCollection:', user);

  useEffect(() => {
    const fetchFavPoems = async () => {
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        const favPoemsRef = collection(userRef, 'favPoems');

        console.log('authUser.uid:', user.uid);
        console.log('userRef:', userRef);
        console.log('favPoemsRef:', favPoemsRef);
      

        const querySnapshot = await getDocs(favPoemsRef);
        const poems = [];
        querySnapshot.forEach((doc) => {
          poems.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, " => ", doc.data());
        });
        setFavPoem(poems);
      }
  };
  
  fetchFavPoems();
}, [user]);

  


  
  
return (
  <>
    <h1 className='text-3xl text-center font-bold p-10 text-lime-400'>my collection</h1>
    
    {favPoem.map((poem) => (
          <div className='text-center p-10'>
    <div className='bg-lime-400 inline-block p-10 rounded'>
          <div key={poem.title}>
            <div className='p-5 border-2 border-gray-700 border-dotted rounded'>
          <h2 className='text-xl text-gray-500'>{poem.title} by {poem.author}</h2><br/>
          {poem.lines.map((line, index) => (
            <p key={index} className='text-gray-500'>{line}<br /></p>
            
          ))}
              </div>
          </div>
          </div>
      </div>
        
        ))}
      
  
  </>
);
}

export default MyCollection