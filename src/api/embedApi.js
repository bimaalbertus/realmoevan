import { EMBED_URL } from '../config';

// ----------------------------------------------------------------------

const embedMovie = (id) => `${EMBED_URL}movie?id=${id}`;
const embedEpisode = (id, season, episode) => 
  `${EMBED_URL}tv?id=${id}&s=${season}&e=${episode}`

export { embedMovie, embedEpisode };
