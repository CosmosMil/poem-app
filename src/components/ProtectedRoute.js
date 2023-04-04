import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function ProtectedRoute(props) {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        props.children
      ) : (
        <div className="grid min-h-screen justify-center">
          <div className="mx-auto p-10">
            <h1 className="text-3xl text-center font-bold p-10 text-lime-400">
              this page is restricted
            </h1>{" "}
          </div>
        </div>
      )}
    </>
  );
}

export default ProtectedRoute;
