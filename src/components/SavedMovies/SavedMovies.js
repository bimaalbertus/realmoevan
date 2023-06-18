import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import firebase from "firebase/compat/app";
import { Link } from "react-router-dom";
import PopUp from "../../utils/PopUpMessage/PopUp";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function SavedMovie() {
  const [watchlist, setWatchlist] = useState([]);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const [message, setMessage] = useState("");
  const [isDetailHovered, setIsDetailHovered] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const trashRef = useRef([]);

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authUser) {
      db.collection("savedMovies")
        .where("user_id", "==", authUser.uid)
        .onSnapshot((querySnapshot) => {
          const movies = [];
          querySnapshot.forEach((doc) => {
            movies.push({ id: doc.id, ...doc.data() });
          });
          setWatchlist(movies);
        });
    }
  }, [authUser]);

  const handleRemove = (movieId) => {
    const savedMoviesRef = firebase.firestore().collection("savedMovies");
    savedMoviesRef
      .doc(movieId)
      .delete()
      .then(() => {
        setIsAddedToFav(false);
        setMessage(`This movie has been removed from your saved movies.`);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <MovieRow>
      {watchlist.length === 0 ? (
        <EmptyMessage>
          <EmptyMessageImage
            src="/images/empty-save-vector.png"
            alt="empty watchlist"
          />
          <h1>You haven't saved any movies/shows here.</h1>
          <FindButton to="/">Find and save them here</FindButton>
        </EmptyMessage>
      ) : (
        <Container>
          {watchlist.map((movie, index) => (
            <Wrap key={movie.id}>
              <Link
                to={`/${movie.mediaType}/${movie.media_id}-${slugify(
                  movie.title?.toLowerCase()
                )}`}
              >
                <Image
                  className="image"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "./assets/images/default.jpg";
                  }}
                  loading="lazy"
                  alt=" "
                />
              </Link>
              <Detail>
                <Link
                  to={`/${movie.mediaType}/${movie.media_id}-${slugify(
                    movie.title?.toLowerCase()
                  )}`}
                >
                  <Wrapper>
                    <Title>
                      <h2>{movie.title || movie.name}</h2>
                      <span>({movie.release_date?.substring(0, 4)})</span>
                    </Title>
                  </Wrapper>
                  <OverView>
                    <p>{movie.overview}</p>
                  </OverView>
                </Link>
              </Detail>
              <RemoveContainer>
                <IconButtonStyled onClick={(e) => handleRemove(movie.id)}>
                  <DeleteIcon style={{ fontSize: "30px", color: "#c0c0c0" }} />
                  <PopTextStyled ref={(el) => (trashRef.current[index] = el)}>
                    <span>Delete</span>
                  </PopTextStyled>
                </IconButtonStyled>
              </RemoveContainer>
            </Wrap>
          ))}
          {message && <PopUp message={message} />}
        </Container>
      )}
    </MovieRow>
  );
}

const Wrap = styled.div`
  position: relative;
  border: 2px solid transparent;
  width: (100% - 50px);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  margin: 50px;
  cursor: pointer;

  &:hover {
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Detail = styled.div`
  display: flex;
  margin-left: 20px;
  flex-direction: column;
  gap: 20px;
  width: 200px;

  @media (min-width: 800px) {
    width: 600px;
    font-size: 14px;
  }

  @media (min-width: 950px) {
    width: 800px;
  }

  @media (min-width: 1275px) {
    width: 900px;
    font-size: 20px;
  }

  @media (min-width: 1920px) {
    width: 1600px;
    font-size: 26px;
    line-height: 36px;
  }

  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  overflow: hidden;

  h2 {
    font-size: 1.2em;
    line-height: 1.2em;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  span {
    white-space: nowrap;
    color: #999;
  }
`;
const OverView = styled.div`
  display: block;
  height: auto;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
  }
`;

const MovieRow = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
`;

const Container = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  margin-left: 50px;

  .detail-wrapper {
    width: 100%;
    margin-top: 10px;
  }

  .movie-title {
    text-transform: capitalize;
    font-size: 15px;
    position: relative;
    flex: 1;
    top: 10px;
  }

  .release-date {
    text-transform: capitalize;
    font-size: 12px;
    margin-top: 15px;
    color: gray;
  }
  .detail-container {
    color: gray;
    display: flex;
    align-items: flex-start;
    justify-content: left;

    .vote-average {
      text-transform: capitalize;
      font-size: 12px;
      margin-top: 15px;
    }

    img {
      margin-top: 18px;
      margin-right: 3px;
      margin-left: 4px;
      width: 10px;
      height: 10px;
    }
  }

  .category {
    text-transform: capitalize;
    font-size: 12px;
    margin-top: 14px;
    margin-left: 4px;
    border: 1px solid gray;
    padding: 0px 4px;
    display: inline-block;
    border-radius: 0px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Image = styled.img`
  backface-visibility: hidden;
  position: relative;
  display: block;
  width: 200px;
  height: 100%;
  object-fit: contain;
  transition: transform 100ms 0s;
  transition: 0.5s ease;

  @media (max-width: 768px) {
    border-radius: 0px;
    padding-right: 6px;
    object-fit: contain;
  }
`;

const RemoveContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 0px;
  z-index: 3;
  transition: transform 100ms 0s;
  transition: 0.5s ease;

  &:hover {
    border-radius: 0px;
  }
`;

const RemoveIcon = styled(AiFillHeart)`
  width: 40px;
  height: 40px;
  color: #ff69b4;
`;

const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const EmptyMessageImage = styled.img`
  width: 1000px;
  height: 550px;
  margin-bottom: 20px;
`;

const FindButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 50px;
  background-color: #cce6ff;
  font-size: 20px;
  border-radius: 100px;
  color: #11274c;
  border: 3px solid #f40efb;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #cce6ff;
    color: #11274c;
    border: 3px solid #f40efb;
    opacity: 0.8;
  }
`;

const PopTextStyled = styled.div`
  position: absolute;
  text-align: center;
  min-width: max-content;
  right: 5px;
  z-index: 1;
  bottom: 40px;
  display: block;
  padding: 8px 12px !important;
  font-size: 10px !important;
  visibility: hidden;
  font-weight: 500;
  line-height: 16px;
  background: red;
  color: #fff;
  transition: 0.2s ease-in-out;

  border-radius: 10px;
  border-width: 1px;
  text-align: center;

  span {
    font-size: 15px;
    font-weight: 900;
  }
`;

const IconButtonStyled = styled(IconButton)`
  &:hover {
    ${PopTextStyled} {
      opacity: 1;
      visibility: visible;
      bottom: 60px;
    }
  }
`;
