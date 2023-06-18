import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Detail.scss";
import CastList from "./CastList";
import styled from "styled-components";
import genreIcons from "../../assets/genres";
import CastListSlider from "./CastListSlider";
import { useMediaQuery } from "react-responsive";
import AddToFavorites from "../SavedMovies/AddtoFavourite.js";
import Page from "../page";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton } from "@material-ui/core";
import MediaTab from "./MediaTab";
import MovieScore from "./Score/MovieScore";
import CommentList from "../CommentSection/CommentList";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const Detail = ({ match }) => {
  const { category, id } = useParams();
  const [movie, setMovie] = useState({
    genres: [],
  });
  const isMobile = useMediaQuery({ maxWidth: 1280 });
  const [title, setTitle] = useState("");

  const isMovie = !movie.first_air_date;
  const [loadingImage, setLoadingImage] = useState(
    "/images/loading-poster.jpg"
  );

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

  const [showTrailer, setShowTrailer] = useState(false);

  const handleShowTrailer = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  function handleImageError() {
    setLoadingImage("/images/cant-found-the-image.jpg");
  }

  return (
    <Page title={`${title}`}>
      {movie && isMobile ? (
        <>
          <Background>
            <img
              src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="bg"
            />
          </Background>
          <Container>
            <div className="mb-3 movie-content container">
              <div className="movie-content__poster">
                <img
                  className="movie-content__poster__img"
                  src={`http://image.tmdb.org/t/p/original/${
                    movie.poster_path || movie.backdrop_path
                  }`}
                  onLoad={() => setLoadingImage("/images/loading-poster.jpg")}
                  onError={handleImageError}
                  alt=""
                />
                <Link to={`/${category}/${id}-${slugify(movie.title)}/watch`}>
                  <PlayButton>
                    <PlayImage
                      src="https://cdn-icons-png.flaticon.com/512/1179/1179120.png"
                      alt="Play Button"
                    />
                    <span>Play {`${category}`}</span>
                  </PlayButton>
                </Link>
              </div>
              <div className="movie-content__info">
                <FavouriteWrapper>
                  <h1 className="title">{movie.title || movie.name}</h1>
                  <div className="favourite">
                    <AddToFavorites movie={movie} />
                  </div>
                </FavouriteWrapper>
                <h2>{movie.tagline}</h2>
                <Genre>
                  {movie.genres &&
                    movie.genres.slice(0, 5).map((genre, i) => (
                      <div key={i} className="genres__movie">
                        <span>{genre.name}</span>
                      </div>
                    ))}
                </Genre>
                <SubTitle>
                  {isMovie ? (
                    <>
                      <span className="release__date">
                        Release Date: {movie.release_date}
                      </span>
                      <span className="duration">
                        {formatDuration(
                          movie.runtime || movie.episode_run_time
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="release__date">
                        First Air Date: {movie.first_air_date}
                      </span>
                      <span className="duration">
                        {movie.number_of_seasons} season
                        {movie.number_of_seasons > 1 ? "s" : ""}
                      </span>
                    </>
                  )}
                  <GoogleButton onClick={googleClick}>
                    <span>Google it!</span>
                    <GoogleIcon
                      src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                      alt=""
                    />
                  </GoogleButton>
                  <TrailerButton onClick={handleShowTrailer}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1146/1146203.png"
                      alt="Trailer Icon"
                    />
                    <span>Trailer</span>
                  </TrailerButton>
                  {showTrailer && (
                    <VideoPopUp>
                      <VideoWrapper onClick={handleCloseTrailer}>
                        <IconButton className="btn" style={{ float: "left" }}>
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
                      </VideoWrapper>
                    </VideoPopUp>
                  )}
                </SubTitle>
                <p className="overview">{movie.overview}</p>
                <div className="cast">
                  <div className="section__header">
                    <CastList id={id} category={category} />
                  </div>
                  <div className="container">
                    <div className="section mb-3">
                      <MediaTab id={id} category={category} />
                    </div>
                  </div>
                </div>
                <CommentList id={id} category={category} />
              </div>
            </div>
          </Container>
        </>
      ) : (
        <>
          <Background>
            <img
              src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="bg"
            />
          </Background>
          <Container>
            <div className="mb-3 movie-content container">
              <div className="movie-content__poster">
                <img
                  className="movie-content__poster__img"
                  src={`http://image.tmdb.org/t/p/original/${
                    movie.poster_path || movie.backdrop_path
                  }`}
                  onLoad={() => setLoadingImage("/images/loading-poster.jpg")}
                  onError={handleImageError}
                  alt=""
                />
                <Link to={`/${category}/${id}-${slugify(movie.title)}/watch`}>
                  <PlayButton>
                    <PlayImage
                      src="https://cdn-icons-png.flaticon.com/512/1179/1179120.png"
                      alt="Play Button"
                    />
                    <span>Play {`${category}`}</span>
                  </PlayButton>
                </Link>
              </div>
              <MovieScore id={id} category={category} />
              <div className="movie-content__info">
                <FavouriteWrapper>
                  <h1 className="title">{movie.title || movie.name}</h1>
                  <div className="favourite">
                    <AddToFavorites movie={movie} />
                  </div>
                </FavouriteWrapper>
                <h2>{movie.tagline}</h2>
                <Genre>
                  {movie.genres.map((genre, i) => (
                    <div key={i} className="genres__movie">
                      <img
                        src={genreIcons[genre.name?.toLowerCase()]}
                        className="genreImages"
                        height={30}
                        alt=""
                      />
                      <span className="genre__name">{genre.name}</span>
                    </div>
                  ))}
                </Genre>
                <SubTitle>
                  {isMovie ? (
                    <>
                      <span className="release__date">
                        Release Date: {movie.release_date}
                      </span>
                      <span className="duration">
                        {formatDuration(
                          movie.runtime || movie.episode_run_time
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="release__date">
                        First Air Date: {movie.first_air_date}
                      </span>
                      <span className="duration">
                        {movie.episode_run_time + " mins"}
                      </span>
                    </>
                  )}
                  <GoogleButton onClick={googleClick}>
                    <span>Google it!</span>
                    <GoogleIcon
                      src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                      alt=""
                    />
                  </GoogleButton>
                  <TrailerButton onClick={handleShowTrailer}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1146/1146203.png"
                      alt="Trailer Icon"
                    />
                    <span>Trailer</span>
                  </TrailerButton>
                  {showTrailer && (
                    <VideoPopUp onClick={handleCloseTrailer}>
                      <VideoWrapper>
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
                      </VideoWrapper>
                    </VideoPopUp>
                  )}
                </SubTitle>
                <p className="overview">{movie.overview}</p>
                <div className="cast">
                  <div className="section__header">
                    <CastListSlider id={id} category={category} />
                  </div>
                </div>
                <div className="container">
                  <div className="section mb-3">
                    <MediaTab id={id} category={category} />
                  </div>
                </div>
                <CommentList id={id} category={category} />
              </div>
            </div>
          </Container>
        </>
      )}
    </Page>
  );
};

export default Detail;

const Container = styled.div`
  background: linear-gradient(
    to top,
    #032541 20%,
    rgba(3, 37, 65, 0.9) 40%,
    rgba(3, 37, 65, 0.8) 60%,
    rgba(3, 37, 65, 0.7) 80%,
    rgba(3, 37, 65, 0.5) 100%
  );
`;

const Background = styled.div`
  left: 0px;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const Genre = styled.div`
  display: flex;
  padding: 8px;
  border-radius: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 50px;

    .genres__movie {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .genreImages {
      display: none;
    }
  }

  .genres__movie {
    border: 2px solid #2885e1;
    margin: 5px;
    padding: 8px;
    border-radius: 10px;
    text-align: center;
  }

  .genre__name {
    position: relative;
    bottom: 7px;
    margin: 10px;

    @media (max-width: 1280px) {
      bottom: 0px;
    }
  }

  .genreImages {
    filter: invert(100%);
  }
`;

const SubTitle = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  margin: 0px;

  .release__date {
    border: 2px solid #21d07a;
    padding: 8px;
    border-radius: 10px;
    margin: 10px;
  }

  .duration {
    border: 2px solid #21d07a;
    padding: 8px;
    margin: 10px;
    border-radius: 10px;
  }

  .google__btn {
    margin: 10px;
    background-color: #3367d6;
    color: #fff;
    padding: 10px 16px;
    cursor: pointer;
    border: 3px solid #21d07a;
    border-radius: 20px;
    text-decoration: none;
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: #4285f4;
    }
  }

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    max-width: 50px;
  }
`;

const GoogleButton = styled.button`
  background-color: #3140f0;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin: 10px;
  color: #fff;
  transition: 0.5s ease-in-out;

  span {
    font-size: 20px;
  }

  &:hover {
    background-color: #3f51b5;
    color: #fff;
  }

  @media (max-width: 768px) {
    max-width: 100px;
    font-size: 15px;
  }
`;

const GoogleIcon = styled.img`
  width: 30px;
  height: auto;
  background-color: #fff;
  border-radius: 40px;
  position: relative;
  padding: 5px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FavouriteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: -50px;

  .favourite {
    margin-top: 40px;
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 0px;

    .favourite {
      margin-top: 0px;
      margin-left: 0px;
    }
  }
`;

const TrailerButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: none;
  border: 2px solid #3f51b5;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  width: 150px;
  height: 50px;
  transition: transform 100ms 0s;
  transition: 0.3s ease;
  margin-left: 10px;

  &:hover {
    transform: scale(1.1);
    color: #000;
    background-color: rgba(255, 255, 255, 0.5);

    img {
      filter: invert(0%);
      transform: scale(1.3);
    }
  }

  img {
    width: 30px;
    filter: invert(100%);
    transition: transform 100ms 0s;
    transition: 0.3s ease;
  }

  span {
    font-size: 20px;
  }
`;

const VideoPopUp = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    @media (max-width: 1280px) {
      width: 100%;
      height: 100%;
    }
  }

  .btn {
    position: absolute;
    top: -60px;
    right: -60px;
    z-index: 2;
  }

  @media screen and (max-width: 1280px) {
    .btn {
      position: absolute;
      top: -10px;
      right: -70px;
    }
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 46.25%;
  height: 0;
  width: 80%;
  max-width: 100%;
  z-index: 5;
`;

const PlayImage = styled.img`
  width: 30px;
  margin-right: 10px;
  filter: invert(100%);
`;

const PlayButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: none;
  border: 2px solid #3f51b5;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  width: 250px;
  height: 80px;
  transition: transform 100ms 0s;
  transition: 0.3s ease;
  margin-left: 10px;
  position: relative;
  top: 20px;
  left: 200px;
  text-transform: capitalize;

  &:hover {
    transform: scale(1.1);
    color: #000;
    background-color: rgba(255, 255, 255, 0.5);

    img {
      filter: invert(0%);
      transform: scale(1.3);
    }
  }

  img {
    width: 40px;
    filter: invert(100%);
    transition: transform 100ms 0s;
    transition: 0.3s ease;
  }

  span {
    font-size: 20px;
  }
`;

const AgeStyled = styled.span`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin: 10px;
  padding: 8px 16px;
  width: 50px;
  font-size: 25px;
  font-weight: bold;

  span {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
`;
