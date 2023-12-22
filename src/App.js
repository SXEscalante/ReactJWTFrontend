// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import BookDetailsPage from "./pages/BookDetailsPage/BookDetailsPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/search/:searchParam/" element={<SearchResultsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details/:bookId" element={<BookDetailsPage />}/>
        <Route path="/favorites" element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
