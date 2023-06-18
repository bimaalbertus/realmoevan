import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { storage } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AnimatePresence, motion } from "framer-motion";

function NavbarAccount() {
  const { history } = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUser({ ...user, username: doc.data().username });
            } else {
              setUser(user);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/register");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
  );
  const [authUser, setAuthUser] = useState(null);
  const firestore = getFirestore();
  const storageRef = ref(storage);

  useEffect(() => {
    if (!authUser) return; // Jika pengguna belum masuk, hentikan efek samping

    const userRef = doc(firestore, "users", authUser.uid);

    async function getProfileImage() {
      const docSnap = await getDoc(userRef);
      const data = docSnap.data();
      if (data.profileImageURL) {
        setProfileImageURL(data.profileImageURL);
      }
    }

    getProfileImage();
  }, [authUser, firestore, storageRef]);

  onAuthStateChanged(getAuth(), (user) => {
    setAuthUser(user);
  });

  async function handleProfileImageUpload() {
    if (!authUser) {
      alert("You're not login yet!!");
      return;
    }
    const imageRef = ref(storage, `profile-images/${authUser.uid}`);
    await uploadBytes(imageRef, profileImage);

    const userRef = doc(firestore, "users", authUser.uid);
    await updateDoc(userRef, {
      profileImageURL: await getDownloadURL(imageRef),
    });
    setProfileImageURL(await getDownloadURL(imageRef));
    setProfileImage(null);
  }

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  const showAnimation = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      height: "300px",
      width: "300px",
      scale: 1.05,
      transition: {
        duration: 0.5,
        type: "spring",
        bounce: 0.5,
      },
    },
  };

  return (
    <Container>
      {user ? (
        <Profile>
          <UserImg src={user.photoURL || profileImageURL} alt="Profile" />
          <ArrowContainer onClick={handleOpen} isOpen={isOpen}>
            <SeasonArrow
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 512.02 319.26"
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path d="M5.9 48.96 48.97 5.89c7.86-7.86 20.73-7.84 28.56 0l178.48 178.48L434.5 5.89c7.86-7.86 20.74-7.82 28.56 0l43.07 43.07c7.83 7.84 7.83 20.72 0 28.56l-192.41 192.4-.36.37-43.07 43.07c-7.83 7.82-20.7 7.86-28.56 0l-43.07-43.07-.36-.37L5.9 77.52c-7.87-7.86-7.87-20.7 0-28.56z" />
            </SeasonArrow>
          </ArrowContainer>
          {isOpen && (
            <AnimatePresence>
              <DropDown
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                <UserName>{user.username || user.displayName}</UserName>
                <DropDownMenu to="/saved" onClick={() => setIsOpen(false)}>
                  <span>Favourite</span>
                </DropDownMenu>
                <DropDownMenu to="/user" onClick={() => setIsOpen(false)}>
                  <span>My Account</span>
                </DropDownMenu>
                <LogOut onClick={handleSignOut}>
                  <LogOutImage
                    src="https://cdn-icons-png.flaticon.com/512/2529/2529508.png"
                    alt="Play Button"
                  />
                  <span>LogOut</span>
                </LogOut>
              </DropDown>
            </AnimatePresence>
          )}
        </Profile>
      ) : (
        <Link to="/login">
          <SignIn>Login</SignIn>
        </Link>
      )}
    </Container>
  );
}

export default NavbarAccount;

const Container = styled.div`
  position: relative;
  top: -50px;
  display: flex;
  justify-content: flex-end;
  z-index: 3;
`;

const SignIn = styled.a`
  background: #4f80e0;
  padding: 8px 16px;
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  position: relative;
  right: 40px;
  letter-spacing: 1.5px;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  text-decoration: none !important;

  &:hover {
    background: #none;
    color: #afafb0;
    border-color: transparent;
  }
`;

const DropDownMenu = styled(Link)`
  cursor: pointer;
  color: #fff;
  transition: all 0.2s ease 0s;
  padding: 5px;
  margin: 5px;
  background-color: #2885e1;

  &:hover {
    background-color: #032541;
  }
`;

const UserName = styled.div`
  color: #fff;
  padding: 5px;
  margin: 5px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const LogOut = styled.span`
  cursor: pointer;
  color: #fff;
  transition: all 0.2s ease 0s;
  padding: 5px;
  margin: 5px;
  background-color: #df2e38;

  &:hover {
    background-color: #eb455f;
  }

  span {
    font-size: 20px;
    position: relative;
    bottom: 7px;
  }
`;

const UserImg = styled.img`
  height: 100%;
  cursor: pointer;
  border-radius: 50%;
  object-fit: cover;
`;

const DropDown = styled(motion.div)`
  position: absolute;
  top: 70px;
  right: 0px;
  color: #afafb0;
  border: 4px solid #3f51b5;
  border-radius: 4px;
  padding: 10px;
  font-size: 17px;
  font-weight: 300;
  letter-spacing: 0px;
  width: 200px;
  display: flex;
  flex-direction: column;
  transition: none;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  &:hover {
    transition: none;
  }
`;

const Profile = styled.div`
  position: relative;
  right: 30px;
  top: -5px;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    width: 100%;
    height: 100%;
  }
`;

const LogOutImage = styled.img`
  width: 30px;
  margin-right: 10px;
  filter: invert(100%);
`;

const ArrowContainer = styled.div`
  margin: 8px 0;
  padding: 4px 12px;
`;

const SeasonArrow = styled.svg`
  display: flex;
  background-color: #252525;
  padding: 5px;
  box-sizing: content-box;
  border-radius: 50%;
  border: 4px solid #fff;
  width: 20px;
  height: 20px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  fill: #fff;

  &:hover {
    border: 4px solid #252525;
    background-color: #c0c0c0;
    fill: #252525;
  }
`;
