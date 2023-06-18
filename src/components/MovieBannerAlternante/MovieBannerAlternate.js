import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import axios from "../../api/axios.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import "./MovieBanner.css";
import LoadingPage from "../../utils/LoadingPage/LoadingPage";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton } from "@material-ui/core";
import db from "../../firebase.js";
import { selectUserEmail } from "../../features/user/userSlice.js";
import { useSelector } from "react-redux";
import firebase from "../../firebase.js";
import CastList from "./CastList.js";
import Page from "../page";
import Director from "./Director.js";
import MovieVideos from "../MovieVideos/MovieVideos.js";
import { AiFillHeart } from "react-icons/ai";
import PopUp from "../../utils/PopUpMessage/PopUp.js";
import AddToFavorites from "../SavedMovies/AddtoFavourite.js";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

function Moviebanner({ match }, props) {
  const [movie, setMovie] = useState({
    genres: [],
  });
  const [title, setTitle] = useState("");
  const { id, category } = useParams();

  const isMovie = !movie.first_air_date;
  const opts = {
    height: "600",
    width: "110%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      play: true,
    },
  };

  useEffect(() => {
    if (category === "movie") {
      getData();
    } else {
      getDataShow();
    }
    window.scrollTo(0, 0);
  }, [category]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const title = data.title ? data.title : data.name;
        setTitle(title);
        setMovie(data);
      });
  };

  const getDataShow = () => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const title = data.title ? data.title : data.name;
        setTitle(title);
        setMovie(data);
      });
  };

  const [getVideo, setGetVideo] = useState({});
  useEffect(() => {
    async function fetchTrailer(category) {
      const endpoint = category === "movie" ? "movie" : "tv";
      const response = await fetch(
        `https://api.themoviedb.org/3/${endpoint}/${id}/videos?api_key=8260a7b490f140fde24b8a24b034994a`
      );
      const data = await response.json();

      const trailer = data.results.find((video) => video.type === "Trailer");

      setGetVideo(trailer);
    }
    fetchTrailer(category);
  }, [match]);

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}hr ${minutes}mins`;
  }

  const dateFormatter = function (date) {
    let currdate = date;
    const newDate = currdate.slice(0, 4);
    return newDate;
  };

  const googleClick = () => {
    const googleSearchUrl = `https://www.google.com/search?q=${
      movie.title || movie.name
    } (${dateFormatter(movie.release_date || movie.first_air_date)})`;
    window.open(googleSearchUrl, "_blank");
  };

  const [showTrailer, setShowTrailer] = useState(false);

  const handleShowTrailer = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    const isMovieSaved = savedMovies.some((movie) => movie.id === parseInt(id));
    setIsSaved(isMovieSaved);
  }, [id]);

  const handleSave = () => {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    const movieToAdd = { id: movie.id, title: movie.title };
    savedMovies.push(movieToAdd);
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
    setIsSaved(true);
    setMessage(
      `${movie.title || movie.name} has been added to your saved movies.`
    );
  };

  const handleRemove = () => {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    const updatedMovies = savedMovies.filter(
      (movie) => movie.id !== parseInt(id)
    );
    localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
    setIsSaved(false);
    setMessage(
      `${movie.title || movie.name} has been removed from your saved movies.`
    );
  };

  if (!movie) {
    return <LoadingPage />;
  }

  return (
    <Page title={`${title}`}>
      <div className="movie-detail">
        <div
          className="movie-detail-cover"
          style={{
            backgroundImage: `linear-gradient(to top, #032541 0%, transparent 100%), url(http://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
            backgroundSize: "cover",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <div className="detail">
            <span className="title">{movie.title || movie.name}</span>
            <span className="original-title">
              {movie.title === movie.original_title ? "" : movie.original_title}
            </span>
            <div className="line"></div>
            <span className="genres-container">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre">
                  {genre.name}
                </span>
              ))}
            </span>
            <div className="subtitle">
              {isMovie ? (
                <>
                  <span className="release_date">
                    Release Date: {movie.release_date}
                  </span>
                  <span className="duration">
                    {formatDuration(movie.runtime || movie.episode_run_time)}
                  </span>
                </>
              ) : (
                <>
                  <span className="release_date">
                    First Air Date: {movie.first_air_date}
                  </span>
                  <span className="duration">
                    {movie.episode_run_time + " mins"}
                  </span>
                </>
              )}
              <span className="google-btn" onClick={googleClick}>
                Google It!
              </span>
              <AddToFavorites movie={movie} />
            </div>
            <Controls>
              {isMovie ? (
                <Link to={`/movie/${movie.id}-${slugify(movie.title)}/watch`}>
                  {/* <Link to={`/movie/${movie.id}/watch`}> */}
                  <Player>
                    <img src="/images/play-icon-black.png" alt=" " />
                    <span>Play Film</span>
                  </Player>
                </Link>
              ) : (
                <Link to={`/show/${movie.id}-${slugify(movie.name)}/watch`}>
                  {/* <Link to={`/show/${movie.id}/watch`}> */}
                  <Player>
                    <img src="/images/play-icon-black.png" alt=" " />
                    <span>Play TV Show</span>
                  </Player>
                </Link>
              )}
              <div>
                <Trailer onClick={handleShowTrailer}>
                  <img src="/images/play-icon-white.png" alt=" " />
                  <span>Trailer</span>
                </Trailer>
              </div>
            </Controls>
            <p className="overview">{movie.overview}</p>
          </div>
        </div>
        {showTrailer && (
          <div className="video_popup">
            <div className="video_wrapper">
              <IconButton
                className="btn"
                style={{ float: "right" }}
                onClick={handleCloseTrailer}
              >
                <HighlightOffIcon
                  style={{ fontSize: "50px", color: "#d9534f" }}
                />
              </IconButton>
              <iframe
                src={`https://www.youtube.com/embed/${getVideo.key}`}
                title={movie.name}
                allowFullScreen
                allow="autoplay"
              />
            </div>
          </div>
        )}
        <MovieRatingRounded>
          <CircularProgressbar
            className="circuralBar"
            minValue={0}
            maxValue={100}
            value={movie.vote_average * 10} // kali 10 karena skala nilai pada API TMDb adalah 0 hingga 10
            text={
              movie.vote_average === 0
                ? "0%"
                : `${Math.round(movie.vote_average * 10)}%`
            }
            styles={buildStyles({
              strokeLinecap: "round",
              textSize: "25px",
              pathColor: "#21D07A",
              textColor: "white",
              trailColor: "#204529",
              style: {
                zIndex: -1,
              },
            })}
          />
        </MovieRatingRounded>
        <UtilsComponents>
          <MovieVideos id={id} category={category} />
          <Director id={id} category={category} />
          <CastList id={id} category={category} />
        </UtilsComponents>
      </div>
      <div className="movie__heading">
        <h1>Production Companies</h1>
      </div>
      <div className="movie__production">
        {movie &&
          movie.production_companies &&
          movie.production_companies.map((company) => (
            <>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    className="movie__productionComapany"
                    src={"https://image.tmdb.org/t/p/w500" + company.logo_path}
                  />
                </span>
              )}
            </>
          ))}
      </div>
    </Page>
  );
}

