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
import SortByGenreMovie from "../pages/Navbar and Viewers/SortByGenreMovies.js";
import PrivateRoute from "./PrivateRoute.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { AuthContextProvider } from "./AuthContext";
import ProfileContainer from "../pages/ProfileSettings/ProfileContainer.js";
import PopUp from "../utils/PopUpMessage/PopUp.js";
import SavedContainer from "../components/SavedMovies/SavedContainer.js";
import { useMediaQuery } from "react-responsive";
import SideNavBar from "../components/SideNavBar/SideNavBar.js";
import PlayerMovie from "../components/Player/PlayerMovie.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SortByGenreTV from "../pages/Navbar and Viewers/TvShows.js";

const LayoutWithSidebar = ({ children }) => {
  return (
    <>
      <SideNavBar />
      <div>{children}</div>
      <FooterContainer />
    </>
  );
};

const LayoutWithoutFooter = ({ children }) => {
  return (
    <>
      <SideNavBar />
      <div>{children}</div>
    </>
  );
};

function Router() {
  const [message, setMessage] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: "600px" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <AppContainer>
          <Routes>
            <Route
              path="/:countryCode/:uid"
              element={
                <LayoutWithSidebar>
                  <Home />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/:countryCode"
              element={
                <LayoutWithSidebar>
                  <Home />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/"
              element={
                <LayoutWithSidebar>
                  <Home />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/register"
              element={
                <LayoutWithSidebar>
                  <RegisterPage />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/login"
              element={
                <LayoutWithSidebar>
                  <LoginPage />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <LayoutWithSidebar>
                  <ForgotPassword />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/profile"
              element={
                <LayoutWithoutFooter>
                  <ProfileContainer />
                </LayoutWithoutFooter>
              }
            />
            <Route
              path="/series"
              element={
                <LayoutWithSidebar>
                  <SortByGenreTV />
                </LayoutWithSidebar>
              }
            />
            {/* <Route
              path="/trending"
              element={
                <LayoutWithSidebar>
                  <TrendingPage />
                </LayoutWithSidebar>
              }
            /> */}
            {/* <Route
              path="/about"
              element={
                <LayoutWithSidebar>
                  <About />
                </LayoutWithSidebar>
              }
            /> */}
            <Route
              path="/movies"
              element={
                <LayoutWithSidebar>
                  <SortByGenreMovie />
                </LayoutWithSidebar>
              }
            />
            {/* <Route path="/marvel" element={<MarvelPage />} />
                <Route path="/disney" element={<DisneyPage />} />
                <Route path="/pixar" element={<PixarPage />} />
                <Route path="/dreamworks" element={<DreamWorksPage />} />
                <Route path="/query=Star%20Wars" element={<StarWarsPage />} /> */}
            {/* <Route path="/subscription" element={<Subscription />} /> */}
            {/* <Route path="/film=:id" element={<MovieBannerAlternate />} /> */}
            <Route
              path="/person/:id-:name"
              element={
                <LayoutWithSidebar>
                  <PersonDetail />
                </LayoutWithSidebar>
              }
            />
            {/* <Route path="/:category/:id" element={ <Moviebanner />} /> */}
            <Route
              path="/:category/:id-:title"
              element={
                <LayoutWithSidebar>
                  <MovieBannerAlternate />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/:category/:id"
              element={
                <LayoutWithSidebar>
                  <MovieBannerAlternate />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/search"
              element={
                <LayoutWithSidebar>
                  <Search />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/:category/:id-:title/watch"
              element={<PlayerMovie />}
            />
            <Route
              path="/show/:id-:title/watch"
              element={
                <LayoutWithSidebar>
                  <PlayerSeries />
                </LayoutWithSidebar>
              }
            />
            {/* <Route
              path="/saved"
              element={
                <LayoutWithSidebar>
                  <SavedContainer />
                </LayoutWithSidebar>
              }
            /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
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
