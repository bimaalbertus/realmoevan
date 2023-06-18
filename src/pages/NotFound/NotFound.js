import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Page from "../../components/page";
import styled from "styled-components";
import WebFont from "webfontloader";

function PageNotFound404() {
  const [showVideo, setShowVideo] = useState(false);

  function handleClickNo() {
    setShowVideo(true);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Press Start 2P"],
      },
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page title={`Page Not Found`}>
      <Container>
        <Wrapper>
          <ImageContainer>
            <img
              src="https://assets.codepen.io/5647096/backToTheHomepage.png"
              alt="Back to the Homepage"
            />
            <img
              src="https://assets.codepen.io/5647096/Delorean.png"
              alt="El Delorean, El Doc y Marti McFly"
            />
          </ImageContainer>
          <TextContainer>
            <h1>404</h1>
            <h2>PAGE NOT FOUND</h2>
            <h3>BACK TO HOME?</h3>
            <Link to="/">
              <span>YES</span>
            </Link>
            <span onClick={handleClickNo}>NO</span>
          </TextContainer>
          {showVideo && (
            <VideoPopup>
              <VideoWrapper>
                <IconButton
                  className="btn"
                  style={{ float: "left" }}
                  onClick={() => setShowVideo(false)}
                >
                  <HighlightOffIcon
                    style={{ fontSize: "50px", color: "#d9534f" }}
                  />
                </IconButton>
                <video controls autoPlay>
                  <source src="/videos/rickroll.mp4" />
                </video>
              </VideoWrapper>
            </VideoPopup>
          )}
        </Wrapper>
      </Container>
    </Page>
  );
}

const Container = styled.div`
padding: 0;
margin: 0;
box-sizing: border-box;
font-family: 'Press Start 2P';
color: #FFFFFF;
text-align: center;
background-color: #000000;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='58' viewBox='0 0 42 58'%3E%3Cg fill='%23dddcdd' fill-opacity='0.23'%3E%3Cpath fill-rule='evenodd' d='M12 18h12v18h6v4H18V22h-6v-4zm-6-2v-4H0V0h36v6h6v36h-6v4h6v12H6v-6H0V16h6zM34 2H2v8h24v24h8V2zM6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM2 50h32v-8H10V18H2v32zm28-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'/%3E%3C/g%3E%3C/svg%3E");
}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5%;
  height: 100vh;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: space-around;
  }
`;

const TextContainer = styled.div`
  height: 50vh;

  span {
    border: 2px solid #fff;
    padding: 10px;
    text-decoration: none;
    margin-right: 20px;
    margin-left: 10px;
    cursor: pointer;

    &:hover {
      color: #fff;
      background-color: red;
      text-decoration: none;
    }
  }

  h1 {
    color: #f12;
    font-size: 100px;

    @media only screen and (max-width: 768px) {
      font-size: 50px;
    }
  }

  h2 {
    font-size: 50px;

    @media only screen and (max-width: 768px) {
      font-size: 25px;
    }
  }

  h1,
  h2,
  h3 {
    margin-bottom: 40px;
  }
`;

const VideoPopup = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 46.25%; /* 16:9 aspect ratio */
  height: 0;
  width: 80%;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .btn {
    z-index: 999;
  }
`;

const ImageContainer = styled.div`
  @media only screen and (max-width: 768px) {
    img {
      width: 70vw;
      height: auto;
    }
  }
`;

export default PageNotFound404;
