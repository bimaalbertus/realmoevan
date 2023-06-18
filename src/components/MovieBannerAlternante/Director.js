import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const Director = () => {
  const { id, category } = useParams();
  const [director, setDirector] = useState({});
  const [directorImage, setDirectorImage] = useState("");

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        let url;
        if (category === "movie") {
          url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
        } else if (category === "tv") {
          url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`;
        }

        const response = await axios.get(url);
        const crew = response.data.crew;
        const director = crew.find((member) => member.job === "Director");
        const tvDirector = crew.find(
          (member) => member.job === "Executive Producer"
        );
        setDirector(director || tvDirector || {});
        setDirectorImage(
          director.profile_path || tvDirector.profile_path || ""
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchCredits();
  }, [id, category]);

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  return (
    <>
      {directorImage && (
        <DirectorContainer>
          <h2>Director:</h2>
          <Link
            to={`/person/${director.id}-${slugify(
              director.name?.toLowerCase()
            )}`}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w780${directorImage}`}
              alt={director.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/can't found the image.jpg";
              }}
              loading="lazy"
            />
          </Link>
          <DirectorName>{director.name}</DirectorName>
        </DirectorContainer>
      )}
    </>
  );
};

export default Director;

const DirectorName = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  text-align: left;
`;

const DirectorContainer = styled.div`
  width: 300px;
  position: relative;
  padding: 40px;
  align-items: center;
  min-height: 200px;

  &:hover {
    z-index: 2;
  }

  &:hover .image {
    transform: scale(1.07);
    border-radius: 0;
  }

  @media (max-width: 700px) {
    pointer-events: none;
  }

  .info {
    @media (max-width: 1000px) {
      display: none;
    }
  }
`;

const Image = styled.img`
  position: relative;
  display: block;
  backface-visibility: hidden;
  object-fit: cover;
  width: 250px;
  height: auto;
  transition: transform 100ms 0s;
  transition: 0.5s ease;
  border-radius: 20px;

  &:hover {
    transform: scale(1.07);
    border-radius: 0;
  }

  @media (max-width: 700px) {
    border-radius: 0px;
    padding-right: 6px;
    object-fit: contain;
  }
`;
