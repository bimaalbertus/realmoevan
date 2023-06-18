import React, { useState, useEffect } from "react";
import ReplyList from "./ReplyList";
import styled from "styled-components";
import { db } from "../../../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import firebase from "firebase/compat/app";

export default function ReplyContainer(commentId) {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const db = firebase.firestore();
      const snapshot = await db
        .collection("comments")
        .doc(commentId)
        .collection("replies")
        .get();
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments);
    };
    fetchComments();
  }, [commentId]);

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchReplies = async () => {
      const db = firebase.firestore();
      const snapshot = await db
        .collection("comments")
        .doc(comments.id)
        .collection("replies")
        .get();
      const replies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReplies(replies);
    };
    fetchReplies();
  }, [comments.id]);

  return (
    <>
      <Container>
        <span onClick={() => setIsOpen(!isOpen)}>Replies</span>
      </Container>
      {isOpen && <ReplyList />}
    </>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 10px;
  cursor: pointer;

  span {
    color: #3ea6ff;
    font-weight: bold;
    padding: 10px;
    border-radius: 40px;

    &:hover {
      background-color: rgb(38, 56, 80);
    }
  }
`;
