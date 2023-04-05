import React from "react";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase";
import SaveButton from "./SaveButton";

function Search() {
  const { user } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [searchResults, setSearchResults] = useState([]);
  const [poem, setPoem] = useState([]);
  const [error, setError] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearch = async () => {
    const response = await fetch(
      `https://poetrydb.org/${searchType}/${searchInput}`
    );
    const result = await response.json();
    console.log("fetch result: ", result);
    setSearchResults(result);
    setPoem(result[0]);
  };

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
        search for poems
      </h1>

      <div className="flex justify-center space-x-3 p-10">
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          className="bg-transparent border-2 border-lime-400 rounded"
        />
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="bg-transparent border-2 border-lime-400 rounded"
        >
          <option value="title">title</option>
          <option value="author">author</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-transparent border-2 border-lime-400 rounded"
        >
          search
        </button>
      </div>

      {searchResults.map((result, index) => (
        <div className="text-center p-10">
          <div className="bg-lime-400 inline-block p-3 rounded w-2/5">
            <div className="flex justify-end m-6">
              <SaveButton clickEvent={clickEvent} />
              {/* <button
                onClick={clickEvent}
                className="  bg-gray-500 text-lime-400 rounded h-8 w-28"
              >
                {buttonClick ? "saved" : "save poem"}
              </button> */}
            </div>
            <div
              key={index}
              className="p-5 border-2 border-gray-700 border-dotted rounded"
            >
              <h2 className="text-xl text-gray-500 font-semibold">
                {poem.title}
              </h2>
              <br />
              <h3 className="text-xl text-gray-500">by {poem.author}</h3>
              <br />
              <br />

              <p className="text-gray-500">
                {result.lines.map((line, index) => (
                  <React.Fragment key={index}>
                    {line} <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Search;
