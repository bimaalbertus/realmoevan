/* eslint-disable react/prop-types */
import axios from '../../api/axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import Loading from '../../components/Loading'
import StarsIcon from '@material-ui/icons/Stars'

const baseUrl = 'https://image.tmdb.org/t/p/original/'

function Marvel (props) {
  const slider = React.useRef(null);
  const [movies, setmovies] = useState([])
  useEffect(() => {
    async function fetchData () {
      const req = await axios.get(props.fetchurl)
      setmovies(req.data.results)
      return req
    }
    fetchData()
  }, [props.fetchurl])

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button className={className}>
        <img src='/images/right-arrow-50-white.png' alt='' {...props}/>
      </button>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button className={className} style={style} onClick={onClick}>
        <img src='/images/left-arrow-50-white.png' alt='' {...props}/>
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true
        }
      }
    ]
  }

  function truncate (str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '..' : str
  }

  if (movies) {
    return (
            <MovieRow>
        <Container>
                {movies.map(movie => (
                <div key={movie.id}>
                    <Link to={`/${movie.first_air_date ? 'show' : 'movie'}/${movie.id}`}>
                        <Link to={`/${movie.first_air_date ? 'show' : 'movie'}/${movie.id}`}>
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
  padding: 70px;  
`

const Wrap = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: 15px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  @media (max-width: 768px) {

    &:hover {
      z-index: 9999;
      transform: scale(1.2);
    }
  }

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 0;
    top: 0;
  }

  &:hover {
    z-index: 9999;
    transform: scale(1.2);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
const Container = styled.div`
display: grid;
grid-gap: 25px;
gap: 25px;
grid-template-columns: repeat(6, minmax(0, 1fr));

@media (max-width: 768px) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
`

const Hover = styled.div`
   width: 115%;
   border-radius: 10px;
   height: 100% auto;
   position: absolute;
   background : linear-gradient(180deg, transparent, #283858, #0c111b,#000000);
   opacity: 0;
   left: 50%;
   transform: translate(-50%, -40%);
  -ms-transform: translate(-50%, -50%);
   transition: .5s ease;
   margin-bottom: 20%;

   h5 {
      font-size: 14px;
      margin-bottom: -8px;
   }
  span{
      margin-left: 1em;
   }
   p {
     font-size: 13px;
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

export default Marvel