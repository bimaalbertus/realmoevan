/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import StarsIcon from '@material-ui/icons/Stars'

const baseUrl = 'https://image.tmdb.org/t/p/original/'

function BackdropSlider (props) {

  const [backdrops, setBackdrops] = useState([]);

  useEffect(() => {
    const fetchBackdrops = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/{movie_id}/now_playing?api_key=8260a7b490f140fde24b8a24b034994a'
      );
      setBackdrops(response.data.results);
    };

    fetchBackdrops();
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{ ...style, display: "block", background: "linear-gradient(to left, #000, rgba(0,0,0,0.0))" }}
        onClick={onClick}
      >
        NEXT
      </button>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{ ...style, display: "block", background: "linear-gradient(to right, #000, rgba(0,0,0,0.0))" }}
        onClick={onClick}
      >
        BACK
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
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

    return (
        <>
            <Slider {...settings}>
            {backdrops.map((backdrop) => (
        <div key={backdrop.id} className="backdrop">
                    <Container>
                          <Image
                            className="image"
                            src={`https://image.tmdb.org/t/p/original${backdrop.backdrop_path}`}
                            onError={(e) => { e.target.onerror = null; e.target.src = './assets/images/default.jpg' }}
                            loading = 'lazy'
                            alt=" "/>
                      </Container>
                </div>
                ))}
            </Slider>
        </>
    )
}

const MovieRow = styled(Slider)`
    display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));

    
  }
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
    
}
&:hover button{
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }
ul li button {
    display: none;
}
.slick-list {
    overflow: initial;
}

.slick-prev{
  left: -3.8vw;
  width: 11vh;
  height: 28.5vh;
  top: 10vw;
}
.slick-next{
    right: -3.8vw;
    width: 11vh;
    height: 28.5vh;
    top: 10vw;  
}
    @media (max-width : 700px){
      .slick-prev{
        left: -5vw;
        width: 6vh;
        height: 20.7vh;
        top: 34.2vw;
      }
      .slick-next{
        right: -5vw;
        width: 6vh;
        height: 20.7vh;
        top: 34.2vw;
      }
    }

   div {
     position: relative;
     border: none;
     min-height: 200px;
     max-height: 260px;

     @media (max-width : 1300px){
        max-height: 200px;
        padding-left: -5px;
    }

     
   }

    
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
   position: relative;
   padding: 10px;
   z-index: 1;

   &:hover {
     z-index: 2;
   }

   &:hover .image{
     transform: scale(1.15);
   }

   @media (max-width : 700px){
      pointer-events: none;
    }

  .info {
    @media (max-width : 1000px){
        display: none;  
    }
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
    position: relative;
    display: block;
    backface-visibility: hidden;
    width: 100%;
    height: 100%;
    transition: transform 100ms 0s;
    transition: .5s ease;
    border-radius: 5px;

    @media (max-width : 700px){
      border-radius: 0px;
      padding-right: 6px;
      object-fit: contain;
    }
`

export default BackdropSlider