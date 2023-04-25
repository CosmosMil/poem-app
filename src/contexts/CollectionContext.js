import { createContext, useContext, useEffect, useState } from "react";
import { collection, query, onSnapshot, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "./AuthContext";

export const CollectionContext = createContext();
export const CollectionContextProvider = (props) => {
  const [favPoems, setFavPoems] = useState([]);
  const { user } = useContext(AuthContext);

  const listenToCollection = async () => {
    const q = query(collection(db, `users/${user.uid}`, "favPoems"));
    
     const querySnapshot = await getDocs(q);
     const poems = [];
     querySnapshot.forEach((doc) => {
       poems.push({ id: doc.id, ...doc.data() });
       // console.log(doc.id, doc.data());
     });
    setFavPoems(poems);
    
    // const listen = onSnapshot(q, (querySnapshot) => {
    //   const activePoems = [];
    //   querySnapshot.forEach((doc) => {
    //     const data = doc.data();
    //     favPoems.push(data);
    //   });
    //   setFavPoems(activePoems);
    //   console.log(activePoems);
    // });
  };
  useEffect(() => {
    if (user) {
      listenToCollection();
    }
  }, [user]);

  return (

    <CollectionContext.Provider value={{ favPoems, setFavPoems }}>
      {props.children}
    </CollectionContext.Provider>
  );
};