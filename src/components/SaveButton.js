import { addDoc, collection, doc } from "firebase/firestore";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CollectionContext } from "../contexts/CollectionContext";
import { db } from "../firebase";

function SaveButton({ selectedPoem }) {
  const [isFav, setIsFav] = useState(false);
  const { user } = useContext(AuthContext);
  const { favPoems, setFavPoems } = useContext(CollectionContext);

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
      const newAddedPoem = {
        ...poemData,
        id: docRef.id,
      };
      setFavPoems((previous) => [...previous, newAddedPoem]);
    } catch (e) {
      console.error("error saving poem");
      //  setError(e.message);
    }
  }

  const checkDuplicates = () => {
    const result = favPoems.some((poem) => {
      return (
        poem.title === selectedPoem.title && poem.author === selectedPoem.author
      );
    });
    return result;
  };

  useEffect(() => {
    if (selectedPoem) {
      const isDoop = checkDuplicates();
      setIsFav(isDoop);
    }
  }, [selectedPoem]);
  return (
    <>
      {isFav ? (
        <button
          disabled
          className="  bg-gray-500 text-lime-400 rounded h-8 w-28"
        >
          saved
        </button>
      ) : (
        <button
          onClick={() => {
            setIsFav(true);
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
