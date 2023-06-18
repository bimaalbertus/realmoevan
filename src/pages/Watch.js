import React from "react";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import requests from "../Request";
import axios from "../api/axios";
import "./Watch.css";
import db from "../firebase";
import Navbar from "../components/NavBar/Navbar";
import Player from "../components/Player/PlayerMovie";
import { imageApi, embedMovie, embedEpisode } from "../api";
import tmdbApi from "../api/tmdbApi";
import { Season } from "../components/tv-seasons";
import PlayerSeries from "../components/Player/PlayerSeries";
import Page from "../components/page";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const Watch = ({ url }) => {
  const { id } = useParams();
  const { category } = useParams();
  const [movie, setMovie] = useState({
    genres: [],
  });
  const isMovie = !movie.first_air_date;
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (category === "movie") {
      getData();
    } else {
      getDataShow();
    }
    window.scrollTo(0, 0);
  }, [category]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const title = data.title ? data.title : data.name;
        setTitle(title);
        setMovie(data);
      });
  };

  const getDataShow = () => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const title = data.title ? data.title : data.name;
        setTitle(title);
        setMovie(data);
      });
  };

  return (
    <Page title={`Watch ${title}`}>
      <div
        className="background"
        style={{
          backgroundImage: `linear-gradient(to top, #032541 0%, transparent 100%), url(http://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      />
      <Container>
        {isMovie ? (
          <>
            <Player />
          </>
        ) : (
          <>
            <PlayerSeries />
          </>
        )}
      </Container>
    </Page>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow: hidden;
  display: grid;
`;

const DetailContainer = styled.div`
  display: grid;
  border: 10px solid #80bad2;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: top;
  margin: 20px;
  overflow: hidden;
  padding: 40px;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 5px;
  }
`;

const Description = styled.div`
  width: auto;
  font-size: 15px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 14px;
    width: auto;
  }
`;

const Video = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;

  iframe {
    width: 1920px;
    height: 720px;
    border-radius: 20px;

    @media (max-width: 768px) {
      width: 1080px;
      height: 240px;
    }
  }
`;

const Background = styled.div`
  left: 0px;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

export default Watch;
