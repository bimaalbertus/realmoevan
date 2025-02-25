import styled from "styled-components";
import { Link } from "react-router-dom";

const Viewers = (props) => {
  return (
    <Container>
      <Wrap>
        <Link to="/disney">
          <img src="/images/viewers-disney.png" alt="" />
          <video autoPlay={true} loop={true} playsInline={true}>
            <source src="/videos/1564674844-disney.mp4" type="video/mp4" />
          </video>
        </Link>
      </Wrap>
      <Wrap>
        <Link to="/pixar">
          <img src="/images/viewers-pixar.png" alt="" />
          <video autoPlay={true} loop={true} playsInline={true}>
            <source src="/videos/1564676714-pixar.mp4" type="video/mp4" />
          </video>
        </Link>
      </Wrap>
      <Wrap>
        <Link to="/marvel">
          <img src="/images/viewers-marvel.png" alt="" />
          <video autoPlay={true} loop={true} playsInline={true}>
            <source src="/videos/1564676115-marvel.mp4" type="video/mp4" />
          </video>
        </Link>
      </Wrap>
      <Wrap>
        <Link to="/dreamworks">
          <img src="/images/DreamWorks-Animation-Logo.png" alt="" />
          <video autoPlay={true} loop={true} playsInline={true} muted>
            <source
              src="/videos/DreamWorks 2004 logo but there's nothing but clouds..mp4"
              type="video/mp4"
            />
          </video>
        </Link>
      </Wrap>
      {/* <Wrap>
        <Link to="/query=Star%20Wars">
          <img src="/images/viewers-starwars.png" alt="" />
          <video autoPlay={true} loop={true} playsInline={true}>
            <source src="/videos/1608229455-star-wars.mp4" type="video/mp4" />
          </video>
        </Link>
      </Wrap> */}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 30px;
  padding: 20px;
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  background-color: #0f6292;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    img {
      opacity: 0;
    }
    video {
      opacity: 1;
    }
  }
`;

const Judul = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: #fff;
  position: relative;
  bottom: 30px;
  margin-top: 0px;
  margin-bottom: 0px;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  background-position: left top;
  background-repeat: repeat;
  padding: 20px;
`;

export default Viewers;
