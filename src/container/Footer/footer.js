import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import bg from "./footer-bg.jpg";
import styled from "styled-components";
import FooterSosmed from "./FooterSosmed";

const FooterContainer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <Brand>
        <a href="/">
          <BrandImage src="/images/realmoevan-text.png" alt="logo" />
        </a>
      </Brand>
      <div className="footer__content container">
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact us</Link>
            <Link to="/">Term of services</Link>
            <Link to="/about">About us</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/subscription">Premium</Link>
            <Link to="/">You must watch</Link>
            <Link to="/">Recent release</Link>
            <Link to="/">Top IMDB</Link>
          </div>
          <div className="footer__content__menu">
            <h2>Social Media</h2>
            <FooterSosmed />
          </div>
        </div>
      </div>
      <TMDBLogo>
        <p>Powered By:</p>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          <TMDBImage
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="TMDB"
          />
        </a>
      </TMDBLogo>
    </div>
  );
};

export default FooterContainer;

const Image = styled.img`
  width: 200px;
`;

const Brand = styled.div`
  width: 100px;
  height: 100%;

  display: grid;
  place-items: center;
  justify-content: flex-start;
  align-items: center;
`;

const BrandImage = styled.img`
  width: 350px;
  height: 100%;
  position: relative;
  left: -50px;
  object-fit: cover;

  @media only screen and (max-width: 768px) {
    width: 350px;
    height: auto;
  }
`;

const TMDBLogo = styled.div`
  display: grid;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  top: 30px;

  p {
    font-size: 15px;
    font-weight: 700;
    text-align: center;

    @media only screen and (max-width: 768px) {
      font-size: 0px;
      font-weight: 500;
      text-align: center;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 20px;
    display: flex;
  }
`;

const TMDBImage = styled.img`
  width: 140px;
  height: auto;
  position: relative;
  object-fit: cover;

  @media only screen and (max-width: 768px) {
    width: 200px;
    height: auto;
  }
`;
