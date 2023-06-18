import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function SearchFilter(props) {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <Wrapper>
        <FilterButtons>
          <SeasonName onClick={() => setFilter("all")}>All</SeasonName>
          <SeasonName onClick={() => setFilter("movies")}>Movies</SeasonName>
          <SeasonName onClick={() => setFilter("series")}>Series</SeasonName>
          <SeasonName onClick={() => setFilter("person")}>People</SeasonName>
        </FilterButtons>
      </Wrapper>
      {props.data &&
        props.data.filter((data) => {
          if (filter === "all") {
            return true;
          } else {
            return data.media_type === filter;
          }
        })}
    </>
  );
}

export default SearchFilter;

const FilterButtons = styled.div`
  display: grid;
  justify-content: center;
  margin-bottom: 20px;

  button {
    margin: 0 10px;
    padding: 5px 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      color: #f5c518;
      border-bottom: 2px solid #f5c518;
    }

    &.active {
      color: #f5c518;
      border-bottom: 2px solid #f5c518;
    }
  }
`;

const Container = styled.div``;

const Wrapper = styled.div`
  border: 2px solid #fff;
  margin: 5px;
  position: relative;
  cursor: pointer;
  background-color: #212121;
  grid-gap: 50px;
  align-items: center;
  width: 95%;
  color: #fff;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;

  @media (max-width: 768px) {
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #e50914;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const SeasonName = styled.span`
  font-size: 15px;
  width: 20rem;
  text-align: left;
  margin: 8px 0;
  padding: 4px 12px;

  @media (max-width: 768px) {
    margin: 0;
    margin: 8px 0;
    padding: 4px 12px;
    color: #fff;
    font-size: 14px;
    line-height: 1.2;
  }
`;
