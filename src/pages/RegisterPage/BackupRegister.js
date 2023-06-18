import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/firestore";
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
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
      console.log("Data pengguna berhasil disimpan");
    } catch (error) {
      console.error("Terjadi kesalahan saat mendaftar: ", error);
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
      console.log("Data pengguna berhasil disimpan");
    } catch (error) {
      console.error("Terjadi kesalahan saat mendaftar dengan Google: ", error);
    }
  };

  const handleLoginWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoggedIn(true);
      console.log(username, email);
    } catch (error) {
      console.error("Terjadi kesalahan saat login: ", error);
    }
  };

  const handleLoginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      setLoggedIn(true);
      console.log("Login berhasil dengan Google");
    } catch (error) {
      console.error("Terjadi kesalahan saat login dengan Google: ", error);
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
      <Main>
        <Checkbox type="checkbox" id="chk" aria-hidden="true" />
        <Signup>
          <SignupLabel htmlFor="chk" aria-hidden="true">
            Sign up
          </SignupLabel>
          <GoogleButton onClick={handleSignUpWithGoogle}>
            <GoogleIcon
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
              alt=""
            />
          </GoogleButton>
          <form onSubmit={handleSignUp}>
            <Input
              type="text"
              name="txt"
              placeholder="User name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="pswd"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Sign up</Button>
          </form>
        </Signup>
        <Login>
          <form onSubmit={handleLoginWithEmailAndPassword}>
            <LoginLabel htmlFor="chk" aria-hidden="true">
              Login
            </LoginLabel>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="pswd"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button>Login</Button>
            <Button onClick={handleLoginWithGoogle}>Log In with Google</Button>
          </form>
        </Login>
      </Main>
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
`;

const Main = styled.div`
  width: 350px;
  height: 500px;
  overflow: hidden;
  border-radius: 10px;
  border: 5px solid #fff;
`;

const Checkbox = styled.input`
  display: none;
`;

const Signup = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;

  &:hover {
    background: #6d44b8;
  }
`;

const Input = styled.input`
  width: 60%;
  height: 40px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 20px auto;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;

  &:hover {
    background: #6d44b8;
  }
`;

const Login = styled.div`
  height: 460px;
  background: #eee;
  border-radius: 60% / 10%;
  transform: translateY(-180px);
  transition: 0.8s ease-in-out;

  ${Checkbox}:checked ~ & {
    transform: translateY(-500px);
  }
`;

const LoginLabel = styled.label`
  color: #573b8a;
  transform: scale(0.6);
  color: #032541;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;

  ${Checkbox}:checked ~ & {
    transform: scale(1);
  }
`;

const SignupLabel = styled.label`
  transform: scale(0.6);
  color: #fff;
  font-size: 40px;
  justify-content: center;
  display: flex;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;

  ${Checkbox}:checked ~ & {
    transform: scale(0.6);
  }
`;

const GoogleButton = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const GoogleIcon = styled.img`
  width: 30px;
  height: auto;
  background-color: #fff;
  position: relative;
`;
