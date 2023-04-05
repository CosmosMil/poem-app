import React from "react";

function ShowButton({ poem, showPoem, setShowPoem }) {
  const toggleButton = () => {
    if (showPoem !== poem.title) {
      setShowPoem(poem.title);
    } else {
      setShowPoem(false);
    }
  };

  return (
    <button
      onClick={toggleButton}
      className="bg-gray-500 text-lime-400 rounded h-8 w-28"
    >
      {showPoem === poem.title ? "close" : "open"}
    </button>
  );
}

export default ShowButton;
