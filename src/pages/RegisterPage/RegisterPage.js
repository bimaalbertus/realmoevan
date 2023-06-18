import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import PopUp from "../../utils/PopUpMessage/PopUp";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const validEmails = ["gmail.com", "yahoo.com", "outlook.com", "bug.com"];
    const emailSuffix = email.split("@")[1];

    if (!validEmails.some((suffix) => emailSuffix.endsWith(suffix))) {
      setMessage("Invalid email. Please try again with a valid email address.");
      return;
    }

    if (password.length < 8) {
      setMessage(
        "Password must be at least 8 characters long. Please try again."
      );
      return;
    }

    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await firebase
        .firestore()
        .collection("users")
        .doc(userCredential.user.uid)
        .set({
          username: username,
          email: email,
        });
      setLoggedIn(true);
      setMessage("Register successful");
    } catch (error) {
      setMessage("Invalid username, email or password. Please try again.");
    }
  };

  const handleSignUpWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const userCredential = await firebase.auth().signInWithPopup(provider);
      await firebase
        .firestore()
        .collection("users")
        .doc(userCredential.user.uid)
        .set({
          username: userCredential.user.displayName,
          email: userCredential.user.email,
        });
      setLoggedIn(true);
      setMessage("Register successful");
    } catch (error) {
      setMessage("An error occurred while registering with Google: ", error);
    }
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  if (firebase.auth().currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Body>
      <Grid container justify="center">
        <Grid xs="12" md="8" lg="4">
          <Signup>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <TextField
                type="username"
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                label="Username"
                required
              />
              <TextField
                type="email"
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                label="Email"
                required
              />
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                label="Password"
                required
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  minLength: 8,
                  title: "Password must be at least 8 characters",
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </form>
            <GoogleButton onClick={handleSignUpWithGoogle}>
              <span>Sign Up with Google</span>
              <GoogleIcon
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                alt=""
              />
            </GoogleButton>
            <p>
              Already have an account? <Navigasi to="/login">Login</Navigasi>
            </p>
          </Signup>
        </Grid>
      </Grid>
      {message && <PopUp message={message} />}
    </Body>
  );
}

export default RegisterPage;

const Body = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #000;
`;

const Navigasi = styled(Link)`
  color: blue;
  transition: 0.3s ease-in-out;

  &:hover {
    color: #c0c0c0;
  }
`;

const Signup = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 40px;
`;

const GoogleButton = styled.button`
  background-color: #3140f0;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin: 10px;
  color: #fff;
  transition: 0.5s ease-in-out;

  span {
    font-size: 20px;
  }

  &:hover {
    background-color: #3f51b5;
    color: #fff;
  }
`;

const GoogleIcon = styled.img`
  width: 30px;
  height: auto;
  background-color: #fff;
  border-radius: 40px;
  position: relative;
  padding: 5px;
`;
