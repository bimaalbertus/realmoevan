import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

function ScoreBreakdown() {
  const { id, category } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${category}/${id}?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id, category]);

  if (!movie) {
    return null;
  }

  const { vote_average, vote_count } = movie;

  return (
    <ScoreBreakdownWrapper>
      <ScoreBarWrapper>
        <ScoreLabel>Average Score:</ScoreLabel>
        <ScoreBar>
          <div
            style={{
              height: "100%",
              width: `${vote_average * 10}%`,
              backgroundColor: "#2196f3",
              position: "absolute",
            }}
          ></div>
        </ScoreBar>
        <ScoreValue>{vote_average}</ScoreValue>
      </ScoreBarWrapper>
      <ScoreBarWrapper>
        <ScoreLabel>Total Votes:</ScoreLabel>
        <ScoreBar>
          <div
            style={{
              height: "100%",
              width: `${(vote_count / 100000) * 100}%`,
              backgroundColor: "#2196f3",
              position: "absolute",
            }}
          ></div>
        </ScoreBar>
        <ScoreValue>{vote_count}</ScoreValue>
      </ScoreBarWrapper>
    </ScoreBreakdownWrapper>
  );
}

export default ScoreBreakdown;

const ScoreBreakdownWrapper = styled.div`
  position: absolute;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  animation: fadeIn 0.5s ease-in-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ScoreBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ScoreLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const ScoreBar = styled.div`
  height: 20px;
  width: 200px;
  background-color: #ddd;
  position: relative;
  margin-right: 10px;
`;

const ScoreValue = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
