import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import MyCollection from "./pages/MyCollection";
import SearchPoem from "./pages/SearchPoem";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { CollectionContextProvider } from "./contexts/CollectionContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <CollectionContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route
              path="user/collection"
              element={
                <ProtectedRoute>
                  <MyCollection />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<SearchPoem />} />
          </Routes>
        </CollectionContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
