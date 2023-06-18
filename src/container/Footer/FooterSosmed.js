import React from "react";
import styled from "styled-components";

const FooterSosmed = () => {
  return (
    <Container>
      <SocialMedia>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <img
            src="https://img.icons8.com/material-outlined/256/instagram-new.png"
            alt="Instagram Logo"
            className="social-media-icon"
          />
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
          <img
            src="https://img.icons8.com/material-sharp/256/twitter.png"
            alt="Twitter Logo"
            className="social-media-icon"
          />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <img
            src="https://img.icons8.com/ios-filled/256/facebook-new.png"
            alt="Facebook Logo"
            className="social-media-icon"
          />
        </a>
      </SocialMedia>
    </Container>
  );
};

export default FooterSosmed;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 5px;

  a {
    color: #fff;
    font-size: 24px;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translateY(-5px);
    }
  }

  img {
    background-color: #b2bfb5;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    margin-right: 10px;

    &:hover {
      background-color: #fff;
    }

    @media only screen and (max-width: 768px) {
      width: 30px;
      height: auto;
    }
  }
`;
