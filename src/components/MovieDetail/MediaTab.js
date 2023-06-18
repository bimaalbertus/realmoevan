import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BackdropSlider from "./Media/BackdropSlider";
import VideoListSlider from "./Media/VideoListSlider";
import MovieVideos from "../MovieVideos/MovieVideos";
import styled from "styled-components";
import PosterSlider from "./Media/PosterSlider";

function MediaTab() {
  const { id, category } = useParams();
  const [selectedTab, setSelectedTab] = useState("video");

  const handleTabSelect = (key) => {
    setSelectedTab(key);
  };

  return (
    <Container>
      <div>
        <Title>Media</Title>
        <TabButton
          isSelected={selectedTab === "video"}
          onClick={() => handleTabSelect("video")}
        >
          Videos
        </TabButton>

        <TabButton
          isSelected={selectedTab === "backdrop"}
          onClick={() => handleTabSelect("backdrop")}
        >
          Backdrops
        </TabButton>

        <TabButton
          isSelected={selectedTab === "poster"}
          onClick={() => handleTabSelect("poster")}
        >
          Posters
        </TabButton>
      </div>
      <TabContainer>
        <TabContent selected={selectedTab === "video"}>
          <VideoListSlider id={id} category={category} />
        </TabContent>
        <TabContent selected={selectedTab === "backdrop"}>
          <BackdropSlider id={id} category={category} />
        </TabContent>
        <TabContent selected={selectedTab === "poster"}>
          <PosterSlider id={id} category={category} />
        </TabContent>
      </TabContainer>
    </Container>
  );
}

export default MediaTab;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 700px;
  width: 1000px;

  @media screen and (max-width: 1280px) {
    max-width: 700px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TabContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TabContent = styled.div`
  display: ${(props) => (props.selected ? "block" : "none")};
`;

const TabButton = styled.span`
  border: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  font-size: 1.5rem;
  font-weight: 500;
  margin-right: 30px;
  color: ${(props) => (props.isSelected ? "#8c8c8c" : "#c0c0c0")};
  border-bottom: ${(props) =>
    props.isSelected ? "2px solid #8c8c8c" : "none"};
  transition: border-bottom 0.2s ease-in-out;
  transform: ${(props) =>
    props.isSelected ? "translateX(5px)" : "translateX(0)"};
`;

const Title = styled.span`
  border: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 30px;
`;
