import React from 'react'
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Row from '../components/row'
import requests from '../Request'
import axios from '../api/axios'
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import Recommends from '../element/Recommends'
import Trending from '../element/Trending'
import { selectUserName } from "../features/user/userSlice";
import Navbar from "../components/NavBar/Navbar"
import FooterContainer from "../container/Footer/footer"

const Watch = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [movie, setMovie] = useState([]);
  const [currentMovieDetail, setMovieBg] = useState({})

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=8260a7b490f140fde24b8a24b034994a&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieBg(data))
    }


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTopRated);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDetailData(doc.data());
        } else {
          console.log("no such document in firebase 🔥");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [id]);

  
  return (
    <>
    <Navbar />
    <Background id="container">
                <img alt={currentMovieDetail.title} src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`}/>
            </Background>
    <VideoContainer>
      <Video>
        <iframe src={detailData.filmSrc} title="GO-Watch Video Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowFullScreen></iframe> 
      </Video>
      <h1>{currentMovieDetail.title}</h1>
      <Description>{currentMovieDetail.overview}</Description>
    </VideoContainer>
    <FooterContainer />
    </>
  )
}

const Rows = styled.div`
  margin-bottom: 20px;
`;

const VideoContainer = styled.div`
  min-height: calc(100vh-250px);
  overflow: hidden;
  display: block;
  position: relative;
  top: 50px;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: .5rem;
  color: rgb(249, 249, 249);
  background-color: rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Video = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 0px 0px;
  min-height: 56px;

  iframe {
    width: 2160px;
    height: 720px;

    @media (max-width: 768px) {
      width: 1080px;
    height: 240px;
    }
  }
`;

const Background = styled.div`
    left: 0px;
    opacity: 0.8;
    position: fixed;
    right: 0px;
    top: 0px;
    z-index: -1;

    img {
        width: 100vw;
        height: 100vh;
        object-fit: cover;

        @media (max-width: 768px){
            width: initial;
        }
    }
`

export default Watch
