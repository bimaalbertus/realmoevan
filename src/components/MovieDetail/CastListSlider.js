import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlaceHolderImage from "../../assets/images/misc/loading-poster.jpg";

const CastListSlider = (props) => {
  const slider = React.useRef(null);
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
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
    beforeChange: (current, next) => {
      const prevButton = document.querySelector(".slick-prev");
      const nextButton = document.querySelector(".slick-next");
      if (next === 0) {
        prevButton.style.display = "none";
      } else {
        prevButton.style.display = "block";
      }
      if (next === casts.length - settings.slidesToShow) {
        nextButton.style.display = "none";
      } else {
        nextButton.style.display = "block";
      }
    },
  };

  return (
    <>
      <Title>Casts :</Title>
      <Wrapper>
        <CastRow ref={slider} {...settings}>
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
                    placeholderSrc={PlaceHolderImage}
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

export default CastListSlider;

const Wrapper = styled.div`
  cursor: pointer;
  max-width: 80%;

  @media (max-width: 768px) {
    max-width: 350px;
  }
`;

const CastRow = styled(Slider)`
  .slick-prev,
  .slick-next {
    width: 30px;
    height: 30px;
    z-index: 1;
    position: absolute;
    top: 35%;
  }
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

  @media (max-width: 768px) {
    pointer-events: none;
  }

  .info {
    @media (max-width: 1000px) {
      display: none;
    }
  }
`;

const Image = styled(LazyLoadImage)`
  position: relative;
  display: block;
  backface-visibility: hidden;
  object-fit: cover;
  width: 150px;
  height: auto;
  transition: transform 100ms 0s;
  transition: 0.5s ease;

  @media (max-width: 768px) {
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
  font-size: 20px;
`;
