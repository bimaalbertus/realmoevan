import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

function PersonImages() {
  const { id } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setImages(data.profiles));
  }, [id, API_KEY]);

  return (
    <MovieWrapper>
      <h1>Photos</h1>
      <MovieRow>
        {images.map((image) => (
          <div key={image.id}>
            <Container>
              <Image
                key={image.file_path}
                src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                alt={image.file_path}
              />
            </Container>
          </div>
        ))}
      </MovieRow>
    </MovieWrapper>
  );
}

export default PersonImages;

const MovieWrapper = styled.div`
  overflow-x: scroll;
  width: 100%;
  padding: 40px;
`;

const MovieRow = styled.div`
  display: flex;
  width: max-content;
`;

const Container = styled.div`
  position: relative;
  padding: 10px;
  align-items: center;
  z-index: 1;
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

const Image = styled.img`
  position: relative;
  display: block;
  backface-visibility: hidden;
  object-fit: cover;
  width: 250px;
  height: auto;
  transition: transform 100ms 0s;
  transition: 0.5s ease;
  border-radius: 20px;

  @media (max-width: 700px) {
    border-radius: 0px;
    padding-right: 6px;
    object-fit: contain;
  }
`;
