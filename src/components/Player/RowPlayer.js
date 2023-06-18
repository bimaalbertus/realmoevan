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

const baseUrl = "https://image.tmdb.org/t/p/original/";

function RowPlayer(props) {
  const slider = React.useRef(null);
  const [movies, setmovies] = useState([]);

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
        const { id, title, name, poster_path, first_air_date } = item;
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
        };
      });
      setmovies(data);
      return req;
    }

    fetchData();
  }, [props.fetchurl]);

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
    slidesToShow: 8,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  if (movies) {
    return (
      <>
        {movies.length !== 0 ? (
          <div style={{ maxheight: "250px" }}>
            <br />
            {movies ? <h2>{props.title}</h2> : ""}
            <MovieRow ref={slider} {...settings}>
              {movies.map((movie) => (
                <div key={movie.id}>
                  <Link to={movie.url}>
                    <Container>
                      <Link to={movie.url}>
                        <Image
                          className="image"
                          src={`${baseUrl}${movie.poster_path}`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/can't found the image.jpg";
                          }}
                          loading="lazy"
                          alt=" "
                        />
                      </Link>
                    </Container>
                  </Link>
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
  margin-bottom: 20px;
  padding: 40px;
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
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
      width: 5vh;
      height: 5vh;
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
const Container = styled.div`
  position: relative;
  padding: 10px;
  align-items: center;
  z-index: 1;
  max-height: 250px;
  min-height: 200px;

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
  }

  &:hover {
    z-index: 2;
  }

  &:hover .image {
    transform: scale(1.07);
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

const Image = styled.img`
  position: relative;
  display: block;
  backface-visibility: hidden;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 100ms 0s;
  transition: 0.5s ease;

  @media (max-width: 700px) {
    padding-right: 6px;
    object-fit: contain;
  }
`;

export default RowPlayer;
