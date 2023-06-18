import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./slider.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
// import { sliderData } from "./slider-data";

const ImageSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Container>
      <Carousel {...settings}>
        <Wrap>
          <Link
            to="/movie/Thor:%20Love%20and%20Thunder"
            style={{ textDecoration: "none" }}
          >
            <img
              src={require("../../assets/images/banner/thorloveandthunder.jpg")}
              alt=""
            />
          </Link>
        </Wrap>

        <Wrap>
          <Link
            to="/movie/Doctor%20Strange%20in%20the%20Multiverse%20of%20Madness"
            style={{ textDecoration: "none" }}
          >
            <img
              src={require("../../assets/images/banner/drstrangemom.jpg")}
              alt=""
            />
          </Link>
        </Wrap>

        <Wrap>
          <Link
            to="/movie/Spider-Man:%20No%20Way%20Home"
            style={{ textDecoration: "none" }}
          >
            <img
              src={require("../../assets/images/banner/nowayhome.jpg")}
              alt=""
            />
          </Link>
        </Wrap>

        <Wrap>
          <Link to="/movie/900667" style={{ textDecoration: "none" }}>
            <img
              src={require("../../assets/images/banner/one piece red.jpg")}
              alt=""
            />
          </Link>
        </Wrap>

        {/* <Wrap>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={require("../../assets/images/banner/bttf.jpg")} alt="" />
            
          </Link>
      </Wrap> */}

        <Wrap>
          <Link to="/movie/Tremors" style={{ textDecoration: "none" }}>
            <img
              src={require("../../assets/images/banner/tremors new.jpg")}
              alt=""
            />
          </Link>
        </Wrap>

        <Wrap>
          <Link
            to="/movie/Minions:%20The%20Rise%20of%20Gru"
            style={{ textDecoration: "none" }}
          >
            <img
              src={require("../../assets/images/banner/minion-rise-of-gru.jpg")}
              alt=""
            />
          </Link>
        </Wrap>
        {/* 
      <Wrap>
          <Link to="/PeakyBlinders" style={{ textDecoration: 'none' }}>
            <img src={require("../../assets/images/banner/peakyblinders new.jpg")} alt="" />
            
          </Link>
      </Wrap> */}
      </Carousel>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px;
  margin-top: 0px;
  margin-bottom: 0px;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
`;

const Carousel = styled(Slider)`
  padding: 5px;
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
  }
  &:hover button {
    opacity: 1;
    transition: opacity 0.2s ease 0s;
  }
  ul li button {
    display: none;
  }
  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -3vw;
  }
  .slick-next {
    right: -3vw;
  }
`;

const Wrap = styled.div`
  border-radius: 40px;
  cursor: pointer;
  position: relative;
  a {
    border-radius: 4px;
    /* box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px; */
    cursor: pointer;
    display: block;
    position: relative;
    padding: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default ImageSlider;
