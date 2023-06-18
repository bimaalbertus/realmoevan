import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const firestore = getFirestore();

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        // user sedang login
        const userRef = doc(firestore, "users", userAuth.uid);
        const snapshot = await userRef.get();
        if (!snapshot.exists()) {
          await setDoc(userRef, { email: userAuth.email }); // membuat dokumen user baru di Firestore jika belum ada
        }
        setUser({
          uid: userAuth.uid,
          email: userAuth.email,
          profileImageURL: snapshot.data().profileImageURL,
        });
      } else {
        // user sedang logout
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user };
}

export { useAuth };
