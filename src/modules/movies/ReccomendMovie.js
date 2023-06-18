import axios from '../../api/axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'

const baseUrl = 'https://image.tmdb.org/t/p/original/'

function NoSlider (props) {
  const [movies, setmovies] = useState([])


  function slugify (string) {
    return string?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
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
      };
    });
    setmovies(data);
    return req;
  }

  fetchData();
}, [props.fetchurl]);

  if (movies) {
    return (
            <MovieRow>
        <Container>
                {movies.map(movie => (
                <div key={movie.id}>
                    <Link to={movie.url}>
                        <Link to={movie.url}>
                            <Detail>
                          <Image
                            className="image"
                            src={`${baseUrl}${movie.poster_path}`}
                            onError={(e) => { e.target.onerror = null; e.target.src = './assets/images/default.jpg' }}
                            loading = 'lazy'
                            alt=" "/>
                            </Detail>
                        </Link>
                    </Link>
                </div>
                ))}
        </Container>
            </MovieRow>
    )
  } else {
    return (
      <Loading />
    )
  }
}

const Detail = styled.div`
width: 150px;
border-radius: 10px;
box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
cursor: pointer;
overflow: hidden;
position: relative;
transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
border: 3px solid rgba(249, 249, 249, 0.5);



&:hover {
  box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
    rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  transform: scale(1.05);
  border-color: rgba(249, 249, 249, 0.8);
}
`

const MovieRow = styled.div`
border: 2px solid #fff;
margin: 5px;
  position: relative;
  display: flex;
  grid-template-columns: repeat(3, 1fr);
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
    content: '';
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
overflow: auto;
`
const Container = styled.div`
width: 10px;
  height: 160px;
  margin: 20px;

@media (max-width: 768px) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
`

const Image = styled.img`
backface-visibility: hidden;  
position: relative;
display: block;
width: 100%;
height: 100%;
object-fit: contain;
`

export default NoSlider