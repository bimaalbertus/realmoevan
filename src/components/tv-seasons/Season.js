import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Episode from "./Episode";
import { imageApi } from "../../api";
import tmdbApi from "../../api/tmdbApi";
import styled from "styled-components";

function Season({
  season,
  handleUrl,
  background,
  handleEpisodeClick,
  episode,
  handleClick,
  handleSeasonToggle,
}) {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [activeSeason, setActiveSeason] = useState(null);
  const navigate = useNavigate();
  const bgMovie = season.backdrop_path
    ? season.backdrop_path
    : season.poster_path;

  const handleSeason = (event) => {
    setDropdownOpen(!dropdownOpen);
    setActiveSeason(season.season_number);
  };

  const fetchEpisodes = async (seasonNumber) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=8260a7b490f140fde24b8a24b034994a&language=en-US`
      );
      const data = await response.json();
      return data.episodes;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const episodes = await fetchEpisodes(season.season_number);
      setEpisodes(episodes);
    };
    fetchData();
  }, [season.season_number]);

  const handleSeasonPlayer = () => {
    navigate(`/show/${id}/watch?season=1&episode=1`);
  };

  return (
    <>
      <Wrapper
        active={activeSeason === season.season_number}
        onClick={handleSeason}
      >
        <Image
          src={imageApi.w92Image(bgMovie ? bgMovie : background)}
          alt=""
          className="w-full transform duration-200 h-16 mt-812:h-20 object-cover group-hover:scale-110"
        />
        <SeasonName>{season.name}</SeasonName>
        <ArrowContainer>
          <SeasonArrow
            viewBox="0 0 24 24"
            style={{
              fill: "#000",
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <path d="m12 15.5l4.5-4.5l-1.425-1.4L12 12.675L8.925 9.6L7.5 11l4.5 4.5Zm0 6.5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"></path>
          </SeasonArrow>
        </ArrowContainer>
      </Wrapper>
      {dropdownOpen ? (
        <EpisodeContainer
          onClick={() => handleSeasonToggle(season.episode_number)}
        >
          <EpisodeWrapper>
            {episodes.map((episode) => (
              <Episode
                key={episode.id}
                episode={episode}
                background={background}
                handleUrl={handleUrl}
                seasonNumber={season.season_number}
              />
            ))}
          </EpisodeWrapper>
        </EpisodeContainer>
      ) : null}
    </>
  );
}

export default Season;

const Container = styled.div``;

const Wrapper = styled.div`
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

const SeasonName = styled.span`
  font-size: 15px;
  width: 20rem;
  text-align: left;
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

const Image = styled.img`
  display: block;
  backface-visibility: hidden;
  object-fit: cover;
  max-width: 92px;

  @media (max-width: 700px) {
    border-radius: 0px;
    padding-right: 6px;
    object-fit: contain;
  }
`;

const ArrowContainer = styled.div`
  margin: 8px 0;
  padding: 4px 12px;
`;

const SeasonArrow = styled.svg`
  background-color: #fff;
  border-radius: 40px;
  display: flex;
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease-in-out;

  ${({ dropdownOpen }) =>
    dropdownOpen &&
    `
    transform: rotate(180deg);
  `}
`;

const EpisodeList = styled.div`
  display: block;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;

  ${({ dropdownOpen }) =>
    dropdownOpen &&
    `
    max-height: 1000px;
  `}
`;

const EpisodeContainer = styled.div`
  color: #fff;
  font-size: 14px;
`;

const EpisodeWrapper = styled.div`
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  height: 71.5%;

  @media (max-width: 767px) {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
`;

const EpisodeTitle = styled.div`
  margin-bottom: 4px;
  font-weight: 500;
`;

const EpisodeDescription = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;
