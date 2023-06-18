import React, { useState, useEffect } from "react";
import axios from "axios";
import NoSlider from "../../../element/Page/NoSlider";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import genreIcons from "../../../assets/genres";
import { Transition } from "react-transition-group";
import LoadingPage from "../../../utils/LoadingPage/LoadingPage";
import BannerNoArrow from "../../../components/Banner/BannerNoArrow";
import Page from "../../../components/page";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";
const API_URL = "https://api.themoviedb.org/3";

function SortByGenreMovie() {
  const { category } = useParams();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGenreButton, setSelectedGenreButton] = useState("");
  const [showTheMovies, setShowTheMovies] = useState(false);
  const endpoint = category === "tv" ? "tv" : "movie";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Memanggil API untuk mendapatkan daftar genre movie
    axios
      .get(`${API_URL}/genre/${endpoint}/list`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error(error);
      });

    setIsLoading(false);
  }, []);

  const handleGenreButtonClick = (genreId) => {
    setSelectedGenre(genreId);
    setSelectedGenreButton(genreId);
    setShowTheMovies(true);
  };

  return (
    <Page title={`Sort Movies by Genre`}>
      <BannerNoArrow
        fetchurl={`${API_URL}/discover/movie/?api_key=${API_KEY}&with_genres=${selectedGenre}`}
      />
      <Container>
        <h1>Sort Movie by Genre: </h1>
        <GenreWrapper
          value={selectedGenreButton}
          onChange={(e) => handleGenreButtonClick(e.target.value)}
        >
          <option value={null}>-- Genre --</option>
          {genres.map((genre) => (
            <GenreButton
              key={genre.id}
              value={genre.id}
              onClick={() => handleGenreButtonClick(genre.id)}
              selected={selectedGenreButton === genre.id}
            >
              <img
                src={genreIcons[genre.name?.toLowerCase()]}
                className="genreImages"
                height={30}
                alt=""
                onClick={() => handleGenreButtonClick(genre.id)}
                selected={selectedGenreButton === genre.id}
              />
              <span className="genre-name">{genre.name}</span>
            </GenreButton>
          ))}
        </GenreWrapper>
      </Container>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Transition in={showTheMovies} timeout={500} mountOnEnter unmountOnExit>
          {(state) => (
            <NoSliderWrapper state={state}>
              <NoSlider
                fetchurl={`${API_URL}/discover/movie/?api_key=${API_KEY}&with_genres=${selectedGenre}`}
              />
            </NoSliderWrapper>
          )}
        </Transition>
      )}
    </Page>
  );
}

export default SortByGenreMovie;

const NoSliderWrapper = styled.div`
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Container = styled.div`
  display: flex;
  padding: 40px;
  margin-left: 50px;

  @media (max-width: 768px) {
    display: grid;
  }
`;

const GenreWrapper = styled.select`
  font-size: 15px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #c0c0c0;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  background-color: #121212;
`;

const GenreButton = styled.option`
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  color: #fff;
  background-color: ${({ selected }) => (selected ? "#e6e6e6" : "#121212")};

  &:hover {
    background-color: rgba(51, 51, 51, 0.5);
    transition: all 0.2s;
  }

  @media (max-width: 768px) {
    display: grid;
  }
`;
