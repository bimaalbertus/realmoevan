import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";
import styled from "styled-components";
import { db, storage } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { TextareaAutosize } from "@material-ui/core";
import CommentForm from "./CommentForm";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PopUp from "../../utils/PopUpMessage/PopUp";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeComment from "./LikeComment";
import ReplyContainer from "./ReplyComments/ReplyContainer";
dayjs.extend(relativeTime);

const CommentList = () => {
  const { id, category } = useParams();
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editComment, setEditComment] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUserDetail({ ...user, username: doc.data().username });
            } else {
              setUserDetail(user);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        setUserDetail(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
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
  }, [id]);

  const handleDelete = (commentId) => {
    db.collection("comments")
      .doc(commentId)
      .delete()
      .then(() => {
        console.log("Comment deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting comment: ", error);
      });
  };

  useEffect(() => {
    const getComments = async () => {
      const commentsData = await getDocs(
        db(collection(db, "comments").where("movieId", "==", id))
      );
      const comments = commentsData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      for (const comment of comments) {
        const userRef = doc(db, "users", comment.userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          comment.profileImageURL = userData.profileImageURL;
        }
      }

      setComments(comments);
    };

    getComments();
  }, [db, id]);

  const handleEdit = (comment) => {
    setOpenEdit(true);
    setEditComment(comment);
    setEditValue(comment.content);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    if (editComment) {
      db.collection("comments")
        .doc(editComment.id)
        .update({
          content: editValue,
          edited: true,
        })
        .then(() => {
          console.log("Comment updated successfully");
          setEditComment(null);
          setEditValue("");
        })
        .catch((error) => {
          console.error("Error updating comment: ", error);
        });
    }
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (commentId) => {
    handleCloseMenu();
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      handleDelete(commentId);
    }
  };

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
  );
  const [authUser, setAuthUser] = useState(null);
  const firestore = getFirestore();
  const storageRef = ref(storage);

  useEffect(() => {
    async function getProfileImageURLs() {
      const imageUrls = await Promise.all(
        comments.map(async (comment) => {
          const userRef = doc(firestore, "users", comment.userId);
          const docSnap = await getDoc(userRef);
          const data = docSnap.data();
          if (data && data.profileImageURL) {
            return data.profileImageURL;
          } else {
            return "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117";
          }
        })
      );
      setProfileImageURL(imageUrls);
    }
    getProfileImageURLs();
  }, [comments]);

  return (
    <>
      {user ? (
        <>
          <h3>{comments.length} Comments</h3>
          <CommentForm />
          {comments.length > 0 && (
            <>
              {comments.map((comment, index) => (
                <React.Fragment key={comment.id}>
                  {openEdit && editComment && editComment.id === comment.id ? (
                    <MessagePopup>
                      <CommentInputContainer
                        onSubmit={(event) => {
                          if (event.key === "Enter" && event.ctrlKey) {
                            event.preventDefault();
                            handleEditSubmit();
                          }
                        }}
                      >
                        <IconButton
                          className="btn"
                          style={{ float: "left" }}
                          onClick={() => setOpenEdit(false)}
                        >
                          <HighlightOffIcon
                            style={{ fontSize: "50px", color: "#d9534f" }}
                          />
                        </IconButton>
                        <CommentInput
                          value={editValue}
                          onChange={(event) => setEditValue(event.target.value)}
                          placeholder="Edit the comment"
                          onKeyDown={(event) => {
                            if (event.key === "Enter" && event.ctrlKey) {
                              event.preventDefault();
                              handleEditSubmit();
                            }
                          }}
                        />
                        <CommentButtonContainer>
                          <SendButton onClick={handleEditSubmit}>
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/1004/1004781.png"
                              alt="Trailer Icon"
                            />
                            <span>Save Update</span>
                          </SendButton>
                        </CommentButtonContainer>
                      </CommentInputContainer>
                    </MessagePopup>
                  ) : (
                    <CommentContainer>
                      <UserImg src={profileImageURL[index]} alt="Profile" />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "10px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Username>{comment.username || "Anonymous"}</Username>
                          <CommentTime>
                            {dayjs(comment.createdAt.toDate()).fromNow()}
                            {comment.edited && " (edited)"}
                          </CommentTime>
                          <span style={{ marginLeft: "auto" }}>
                            {comment.userId === user?.uid && (
                              <>
                                <IconButton onClick={handleClickMenu}>
                                  <DotsIcon />
                                </IconButton>
                                <Menu
                                  anchorEl={anchorEl}
                                  open={Boolean(anchorEl)}
                                  onClose={handleCloseMenu}
                                >
                                  <DotsMenu
                                    className="menu-item"
                                    onClick={() => handleEdit(comment)}
                                  >
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                                      alt="Edit Icon"
                                    />
                                    <span>Edit</span>
                                  </DotsMenu>
                                  <DotsMenu
                                    className="menu-item"
                                    onClick={() =>
                                      handleDeleteClick(comment.id)
                                    }
                                  >
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                                      alt="Delete Icon"
                                    />
                                    <span>Delete</span>
                                  </DotsMenu>
                                </Menu>
                              </>
                            )}
                          </span>
                        </div>
                        <CommentText>{comment.content}</CommentText>
                        <LikeComment commentId={comment.id} />
                        {/* <ReplyContainer /> */}
                      </div>
                    </CommentContainer>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
          {message && <PopUp message={message} />}
        </>
      ) : (
        <>
          <h3>Comments</h3>
          <span>Login or register to see comments</span>
        </>
      )}
    </>
  );
};

export default CommentList;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;

  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const Username = styled.span`
  font-weight: bold;
  margin-right: 5px;
  margin-top: -20px;
`;

const CommentTime = styled.p`
  color: gray;
  font-size: 14px;
  margin-top: -4px;
`;

const CommentText = styled.p`
  margin-top: -10px;
  flex: 1;
  max-width: 95%;
`;

const DotsIcon = styled(MoreVertIcon)`
  filter: invert(100%);
`;

const DotsMenu = styled(MenuItem)`
  && {
    display: flex;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #2885e1;
    color: #fff;

    &:hover {
      background-color: #032541;
    }

    img {
      width: 20px;
      height: 20px;
      filter: invert(100%);
    }

    span {
      margin-left: 10px;
    }
  }
`;

const MessagePopup = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SaveIcon = styled.img`
  width: 30px;
  height: auto;
  background-color: #fff;
  border-radius: 40px;
  position: relative;
  padding: 5px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CommentInputContainer = styled.form`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentInput = styled(TextareaAutosize)`
  font-family: "Lato", sans-serif;
  border: none;
  background-color: transparent;
  color: #c0c0c0;
  padding: 8px;
  resize: none;
  width: 25%;
  font-size: 16px;
  border-bottom: 2px solid #c0c0c0;
  transition: width 0.5s ease-in-out;

  &:focus {
    width: 50%;
    outline: none;
    border-bottom: none;
    border-bottom: 3px solid #0077cc;
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
    transform: scale(1.1);
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

const CommentBorder = styled.div`
  height: 3px;
  width: 0;
  background-color: #0077cc;
  transition: width 0.5s ease-in-out;
  z-index: -1;
  margin-top: 35px;

  @keyframes expand {
    0% {
      width: 0;
    }
    100% {
      width: 25%;
    }
  }

  @keyframes shrink {
    0% {
      width: 25%;
    }
    100% {
      width: 0;
    }
  }
`;
