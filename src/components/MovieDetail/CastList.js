import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const CastListSlider = (props) => {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  useEffect(() => {
    const apiEndpoint =
      category === "movie"
        ? `https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=8260a7b490f140fde24b8a24b034994a`
        : `https://api.themoviedb.org/3/tv/${props.id}/credits?api_key=8260a7b490f140fde24b8a24b034994a`;

    const getCredits = async () => {
      const res = await fetch(apiEndpoint);
      const data = await res.json();
      setCasts(data.cast);
    };
    getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div key={i} className="casts__item">
          <Link to={`/person/${item.id}-${slugify(item.name?.toLowerCase())}`}>
            <div
              className="casts__item__img"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: item.profile_path
                  ? `url(https://image.tmdb.org/t/p/w780${item.profile_path})`
                  : `url('/images/cant-find-the-image.jpg')`,
              }}
            ></div>
            <p className="casts__item__name">{item.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CastListSlider;
