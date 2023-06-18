import styled, { css, keyframes } from "styled-components";
import SearchIcon from "./icons/search";
import ArrowRightIcon from "./icons/arrowRight";

export const Container = styled.form`
  position: relative;
  top: 5px;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  border-radius: 50px;
  border: 4px solid #01addd;
  padding: 5px;
  background: #112;
  transition: all 0.5s;
  z-index: 2;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

export const SearchInput = styled.input`
  position: absolute;
  background-color: rgb(255, 255, 255);
  top: 0;
  left: 0;
  width: 100%;
  height: 37px;
  line-height: 30px;
  outline: 0;
  border: 0;
  font-size: 17px;
  border-radius: 20px;
  padding: 0 20px;
  margin: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  // display: ${(props) => (props.showSearchInput ? "block" : "none")};
`;

export const SearchButton = styled.span`
  position: absolute;
  background: linear-gradient(to right, #1dd4ab, #01addd);
  color: #fff;
  top: 0;
  right: 0;
  width: 100px;
  height: 37px;
  line-height: 30px;
  font-size: 17px;
  border-radius: 20px;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  transition: all 0.5s ease-in-out;

  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
    background: linear-gradient(to right, #1ab393, #0198c6);
  }

  p {
    text-align: center;
    position: relative;
    bottom: 14px;
  }
`;

/** icons */
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const IconCommonCss = css`
  height: 1.25rem;
  width: 1.25rem;
  fill: #00adb5;
  z-index: 10;
  animation: ${fadeIn} 1s linear;
`;

export const IconMagnifyingGlass = styled(SearchIcon)`
  margin-bottom: 3px;
  ${IconCommonCss}
`;

export const IconRightArrow = styled(ArrowRightIcon)`
  ${IconCommonCss}
  margin-bottom: 3px;
  align-self: flex-end;
  cursor: pointer;
  &:hover {
    fill: #393e46;
  }
`;

// ${({ hover }) =>
// hover &&
// css`
//   width: 50%;
//   border: 4px solid #00adb5;

//   @media (min-width: 768px) {
//     width: 80%;
//   }
// `}
