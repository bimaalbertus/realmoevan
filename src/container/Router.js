import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar.js";
import Home from "../pages/Navbar and Viewers/Home.js";
import TvShows from "../pages/Navbar and Viewers/TvShows.js";
import TrendingPage from "../pages/Navbar and Viewers/Trending.js";
import About from "../pages/About/About.js";
import Search from "../components/Search/Search.js";
import MarvelPage from "../pages/Navbar and Viewers/MarvelPage.js";
import MovieBannerAlternate from "../components/MovieBannerAlternante/MovieBannerAlternate.js";
import Watch from "../pages/Watch.js";
import NotFound from "../pages/NotFound/NotFound.js";
import DisneyPage from "../pages/Navbar and Viewers/DisneyPage.js";
import PixarPage from "../pages/Navbar and Viewers/PixarPage";
import DreamWorksPage from "../pages/Navbar and Viewers/DreamWorksPage.js";
import StarWarsPage from "../pages/Navbar and Viewers/StarWarsPage.js";
import PlayerSeries from "../components/Player/PlayerSeries.js";
import PersonDetail from "../components/PersonDetail/PersonDetail";
import MovieDetail from "../components/MovieDetail/MovieDetail";
import FooterContainer from "../container/Footer/footer";
import Sidebar from "../components/SideBar/Sidebar.js";
import SavedMovies from "../components/SavedMovies/SavedMovies.js";
import styled from "styled-components";
import RegisterPage from "../pages/RegisterPage/RegisterPage.js";
import ProfileSettings from "../pages/ProfileSettings/ProfileSettings.js";
import ForgotPassword from "../pages/RegisterPage/ForgotPassword.js";
import LoginPage from "../pages/RegisterPage/LoginPage.js";
import PopularMovies from "../pages/SideBarPage/Movies/PopularMovies.js";
import TopRatedMovies from "../pages/SideBarPage/Movies/TopRatedMovies";
import SortByGenreMovie from "../pages/SideBarPage/Movies/SortByGenreMovies.js";
import PrivateRoute from "./PrivateRoute.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { AuthContextProvider } from "./AuthContext";
import ProfileContainer from "../pages/ProfileSettings/ProfileContainer.js";
import PopUp from "../utils/PopUpMessage/PopUp.js";
import SavedContainer from "../components/SavedMovies/SavedContainer.js";

function Router() {
  const [message, setMessage] = useState("");
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/user" element={<ProfileContainer />} />
            <Route path="/series" element={<TvShows />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/movies/toprated" element={<TopRatedMovies />} />
            <Route path="/movies/popular" element={<PopularMovies />} />
            <Route path="/movies/sort_by" element={<SortByGenreMovie />} />
            <Route path="/marvel" element={<MarvelPage />} />
            <Route path="/disney" element={<DisneyPage />} />
            <Route path="/pixar" element={<PixarPage />} />
            <Route path="/dreamworks" element={<DreamWorksPage />} />
            <Route path="/query=Star%20Wars" element={<StarWarsPage />} />
            {/* <Route path="/subscription" element={<Subscription />} /> */}
            {/* <Route path="/film=:id" element={<MovieDetail />} /> */}
            <Route path="/person/:id-:name" element={<PersonDetail />} />
            {/* <Route path="/:category/:id" element={ <Moviebanner />} /> */}
            <Route path="/:category/:id-:title" element={<MovieDetail />} />
            <Route path="/:category/:id" element={<MovieDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:category/:id-:title/watch" element={<Watch />} />
            <Route path="/saved" element={<SavedContainer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FooterContainer />
        </AppContainer>
      </BrowserRouter>
    </>
  );
}

export default Router;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 55px;
`;
