import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import SearchedItems from "./SearchedItems";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import NavBar from "../NavBar/Navbar";
import FooterContainer from "../../container/Footer/footer";
import Loading from "../Loading";
import { useParams, useNavigate, useLocation } from "react-router";
import SearchBar from "./SearchBar/SearchBar";
import Page from "../../components/page";

function Search() {
  const history = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get(
      "query_results"
    );
    if (searchQuery) {
      setQuery(searchQuery);
      fetchData(searchQuery);
    }
  }, [location.search]);

  async function fetchData(searchQuery) {
    setLoading(true);
    const req = await axios.get(
      `/search/multi?api_key=8260a7b490f140fde24b8a24b034994a&query=${searchQuery}&page=1&include_video=true`
    );
    setData(req.data.results);
    setLoading(false);
    return req;
  }

  const search = (e) => {
    e.preventDefault();
    if (query !== "") {
      const queryString = encodeURIComponent(query);
      window.location.href = `/search?query_results=${queryString}`;
    }
  };

  return (
    <Page title={`${query}`}>
      <Container>
        <SearchBar />
        {data ? <SearchedItems data={data} /> : ""}
        {!data && query ? (
          <LoaderContainer>
            <Loading />
          </LoaderContainer>
        ) : (
          ""
        )}

        {!isLoading && data.length === 0 && query && <h1>No results found.</h1>}
      </Container>
    </Page>
  );
}

const Container = styled.main`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:-webkit-scrollbar {
    display: none;
  }

  &:after {
    background: url("./assets/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  width: 90%;
`;

const Formthings = styled.div`
  background-color: #0c111b;
  width: 30%;
  border-radius: 5px;
`;

const Form = styled.form`
  input {
    outline: none;
    border: none;
    width: 85%;
    color: white;
    background-color: #0c111b;

    @media (max-width: 700px) {
      width: 70%;
    }
  }
  button {
    width: ;
  }
`;
const Searchicon = styled(SearchIcon)`
  font-size: 30px;
  color: white;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
`;
export default Search;
