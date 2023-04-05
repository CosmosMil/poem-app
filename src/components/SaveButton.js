import React from "react";
import { useState } from "react";

function SaveButton({ clickEvent }) {
  const [localState, setLocalState] = useState(false);
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
