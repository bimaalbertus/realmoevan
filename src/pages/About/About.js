import { useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/NavBar/Navbar";
import Page from "../../components/page";
import AboutParagraph from "./AboutParagraph";

function About(props) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const faqItems = [
    {
      question: "What is Real Moevan?",
      answer:
        "Like any other website, this website is also a streaming website, giving you easy access to all the TV shows and movies you want without spending hours searching for them.",
    },
    {
      question: "So what are we actually doing?",
      answer:
        "We certainly do not store our files illegally. We do not host any copyrighted content on our website. Any linked content is hosted only on third-party websites. This is just an advertising site. All files placed here are for demo purposes only. We RECOMMEND users to BUY CDs or DVDs of their favorite movies or music.",
    },
    {
      question: "Where can I watch?",
      answer:
        "Watch anywhere, anytime. Watch instantly on the web at moevan.com from your personal computer, laptop, or smartphone.",
    },
    {
      question: "What can I watch on Real Moevan?",
      answer:
        "Moevan has an extensive library of feature films, documentaries, TV shows, anime and more. Watch as much as you want, anytime you want.",
    },
  ];

  return (
    <Page title={`About`}>
      <Container>
        <AboutParagraph />
        <h1>FAQ</h1>
        {faqItems.map((item, index) => (
          <Wrapper key={index}>
            <Question onClick={() => toggleAnswer(index)}>
              <FaqName>{item.question}</FaqName>
              <IconWrapper>
                {activeIndex === index ? <IconUp /> : <IconDown />}
              </IconWrapper>
            </Question>
            {activeIndex === index && (
              <AnswerWrapper>
                <p>{item.answer}</p>
              </AnswerWrapper>
            )}
          </Wrapper>
        ))}
      </Container>
    </Page>
  );
}

export default About;

const Container = styled.div`
  margin: auto;
  padding: 10px;
  width: 80%;
  height: 90%;
  overflow: hidden;
  border-radius: 20px;

  .other-episodes {
    font-family: roboto;
    font-size: 30px;
    margin: 10px;
  }

  @media (max-width: 767px) {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
`;

const Wrapper = styled.div`
  margin: 10px;
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: #212121;
  color: #fff;
  font-size: 16px;
  line-height: 1.2;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #282828;
  }
`;

const FaqName = styled.span`
  margin-right: 10px;
`;

const IconWrapper = styled.div``;

const Icon = styled.span`
  font-size: 20px;
`;

const IconUp = styled(Icon)`
  transform: rotate(180deg);
`;

const IconDown = styled(Icon)``;

const AnswerWrapper = styled.div`
  padding: 10px;
  background-color: #424242;
  color: #fff;
  font-size: 14px;
  line-height: 1.2;
  text-align: left; ;
`;

const Answer = styled.p`
  margin: 10px 0 0 0;
  padding: 10px;
  background-color: #424242;
  color: #fff;
  font-size: 14px;
  line-height: 1.2;
  text-align: left;
`;
