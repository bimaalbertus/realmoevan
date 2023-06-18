import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import SavedMovies from "./SavedMovies";
import LoginPopUp from "../../utils/PopUpMessage/LoginPopUp";

export default function SavedContainer() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div>
        {authUser ? (
          <SavedMovies />
        ) : (
          <>
            <SavedMovies />
            <LoginPopUp />
          </>
        )}
      </div>
    </>
  );
}
