import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import CloseIcon from "@material-ui/icons/Close";

const PopUp = ({ message, setMessage }) => {
  const [isShown, setIsShown] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (message) {
      setIsShown(true);
      setTimer(10);
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        setIsShown(false);
        setMessage("");
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [message, setMessage]);

  const handleClose = () => {
    setIsShown(false);
    setMessage("");
  };

  return (
    <>
      {isShown && (
        <Container>
          <Message>{message}</Message>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          <TimerBar timer={timer} />
        </Container>
      )}
    </>
  );
};

export default PopUp;

const Container = styled.div`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const Message = styled.span`
  font-size: 18px;
  font-weight: 400;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  &:hover {
    color: #ff69b4;
  }
`;

const TimerBar = styled.div`
  height: 5px;
  background-color: #ccc;
  margin-top: 5px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    height: 5px;
    background-color: #f00;
    animation: timer-animation 10s linear;
    animation-fill-mode: forwards;
  }

  @keyframes timer-animation {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;
