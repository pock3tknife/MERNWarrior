import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { MdFingerprint } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "./Button";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import * as actionType from "../constants/actionTypes";
import useStyles from "../components/pages/styles";

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("./components/pages/Auth/auth");

    setUser(null);
  };

  useEffect(() => {
    showButton();
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  /*useEffect(() => {
    showButton();
  }, []);*/

  window.addEventListener("resize", showButton);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <MdFingerprint className="navbar-icon" />
              LAVISH
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/services"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/postmessages"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  PostMessages
                </Link>
              </li>
              <li className="nav-btn">
                {user?.result ? (
                  <div className={classes.profile}>
                    <Avatar
                      className={classes.purple}
                      alt={user?.result.name}
                      src={user?.result.imageUrl}
                    ></Avatar>
                    {user?.result.name.charAt(0)}

                    <Typography className={classes.userName} variant="h6">
                      {user?.result.name}
                    </Typography>
                    <Button
                      variant="contained"
                      className={classes.logout}
                      color="secondary"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/sign-up" className="btn-link">
                    <Button buttonStyle="btn--outline">SIGN UP</Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
