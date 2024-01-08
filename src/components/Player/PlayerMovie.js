import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RowPlayer from "./RowPlayer";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

export default function Player() {
  const { id } = useParams();
  const { category } = useParams();
  const [movie, setMovie] = useState({
    genres: [],
  });
  const req = {
    fetchSimilar: `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`,
    fetchReccomend: `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`,
  };

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <>
      <VideoContainer>
        <Video>
          <div className="video-wrapper">
            <iframe
              src={`https://multiembed.mov/?video_id=${id}&tmdb=1`}
              title="GO-Watch Video Player"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
            ></iframe>
          </div>
        </Video>
      </VideoContainer>
      <DetailContainer>
        <h1>{movie.title || movie.name}</h1>
        {movie.genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
        <span>·</span>
        <span>{movie.release_date?.substring(0, 4)}</span>
        <Description>{movie.overview}</Description>
      </DetailContainer>
      <RowContainer>
        <RowPlayer title={"Recommendation"} fetchurl={req.fetchReccomend} />
        <RowPlayer title={"Similar"} fetchurl={req.fetchSimilar} />
      </RowContainer>
    </>
  );
}

const DetailContainer = styled.div`
  align-items: top;
  overflow: hidden;
  padding: 60px;
  margin-top: -100px;
  position: relative;

  h1 {
    margin-bottom: 10px;
  }

  span {
    color: #f87;
    font-weight: 700;
    font-size: 20px;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    margin-top: 5px;
  }
`;

const Description = styled.div`
  width: auto;
  font-size: 15px;
  font-weight: 300;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
    width: auto;
  }
`;

const RowContainer = styled.main`
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

const VideoContainer = styled.div`
  overflow: hidden;
  padding: 40px;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 5px;
  }
`;

const Video = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .video-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    display: flex;
    justify-content: center;
  }

  .video-wrapper iframe {
    width: 1280px;
    height: 720px;
    max-width: 100%;
    max-height: calc((100vw - 40px) / (16 / 9));
  }

  @media (max-width: 767px) {
    width: 100%;
    height: 50%;
  }
`;
