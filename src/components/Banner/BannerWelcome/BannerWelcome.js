import "./BannerWelcome.css";
import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import Slider from "react-slick";
import styled from "styled-components";
import SearchBar from "../../Search/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import leftArrow from "../../../assets/images/icons/left-arrow-50-white.png";
import rightArrow from "../../../assets/images/icons/right-arrow-50-white.png";
import { useMediaQuery } from "react-responsive";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlaceHolderImage from "../../../assets/images/misc/loading-poster.jpg";
import genreIcons from "../../../assets/genres";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

export default function BannerWelcome(props) {
  const [movies, setMovies] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [loadingImage, setLoadingImage] = useState(
    "/images/loading-poster.jpg"
  );
  const isMovie = !movies.first_air_date;
  const ratingColor = movies?.adult ? "red" : "green";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(props.fetchurl);
      const data = result.data.results.map((movie) => ({
        ...movie,
        duration: movie.media_type === "movie" ? movie.duration : undefined,
        number_of_seasons:
          movie.media_type === "tv" ? movie.number_of_seasons : undefined,
        certification:
          movie.media_type === "movie" ? movie.certification : undefined,
      }));
      setMovies(data);
    };
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
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "linear",
    fade: true,
    arrows: false,
    beforeChange: handleBeforeChange,
  };

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

  function handleImageError() {
    setLoadingImage("/images/cant-found-the-image.jpg");
  }

  return (
    <Container>
      <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
        {movies.map((movie) => (
          <Wrap key={movie.id}>
            <div
              className="banner__wrapper"
              style={{
                backgroundImage: `linear-gradient(to top, #032541 20%, rgba(3,37,65,0.2) 100%), url(http://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
            >
              <div className="banner-detail-container">
                {isMobile ? (
                  ""
                ) : (
                  <>
                    <div className="banner__Searchbar">
                      <h1>Hi There.</h1>
                      <h2>
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                      </h2>
                      <SearchBar />
                    </div>
                  </>
                )}
                <BannerContainer>
                  <Image
                    src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    placeholderSrc={PlaceHolderImage}
                    onError={handleImageError}
                    loading="lazy"
                    alt=""
                  />
                  <BannerDesc>
                    <h1 className="banner__title">
                      {movie?.title || movie.name || movie?.original_name}
                    </h1>
                    <div className="banner__buttons">
                      <ReleaseDate>
                        {movie.release_date?.substring(0, 4) ||
                          movie.first_air_date?.substring(0, 4)}{" "}
                        •
                      </ReleaseDate>
                      {/* {movie.first_air_date ? (
                        <Duration>
                          {movie.number_of_seasons} season
                          {movie.number_of_seasons > 1 ? "s" : ""}
                        </Duration>
                      ) : (
                        <Duration>{formatDuration(movie.duration)}</Duration>
                      )} */}
                    </div>
                    <Genre>
                      {movie.genre_ids.map((genreId) => (
                        <div key={genreId} className="genres__movie">
                          <img
                            src={genreIcons[genres[genreId]?.toLowerCase()]}
                            className="genreImages"
                            height={30}
                            alt=""
                          />
                          <span className="genre__name">{genres[genreId]}</span>
                        </div>
                      ))}
                    </Genre>
                    <Link to={movie.url}>
                      <PlayButton>
                        <PlayImage
                          src="https://cdn-icons-png.flaticon.com/512/1179/1179120.png"
                          alt="Play Button"
                        />
                        <span>Play Now</span>
                      </PlayButton>
                    </Link>
                    <p className="banner__overview">{movie?.overview}</p>
                  </BannerDesc>
                </BannerContainer>
                <div className="banner__fadeBottom" />
                <div className="arrow arrow--prev" onClick={handlePrevSlide}>
                  <img src={leftArrow} alt="Previous" />
                </div>
                <div className="arrow arrow--next" onClick={handleNextSlide}>
                  <img src={rightArrow} alt="Next" />
                </div>
              </div>
            </div>
          </Wrap>
        ))}
      </Slider>
    </Container>
  );
}

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
    margin-right: 40px;
    margin-left: 40px;
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
    z-index: 5;
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

const AgeStyled = styled.span`
  background-color: ${({ ratingColor }) => ratingColor};
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

const ReleaseDate = styled.span`
  font-size: 25px;
  font-weight: bold;
`;

const Duration = styled.span`
  margin-left: 10px;
  font-size: 25px;
  font-weight: bold;
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
  border-radius: 10px;

  @media (max-width: 900px) {
    margin-top: 60px;
    margin-left: 30px;
    object-fit: contain;
    display: none;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin-left: 100px;

  @media (max-width: 900px) {
    flex-direction: column;
    margin-left: -20px;
  }
`;

const BannerDesc = styled.div`
  margin-left: 30px;
  height: 190px;
`;

const Genres = styled.span`
  position: relative;
  top: 20px;
  margin-right: 20px;
  font-size: 30px;
  font-weight: bold;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    max-width: 100px;
  }
`;

const PlayButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  width: 350px;
  height: 40px;
  transition: transform 100ms 0s;
  margin: 30px 0 10px 0;
  transition: 0.3s ease;
  text-transform: capitalize;

  &:hover {
    transform: scale(1.05);
    color: #000;
    background-color: rgba(255, 255, 255, 0.5);

    img {
      filter: invert(0%);
      transform: scale(1.05);
    }
  }

  span {
    font-size: 20px;
  }
`;

const PlayImage = styled.img`
  width: 30px;
  margin-right: 10px;
  filter: invert(100%);
  transition: transform 100ms 0s;
  transition: 0.3s ease;
`;

const Genre = styled.div`
  display: flex;
  border-radius: 20px;
  align-items: center;
  margin-top: 10px;

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
    display: flex;
    border: 2px solid #2885e1;
    margin: 5px;
    padding: 8px;
    border-radius: 10px;
    justify-content: center;
    text-align: center;
  }

  .genre__name {
    position: relative;
    margin: 10px;

    @media (max-width: 1280px) {
      bottom: 0px;
    }
  }

  .genreImages {
    filter: invert(100%);
  }
`;