const TrailerVideo = styled.div`
  justify-content: center;
  align-items: center;
  margin-left: 16px;

  @media (max-width: 1080px) {
    margin-right: 10px;
  }
`;

const UtilsComponents = styled.div`
  z-index: -1;
`;

const MovieRatingRounded = styled.div`
  position: absolute;
  z-index: 0;
  top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  align-items: center;
  margin-left: 20px;

  .circuralBar {
    width: 70px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 40px;
    height: 70px;
    text-anchor: middle;
    dominant-baseline: middle;
    -webkit-border-radius: 40px;
    -moz-border-radius: 40px;
    -ms-border-radius: 40px;
    -o-border-radius: 40px;
  }
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb (249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  img {
    width: 32px;
  }
  &:hover {
    background: rgb(198, 198, 198);
  }
  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;
    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const Poster = styled.div`
  width: 160px;
  margin-bottom: 25px;
  position: relative;
  border-radius: 10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  box-shadow: rgba(0, 0, 0, 0.86) 0px 12px 24px 6px;

  img {
    position: relative;
    display: block;
    width: 100%;
    transition: opacity 500ms ease-in-out 0s;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 100px;
  }

  @media (max-width: 1080px) {
    width: 120px;
  }
`;

const MovieGenre = styled.div`
  padding: 0.5rem;
  border-radius: 20px;
  justify-content: left;
  position: relative;

  span {
    padding: 0.5rem;
    border: 2px solid #21d07a;
    border-radius: 20px;
    margin-right: 15px;
  }
`;

export default Moviebanner;
