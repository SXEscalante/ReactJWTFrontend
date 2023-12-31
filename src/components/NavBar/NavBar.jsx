import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import axios from "axios";


import Dropdown from "../Dropdown/Dropdown";

import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [username, token] = useAuth();

  const handleSubmit = (e) => {
    setSearch('');
    if(search != "") {
      navigate(`/search/${search}`);
    }
    else {
      navigate('/')
    }
  }

  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>BookNook</b>
          </Link>
        </li>
        <form onSubmit={handleSubmit} className="search-bar-wrapper">
          <input className="search-bar" placeholder="Search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <button type="submit"></button>
        </form>
        <li>
          {user ? (
            <Dropdown username={username}/>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
