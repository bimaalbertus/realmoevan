import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const TrailerSlider = ({ match }) => {
  const [movie, setMovie] = useState({});
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      setMovie(data);
    };
    const fetchTrailers = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      setTrailers(data.results);
    };
    fetchMovie();
    fetchTrailers();
  }, [match.params.id]);

  const trailerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
        />
      )}
      <div>
        {movie.title && <h1>{movie.title}</h1>}
        {movie.overview && <p>{movie.overview}</p>}
      </div>
      {trailers.length > 0 && (
        <Slider {...trailerSettings}>
          {trailers.map((trailer) => (
            <div key={trailer.key}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TrailerSlider;
