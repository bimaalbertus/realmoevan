import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PersonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Detail = styled.div`
  margin: 10px;
  width: 180px;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const SearchedPerson = (props) => {
  const baseUrl = "https://image.tmdb.org/t/p/w500/";
  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  return (
    <Container>
      <PersonContainer>
        {props.data &&
          props.data.map((person) => {
            const profileUrl = person.profile_path
              ? `${baseUrl}${person.profile_path}`
              : "/images/cant-find-image.jpg";

            const url = `/person/${person.id}-${slugify(person.name)}`;

            return (
              <Link to={url} key={person.id}>
                <Detail>
                  <Image
                    src={profileUrl}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/cant-find-image.jpg";
                    }}
                    alt={person.name}
                    loading="lazy"
                  />
                </Detail>
              </Link>
            );
          })}
      </PersonContainer>
    </Container>
  );
};

export default SearchedPerson;
