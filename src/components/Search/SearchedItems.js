/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

function SearchedItems(props) {
  const baseUrl = "https://image.tmdb.org/t/p/w780/";
  const [filter, setFilter] = useState("all");

  const [movie, setMovies] = useState([]);
  const [showTheMovies, setShowTheMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(props.fetchurl);
      const data = req.data.results.map((item) => {
        const { id, title, name, poster_path, first_air_date } = item;
        let url;
        if (first_air_date) {
          url = `/show/${id}-${slugify(name?.toLowerCase())}`;
        } else {
          url = `/movie/${id}-${slugify(title?.toLowerCase())}`;
        }
        return {
          id,
          title: title?.toLowerCase(),
          name: name?.toLowerCase(),
          poster_path,
          url,
          release_date: item.release_date || item.first_air_date,
          vote_average: item.vote_average,
          category: item.media_type === "tv" ? "Show" : "Movie",
        };
      });
      setMovies(data);
      setShowTheMovies(true);
      setIsLoading(false);
      return req;
    }

    fetchData();
  }, [props.fetchurl]);

  const filteredData =
    props.data &&
    props.data.filter((data) => {
      if (filter === "all") {
        return true;
      } else {
        return data.media_type === filter;
      }
    });

  return (
    <Container>
      <Content>
        <Left>
          <h2>Search Results</h2>
          <FilterWrapper>
            <FilterButtons>
              <FilterName onClick={() => setFilter("all")}>
                All
                <span className="count">{props.data?.length}</span>
              </FilterName>
              <FilterName onClick={() => setFilter("movie")}>
                Movies
                <span className="count">
                  {
                    props.data?.filter((data) => data.media_type === "movie")
                      .length
                  }
                </span>
              </FilterName>
              <FilterName onClick={() => setFilter("tv")}>
                Series
                <span className="count">
                  {
                    props.data?.filter((data) => data.media_type === "tv")
                      .length
                  }
                </span>
              </FilterName>
              <FilterName onClick={() => setFilter("person")}>
                People
                <span className="count">
                  {
                    props.data?.filter((data) => data.media_type === "person")
                      .length
                  }
                </span>
              </FilterName>
            </FilterButtons>
          </FilterWrapper>
        </Left>
        <ItemContainer>
          {props.data &&
            props.data
              .filter((data) => {
                if (filter === "all") {
                  return true;
                } else {
                  return data.media_type === filter;
                }
              })
              .map((data) => {
                let posterUrl = "";
                if (data.media_type === "tv" || data.media_type === "movie") {
                  posterUrl = data.poster_path
                    ? `${baseUrl}${data.poster_path}`
                    : "/images/can't found the image.jpg";
                } else if (data.media_type === "person") {
                  posterUrl = data.profile_path
                    ? `${baseUrl}${data.profile_path}`
                    : "/images/can't found the image.jpg";
                }

                let url = "";
                if (data.media_type === "tv" || data.media_type === "movie") {
                  url = data.first_air_date
                    ? `/show/${data.id}-${slugify(data.name)}`
                    : `/movie/${data.id}-${slugify(data.title)}`;
                } else if (data.media_type === "person") {
                  url = `/person/${data.id}-${slugify(
                    data.name?.toLowerCase()
                  )}`;
                }

                return (
                  <Link to={url} key={data.id}>
                    <Detail>
                      <Image
                        src={posterUrl}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/can't found the image.jpg";
                        }}
                        alt={data.original_title || data.original_name}
                        loading="lazy"
                      />
                    </Detail>
                    <DetailContainer>
                      <span className="movie-title">
                        {data.title || data.name}
                      </span>
                    </DetailContainer>
                  </Link>
                );
              })}
        </ItemContainer>
      </Content>
    </Container>
  );
}

export default SearchedItems;

const Container = styled.div`
  margin-bottom: 100px;
  margin-top: 100px;
`;

const Left = styled.div`
  padding: 20px;
  display: grid;
  height: 100%;

  @media (max-width: 767px) {
    width: 100%;
    height: 50%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-width: 768px) {
    /* Ketika lebar layar lebih besar dari 768px, flex direction menjadi row */
    flex-direction: row;
  }
`;

const FilterWrapper = styled.div`
  border: 1px solid #fff;
  border-radius: 10px;
  margin: 5px;
  position: relative;
  cursor: pointer;
  background-color: #112;
  align-items: center;
  color: #fff;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;

  @media (max-width: 768px) {
  }
`;

const FilterName = styled.span`
  font-size: 15px;
  width: 20rem;
  text-align: left;
  margin: 8px 0;
  padding: 4px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    color: #000;
    background-color: #c0c0c0;

    &:hover {
      .count {
        background-color: #fff;
      }
    }
  }

  .count {
    display: inline-block;
    background-color: #c0c0c0;
    color: #000;
    border-radius: 5px;
    padding: 0 8px;
    margin-left: 5px;
  }

  @media (max-width: 768px) {
    width: auto;
    margin: 0;
    margin: 8px 0;
    padding: 4px 12px;
    color: #fff;
    font-size: 14px;
    line-height: 1.2;
  }
`;

const FilterButtons = styled.div`
  display: grid;
  justify-content: center;

  button {
    margin: 0 10px;
    padding: 5px 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }
`;

const ItemContainer = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const Detail = styled.div`
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: transform 100ms 0s;
  transition: 0.5s ease;

  &:hover {
    border-radius: 0px;
    transform: scale(1.05);
  }
`;
const Image = styled.img`
  backface-visibility: hidden;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 100ms 0s;
  transition: 0.5s ease;

  @media (max-width: 768px) {
    border-radius: 0px;
    padding-right: 6px;
    object-fit: contain;
  }
`;

const DetailContainer = styled.div`
  width: 100%;
  margin-top: 10px;

  .movie-title {
    text-transform: capitalize;
    font-size: 20px;
    position: relative;
    flex: 1;
    top: 10px;

    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
`;
