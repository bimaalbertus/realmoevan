import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Row from "../Row/Row";
import RowBackdrop from "../Row/RowBackdrop/RowBackdrop";
import requests from "../../Request";
import { useParams } from "react-router-dom";
import MovieCategory from "./MovieCategory";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";
const API_URL = "https://api.themoviedb.org/3";

function MovieRow() {
  const { category } = useParams();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGenreButton, setSelectedGenreButton] = useState("");
  const [movies, setMovies] = useState([]);
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
    <Container>
      <RowContainer>
        <RowBackdrop
          title={"Coming Soon"}
          fetchurl={requests.fetchComingSoon}
        />
      </RowContainer>
      <MovieCategory />
    </Container>
  );
}

export default MovieRow;

const RowContainer = styled.div`
  margin-bottom: 40px;
  padding-bottom: 40px;
`;

const Container = styled.div`
  margin-bottom: 100px;
`;

const GenreButton = styled.button`
  font-size: 15px;
  text-align: left;
  margin: 8px 0;
  padding: 4px 12px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  cursor: pointer;
  color: #fff;
  border: 2px solid #c0c0c0;
  border-radius: 0px;
  background-color: ${({ selected }) => (selected ? "#e6e6e6" : "#121212")};

  &:hover {
    background-color: rgba(51, 51, 51, 0.5);
    transition: all 0.2s;
  }

  &:focus {
    outline: none;
    color: #000;
    background-color: #e6e6e6;
  }

  &:active {
    color: #000;
    background-color: ${({ selected }) => (selected ? "#3f3f3f" : "#121212")};
  }

  .genreImages {
    filter: ${({ selected }) => (selected ? "none" : "invert(100%)")};

    &:focus {
      outline: none;
      filter: invert(100%);
    }

    &:active {
      filter: ${({ selected }) => (selected ? "invert(0%)" : "invert(100%)")};
    }
  }

  .genre-name {
    margin-left: 15px;
    text-align: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    display: grid;
  }
`;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import NoSlider from "../element/Page/NoSlider";

// const API_KEY = "8260a7b490f140fde24b8a24b034994a";
// const API_URL = "https://api.themoviedb.org/3";
// const IMG_URL = "https://image.tmdb.org/t/p/w500";

// function MovieRow() {
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     // Memanggil API untuk mendapatkan daftar genre movie
//     axios
//       .get(`${API_URL}/genre/movie/list`, {
//         params: {
//           api_key: API_KEY,
//         },
//       })
//       .then((response) => {
//         setGenres(response.data.genres);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleGenreChange = (event) => {
//     setSelectedGenre(event.target.value);
//   };

//   const handleFilterClick = () => {
//     // Memanggil API untuk mendapatkan daftar movie dari genre yang dipilih
//     axios
//       .get(`${API_URL}/discover/movie`, {
//         params: {
//           api_key: API_KEY,
//           with_genres: selectedGenre,
//         },
//       })
//       .then((response) => {
//         setMovies(response.data.results);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <select value={selectedGenre} onChange={handleGenreChange}>
//         <option value="">-- Pilih Genre --</option>
//         {genres.map((genre) => (
//           <option key={genre.id} value={genre.id}>
//             {genre.name}
//           </option>
//         ))}
//       </select>
//       <button onClick={handleFilterClick}>Filter</button>
//       {movies.map((movie) => (
//         <NoSlider
//           fetchurl={`${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres.name}`}
//         />
//       ))}

// //Disini adalah tempat untuk mengatur page dari fetch movie, jika klik next, maka akan diarahkan ke next page dari fetch movie, dan juga sebaliknya
//     </div>
//   );
// }

// export default MovieRow;

// Kurang lebih seperti ini, tetapi option mungkin diganti dengan button
