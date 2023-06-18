import "./Banner.css";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import requests from "../../Request";
import Slider from "react-slick";
import styled from "styled-components";
import { Link } from "react-router-dom";
import leftArrow from "../../assets/images/icons/left-arrow-50-white.png";
import rightArrow from "../../assets/images/icons/right-arrow-50-white.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ReactStars from "react-stars";

const Banner = (props) => {
  const [movies, setMovies] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(props.fetchurl);
      const data = req.data.results.map((item) => {
        const { id, title, name, backdrop_path, first_air_date } = item;
        let url;
        if (first_air_date) {
          url = `/show/${id}-${slugify(name?.toLowerCase())}`;
        } else {
          url = `/movie/${id}-${slugify(title?.toLowerCase())}`;
        }
        return {
          id,
          title: title,
          name: name,
          backdrop_path,
          url,
          release_date: item.release_date || item.first_air_date,
          vote_average: item.vote_average,
          category: item.media_type === "tv" ? "Show" : "Movie",
          overview: item.overview,
        };
      });
      setMovies(data);
      return req;
    }

    fetchData();
  }, [props.fetchurl]);

  let sliderRef;

  const handleBeforeChange = (current, next) => {
    setSliderIndex(next);
  };

  const handleNextSlide = () => {
    if (sliderIndex < movies.length - 1) {
      setSliderIndex(sliderIndex + 1);
      sliderRef.slickNext();
    } else {
      setSliderIndex(0);
      sliderRef.slickGoTo(0);
    }
  };

  const handlePrevSlide = () => {
    if (sliderIndex > 0) {
      setSliderIndex(sliderIndex - 1);
      sliderRef.slickPrev();
    } else {
      setSliderIndex(movies.length - 1);
      sliderRef.slickGoTo(movies.length - 1);
    }
  };

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    cssEase: "linear",
    draggable: true,
    fade: true,
    arrows: true,
    beforeChange: handleBeforeChange,
  };

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  return (
    <Container>
      <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
        {movies.map((movie) => (
          <Wrap key={movie.id}>
            <div
              className="banner"
              style={{
                backgroundImage: `linear-gradient(to top, #112 0%, transparent 100%), url(http://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                backgroundSize: "cover",
              }}
            >
              <div className="banner__contents">
                <h1 className="banner__title">
                  {movie?.title || movie.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                  <Link to={movie.url}>
                    <button type="button" className="banner__button">
                      Play
                    </button>
                  </Link>

                  <span className="release_date">{movie.release_date}</span>
                  <span className="category">{movie.category}</span>
                  <div className="movie-rating">
                    <ReactStars
                      edit={false}
                      count={5}
                      value={Math.round(movie.vote_average / 2)}
                      size={24}
                      color2={"#ffd700"}
                    />
                  </div>
                </div>
                <p className="banner__overview">{movie?.overview}</p>
              </div>
              <div className="banner__fadeBottom" />
            </div>
            <div className="arrow arrow--prev" onClick={handlePrevSlide}>
              <img src={leftArrow} alt="Previous" />
            </div>
            <div className="arrow arrow--next" onClick={handleNextSlide}>
              <img src={rightArrow} alt="Next" />
            </div>
          </Wrap>
        ))}
      </Slider>
    </Container>
  );
};

const Wrap = styled.div``;

const Container = styled.div`
  overflow-x: hidden;
  height: 100%;
  width: 100%;

  .slick-slide {
    visibility: hidden;
  }
  .slick-slide.slick-active {
    visibility: visible;
  }

  &:hover .arrow {
    opacity: 1;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .arrow--prev {
    left: 0;
  }

  .arrow--next {
    right: 0;
  }

  .slick-dots {
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    z-index: 10;
  }

  .slick-dots li button:before {
    font-size: 12px;
    color: #fff;
  }

  .slick-dots li.slick-active button:before {
    font-size: 20px;
    color: #fff;
  }
`;

export default Banner;
