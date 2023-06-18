import React, { useState, useEffect, useRef } from "react";
import "./RowBackdrop.css";
import axios from "../../../api/axios";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import AddToWatchListRow from "../AddToWatchListRow";

const baseUrl = "https://image.tmdb.org/t/p/original/";
const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const Row = (props, { match }) => {
  const { id, category } = useParams();
  const [movies, setMovies] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [loadingImage, setLoadingImage] = useState(
    "/images/loading-poster.jpg"
  );
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(props.fetchurl);
      const data = req.data.results.map((item) => {
        const {
          id,
          title,
          name,
          backdrop_path,
          first_air_date,
          overview,
          movie,
          genre_ids,
        } = item;
        let url;
        if (first_air_date) {
          url = `/show/${id}-${slugify(name?.toLowerCase())}`;
        } else {
          url = `/movie/${id}-${slugify(title?.toLowerCase())}`;
        }
        return {
          id,
          title: title?.toLowerCase(),
          name: name?.toLowerCase(),
          backdrop_path,
          url,
          release_date: item.release_date || item.first_air_date,
          vote_average: item.vote_average,
          category: item.media_type === "tv" ? "Show" : "Movie",
          overview: overview,
          movie: movie,
          genre_ids,
        };
      });
      setMovies(data);
      return req;
    }

    fetchData();
  }, [props.fetchurl]);

  const [genres, setGenres] = useState({});

  useEffect(() => {
    async function fetchGenres() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const genres = {};
      request.data.genres.forEach((genre) => {
        genres[genre.id] = genre.name;
      });
      setGenres(genres);
    }
    fetchGenres();
  }, []);

  const [getVideo, setGetVideo] = useState({});

  const handleClick = (movie) => {
    const trailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`;
    axios
      .get(trailerUrl)
      .then((response) => {
        const videos = response.data.results;
        if (videos.length > 0) {
          const trailer = videos.find((video) => video.type === "Trailer");
          if (trailer) {
            const key = trailer.key;
            setGetVideo({ key: key });
            setShowTrailer(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePrev = () => {
    setSlideIndex(slideIndex - 2);
  };

  const handleNext = () => {
    const maxSlideIndex = movies.length - (movies.length % 2) - 2;
    setSlideIndex(
      slideIndex + 2 > maxSlideIndex ? maxSlideIndex : slideIndex + 2
    );
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const distance = x - startX;

    setSlideIndex(slideIndex - distance / 50);
    setStartX(x);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    setShowLeftArrow(slideIndex !== 0);
    setShowRightArrow(slideIndex !== movies.length - 6);
  }, [slideIndex, movies]);

  const isBeginning = slideIndex === 0;
  const isEnd = slideIndex === movies.length - 6;

  return (
    <>
      {isMobile ? (
        <>
          <h1>{props.title}</h1>
          <br />
          <div className="backdrop-card-slider">
            {showLeftArrow && (
              <div class="backdrop-arrow backdrop-arrow-left">
                <button
                  className="backdrop-prev-btn"
                  onClick={handlePrev}
                  disabled={isBeginning}
                >
                  <ArrowBackIos
                    style={{ color: "#fff", width: "50px", height: "50px" }}
                  />
                </button>
              </div>
            )}
            <div
              className="backdrop-card-slider-wrapper"
              style={{ transform: `translateX(-${slideIndex * 570}px)` }}
            >
              {movies.map((movie) => (
                <div className="backdrop-card" key={movie.id}>
                  <Link to={movie.url}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title}
                    />
                    <Details>
                      <span className="movie-title">
                        {movie.title || movie.name}
                      </span>
                      <div className="detail-container">
                        <span className="release-date">
                          {movie.release_date?.substring(0, 4)}
                        </span>
                      </div>
                      {movie.genre_ids &&
                        movie.genre_ids
                          .slice(0, 1)
                          .map((genreId) => (
                            <Genres key={genreId}>{genres[genreId]}</Genres>
                          ))}
                      <PlayMovieButton onClick={() => handleClick(movie)}>
                        ▶︎ Play Trailer
                      </PlayMovieButton>
                    </Details>
                  </Link>
                </div>
              ))}
            </div>
            {showTrailer && (
              <VideoPopUp onClick={() => setShowTrailer(false)}>
                <VideoWrapper>
                  <IconButton
                    className="btn"
                    style={{ float: "right" }}
                    onClick={() => setShowTrailer(false)}
                  >
                    <HighlightOffIcon
                      style={{ fontSize: "50px", color: "#d9534f" }}
                    />
                  </IconButton>
                  <iframe
                    src={`https://www.youtube.com/embed/${getVideo.key}`}
                    title={movies.name}
                    allowFullScreen
                    allow="autoplay"
                  />
                </VideoWrapper>
              </VideoPopUp>
            )}
            {showRightArrow && (
              <div class="backdrop-arrow backdrop-arrow-right">
                <button
                  className="backdrop-next-btn"
                  onClick={handleNext}
                  disabled={isEnd}
                >
                  <ArrowForwardIos
                    style={{ color: "#fff", width: "50px", height: "50px" }}
                  />
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <br />
          <div className="backdrop-card-slider">
            {showLeftArrow && (
              <div class="backdrop-arrow backdrop-arrow-left">
                <button
                  className="backdrop-prev-btn"
                  onClick={handlePrev}
                  disabled={isBeginning}
                >
                  <ArrowBackIos
                    style={{ color: "#fff", width: "50px", height: "50px" }}
                  />
                </button>
              </div>
            )}
            <div
              className="backdrop-card-slider-wrapper"
              style={{ transform: `translateX(-${slideIndex * 570}px)` }}
            >
              {movies.map((movie) => (
                <div className="backdrop-card" key={movie.id}>
                  <Link to={movie.url}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title}
                    />
                  </Link>
                  <Details>
                    <Link to={movie.url}>
                      <span className="movie-title">
                        {movie.title || movie.name}
                      </span>
                      <div className="detail-container">
                        <span className="release-date">
                          {movie.release_date?.substring(0, 4)}
                        </span>
                      </div>
                    </Link>
                    {movie.genre_ids &&
                      movie.genre_ids
                        .slice(0, 3)
                        .map((genreId) => (
                          <Genres key={genreId}>{genres[genreId]}</Genres>
                        ))}
                    <PlayMovieButton onClick={() => handleClick(movie)}>
                      ▶︎ Play Trailer
                    </PlayMovieButton>
                  </Details>
                </div>
              ))}
            </div>
            {showTrailer && (
              <VideoPopUp onClick={() => setShowTrailer(false)}>
                <VideoWrapper>
                  <IconButton
                    className="btn"
                    style={{ float: "right" }}
                    onClick={() => setShowTrailer(false)}
                  >
                    <HighlightOffIcon
                      style={{ fontSize: "50px", color: "#d9534f" }}
                    />
                  </IconButton>
                  <iframe
                    src={`https://www.youtube.com/embed/${getVideo.key}`}
                    title={movies.name}
                    allowFullScreen
                    allow="autoplay"
                  />
                </VideoWrapper>
              </VideoPopUp>
            )}
            {showRightArrow && (
              <div class="backdrop-arrow backdrop-arrow-right">
                <button
                  className="backdrop-next-btn"
                  onClick={handleNext}
                  disabled={isEnd}
                >
                  <ArrowForwardIos
                    style={{ color: "#fff", width: "50px", height: "50px" }}
                  />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Row;

const Details = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(26, 34, 51, 1) 50%,
    rgba(26, 34, 51, 0) 100%
  );
  color: #fff;
  opacity: 1;
  transition: opacity 0.5s ease;
  padding: 20px;

  .movie-title {
    display: inline-block;
    text-transform: capitalize;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    flex: 1;
    top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .movie-overview {
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #fff;
    width: 100%;
    font-size: 10px;
  }

  .release-date {
    text-transform: capitalize;

    margin-top: 15px;
    margin-right: 5px;
    font-weight: bold;
  }
  .detail-container {
    align-items: flex-start;
    justify-content: left;
    margin-top: 5px;

    .vote-average {
      text-transform: capitalize;

      margin-top: 15px;
      color: #ff1;
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

    margin-top: 14px;
    margin-left: 4px;
    border: 1px solid gray;
    padding: 0px 4px;
    display: inline-block;
    border-radius: 0px;
  }

  &:hover {
    z-index: 2;
  }

  @media (max-width: 700px) {
    pointer-events: none;
  }

  .info {
    @media (max-width: 1000px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (max-width: 1280px) {
    margin-top: 0;
  }
`;

const Genres = styled.span`
  position: relative;
  margin-right: 2px;
  font-size: 10px;

  @media (max-width: 1280px) {
    margin-top: 2px;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
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

const PlayMovieButton = styled.span`
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  font-size: 10px;
  max-width: 75px;
  padding: 5px 5px 5px 2px;
  transition: 0.2s ease-in-out;
  background-color: #333;

  &:hover {
    background-color: #444;
  }
`;
