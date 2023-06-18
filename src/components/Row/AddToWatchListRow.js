import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import PopUp from "../../utils/PopUpMessage/PopUp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "../../api/axios";
import styled from "styled-components";
import LoginPage from "../../pages/RegisterPage/LoginPage";
import { IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useMediaQuery } from "react-responsive";
import CloseIcon from "@material-ui/icons/Close";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const AddToWatchListRow = () => {
  const { id, category } = useParams();
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const [message, setMessage] = useState("");
  const [movie, setMovies] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [isShownLogin, setIsShownLogin] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const authUser = firebase.auth().currentUser;
    if (authUser) {
      const savedMoviesRef = firebase.firestore().collection("savedMovies");
      const movieRef = savedMoviesRef.doc(`${authUser.uid}-${id}`);
      movieRef.get().then((doc) => {
        const isMovieSaved = doc.exists;
        setIsAddedToFav(isMovieSaved);
      });
    }
  }, [id]);

  const handleSave = () => {
    if (!authUser) {
      console.error("User not authenticated.");
      return;
    }

    const savedMoviesRef = firebase.firestore().collection("savedMovies");
    const endpoint = category === "movie" ? "movie" : "tv";
    axios
      .get(`https://api.themoviedb.org/3/${endpoint}/${id}?api_key=${API_KEY}`)
      .then((response) => {
        const mediaData = response.data;
        savedMoviesRef
          .doc(`${authUser.uid}-${id}`)
          .set({
            user_id: authUser.uid,
            media_id: mediaData.id,
            mediaType: category,
            title: mediaData.title || mediaData.name,
            overview: mediaData.overview,
            poster_path: mediaData.poster_path,
            release_date: mediaData.release_date || mediaData.first_air_date,
          })
          .then(() => {
            setIsAddedToFav(true);
            setMessage(
              `${mediaData.title} has been added to your saved ${category}s.`
            );
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      });
  };

  const handleRemove = () => {
    const savedMoviesRef = firebase.firestore().collection("savedMovies");
    const query = savedMoviesRef
      .where("user_id", "==", authUser.uid)
      .where("media_id", "==", parseInt(id))
      .where("mediaType", "==", category);
    query
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            doc.ref
              .delete()
              .then(() => {
                setIsAddedToFav(false);
                setMessage(
                  `This ${category} has been removed from your saved ${category}s.`
                );
              })
              .catch((error) => {
                console.error("Error removing document: ", error);
              });
          });
        }
      })
      .catch((error) => {
        console.error("Error checking document: ", error);
      });
  };

  useEffect(() => {
    const savedMoviesRef = firebase.firestore().collection("savedMovies");
    savedMoviesRef.onSnapshot((snapshot) => {
      const movies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(movies);
    });
  }, []);

  function handleOpen() {
    setIsShown(true);
  }

  function handleClose() {
    setIsShown(false);
  }

  function handleOpenLogin() {
    setIsShownLogin(true);
  }

  function handleCloseLogin() {
    setIsShownLogin(false);
  }

  return (
    <Wrapper>
      {isMobile ? (
        authUser ? (
          <>
            {!isAddedToFav && (
              <AddFavButton
                className="favourite-button"
                onClick={handleSave}
                title="Add to Favourite"
              >
                + Add to Favourite
              </AddFavButton>
            )}
            {isAddedToFav && (
              <RemoveFavButton
                className="unfavourite-button"
                onClick={handleRemove}
                title="Remove from Favourite"
              >
                - Remove from Favourite
              </RemoveFavButton>
            )}
            {message && <PopUp message={message} />}
          </>
        ) : (
          <>
            {!isAddedToFav && (
              <AddFavButton
                className="favourite-button"
                onClick={handleOpen}
                title="Add to Favourite"
              />
            )}
            {isShown && (
              <>
                <MessagePopup>
                  <Container>
                    <h3>Hmmm... you not logged in yet</h3>
                    <Message>Please log in to access this page</Message>
                    <Button>
                      <NoButton onClick={handleClose}>No, thanks</NoButton>
                      <YesButton onClick={handleOpenLogin}>Yes</YesButton>
                    </Button>
                  </Container>
                </MessagePopup>
                {isShownLogin && (
                  <LoginContainer>
                    <CloseButton onClick={handleCloseLogin}>
                      <CloseIcon />
                    </CloseButton>
                    <LoginPage />
                  </LoginContainer>
                )}
              </>
            )}
          </>
        )
      ) : authUser ? (
        <>
          {!isAddedToFav && (
            <AddFavButton
              className="favourite-button"
              onClick={handleSave}
              title="Add to Favourite"
            >
              + Add to Favourite
            </AddFavButton>
          )}
          {isAddedToFav && (
            <RemoveFavButton
              className="unfavourite-button"
              onClick={handleRemove}
              title="Remove from Favourite"
            >
              - Remove from Favourite
            </RemoveFavButton>
          )}
          {message && <PopUp message={message} />}
        </>
      ) : (
        <>
          {!isAddedToFav && (
            <AddFavButton
              className="favourite-button"
              onClick={handleOpen}
              title="Add to Favourite"
            />
          )}
          {isShown && (
            <>
              <MessagePopup>
                <Container>
                  <h3>Hmmm... you not logged in yet</h3>
                  <Message>Please log in to access this page</Message>
                  <Button>
                    <NoButton onClick={handleClose}>No, thanks</NoButton>
                    <YesButton onClick={handleOpenLogin}>Yes</YesButton>
                  </Button>
                </Container>
              </MessagePopup>
              {isShownLogin && (
                <LoginContainer>
                  <IconButton
                    className="btn"
                    style={{ float: "right" }}
                    onClick={handleCloseLogin}
                  >
                    <HighlightOffIcon
                      style={{ fontSize: "50px", color: "#d9534f" }}
                    />
                  </IconButton>
                  <LoginPage />
                </LoginContainer>
              )}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default AddToWatchListRow;

const Container = styled.div`
  position: fixed;
  color: #fff;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border: 2px solid #fff;

  @media (max-width: 768px) {
    margin-left: 50px;
  }
`;

const Message = styled.span`
  font-size: 18px;
  font-weight: 400;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  margin-top: 20px;

  &:hover {
    color: #ff69b4;
  }
`;

const YesButton = styled.span`
  padding: 10px 35px 10px 35px;
  margin-left: 20px;
  cursor: pointer;
  background-color: #4267b2;
  font-size: 15px;
  color: #fff;

  &:hover {
    color: #c0c0c0;
  }
`;

const NoButton = styled.span`
  padding: 10px 25px 10px 25px;
  margin-left: 20px;
  cursor: pointer;
  background-color: #fff;
  color: #000;

  &:hover {
    color: #ff69b4;
  }
`;

const MessagePopup = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-left: 70px;
    max-width: 300px;
  }
`;

const Wrapper = styled.div`
  .favourite-button {
    width: 30px;
    height: auto;
    cursor: pointer;
    box-sizing: content-box;
    margin-top: 10px;

    &:hover {
      background-color: rgba(97, 97, 97, 0.5);
      padding: 5px;
    }
  }

  .unfavourite-button {
    width: 30px;
    height: auto;
    cursor: pointer;
    box-sizing: content-box;
    margin-top: 10px;
    color: palevioletred;

    &:hover {
      background-color: rgba(97, 97, 97, 0.5);
      padding: 5px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  color: #fff;

  &:hover {
    color: #ff69b4;
  }
`;

const AddFavButton = styled.span`
  font-size: 10px;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #333;
  }
`;

const RemoveFavButton = styled.span`
  font-size: 10px;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #cc0000;
  }
`;
