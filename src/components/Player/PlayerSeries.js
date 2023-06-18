import React from "react";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import {
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Season } from "../tv-seasons";
import { imageApi } from "../../api";
import RowPlayer from "./RowPlayer";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const PlayerSeries = (props, { url, seasonNumber, episodeNumber }) => {
  const { category, id } = useParams();
  const [movie, setMovie] = useState({
    genres: [],
  });
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [embedUrl, setEmbedUrl] = useState(
    seasons.seasonNumber,
    seasons.episodeNumber
  );

  const req = {
    fetchSimilar: `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}`,
    fetchReccomend: `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}`,
  };

  const fetchSeasons = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=8260a7b490f140fde24b8a24b034994a&append_to_response=seasons`
      );
      const data = await response.json();
      setMovie(data);
      setSeasons(data.seasons);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  useEffect(() => {
    if (selectedEpisode) {
      const url = `https://autoembed.to/tv/tmdb/${id}-${selectedEpisode.season}-${selectedEpisode.episode}`;
      setEmbedUrl(url);
    } else {
      console.log("Error Getting Movie!");
    }
  }, [selectedEpisode, id]);

  const handleSeasonToggle = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
    setSelectedEpisode(null);
  };

  const handleUrl = (
    season = selectedSeason,
    episode = selectedEpisode?.episode || 1
  ) => {
    setSelectedEpisode({ season: season, episode: episode });
  };

  return (
    <>
      <Wrapper>
        <>
          <Content>
            <Left>
              <div className="video-wrapper">
                <iframe
                  src={embedUrl}
                  title="Real Moev Player"
                  seasons={selectedSeason}
                  handleUrl={handleUrl}
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </Left>
            <Right>
              <DetailContainer>
                <h1>{movie.title || movie.name}</h1>
                {movie.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
                <span>·</span>
                <span>{movie.first_air_date?.substring(0, 4)}</span>
                <Description>{movie.overview}</Description>
              </DetailContainer>
              <SeasonsWrapper>
                <span className="other-episodes">Other Episodes</span>
                <div>
                  {seasons.map((season) => (
                    <Season
                      onClick={() => handleSeasonToggle(season.season_number)}
                      key={season.id}
                      season={season}
                      category={category}
                      id={id}
                      handleUrl={handleUrl}
                    />
                  ))}
                </div>
              </SeasonsWrapper>
            </Right>
          </Content>
        </>
      </Wrapper>
      <RowContainer>
        <RowPlayer title={"Recommendation"} fetchurl={req.fetchReccomend} />
        <RowPlayer title={"Similar"} fetchurl={req.fetchSimilar} />
      </RowContainer>
    </>
  );
};

export default PlayerSeries;

const DetailContainer = styled.div`
  align-items: top;
  overflow: hidden;
  padding: 20px;
  margin-top: -50px;
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

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: 40px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${({ bg }) => (bg ? `url(${bg})` : "none")};
  background-size: cover;
  background-position: center center;
  filter: blur(10px);
  z-index: -1;
`;

const Content = styled.div`
  display: grid;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Left = styled.div`
  padding: 20px;
  display: flex;
  width: 100%;

  .video-wrapper {
    position: relative;
    padding-bottom: 40%;
    height: 0;
    width: 100%;
  }

  .video-wrapper iframe {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 767px) {
    width: 100%;
    height: 50%;
  }
`;

const Right = styled.div``;

const SeasonsWrapper = styled.div`
  margin-top: 20px;
  padding: 10px;
  width: 40%;
  overflow-y: hidden;
  border: 2px solid #fff;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);

  .other-episodes {
    font-family: roboto;
    font-size: 30px;
    margin: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
`;
