import React from "react";
import styled from "styled-components";
import Viewers from "../../element/Viewers";
import Navbar from "../../components/NavBar/Navbar";
import Banner from "../../components/Banner/Banner";
import MovieRows from "../../components/MovieRow/MovieRow";
import requests from "../../Request";
import Sidebar from "../../components/SideBar/Sidebar.js";
import RowWithReactSlick from "../../components/Row/RowWithReactSlick";
import BannerVideo from "../../components/Banner/BannerVideo";
import SavedMovie from "../../components/SavedMovies/SavedMovies";
import Row from "../../components/Row/RowBackdrop/RowBackdrop";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    const fetchUserCountryCode = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setCountryCode(data.country);
      } catch (error) {
        console.log("Error fetching user country code:", error);
      }
    };

    fetchUserCountryCode();
  }, []);

  useEffect(() => {
    if (countryCode) {
      if (authUser?.uid) {
        navigate(`/${slugify(countryCode)}/user?=${authUser.uid}`);
      } else {
        navigate(`/${slugify(countryCode)}`);
      }
    }
  }, [countryCode, authUser, navigate]);

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  return (
    <Container>
      <BannerVideo fetchurl={requests.fetchTrending} />
      <ContainerRow>
        <SavedMovie />
        <RowWithReactSlick
          title={"What's Trending"}
          fetchurl={requests.fetchTrending}
        />
        <RowWithReactSlick
          title={"Popular"}
          fetchurl={requests.fetchPopular && requests.fetchPopular2}
        />
        <br />
        {/* <h2>Studios</h2>
        <Viewers /> */}
        <RowWithReactSlick
          title={"Top Rated!"}
          fetchurl={requests.fetchTopRated}
        />
        <RowContainer>
          <Row title={"Coming Soon"} fetchurl={requests.fetchComingSoon} />
        </RowContainer>
        {/* <MovieRows /> */}
      </ContainerRow>
    </Container>
  );
};

const Container = styled.div``;

const RowContainer = styled.div`
  margin-bottom: 40px;
  padding-bottom: 40px;
`;

const ContainerRow = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:-webkit-scrollbar {
    display: none;
  }

  &:after {
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
const NavContainer = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  z-index: 1;
  transition: all 0.5s;

  display: flex;
  align-items: center;
`;

export default Home;
