import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { db } from "../../firebase";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import styled from "styled-components";
import ReplyForm from "./ReplyComments/ReplyForm";

export default function LikeComment({ commentId, commentText }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [disliked, setDisliked] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  useEffect(() => {
    const unsubscribe = db
      .collection("commentLikes")
      .doc(commentId)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (data) {
          setLikes(data.likes || 0);
          setDislikes(data.dislikes || 0);
          setLiked(
            data.usersLiked &&
              data.usersLiked.includes(firebase.auth().currentUser.uid)
          );
          setDisliked(
            data.usersDisliked &&
              data.usersDisliked.includes(firebase.auth().currentUser.uid)
          );
        }
      });

    return () => {
      unsubscribe();
    };
  }, [db, commentId]);

  const handleLike = () => {
    const user = firebase.auth().currentUser.uid;
    const updatedLikes = liked ? likes - 1 : likes + 1;
    const updatedUsersLiked = liked
      ? firebase.firestore.FieldValue.arrayRemove(user)
      : firebase.firestore.FieldValue.arrayUnion(user);

    // Set nilai disliked menjadi false jika sebelumnya bernilai true
    if (disliked) {
      const updatedDislikes = dislikes - 1;
      const updatedUsersDisliked =
        firebase.firestore.FieldValue.arrayRemove(user);
      db.collection("commentLikes").doc(commentId).set(
        {
          dislikes: updatedDislikes,
          usersDisliked: updatedUsersDisliked,
          merge: false,
        },
        { merge: true }
      );
      setDislikes(updatedDislikes);
      setDisliked(false);
    }

    db.collection("commentLikes").doc(commentId).set(
      {
        likes: updatedLikes,
        usersLiked: updatedUsersLiked,
        merge: true,
      },
      { merge: true }
    );
    setLikes(updatedLikes);
    setLiked(!liked);
  };

  const handleDislike = () => {
    const user = firebase.auth().currentUser.uid;
    const updatedDislikes = disliked ? dislikes - 1 : dislikes + 1;
    const updatedUsersDisliked = disliked
      ? firebase.firestore.FieldValue.arrayRemove(user)
      : firebase.firestore.FieldValue.arrayUnion(user);

    // Set nilai liked menjadi false jika sebelumnya bernilai true
    if (liked) {
      const updatedLikes = likes - 1;
      const updatedUsersLiked = firebase.firestore.FieldValue.arrayRemove(user);
      db.collection("commentLikes").doc(commentId).set(
        {
          likes: updatedLikes,
          usersLiked: updatedUsersLiked,
          merge: true,
        },
        { merge: true }
      );
      setLikes(updatedLikes);
      setLiked(false);
    }

    db.collection("commentLikes").doc(commentId).set(
      {
        dislikes: updatedDislikes,
        usersDisliked: updatedUsersDisliked,
        merge: true,
      },
      { merge: true }
    );
    setDislikes(updatedDislikes);
    setDisliked(!disliked);
  };

  function OpenReply() {
    setOpenReply(!openReply);
  }

  return (
    <>
      <Container>
        <ThumbButton onClick={handleLike}>
          {liked ? (
            <AiFillLike
              style={{ color: "#fff", width: "25px", height: "25px" }}
            />
          ) : (
            <AiOutlineLike
              style={{ color: "grey", width: "25px", height: "25px" }}
            />
          )}
          <span style={{ marginLeft: "5px" }}>{likes}</span>
        </ThumbButton>
        <ThumbButton onClick={handleDislike}>
          {disliked ? (
            <DisLikeButton
              style={{ color: "#fff", width: "25px", height: "25px" }}
            />
          ) : (
            <DislikeButtonOutline
              style={{ color: "grey", width: "25px", height: "25px" }}
            />
          )}
          <span style={{ marginLeft: "5px" }}>{dislikes}</span>
        </ThumbButton>
        {/* <ReplyButton onClick={OpenReply}>Reply</ReplyButton> */}
      </Container>
      {/* {openReply && <ReplyForm />} */}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ThumbButton = styled.div`
  display: flex;
  margin-right: 10px;
  cursor: pointer;

  span {
    margin-top: 5px;
    font-size: 15px;
  }
`;

const DisLikeButton = styled(AiFillLike)`
  rotate: 180deg;
`;

const DislikeButtonOutline = styled(AiOutlineLike)`
  rotate: 180deg;
`;

const ReplyButton = styled.span`
  cursor: pointer;
  color: #fff;
  padding: 10px;
  border-radius: 40px;

  &:hover {
    background-color: rgb(38, 56, 80);
  }
`;
