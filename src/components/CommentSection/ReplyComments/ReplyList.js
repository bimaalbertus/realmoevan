import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore";

const ReplyList = ({ commentId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const db = firebase.firestore();
      const snapshot = await db.collection("comments").get();
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments);
    };
    fetchComments();
  }, []);

  return (
    <div>
      {comments.map((comment) => {
        if (comment.commentId === commentId) {
          return (
            <Comment key={comment.id} comment={comment} commentId={commentId} />
          );
        }
        return null;
      })}
    </div>
  );
};

const Comment = ({ comment, commentId }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchReplies = async () => {
      const db = firebase.firestore();
      const snapshot = await db
        .collection("comments")
        .doc(comment.id)
        .collection("replies")
        .get();
      const replies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReplies(replies);
    };
    fetchReplies();
  }, [comment.id]);

  return (
    <div>
      {replies.map((reply) => (
        <Reply key={reply.id} reply={reply} />
      ))}
    </div>
  );
};

const Reply = ({ reply }) => {
  return <p>{reply.text}</p>;
};

export default ReplyList;
