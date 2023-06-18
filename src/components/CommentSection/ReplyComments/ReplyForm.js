import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";
import styled from "styled-components";
import { TextareaAutosize } from "@material-ui/core";
import { db } from "../../../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import PopUp from "../../../utils/PopUpMessage/PopUp";

export default function ReplyForm() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(
    (commentId) => {
      const db = firebase.firestore();
      const unsubscribe = db
        .collection("comments")
        .where("movieId", "==", id)
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComments(data);
        });

      return unsubscribe;
    },
    [id]
  );

  const handleSubmit = (commentId) => {
    if (newReply) {
      const db = firebase.firestore();
      db.collection("comments").doc(commentId).collection("replies").add({
        text: newReply,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  const renderReplies = (replies) => {
    if (replies && replies.length > 0) {
      return (
        <ul>
          {replies.map((reply) => (
            <li key={reply.id}>
              <strong>{reply.user}: </strong>
              {reply.text}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <>
      <CommentInputContainer
        onSubmit={(event) => {
          if (event.key === "Enter" && event.ctrlKey) {
            event.preventDefault();
            handleSubmit();
          }
        }}
      >
        <CommentInput
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Add a public reply comment"
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.ctrlKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
        />
        <CommentBorder className="border" />
        {isOpen && (
          <CommentButtonContainer>
            <CancelButton onClick={() => setIsOpen(false)}>Cancel</CancelButton>
            <SendButton onClick={(e) => handleSubmit(comments.id)}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3024/3024593.png"
                alt="Trailer Icon"
              />
              <span>Send Comment</span>
            </SendButton>
          </CommentButtonContainer>
        )}
        {renderReplies(comments.replies)}
        {message && <PopUp message={message} />}
      </CommentInputContainer>
    </>
  );
}

const CommentInputContainer = styled.form`
  position: relative;
  width: 100%;
  margin-bottom: 40px;
`;

const CommentInput = styled(TextareaAutosize)`
  font-family: "Lato", sans-serif;
  border: none;
  background-color: transparent;
  color: #c0c0c0;
  padding: 8px;
  resize: none;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid #c0c0c0;
  transition: width 0.5s ease-in-out;

  &:focus {
    width: 100%;
    outline: none;
    border-bottom: 1px solid #c0c0c0;
  }

  &:focus ~ .border {
    animation: expand 0.5s ease-in-out forwards;
  }
`;

const CommentButtonContainer = styled.div`
  display: flex;
  position: relative;
  top: 5px;
  justify-content: flex-end;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const SendButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: none;
  border: 2px solid #3f51b5;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  width: 150px;
  height: 50px;
  transition: transform 100ms 0s;
  transition: 0.3s ease;
  margin-left: 10px;

  &:hover {
    transform: scale(1.05);
    color: #000;
    background-color: rgba(255, 255, 255, 0.5);

    img {
      filter: invert(0%);
      transform: scale(1.3);
    }
  }

  img {
    width: 20px;
    filter: invert(100%);
    transition: transform 100ms 0s;
    transition: 0.3s ease;
  }

  span {
    font-size: 15px;
  }

  @media (max-width: 768px) {
    width: 50px;

    span {
      display: none;
    }
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  color: #c0c0c0;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: #0077cc;
  }
`;

const CommentBorder = styled.div`
  height: 3px;
  width: 0;
  background-color: #3f51b5;
  transition: width 0.5s ease-in-out;
  z-index: 1;
  margin-top: -8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @keyframes expand {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }

  @keyframes shrink {
    0% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
`;
