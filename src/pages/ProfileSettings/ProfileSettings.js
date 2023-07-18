import React, { Component, useEffect, useState } from "react";
import { Button, Container, Grid, Paper, TextField } from "@material-ui/core";
import { firebaseAuthentication, db } from "../../firebase";
import styled from "styled-components";
import UserPhoto from "./UserPhoto";
import { toast } from "react-toastify";

export default function ProfileSettings() {
  const currentUser = firebaseAuthentication.currentUser;
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserDetails((prevDetails) => ({
              ...prevDetails,
              ...doc.data(),
            }));
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = userDetails;
    const userRef = db.collection("users").doc(currentUser.uid);
    const promises = [];
    if (username !== currentUser.username) {
      promises.push(currentUser.updateProfile({ username }));
      promises.push(userRef.update({ username }));
      toast.succes("Success change username, refresh the page!");
    }
    if (email !== currentUser.email) {
      promises.push(currentUser.updateEmail(email));
      promises.push(userRef.update({ email }));
      toast.succes("Success change email, refresh the page!");
    }
    if (password) {
      promises.push(currentUser.updatePassword(password));
      toast.succes("Success update password, refresh the page!");
    }

    Promise.all(promises)
      .then(() => {
        console.log("Profile updated successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Body>
      <Wrapper>
        <UserPhoto />
        <UserName>{userDetails.username}</UserName>
        <InputContainer>
          <Grid style={{ padding: 10 }} xs={12} md={4} item>
            <Form onSubmit={handleSubmit}>
              <Input
                margin="dense"
                label="Username"
                value={userDetails.username || userDetails.username}
                onChange={(e) => {
                  setUserDetails({ username: e.target.value });
                }}
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                size="small"
              />
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update Profile
              </SubmitButton>
            </Form>
          </Grid>

          <Grid style={{ padding: 10 }} xs={12} md={4} item>
            <Form onSubmit={handleSubmit}>
              <Input
                required
                type="email"
                margin="dense"
                label="Email"
                value={userDetails.email}
                onChange={(e) => {
                  setUserDetails({ email: e.target.value });
                }}
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                size="small"
              />
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update Email
              </SubmitButton>
            </Form>
          </Grid>

          <Grid style={{ padding: 10 }} xs={12} md={4} item>
            <Form onSubmit={handleSubmit}>
              <Input
                type="password"
                margin="dense"
                label="Password"
                value={userDetails.password}
                onChange={(e) => {
                  setUserDetails({ password: e.target.value });
                }}
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                size="small"
              />
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update Password
              </SubmitButton>
            </Form>
          </Grid>
        </InputContainer>
      </Wrapper>
    </Body>
  );
}

const Body = styled.div`
  margin: 0;
  padding: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #000;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 40px;
`;

const InputContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin: 40px;

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

const UserImg = styled.img`
  width: 400px;
  height: 400px;
`;

const UserName = styled.h2`
  color: #fff;
`;

const Form = styled.form`
  width: 400px;

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

const SubmitButton = styled(Button)`
  width: 400px;

  @media (max-width: 768px) {
    max-width: 245px;
  }
`;

const Input = styled(TextField)`
  width: 400px;

  @media (max-width: 768px) {
    max-width: 245px;
  }
`;
