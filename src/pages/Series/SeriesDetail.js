import { useEffect, useState, useRef  } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../firebase";
import { Link } from 'react-router-dom'
import FooterContainer from '../../container/Footer/footer'
import Navbar from '../../components/NavBar/Navbar';

const SeriesDetail = (props) => {
  const scrollToFilm = useRef({ behavior: 'smooth', block: 'center' });
  const scrollToTrailer = useRef({ behavior: 'smooth', block: 'center' });

  useEffect(() => {
  window.scrollTo(0, 0)
  }, [])

  
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});


    
  useEffect(() => {
    db.collection("series")
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
    <Container>
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>
      
      <ImageTitle>
        <img alt={detailData.title} src={detailData.titleImg} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
            <Player><img src="/images/play-icon-black.png" alt="" />Play</Player>
            <Trailer onClick={() => scrollToTrailer.current.scrollIntoView()}><img src="/images/play-icon-white.png" alt="" />Trailer</Trailer>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
    <ContainerVideo>
      <h1>Trailer</h1>
      <Video ref={scrollToTrailer}>
      <iframe width="2160" height="720" src={detailData.trailerSrc} title="YouTube video player" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen" allowFullScreen></iframe> 
      </Video>
      </ContainerVideo>
      <FooterContainer />
      </>
  );
};

const Container = styled.div`
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  position: ;
  top: 30px;
  padding: 0 calc(3.5vw + 5px);
  background:-webkit-linear-gradient(top, transparent, rgb(0,0,0,0.10), rgb(0,0,0,0.20), rgb(0,0,0,0.30), rgb(0,0,0,0.40), rgb(0,0,0,0.50), rgb(0,0,0,0.70), rgb(0,0,0,0.90), rgb(0,0,0,0.90), rgb(0,0,0,0.90), #000); 
`;

const ContainerVideo = styled.div`
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 30px;
  padding: 0 calc(3.5vw + 5px);
  background:#000; 
`;

const Video = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 0px 0px;
  min-height: 56px;
  background: rgb(0,0,0,0.90);
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

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;


const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  margin-bottom: 121px;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default SeriesDetail;