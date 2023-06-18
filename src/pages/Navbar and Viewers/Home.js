import React from "react";
import styled from "styled-components";
import Viewers from "../../element/Viewers";
import Navbar from "../../components/NavBar/Navbar";
import Banner from "../../components/Banner/Banner";
import MovieRows from "../../components/MovieRow/MovieRow";
import requests from "../../Request";
import Sidebar from "../../components/SideBar/Sidebar.js";
import BannerWelcome from "../../components/Banner/BannerWelcome/BannerWelcome";
import Row from "../../components/Row/Row";

const Home = () => {
  return (
    <Container>
      <BannerWelcome fetchurl={requests.fetchTrending} />
      <ContainerRow>
        <Row title={"What's Trending"} fetchurl={requests.fetchTrending} />
        <Row
          title={"Popular"}
          fetchurl={requests.fetchPopular && requests.fetchPopular2}
        />
        <br />
        <h2>Company</h2>
        <Viewers />
        <Row title={"Top Rated!"} fetchurl={requests.fetchTopRated} />
        <MovieRows />
      </ContainerRow>
    </Container>
  );
};

const Container = styled.div``;

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
