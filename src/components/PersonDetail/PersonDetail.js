import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import FooterContainer from "../../container/Footer/footer";
import Navbar from "../NavBar/Navbar";
import Page from "../page";
import { format } from "date-fns";
import LoadingPage from "../../utils/LoadingPage/LoadingPage";
import PersonImages from "./PersonImage";

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const PersonDetail = ({ match }) => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [setPreloader] = useState(true);
  const [socialMedia, setSocialMedia] = useState({});
  const [isDirector, setIsDirector] = useState();
  const [directedCredits, setDirectedCredits] = useState();

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setPerson(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();

        const movies = data.cast
          .filter((item) => item.media_type === "movie")
          .map((item) => ({
            id: item.id,
            title: item.title,
            poster_path: item.poster_path,
            release_date: item.release_date,
            vote_average: item.vote_average,
            category: "Movie",
            url: `/movie/${item.id}-${slugify(item.title?.toLowerCase())}`,
          }));

        const tvShows = data.cast
          .filter((item) => item.media_type === "tv")
          .map((item) => ({
            id: item.id,
            title: item.original_name,
            poster_path: item.poster_path,
            release_date: item.first_air_date,
            vote_average: item.vote_average,
            category: "TV Show",
            url: `/show/${item.id}-${slugify(
              item.original_name?.toLowerCase()
            )}`,
          }));

        const directedMovies = data.crew
          .filter((item) => item.job === "Director")
          .map((item) => ({
            id: item.id,
            title: item.title,
            poster_path: item.poster_path,
            release_date: item.release_date,
            vote_average: item.vote_average,
            category: "Movie",
            url: `/movie/${item.id}-${slugify(item.title?.toLowerCase())}`,
          }));

        const directedTVShows = data.crew
          .filter((item) => item.job === "Executive Producer")
          .map((item) => ({
            id: item.id,
            title: item.original_name,
            poster_path: item.poster_path,
            release_date: item.first_air_date,
            vote_average: item.vote_average,
            category: "TV Show",
            url: `/show/${item.id}-${slugify(
              item.original_name?.toLowerCase()
            )}`,
          }));

        const combinedCredits = [...movies, ...tvShows];
        setMovies(combinedCredits);
        setDirectedCredits(directedMovies, directedTVShows);
        setIsDirector(directedMovies.length > 0);
        setPreloader(false);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSocialMedia = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${API_KEY}`
        );
        const data = await response.json();
        setSocialMedia(data);
      } catch (error) {
        console.error(error);
      }
    };

    Promise.all([fetchPerson(), fetchMovies(), fetchSocialMedia()]);
  }, [id]);

  if (!person) {
    return <LoadingPage />;
  }

  const age =
    person.deathday === null
      ? Math.floor(
          (new Date() - new Date(person.birthday)) / 31557600000 // 1 year in milliseconds
        )
      : `passed away at the age of ${Math.floor(
          (new Date(person.deathday) - new Date(person.birthday)) / 31557600000 // 1 year in milliseconds
        )}`;

  const googleClick = () => {
    const googleSearchUrl = `https://www.google.com/search?q=${person.name}`;
    window.open(googleSearchUrl, "_blank");
  };

  return (
    <Page title={`${person.name}`}>
      <Wrapper>
        <ProfileImage
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "../assets/images/default.jpg";
          }}
          alt={person.name}
          onClick={googleClick}
        />
        <PersonInfoWrapper>
          <PersonName>{person.name}</PersonName>
          <DetailItem>
            <DetailTitle>Born:</DetailTitle>
            <DetailValue>
              {person.birthday
                ? format(new Date(person.birthday), "dd MMMM yyyy", {})
                : "-"}
              , {person.place_of_birth}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailTitle>Age:</DetailTitle>
            <DetailValue>{age}</DetailValue>
          </DetailItem>
          {person.deathday && (
            <>
              <DetailItem>
                <DetailTitle>Died:</DetailTitle>
                <DetailValue>
                  {format(new Date(person.deathday), "dd MMMM yyyy", {})}
                </DetailValue>
              </DetailItem>
            </>
          )}
          <DetailItem>
            <DetailTitle>Known for:</DetailTitle>
            <DetailValue>{person.known_for_department}</DetailValue>
          </DetailItem>
          <h3>Biography:</h3>
          <Bio>{person.biography}</Bio>
          <Details>
            <SocialMedia>
              {socialMedia.imdb_id && (
                <a
                  href={`https://www.imdb.com/name/${socialMedia.imdb_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://img.icons8.com/ios/256/imdb.png"
                    alt="IMDb Logo"
                    className="social-media-icon"
                  />
                </a>
              )}
              {socialMedia.instagram_id && (
                <a
                  href={`https://www.instagram.com/${socialMedia.instagram_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://img.icons8.com/material-outlined/256/instagram-new.png"
                    alt="Instagram Logo"
                    className="social-media-icon"
                  />
                </a>
              )}
              {socialMedia.twitter_id && (
                <a
                  href={`https://twitter.com/${socialMedia.twitter_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://img.icons8.com/material-sharp/256/twitter.png"
                    alt="Twitter Logo"
                    className="social-media-icon"
                  />
                </a>
              )}
              {socialMedia.facebook_id && (
                <a
                  href={`https://www.facebook.com/${socialMedia.facebook_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://img.icons8.com/ios-filled/256/facebook-new.png"
                    alt="Facebook Logo"
                    className="social-media-icon"
                  />
                </a>
              )}
            </SocialMedia>
            <GoogleButton onClick={googleClick}>
              <span>Google it!</span>
              <GoogleIcon
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                alt=""
              />
            </GoogleButton>
          </Details>
        </PersonInfoWrapper>
      </Wrapper>
      <PersonImages />
      {isDirector ? (
        <MovieWrapper>
          <h1>Directed Movies and Series :</h1>
          <MovieRow>
            {isDirector &&
              directedCredits.map((item, i) => (
                <Link to={`${item.url}`}>
                  <div key={item.id}>
                    <Container key={i}>
                      <Image
                        className="image"
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/can't found the image.jpg";
                        }}
                        loading="lazy"
                        alt=" "
                      />
                      <MovieName>{item.title || item.name}</MovieName>
                    </Container>
                  </div>
                </Link>
              ))}
          </MovieRow>
        </MovieWrapper>
      ) : null}
      <MovieWrapper>
        <h1>Movies and Series :</h1>
        <MovieRow>
          {movies.map((item, i) => (
            <Link to={`${item.url}`}>
              <div key={item.id}>
                <Container key={i}>
                  <Image
                    className="image"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/can't found the image.jpg";
                    }}
                    loading="lazy"
                    alt=" "
                  />
                  <MovieName>{item.title || item.name}</MovieName>
                </Container>
              </div>
            </Link>
          ))}
        </MovieRow>
      </MovieWrapper>
    </Page>
  );
};

