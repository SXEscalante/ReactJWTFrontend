import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

import './HomePage.css'
import FeaturedBook from "../../components/FeaturedBook/FeaturedBook";

const HomePage = () => {
  const [user, token] = useAuth();
  const [recommendedFictionBook, setRecommendedFictionBook] = useState({});
  const [recommendedActionBook, setRecommendedActionBook] = useState({});
  const [recommendedRomanceBook, setRecommendedRomanceBook] = useState({});
  
  const handleRecommendedFictionBook = async (randomBook) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:Fiction`)
      if (response.status === 200){
        console.log(response.data.items[randomBook])
        setRecommendedFictionBook(response.data.items[randomBook]);
      }
    } catch (error) {
      console.log("Error getting recommendations:", error)
    }
  }

  const handleRecommendedActionBook = async (randomBook) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:Action`)
      if (response.status === 200){
        console.log(response.data.items[randomBook])
        setRecommendedActionBook(response.data.items[randomBook]);
      }
    } catch (error) {
      console.log("Error getting recommendations:", error)
    }
  }

  const handleRecommendedRomanceBook = async (randomBook) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:Romance`)
      if (response.status === 200){
        console.log(response.data.items[randomBook])
        setRecommendedRomanceBook(response.data.items[randomBook]);
      }
    } catch (error) {
      console.log("Error getting recommendations:", error)
    }
  }

    useEffect(() => {
      var randomActionBook = Math.floor(Math.random() * 10)
      var randomFicitonBook = Math.floor(Math.random() * 10)
      var randomRomanceBook = Math.floor(Math.random() * 10)

      handleRecommendedActionBook(randomActionBook)
      handleRecommendedFictionBook(randomFicitonBook)
      handleRecommendedRomanceBook(randomRomanceBook)
    }, []);
    

  return (
    <div>
      <div className="hero">Where knowledge rules</div>
      <div className="featured-book">
        <FeaturedBook book={recommendedActionBook} genre={"Action"}/>
        <FeaturedBook book={recommendedFictionBook} genre={"Fiction"}/>
        <FeaturedBook book={recommendedRomanceBook} genre={"Romance"}/>
      </div>
    </div>
  );
};

export default HomePage;
