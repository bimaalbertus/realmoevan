/* eslint-disable react/prop-types */
import axios from "../../api/axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from "react-rating-stars-component";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Loading from "../Loading";
import StarsIcon from "@material-ui/icons/Stars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlaceHolderImage from "../../assets/images/misc/loading-poster.jpg";
import AddToWatchListRow from "./AddToWatchListRow";
import ShareButton from "../../utils/ShareButton";

const baseUrl = "https://image.tmdb.org/t/p/original/";
const API_KEY = "8260a7b490f140fde24b8a24b034994a";

export default function Row(props) {
  const slider = React.useRef(null);
  const [movies, setMovies] = useState([]);
  const [loadingImage, setLoadingImage] = useState(
    "/images/loading-poster.jpg"
  );

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
          poster_path,
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
          poster_path,
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

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button className={className}>
        <img src="/images/right-arrow-50-white.png" alt="" {...props} />
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button className={className} style={style} onClick={onClick}>
        <img src="/images/left-arrow-50-white.png" alt="" {...props} />
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    initialSlide: 0,
    draggable: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
        },
      },
    ],
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + ".." : str;
  }

  function handleImageError() {
    setLoadingImage("/images/cant-found-the-image.jpg");
  }

  if (movies) {
    return (
      <>
        {movies.length !== 0 ? (
          <div style={{ maxheight: "250px" }}>
            <br />
            {movies ? <h1>{props.title}</h1> : ""}
            <MovieRow ref={slider} {...settings}>
              {movies.map((movie) => (
                <div key={movie.id}>
                  <Container>
                    <ImageContainer to={movie.url}>
                      <Image
                        className="image"
                        src={`${baseUrl}${movie.poster_path}`}
                        placeholderSrc={PlaceHolderImage}
                        onError={handleImageError}
                        loading="lazy"
                        alt=" "
                      />
                      <DetailsWrapper>
                        <Details>
                          <span className="movie-title">
                            {movie.title || movie.name}
                          </span>
                          {movie.genre_ids &&
                            movie.genre_ids
                              .slice(0, 3)
                              .map((genreId) => (
                                <Genres key={genreId}>{genres[genreId]}</Genres>
                              ))}
                          <div className="detail-container">
                            <span className="release-date">
                              {movie.release_date?.substring(0, 4)}
                            </span>
                            <span className="vote-average">
                              {(movie.vote_average / 1).toFixed(2)}
                            </span>
                            <span className="movie-overview">
                              {movie.overview}
                            </span>
                            <Link to={`${movie.url}/watch`}>
                              <PlayMovieButton
                                onClick={(e) => e.stopPropagation()}
                              >
                                ▶︎ Play Movie
                              </PlayMovieButton>
                            </Link>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                              }}
                            >
                              <AddToWatchListRow />
                            </div>
                          </div>
                        </Details>
                      </DetailsWrapper>
                    </ImageContainer>
                  </Container>
                </div>
              ))}
            </MovieRow>
          </div>
        ) : (
          ""
        )}
      </>
    );
  } else {
    return <Loading />;
  }
}

const MovieRow = styled(Slider)`
  padding: 40px;
  margin-bottom: 100px;

  & > button {
    opacity: 0;
    z-index: 1;
  }

  &:hover button {
    opacity: 1;
    transition: opacity 0.2s ease 0s;
  }

  ul li button {
    display: none;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev,
  .slick-next {
    font-size: 15px !important;

    img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .slick-prev:before,
  .slick-next:before {
    content: "" !important;
  }

  @media (max-width: 700px) {
    .slick-prev {
      left: -3vw;
      width: 6vh;
      height: 20.7vh;
      top: 27vw;
    }
    .slick-next {
      right: -3vw;
      width: 6vh;
      height: 20.7vh;
      top: 27vw;
    }
  }

  div {
    position: relative;
    border: none;
    min-height: 200px;
    max-height: 260px;

    @media (max-width: 1300px) {
      max-height: 200px;
      padding-left: -5px;
    }
  }
`;

const Arrow = styled.div`
  display: flex;
  cursor: pointer;
  width: 100px;
`;

const Container = styled.div`
  position: relative;
  padding: 10px;
  align-items: center;
  z-index: 1;
  max-height: 250px;
  min-height: 200px;

  .movie-title {
    display: inline-block;
    text-transform: capitalize;
    font-size: 15px;
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
    font-size: 10px;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #fff;
    width: 100%;
  }

  .release-date {
    text-transform: capitalize;
    font-size: 12px;
    margin-top: 15px;
    margin-right: 5px;
    color: gray;
  }
  .detail-container {
    align-items: flex-start;
    justify-content: left;

    .vote-average {
      text-transform: capitalize;
      font-size: 12px;
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
    font-size: 12px;
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
`;

const Image = styled(LazyLoadImage)`
  position: relative;
  display: block;
  backface-visibility: hidden;
  object-fit: cover;
  width: 250px;
  height: 100%;
  transition: transform 100ms 0s;
  transition: 0.5s ease;

  @media (max-width: 1280px) {
    border-radius: 0px;
    padding-right: 6px;
    object-fit: contain;
    width: 150px;
  }
`;

const Details = styled.div`
  margin-top: 50px;
  padding: 10px;

  @media (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 1280px) {
    margin-top: 0;
  }
`;

const ImageContainer = styled(Link)`
  position: relative;
  display: inline-block;
  max-width: 95%;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.07);
  }
`;

const DetailsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  background: linear-gradient(
    to top,
    rgba(26, 34, 51, 1) 50%,
    rgba(26, 34, 51, 0) 100%
  );
  color: #fff;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  ${ImageContainer}:hover & {
    opacity: 1;
    transform: translate(-50%, -100%) scale(1.07);
  }
`;

const PlayMovieButton = styled.span`
  font-size: 10px;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #333;
    padding: 5px;
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
