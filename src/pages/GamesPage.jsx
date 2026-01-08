import { useState } from "react";
import GameList from "../components/GameList.jsx";
import { byGenre, withLogging } from "../utils/hofExamples.js";

const GAMES = [
  { id: 1, title: "Zelda", genre: "Adventure", rating: 9 },
  { id: 2, title: "FIFA", genre: "Sports", rating: 7 },
  { id: 3, title: "Dark Souls", genre: "RPG", rating: 10 },
  { id: 4, title: "Mario Kart", genre: "Racing", rating: 8 },
];

export default function GamesPage() {
  const [genre, setGenre] = useState("All");

  // HOF: filter + egen higher-order function
  const filteredGames = GAMES.filter(byGenre(genre));

  // HOF: reduce
  const averageRating =
    filteredGames.length === 0
      ? 0
      : filteredGames.reduce((sum, g) => sum + g.rating, 0) /
        filteredGames.length;

  // Egen higher-order function i brug
  const handleSelect = withLogging((game) => {
    alert(`Selected: ${game.title}`);
  }, "selectGame");

  return (
    <>
      <h1>Games</h1>

      <label>
        Filter genre:
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option>All</option>
          <option>Adventure</option>
          <option>Sports</option>
          <option>RPG</option>
          <option>Racing</option>
        </select>
      </label>

      <p>Average rating: {averageRating.toFixed(1)}</p>

      <GameList games={filteredGames} onSelect={handleSelect} />
    </>
  );
}