export default PersonDetail;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const DetailTitle = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const DetailValue = styled.span`
  text-align: justify;
`;

const MovieWrapper = styled.div`
  overflow-x: scroll;
  width: 100%;
  padding: 40px;
`;

const MovieRow = styled.div`
  display: flex;
  width: max-content;
`;

const Container = styled.div`
  position: relative;
  padding: 10px;
  align-items: center;
  z-index: 1;
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

  @media (max-width: 700px) {
    border-radius: 0px;
    padding-right: 6px;
    object-fit: contain;
  }
`;

const MovieName = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
  max-width: 250px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  margin-top: 100px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PersonInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .google-btn {
    background-color: #3367d6;
    color: #fff;
    padding: 10px 16px;
    cursor: pointer;
    border: 2px solid #ff1;
    border-radius: 20px;
    text-decoration: none;
    transition: background-color 0.1s ease-in-out;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -ms-border-radius: 20px;
    -o-border-radius: 20px;
    -webkit-transition: background-color 0.1s ease-in-out;
    -moz-transition: background-color 0.1s ease-in-out;
    -ms-transition: background-color 0.1s ease-in-out;
    -o-transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: #4285f4;
    }

    @media screen and (max-width: 768px) {
      margin-top: 20px;
    }
  }
`;

const PersonName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 400px;
  height: auto;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 100ms 0s;
  transition: 0.5s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const Bio = styled.p`
  text-align: justify;
  margin-top: -20px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  background: rgb(228, 236, 238);
  padding: 10px 10px 10px 20px;
  border: 5px solid #21d07a;
  border-radius: 20px;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

const GoogleButton = styled.button`
  background-color: #3140f0;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin: 10px;
  color: #fff;
  transition: 0.5s ease-in-out;

  span {
    font-size: 20px;
  }

  &:hover {
    background-color: #3f51b5;
    color: #fff;
  }
`;

const GoogleIcon = styled.img`
  width: 30px;
  height: auto;
  background-color: #fff;
  border-radius: 40px;
  position: relative;
  padding: 5px;
`;
