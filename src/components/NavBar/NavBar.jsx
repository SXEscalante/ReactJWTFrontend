import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      const responce = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
      if (responce.status === 200){
        console.log(responce.data)
        setSearch('')
      }
    } catch (error) {
      console.log("Error searching for search term:", error)
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
        <form onSubmit={handleSearch}>
          <input className="search-bar" placeholder="Search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <button type="submit"></button>
        </form>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
