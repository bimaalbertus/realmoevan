import { useEffect, useState } from 'react';
import logo from './logo.png';
import {
	Brand,
	BrandImage,
	Container,
	NavLink,
	Menu,
	MenuItems,
	Nav,
	MobileMenu,
	MobileMenuContainer,
	MobileMenuHover, SignIn, SignOut, UserImg, DropDown, Subscribe, Search, Searchicon
} from './NavbarStyle.js';
import { NavbarData } from './NavbarData.js';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios.js'
import requests from '../../Request.js';
import { auth, provider } from "../../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import {
	selectUserName,
	selectUserPhoto,
	setUserLoginDetails,
	setSignOutState,
  } from "../../features/user/userSlice.js";


import { IconButton } from '@material-ui/core'

export default function Header() {
	const screenSize = 580;
	const [menu, setMenu] = useState(false);
	const [toggleMenu, setToggleMenu] = useState(false);
	const [movie, setMovie] = useState([]);

	useEffect (() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchTrending);
			setMovie(
				request.data.results[
					Math.floor(Math.random() * request.data.results.length - 1)
				]
			)
			return request;
		}

		fetchData()
	}, [])

	console.log(movie);
	const dispatch = useDispatch();
  	const history = useNavigate();
  	const userName = useSelector(selectUserName);
  	const userPhoto = useSelector(selectUserPhoto);

	window.addEventListener('resize', (e) => {
		if (e.target.innerWidth < screenSize) {
			setMenu(true);
		} else {
			setMenu(false);
		}
	});

	useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                window.current.classList.add('shrink');
            } else {
                window.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
		  if (user) {
			setUser(user);
			history.push("/home");
		  }
		});
	  }, [userName]);
	
	  const handleAuth = () => {
		if (!userName) {
		  auth.signInWithPopup(provider).then((result) => {
			  setUser(result.user);
			})
			.catch((error) => {
			  alert(error.message);
			});
		} else if (userName) {
		  auth
			.signOut()
			.then(() => {
			  dispatch(setSignOutState());
			  history.push("/");
			})
		}
	  };
	
	  const setUser = (user) => {
		dispatch(
		  setUserLoginDetails({
			name: user.displayName,
			email: user.email,
			photo: user.photoURL,
		  })
		);
	  };

	return (
		<Nav>
			<Brand>
				<Link to="/">
					<BrandImage src={logo} alt="logo" />
				</Link>
			</Brand>
				<>
					<MobileMenuContainer menu={menu} onClick={() => setToggleMenu(!toggleMenu)}>
					<MobileMenu />
					<MobileMenuHover />
					</MobileMenuContainer>
					<Menu toggleMenu={toggleMenu} ss={screenSize}>
						{NavbarData.map((item, index) => (
							<MenuItems key={index} toggleMenu={toggleMenu} ss={screenSize}>
								<NavLink to={item.link}>{item.title}</NavLink>
							</MenuItems>
						))}
					</Menu>
					<Link to="/subscription" style={{ textDecoration: 'none' }}>
		  				<Subscribe>SUBSCRIBE</Subscribe>
		  			</Link>
					{!userName ? (
        				<Link to="/login" style={{ textDecoration: 'none' }}>
						<SignIn>Sign In</SignIn>
					</Link>
      				) : (
						<SignOut>
            				<UserImg src={userPhoto} alt={userName} />
            					<DropDown>
              						<span onClick={handleAuth}>Sign Out</span>
            					</DropDown>
          				</SignOut>
		  			)}
				</>
			</Nav>
	);
}


