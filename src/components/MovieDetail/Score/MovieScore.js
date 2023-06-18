import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ScoreBreakdown from "./ScoreBreakdown";
import CloseIcon from "@material-ui/icons/Close";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const MovieScore = () => {
  const { category, id } = useParams();
  const [movie, setMovie] = useState({
    genres: [],
  });

  useEffect(() => {
    if (category === "movie") {
      getData();
    } else {
      getDataShow();
    }
    window.scrollTo(0, 0);
  }, [id, category]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
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
        setMovie(data);
      });
  };

  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);

  const handleShowScoreBreakdown = () => {
    setShowScoreBreakdown(true);
  };

  const handleCloseScoreBreakdown = () => {
    setShowScoreBreakdown(false);
  };

  return (
    <div>
      <MovieRatingRounded onClick={handleShowScoreBreakdown}>
        <CircularProgressbar
          className="circuralBar"
          minValue={0}
          maxValue={100}
          value={movie.vote_average * 10} // kali 10 karena skala nilai pada API TMDb adalah 0 hingga 10
          text={
            movie.vote_average === 0
              ? "0%"
              : `${Math.round(movie.vote_average * 10)}%`
          }
          styles={buildStyles({
            strokeLinecap: "round",
            textSize: "25px",
            pathColor: "#21D07A",
            textColor: "white",
            trailColor: "#204529",
            style: {
              zIndex: -1,
            },
          })}
        />
      </MovieRatingRounded>
      {showScoreBreakdown && (
        <>
          <CloseButton onClick={handleCloseScoreBreakdown}>
            <CloseIcon />
          </CloseButton>
          <ScoreBreakdown id={id} category={category} />{" "}
        </>
      )}
    </div>
  );
};

export default MovieScore;

const PopUpContainer = styled.div``;

const MovieRatingRounded = styled.div`
  position: relative;
  z-index: 0;
  top: -30px;
  right: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  align-items: center;
  margin-left: 20px;

  &:hover .circuralBar {
    transform: scale(1.1);
    border-radius: 20px;
  }

  .circuralBar {
    width: 80px;
    height: 80px;
    background-color: #081c22;
    border: 4px solid #081c22;
    border-radius: 40px;
    text-anchor: middle;
    dominant-baseline: middle;
    transition: transform 100ms 0s;
    transition: 0.5s ease;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  color: #f12;

  &:hover {
    color: #ff69b4;
  }
`;
