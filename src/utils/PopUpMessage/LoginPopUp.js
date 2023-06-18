import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../pages/RegisterPage/LoginPage";
import CloseIcon from "@material-ui/icons/Close";

export default function LoginPopUp() {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);

  function handleOpen() {
    setIsShown(true);
  }

  function handleClose() {
    setIsShown(false);
  }

  return (
    <>
      <MessagePopup>
        <Container>
          <h3>Hmmm... you not logged in yet</h3>
          <Message>Please log in to access this page</Message>
          <Button>
            <NoButton onClick={() => navigate(-1)}>No, thanks</NoButton>
            <YesButton onClick={handleOpen}>Yes</YesButton>
          </Button>
        </Container>
      </MessagePopup>
      {isShown && (
        <LoginContainer>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          <LoginPage />
        </LoginContainer>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  color: #fff;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border: 2px solid #fff;

  @media (max-width: 768px) {
    margin-left: 50px;
  }
`;

const Message = styled.span`
  font-size: 18px;
  font-weight: 400;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  margin-top: 20px;

  &:hover {
    color: #ff69b4;
  }
`;

const YesButton = styled.span`
  padding: 10px 35px 10px 35px;
  margin-left: 20px;
  cursor: pointer;
  background-color: #4267b2;
  font-size: 15px;
  color: #fff;

  &:hover {
    color: #c0c0c0;
  }
`;

const NoButton = styled.span`
  padding: 10px 25px 10px 25px;
  margin-left: 20px;
  cursor: pointer;
  background-color: #fff;
  color: #000;

  &:hover {
    color: #ff69b4;
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

const LoginContainer = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-left: 70px;
    max-width: 300px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  color: #fff;

  &:hover {
    color: #ff69b4;
  }
`;
