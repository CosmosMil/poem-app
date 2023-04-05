import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, collection, getDocs } from "firebase/firestore";
import ShowButton from "../components/ShowButton";

function MyCollection() {
  const { user } = useContext(AuthContext);
  const [favPoem, setFavPoem] = useState([]);
  const [showPoem, setShowPoem] = useState(false);

  // console.log('authUser in MyCollection:', user);

  useEffect(() => {
    const fetchFavPoems = async () => {
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        const favPoemsRef = collection(userRef, "favPoems");

        // console.log('authUser.uid:', user.uid);
        // console.log('userRef:', userRef);
        // console.log('favPoemsRef:', favPoemsRef);

        const querySnapshot = await getDocs(favPoemsRef);
        const poems = [];
        querySnapshot.forEach((doc) => {
          poems.push({ id: doc.id, ...doc.data() });
          // console.log(doc.id, doc.data());
        });
        setFavPoem(poems);
      }
    };

    fetchFavPoems();
  }, [user]);

  console.log(showPoem);

  return (
    <>
      <h1 className="text-3xl text-center font-bold p-10 text-lime-400">
        my collection
      </h1>
      {favPoem.map((poem) => (
        <div className="text-center p-10" key={poem.title}>
          <div className="bg-lime-400 inline-block p-3 rounded w-2/5">
            <div className="flex justify-end m-6">
              <ShowButton
                poem={poem}
                showPoem={showPoem}
                setShowPoem={setShowPoem}
              />

              {/* {isOpen ? (
                <button
                  onClick={() => {
                    setShowPoem(poem.title);
                    setIsOpen(!isOpen);
                  }}
                  className="bg-gray-500 text-lime-400 rounded h-8 w-28"
                >
                  open
                </button>
              ) : (
                <button
                    onClick={() => {
                      setShowPoem(false);
                      setIsOpen(!isOpen);
                    }}
                  className="bg-gray-500 text-lime-400 rounded h-8 w-28"
                >
                  close
            </button>
            
              )} */}
            </div>

            <div className="p-5 border-2 border-gray-700 border-dotted rounded">
              <h2 className="text-xl text-gray-500 font-semibold">
                {poem.title}
              </h2>
              <br />
              <h3 className="text-xl text-gray-500">by {poem.author}</h3>
              <br />
              {showPoem === poem.title && (
                <div className="text-center p-10">
                  <p className="text-gray-500">
                    {poem.lines &&
                      poem.lines.map((line, index) => (
                        <React.Fragment key={index}>
                          {line} <br />
                        </React.Fragment>
                      ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MyCollection;
