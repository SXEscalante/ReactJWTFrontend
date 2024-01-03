import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

import './HomePage.css'

const HomePage = () => {
  const [user, token] = useAuth();
  const [recommendations, setRecommendations] = useState([]);

  const handleRecommendedBooks = async (randomBook, randomGenre) => {
    try {
      const responce = axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${randomGenre}`)
      if (responce.status === 200){
        console.log(responce.data)
        addToRecommended(responce.data.items[randomBook]);
      }
    } catch (error) {
      console.log("Error getting recommendations:", error)
    }
  }

  useEffect(() => {
    randomizeRecommended()
  }, []);

  const randomizeRecommended = async () => {
    for (let i = 0; i < 3; i++) {
      var randomNum = Math.floor(Math.random() * 5)
      var randomBook = Math.floor(Math.random() * 10)
      var randomGenre;
      switch(randomNum) {
        case 0:
          randomGenre = "History"
          break;
        case 1:
          randomGenre = "Adventure"
          break;
        case 2:
          randomGenre = "Fiction"
          break;
        case 3:
          randomGenre = "Action"
          break;
        case 4:
          randomGenre = "Romance"
          break;
      }

      await handleRecommendedBooks(randomBook, randomGenre)
   }
  }

  const addToRecommended = (newRecommendation) => {
    const updatedRecommended = [...recommendations, newRecommendation]
    setRecommendations(updatedRecommended)

  }

  return (
    <div className="hero">
      {}
    </div>
  );
};

export default HomePage;
