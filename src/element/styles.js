import styled from "styled-components";
import Slider from "react-slick";

export const Container = styled.div`
  width: 100;
  margin-left: 50px;
`;

export const Content = styled(Slider)`
  gap: 25px;
  width: 89%;
  margin-top: 30px;
  display: flex;
  align-items: center;
`;

export const Wrap = styled.div`
  margin: 15px;
  border: 4px solid;
  border-radius: 8px;
  cursor: pointer;
  overflow-x: hidden;
  border: 4px solid rgba(249, 249, 249, 0.1);
  min-width: 200px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px;
  // use for transitions always
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  &:hover {
    transform: scale(1.02);
    border: 4px solid rgba(249, 249, 249, 0.8);
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px;
    z-index: 1000;
  }
  img {
    width: 100%;
    height: 100%;
    // fit the image as much as possible
    object-fit: cover;
  }
`;