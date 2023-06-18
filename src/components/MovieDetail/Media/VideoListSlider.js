import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const VideoListSlider = (props) => {
  const slider = React.useRef(null);
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

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    prevArrow: (
      <img
        src="/images/left-arrow-50-white.png"
        alt=""
        className="custom__arrows"
      />
    ),
    nextArrow: (
      <img
        src="/images/right-arrow-50-white.png"
        alt=""
        className="custom__arrows"
      />
    ),
  };

  return (
    <>
      <Wrapper>
        <VideoRow ref={slider} {...settings}>
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
        </VideoRow>
      </Wrapper>
    </>
  );
};

export default VideoListSlider;

const Wrapper = styled.div`
  cursor: pointer;
  max-width: 1000px;

  @media (max-width: 768px) {
    max-width: 380px;
  }
`;

const VideoRow = styled(Slider)`
  .slick-prev,
  .slick-next {
    width: 50px;
    height: 50px;
    z-index: 1;
    margin: -20px;

    @media (max-width: 1280px) {
      margin: 0;
    }
  }

  .slick-dots {
    position: absolute;
    bottom: -70px;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    z-index: 3;
  }

  .slick-dots li button:before {
    font-size: 5px;
    color: #fff;
  }

  .slick-dots li.slick-active button:before {
    font-size: 10px;
    color: #fff;
  }
`;

const Container = styled.div`
  position: relative;
  padding: 10px;
  align-items: center;
  z-index: 0;

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
  padding: 10px;
  position: relative;
  display: block;
  backface-visibility: hidden;
  object-fit: cover;
  width: 900px;
  height: 500px;
  border-radius: 20px;
  border: none;

  @media (max-width: 1280px) {
    border-radius: 0px;
    padding-right: 6px;
    object-fit: contain;
    width: 100%;
    height: 400px;
  }
`;

const Title = styled.h1`
  font-size: 20px;
`;
