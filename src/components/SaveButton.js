import { addDoc, collection, doc } from "firebase/firestore";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";


function SaveButton({ clickEvent, selectedPoem }) {
  const [localState, setLocalState] = useState(false);
  const { user } = useContext(AuthContext);

   async function addPoemToCollection() {
     const userEmail = user.email;
     const userId = user.uid;

     const poemData = {
       title: selectedPoem.title,
       author: selectedPoem.author,
       lines: selectedPoem.lines,
       userId: userId,
       userEmail: userEmail,
     };
     try {
       const userRef = doc(db, "users", userId);
       const favPoemsRef = collection(userRef, "favPoems");

       const docRef = await addDoc(favPoemsRef, poemData);
       console.log("poem added to collection", docRef.id);
     } catch (e) {
       console.error("error saving poem");
      //  setError(e.message);
     }
   }
  return (
    <>
      {localState ? (
        <button
          disabled
          className="  bg-gray-500 text-lime-400 rounded h-8 w-28"
        >
          saved
        </button>
      ) : (
        <button
          onClick={() => {
              clickEvent(setLocalState);
              addPoemToCollection();
          }}
          className="  bg-gray-500 text-lime-400 rounded h-8 w-28"
        >
          save poem
        </button>
      )}
    </>
  );
}

export default SaveButton;
