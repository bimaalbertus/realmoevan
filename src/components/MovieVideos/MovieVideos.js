import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import leftArrow from "../../assets/images/icons/left-arrow-50-white.png";
import rightArrow from "../../assets/images/icons/right-arrow-50-white.png";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

function MovieVideos() {
  const { id, category } = useParams();
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    const endpoint = category === "movie" ? "movie" : "tv";
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${endpoint}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      setVideos(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideos(id);
  }, [id]);

  return (
    <>
      <Title>Videos and Extras</Title>
      <Wrapper>
        <VideosRow>
          {videos.map((video, i) => (
            <div key={video.id}>
              <Container key={i}>
                <Videos
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allowFullScreen
                />
              </Container>
            </div>
          ))}
        </VideosRow>
      </Wrapper>
    </>
  );
}

export default MovieVideos;

const Wrapper = styled.div`
  cursor: pointer;
  overflow-x: scroll;
  width: 100%;
  padding: 40px;
`;

const VideosRow = styled.div`
  display: flex;
  width: max-content;
`;

const Container = styled.div`
  position: relative;
  padding: 10px;
  align-items: center;
  z-index: 0;
  min-height: 200px;

  &:hover {
    z-index: 2;
  }

  &:hover .image {
    transform: scale(1.07);
    border-radius: 0;
  }

  @media (max-width: 700px) {
    pointer-events: none;
  }

  .info {
    @media (max-width: 1000px) {
      display: none;
    }
  }
`;

const Videos = styled.iframe`
  position: relative;
  display: block;
  backface-visibility: hidden;
  object-fit: cover;
  width: 1000px;
  height: 500px;
  border-radius: 20px;

  @media (max-width: 700px) {
    border-radius: 0px;
    padding-right: 6px;
    object-fit: contain;
  }
`;

const Title = styled.h1`
  padding: 40px;
`;
