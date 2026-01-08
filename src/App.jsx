import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Nav from "./components/Nav.jsx";
import "./styles/app.css";


import HomePage from "./pages/HomePage.jsx";
import GamesPage from "./pages/GamesPage.jsx";
import GameDetailsPage from "./pages/GameDetailsPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import JsxVsVanilla from "./pages/JsxVsVanilla.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:id" element={<GameDetailsPage />} />

          <Route path="/jsx" element={<JsxVsVanilla />} />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
