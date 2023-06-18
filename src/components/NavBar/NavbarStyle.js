import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { BiMenuAltRight, BiMenu } from "react-icons/bi";

export const Nav = styled.nav`
  background: -webkit-linear-gradient(#040714, transparent);
  height: 70px;
  width: 100%;

  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${(props) => props.ss}px) {
    padding: 0 20px;
  }
`;

export const Brand = styled.div`
  width: 100px;
  height: 100%;

  display: grid;
  place-items: center;
`;

export const BrandImage = styled.img`
  width: 200px;
  height: auto;
  position: relative;
  left: 1rem;
  object-fit: cover;
`;

export const Menu = styled.ul`
  list-style: none;

  display: flex;
  align-items: center;
  column-gap: 10px;
  position: relative;
  margin-left: 100px;

  @media screen and (max-width: ${(props) => props.ss}px) {
    width: 100%;
    padding: 20px;
    flex-direction: column;

    background-color: #131a27;
    border-top: 1px solid #1f80e0;

    position: absolute;
    top: 50px;
    left: 0;
    z-index: ${(props) => (props.toggleMenu ? "1" : "-1")};

    transform: translateX(-100%) scale(0);
    transition: animation 0.3s ease-in, z-index 0.3s ease 0.5s;

    animation: ${(props) =>
      props.toggleMenu
        ? "menuOpen 0.5s linear forwards"
        : "menuClose 0.5s linear forwards"};

    @keyframes menuOpen {
      0% {
        transform: translateX(100%) scale(1);
      }
      50% {
        transform: translateX(50%) scale(1);
      }
      100% {
        transform: translateX(0%) scale(1);
      }
    }
    @keyframes menuClose {
      0% {
        transform: translateX(0%) scale(1);
      }
      50% {
        transform: translateX(50%) scale(1);
      }
      100% {
        transform: translateX(100%) scale(1);
      }
    }
  }
`;

export const MenuItems = styled.li`
  padding: 5px;

  @media screen and (max-width: ${(props) => props.ss}px) {
    opacity: ${(props) => (props.toggleMenu ? "1" : "0")};
    transition: 1s ease-in;
  }
`;

export const NavLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 5px;
  display: block;
  text-decoration: none;

  color: #c0c0c0;
  font-weight: 400;
  font-family: "DM Sans", sans-serif;

  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    transform-origin: bottom;
    transition: transform 0.2s;
  }
  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom;
  }

  &:hover {
    color: #ffff;
  }

  // &:before {
  // 	content: '';
  // 	width: 10px;
  // 	height: 10px;

  // 	position: absolute;
  // 	top: 0;
  // 	left: 0;

  // 	border-top: 1px solid #1F80E0;
  // 	border-left: 1px solid #1F80E0;

  // 	opacity: 0;
  // 	transition: 0.3s ease-out;
  // }

  // &:after {
  // 	content: '';
  // 	width: 10px;
  // 	height: 10px;

  // 	position: absolute;
  // 	bottom: 0;
  // 	right: 0;

  // 	border-bottom: 1px solid #1F80E0;
  // 	border-right: 1px solid #1F80E0;

  // 	opacity: 0;
  // 	transition: 0.3s ease-out;
  // }

  // &:hover:before,
  // &:hover:after {
  // 	opacity: 1;
  // }

  // &:active:before,
  // &:active:after {
  // 	opacity: 0;
  // }
`;

export const MobileMenuContainer = styled.div`
  width: 22px;
  height: 28px;

  position: relative;
  left: 15rem;
  display: ${(props) => (props.menu ? "grid" : "none")};
  place-items: center;

  cursor: pointer;
  overflow: hidden;

  &:hover > :last-child {
    transform: translateX(0%);
  }
`;

export const MobileMenu = styled(BiMenuAltRight)`
  font-size: 28px;
  align-items: right;
  justify-content: right;

  position: absolute;
`;

export const MobileMenuHover = styled(BiMenu)`
  font-size: 28px;

  position: absolute;

  transform: translateX(50%);
  transform-origin: left;
  transition: 0.3s ease-out;
`;

export const SignIn = styled.a`
  background: #4f80e0;
  padding: 8px 16px;
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  position: relative;
  right: -72rem;
  letter-spacing: 1.5px;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  text-decoration: none !important;

  &:hover {
    background: #none;
    color: #afafb0;
    border-color: transparent;
  }
`;

export const Subscribe = styled.a`
  background: linear-gradient(90deg, #6f80e0, #1fe6);
  padding: 2px 8px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
  position: relative;
  right: -70rem;
  letter-spacing: 1.5px;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  &:hover {
    background: #none;
    color: #131a27;
    border-color: transparent;
  }
`;

export const SearchContainer = styled.div``;
export const Search = styled.div`
  margin-left: 50px;
  color: white;
  border-radius: 20px;
  padding-right: 2rem;
  position: relative;
  cursor: pointer;
  border: 2px solid #afafb0;
  height: 40px;
  background-color: transparent;

  span {
    margin-bottom: 5px;
  }
  &:hover {
    background-color: white;
  }
  .search {
    color: white;
    font-size: 15px;
  }
  &:hover .search {
    color: #0c111b;
  }

  @media screen and (max-width: 768px) {
    padding-right: 1rem;
    margin-left: 150px;
    margin-right: 0;
  }
`;

export const Searchicon = styled(SearchIcon)`
  color: white;
  margin-bottom: 3px;
`;

export const UserImg = styled.img`
  height: 100%;
`;

export const DropDown = styled.div`
  position: absolute;
  top: 50px;
  right: 0px;
  color: #afafb0;
  background: rgb(29, 44, 63);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  padding: 10px;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0px;
  width: 95px;
  transition: none;
  opacity: 0;
  &:hover {
    color: #fff;
    transition: none;
  }
`;

export const SignOut = styled.div`
  position: relative;
  right: -73rem;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
