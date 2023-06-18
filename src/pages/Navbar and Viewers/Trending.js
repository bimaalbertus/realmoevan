import React from "react";
import NoSlider from "../../element/Page/NoSlider";
import requests from "../../Request";
import Page from "../../components/page";

const TrendingPage = () => {
  return (
    <Page title={`Trending Movies`}>
      <NoSlider fetchurl={requests.fetchTrending} />
    </Page>
  );
};

export default TrendingPage;
