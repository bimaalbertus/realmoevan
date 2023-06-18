import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { imageApi } from "../../api/imageApi";
import styled from "styled-components";

// ----------------------------------------------------------------------

function Episode({
  seasonNumber,
  background,
  episode,
  season,
  handleUrl,
  selectedSeason,
}) {
  const { category, id } = useParams();
  const bg = episode.still_path ? episode.still_path : "";
  const backgroundTemp = bg ? bg : background;
  const episodeRef = useRef(null);
  const navigate = useNavigate();

  const handleSeason = () => {
    navigate(`/show/${id}/watch?season=${season}&episode=${episode}`);
  };

  const handleClick = () => {
    handleUrl(episode.season_number, episode.episode_number);
  };

  const episodeNumber = episode.episode_number
    ? `Episode ${episode.episode_number}`
    : "";

  return (
    <>
      <WrapperEpisode onClick={handleClick}>
        <img src={imageApi.w92Image(backgroundTemp)} alt="" />
        <EpisodeName>
          {episodeNumber} : {episode.name}
        </EpisodeName>
      </WrapperEpisode>
    </>
  );
}

export default Episode;

const Container = styled.div``;

const WrapperEpisode = styled.div`
  border: 2px solid #fff;
  margin: 5px;
  position: relative;
  display: flex;
  grid-template-columns: repeat(3, 1fr);
  cursor: pointer;
  background-color: #212121;
  grid-gap: 50px;
  align-items: center;
  width: 95%;
  color: #fff;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;

  @media (max-width: 768px) {
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #e50914;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const EpisodeName = styled.span`
  font-size: 15px;
  width: 20rem;
  text-align: left;
  align-items: center;
  margin: 8px 0;
  padding: 4px 12px;

  @media (max-width: 768px) {
    margin: 0;
    margin: 8px 0;
    padding: 4px 12px;
    color: #fff;
    font-size: 14px;
    line-height: 1.2;
  }
`;
