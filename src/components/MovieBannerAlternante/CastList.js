import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CastList = (props) => {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const apiEndpoint =
      category === "movie"
        ? `https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=8260a7b490f140fde24b8a24b034994a`
        : `https://api.themoviedb.org/3/tv/${props.id}/credits?api_key=8260a7b490f140fde24b8a24b034994a`;

    const getCredits = async () => {
      const res = await fetch(apiEndpoint);
      const data = await res.json();
      setCasts(data.cast);
    };
    getCredits();
  }, [category, props.id]);

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  return (
    <>
      <Title>Casts :</Title>
      <Wrapper>
        <CastRow>
          {casts.map((item, i) => (
            <Link
              to={`/person/${item.id}-${slugify(item.name?.toLowerCase())}`}
            >
              <div key={item.id}>
                <Container key={i}>
                  <Image
                    className="image"
                    src={`https://image.tmdb.org/t/p/w780${item.profile_path}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/can't found the image.jpg";
                    }}
                    loading="lazy"
                    alt=" "
                  />
                  <CastName>{item.name}</CastName>
                  <Character>{item.character}</Character>
                </Container>
              </div>
            </Link>
          ))}
        </CastRow>
      </Wrapper>
    </>
  );
};

export default CastList;

const Wrapper = styled.div`
  cursor: pointer;
  overflow-x: scroll;
  width: 100%;
  padding: 40px;
`;

const CastRow = styled.div`
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

const CastName = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  text-align: left;
`;
const Character = styled.p`
  max-width: 250px;
  font-size: 13px;
  margin-top: 20px;
  text-align: left;
`;

const Title = styled.h1`
  padding: 40px;
`;
