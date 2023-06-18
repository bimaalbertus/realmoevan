import React from "react";
import styled from "styled-components";
import NoSlider from "../../../element/Page/NoSlider";
import Page from "../../../components/page";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const TopRatedMovies = () => {
  const req = {
    TopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    TopRated2: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=2`,
    TopRated3: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=3`,
    TopRated4: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=4`,
    TopRated5: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=5`,
    TopRated6: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=6`,
    TopRated7: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=7`,
    TopRated8: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=8`,
    TopRated9: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=9`,
    TopRated10: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=10`,
  };
  return (
    <Page title={`Top Rated Movies`}>
      <Container>
        <NoSlider fetchurl={req.TopRated} />
        <NoSlider fetchurl={req.TopRated2} />
        <NoSlider fetchurl={req.TopRated3} />
        <NoSlider fetchurl={req.TopRated4} />
        <NoSlider fetchurl={req.TopRated5} />
      </Container>
    </Page>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow: hidden;
  display: block;
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

const Video = styled.div`
  max-height: 100%;
  max-width: 100%;
  float: left;
  top: 0px;
  padding: none;
  position: fixed;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  margin-bottom: 121px;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    video {
      opacity: 1;
    }
  }
`;

export default TopRatedMovies;
