import React, { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase";
import SaveButton from "../components/SaveButton";

function Home() {
  const { user } = useContext(AuthContext);
  const [poem, setPoem] = useState(null);
  const [error, setError] = useState("");
  const [buttonClick, setButtonClick] = useState(false);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const response = await fetch("https://poetrydb.org/random");
        
        const result = await response.json();
        console.log(result)
        if (result.reason) {
          setError("something went wrong");
        }
        setPoem(result[0]);
        console.log("test result", result);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    };
    fetchPoem();
  }, []);

  async function addPoemToCollection() {
    const userEmail = user.email;
    const userId = user.uid;

    const poemData = {
      title: poem.title,
      author: poem.author,
      lines: poem.lines,
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
      setError(e.message);
    }
  }
  console.log(error);
  const handleSavePoem = () => {
    setButtonClick(true);
  };

  const clickEvent = (setLocalState) => {
    addPoemToCollection();
    handleSavePoem();
    setLocalState(true);
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold p-10 text-lime-400">
        random poem
      </h1>
      <br />
      {error ? (
        <div className="text-center p-3 text-lime-400">
          {error.toLowerCase()}
        </div>
      ) : (
        <div className="text-center p-3">
          <div className="bg-lime-400 inline-block p-3 rounded w-2/3">
            <div className="flex justify-end m-6">
              <SaveButton clickEvent={clickEvent} />
              {/* <button
                onClick={clickEvent}
                className="  bg-gray-500 text-lime-400 rounded h-8 w-28"
              >
                {buttonClick ? "saved" : "save poem"}
              </button> */}
            </div>
            <div className="p-5 border-2 border-gray-700 border-dotted rounded">
              <h2 className="text-xl text-gray-500 font-semibold">
                {poem && poem.title}
              </h2>
              <br />
              <h3 className="text-xl text-gray-500">by {poem && poem.author}</h3>
              <br />

              <p className="text-gray-500">
                {poem && poem.lines &&
                  poem.lines.map((line, index) => (
                    <React.Fragment key={index}>
                      {line} <br />
                    </React.Fragment>
                  ))}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
