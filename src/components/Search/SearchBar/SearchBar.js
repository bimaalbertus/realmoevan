import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchInput, SearchButton } from "./styles";
import axios from "../../../api/axios";
import styled from "styled-components";

function SearchBar() {
  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isHovered || isFocused;
  const location = useLocation();
  const [isError, setIsError] = useState(false);

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (location.search) {
      const searchQuery = new URLSearchParams(location.search).get(
        "query_results"
      );
      if (searchQuery) {
        setQuery(searchQuery);
        fetchData(searchQuery);
      }
    }
  }, [location.search]);

  const fetchData = async (query) => {
    const API_KEY = "8260a7b490f140fde24b8a24b034994a";
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false`;

    try {
      const response = await axios.get(url);
      setData(response.data.results);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "+")
      .replace(/[^\w\-]+/g, "+");
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (query === "") {
      setIsError(true);
    } else {
      const slugifiedQuery = slugify(query);
      window.location.href = `/search?query_results=${slugifiedQuery}`;
    }
  };

  return (
    <>
      <Container
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        hover={showSearchInput}
        onSubmit={handleSearchSubmit}
      >
        <SearchInput
          ref={targetRef}
          showSearchInput={showSearchInput}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsError(false);
          }}
          placeholder="Search any movie, series, or person......"
          className={isError ? "error" : ""}
        />
        <SearchButton onClick={handleSearchSubmit}>
          <p>Search</p>
        </SearchButton>
      </Container>
      <ErrorMessage>
        {isError && (
          <span className="error-message">Please fill this field</span>
        )}
      </ErrorMessage>
    </>
  );
}

export default SearchBar;

const Container = styled.form`
  position: relative;
  top: 5px;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  border-radius: 50px;
  padding: 5px;
  transition: all 0.5s;
  z-index: 2;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;

  .error {
    border: 3px solid red;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  animation-duration: 0.5s;

  .error-message {
    animation: shake 0.5s;
    color: red;
    font-size: 15px;
    margin-left: 10px;
  }

  @keyframes shake {
    0% {
      transform: translate(0, 0);
    }
    20% {
      transform: translate(-4px, 0);
    }
    40% {
      transform: translate(4px, 0);
    }
    60% {
      transform: translate(-4px, 0);
    }
    80% {
      transform: translate(4px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;
