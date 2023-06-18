import axios from "../../api/axios";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import LoadingPage from "../../utils/LoadingPage/LoadingPage";
import { Transition } from "react-transition-group";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function NoSlider(props) {
  const [movies, setMovies] = useState([]);
  const [showTheMovies, setShowTheMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setMovies(data);
      setShowTheMovies(true);
      setIsLoading(false);
      return req;
    }

    fetchData();
  }, [props.fetchurl]);

  if (!movies) {
    return <LoadingPage />;
  }

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <MovieRow>
          <Container>
            {movies.map((movie) => (
              <div key={movie.id}>
                <Link to={movie.url}>
                  <Transition
                    in={showTheMovies}
                    timeout={500}
                    mountOnEnter
                    unmountOnExit
                  >
                    {(state) => (
                      <NoSliderWrapper state={state}>
                        <Link to={movie.url}>
                          <Detail>
                            <Image
                              className="image"
                              src={`${baseUrl}${movie.poster_path}`}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "./assets/images/default.jpg";
                              }}
                              loading="lazy"
                              alt=" "
                            />
                          </Detail>
                        </Link>
                      </NoSliderWrapper>
                    )}
                  </Transition>
                  <div className="detail-wrapper">
                    <span className="movie-title">
                      {movie.title || movie.name}
                    </span>
                    <div className="detail-container">
                      <span className="release-date">
                        {movie.release_date?.substring(0, 4)}
                      </span>
                      <img src="/images/yellow-star.svg" alt="" />
                      <span className="vote-average">
                        {(movie.vote_average / 1).toFixed(2)}
                      </span>
                      <span className="category">{movie.category}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Container>
        </MovieRow>
      )}
    </>
  );
}

const fadeInDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const NoSliderWrapper = styled.div`
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
  animation: ${fadeInDown} 0.5s ease-out forwards;
`;

const Detail = styled.div`
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: transform 100ms 0s;
  transition: 0.5s ease;
  width: 250px;

  &:hover {
    border-radius: 0px;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100px;
  }
`;

const MovieRow = styled.div`
  margin-top: 50px;
`;

const Container = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Image = styled.img`
  backface-visibility: hidden;
  position: relative;
  display: block;
  width: 100%;
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

export default NoSlider;
