import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import firebase from "firebase/compat/app";
import PopUp from "../../utils/PopUpMessage/PopUp";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoggedIn(true);
      setMessage("Login successful");
    } catch (error) {
      setMessage("Invalid email or password. Please try again.");
      setMessage("An error occurred while logging in: ", error);
    }
  };

  const handleLoginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      setLoggedIn(true);
      setMessage("Login succesful");
    } catch (error) {
      setMessage("An error occurred while logging in with Google: ", error);
    }
  };

  return (
    <Body>
      <Grid container justify="center">
        <Grid xs="12" md="8" lg="4">
          <Login>
            <h2>Login Page</h2>
            <form onSubmit={handleLoginWithEmailAndPassword}>
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
                Login
              </Button>
            </form>
            <GoogleButton onClick={handleLoginWithGoogle}>
              <span>Sign In with Google</span>
              <GoogleIcon
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                alt=""
              />
            </GoogleButton>
            <p>
              Don't have any account?{" "}
              <Navigasi to="/register">Register</Navigasi>
            </p>
            <p>
              Forgot Password?{" "}
              <Navigasi to="/forgot-password">Reset Password</Navigasi>
            </p>
          </Login>
        </Grid>
      </Grid>
      {message && <PopUp message={message} />}
    </Body>
  );
}

const Body = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #000;

  h2,
  p {
    color: #252525;
  }

  span {
    color: #fff;
  }
`;

const Login = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 40px;
`;

const Navigasi = styled(Link)`
  color: blue;
  transition: 0.3s ease-in-out;

  &:hover {
    color: #c0c0c0;
  }
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
