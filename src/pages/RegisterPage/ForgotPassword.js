import React, { Component } from "react";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { firebaseAuthentication } from "../../firebase";
import styled from "styled-components";

export default class ForgotPassword extends Component {
  state = {
    email: "",
  };
  handleChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    firebaseAuthentication
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Check your email box");
        this.props.history.push("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  render() {
    const { email } = this.state;
    return (
      <Body>
        <Grid container justify="center">
          <Grid xs="12" md="8" lg="4">
            <Wrapper>
              <h2>Forgot Password</h2>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  type="email"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={this.handleChangeField}
                  name="email"
                  label="Email"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Send Email and Password
                </Button>
              </form>
              <p>
                Don't have an account?{" "}
                <Navigasi to="/registrasi">Register</Navigasi>
              </p>
              <p>
                Have an account?{" "}
                <Navigasi to="/forgot-password">Login</Navigasi>
              </p>
            </Wrapper>
          </Grid>
        </Grid>
      </Body>
    );
  }
}

const Body = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #000;
`;

const Wrapper = styled.div`
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
