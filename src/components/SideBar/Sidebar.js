import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage, MdContactMail, MdInfo, MdSearch } from "react-icons/md";
import { BiAnalyse, BiSearch, BiDollar, BiMovie, BiTv } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SubMenu";
import styled from "styled-components";
import axios from "../../api/axios";
import NavbarAccount from "./LoginAndData";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/discover?type=movies",
    name: "Movies",
    icon: <BiMovie />,
    exact: true,

    subRoutes: [
      {
        path: "/movies/popular",
        name: "Popular ",
      },
      {
        path: "/movies/toprated",
        name: "Top Rated",
      },
      {
        path: "/movies/sort_by?=genre",
        name: "Sort by Genre",
      },
    ],
  },
  {
    path: "/discover?type=series",
    name: "Series",
    icon: <BiTv />,
    exact: true,

    subRoutes: [
      {
        path: "/discover?type=series/popular",
        name: "Popular ",
      },
      {
        path: "/discover?type=series/toprated",
        name: "Top Rated",
      },
      {
        path: "/discover?type=series/genre",
        name: "Sort by Genre",
      },
    ],
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />,
  },
  {
    path: "/user",
    name: "Users",
    icon: <FaUser />,
  },
  // {
  //   path: "/subscription",
  //   name: "Pricing",
  //   icon: <BiDollar />,
  // },
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: <BiCog />,
  //   exact: true,

  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //   ],
  // },
  {
    path: "/contacs",
    name: "Contacs",
    icon: <MdContactMail />,
  },
  {
    path: "/about",
    name: "About",
    icon: <MdInfo />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const history = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [hideNav, setHideNav] = useState(true);

  const handleHideNav = () => setHideNav(!hideNav);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "100%",
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    if (location.search) {
      const searchQuery = new URLSearchParams(location.search).get(
        "query_results"
      );
      if (searchQuery) {
        setQuery(searchQuery);
        fetchData(searchQuery);
      }
    }
  }, [location.search]);

  const fetchData = async (query) => {
    setIsLoading(true);
    const API_KEY = "8260a7b490f140fde24b8a24b034994a";
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false`;

    try {
      const response = await axios.get(url);
      setData(response.data.results);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isHovered || isFocused;

  function slugify(string) {
    return string
      ?.toLowerCase()
      .replace(/\s+/g, "+")
      .replace(/[^\w\-]+/g, "+");
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (query === "") {
      setIsError(true);
    } else {
      const slugifiedQuery = slugify(query);
      window.location.href = `/search?query_results=${slugifiedQuery}`;
    }
  };

  return (
    <>
      <NavContainer>
        <NavIcon>
          <Link to="/">
            <NavLogo src="/images/realmoevan-text.png" alt="logo" />
          </Link>
        </NavIcon>
        <NavbarAccount />
      </NavContainer>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "55px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  <Link to="/">
                    <BrandImage src="/images/realmoevan-text.png" alt="logo" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars
                onClick={function (event) {
                  toggle();
                  handleHideNav();
                }}
              />
            </div>
          </div>
          <div className="search">
            <SearchForm>
              {isOpen ? (
                <MdSearch
                  onClick={handleSearchSubmit}
                  className="search-button"
                />
              ) : (
                <BiSearch
                  type="submit"
                  onClick={function (event) {
                    toggle();
                    handleHideNav();
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                />
              )}
            </SearchForm>
            <AnimatePresence>
              {isOpen && (
                <Form onSubmit={handleSearchSubmit}>
                  <SearchInput
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={inputAnimation}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setIsError(false);
                    }}
                    isError={isError}
                    placeholder={isError ? "Fill this field!" : "Search"}
                    style={{
                      height: "35px",
                      position: "relative",
                      bottom: "5px",
                      border: `2px solid ${isError ? "red" : "#fff"}`,
                      borderRadius: "40px",
                      outline: "none",
                    }}
                    className={isError ? "search-input-error" : ""}
                  />
                </Form>
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                        onClick={function (event) {
                          toggle();
                          handleHideNav();
                        }}
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;

const BrandImage = styled.img`
  width: 200px;
  height: auto;
  position: relative;
  bottom: 7px;
  object-fit: cover;
`;

const NavLogo = styled.img`
  margin-top: 10px;
  width: 250px;
  height: auto;
  position: relative;
  object-fit: cover;
  margin-right: 75px;
  top: -5px;
  z-index: 2;
`;

const NavContainer = styled.div`
  background: linear-gradient(to bottom, #112 0%, transparent 100%);
  width: 100%;
  height: 50px;
  display: grid;
  align-items: center;
  position: absolute;
  top: -10px;
  z-index: 2;
`;

const NavIcon = styled.div`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
`;

const SearchForm = styled.form`
  display: flex;

  .search-button {
    cursor: pointer;
    border: 2px solid #fff;
    border-radius: 40px;
    padding: 5px;
    box-sizing: content-box;
    position: relative;
    bottom: 5px;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: #fff;
      color: #000;
    }
  }
`;

const SearchInput = styled(motion.input)`
  border: 2px solid ${(props) => (props.isError ? "red" : "#none")};

  ::placeholder {
    color: ${(props) => (props.isError ? "red" : "gray")};
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  .search-input-error {
    animation: shake 0.5s;
  }

  @keyframes shake {
    0% {
      transform: translate(0, 0);
    }
    20% {
      transform: translate(-4px, 0);
    }
    40% {
      transform: translate(4px, 0);
    }
    60% {
      transform: translate(-4px, 0);
    }
    80% {
      transform: translate(4px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

const UserImg = styled.img`
  width: 70px;
  height: 100%;
  border-radius: 100%;
`;
