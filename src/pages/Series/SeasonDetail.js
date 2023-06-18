import { useEffect, useState, useRef  } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { collection } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db from "../../firebase";
import { Link } from 'react-router-dom'
import FooterContainer from '../../container/Footer/footer'
import Navbar from '../../components/NavBar/Navbar';

export default function SeasonDetail() {
    const { id } = useParams();
    const [detailData, setDetailData] = useState({})
    
    useEffect(() => {
      db.collection("series")
        .doc(id)
        .collection(id)
        .doc(id)
        .get()
        .then((doc) => {
          if(doc.exists){
            setDetailData(doc.data());
          } else {
            console.log("no such document in firebase");
          }
        })
        .catch((error) => {
          console.log("error getting the doc");
        })
    }, [id])

    return(
      <>
      <h1>{detailData.title}</h1>
        <iframe width="2160" height="720" src={detailData.source} title="Video player"allowFullScreen allowautoplay></iframe> 
      </>
    )
}