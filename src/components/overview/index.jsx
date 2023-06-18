import React from 'react';
import { Link, useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Overview({ title, overview }) {
  const { category } = useParams();

  const path =
    category === 'movie' ? `/catalog/movie/${overview.id}` : `/catalog/tv/${overview.id}`;
  // const pathPlay = category === 'movie' ? `/movie/${overview.id}/play` : `/tv/${overview.id}/play`;

  return (
    <div className="text-gray-300 relative z-10 space-y-3 pt-3">
      <h1>
        <Link to={path} className="text-2xl hover:text-red-600 duration-150">
          {title}
        </Link>
      </h1>
      {category === 'tv' && (
        <h2 className="text-lg">Episode name:&nbsp;{overview.name || overview.title}</h2>
      )}
      <p>{overview.overview}</p>
      <div>
        Release Date:&nbsp;
        {overview.first_air_date || overview.release_date || overview.air_date}
      </div>
      <div className="flex py-2 flex-wrap">
        {overview.genres?.length > 0 &&
          overview.genres.map((item, i) => (
            <span
              key={i}
              className="px-3 py-2 rounded-3xl border-2 border-gray-300 cursor-pointer hover:text-gray-400 hover:border-gray-400 duration-300 whitespace-nowrap mb-3 mr-3"
            >
              {item.name}
            </span>
          ))}
      </div>
      <div className="flex">
        <span className="ml-2">({overview.vote_count}&nbsp;votes)</span>
      </div>
    </div>
  );
};
