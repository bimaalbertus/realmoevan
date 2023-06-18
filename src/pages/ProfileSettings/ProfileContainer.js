import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import ProfileSettings from "./ProfileSettings";
import LoginPopUp from "../../utils/PopUpMessage/LoginPopUp";

export default function ProfileContainer() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {authUser ? (
        <ProfileSettings />
      ) : (
        <>
          <ProfileSettings />
          <LoginPopUp />
        </>
      )}
    </div>
  );
}
