import { useEffect, useState } from "react";
import { Link } from "react-router";
import facade from "../apiFacade.js";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [gameIdInput, setGameIdInput] = useState("");

  async function loadFavorites() {
    try {
      setLoading(true);
      setError("");

      const data = await facade.getFavoritesByUserId(1);
      const list = Array.isArray(data) ? data : data?.favorites ?? [];
      setFavorites(list);
    } catch {
      setError("Could not load favorites.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  async function handleAddFavorite(e) {
    e.preventDefault();
    setError("");

    const id = Number(gameIdInput);
    if (!Number.isFinite(id) || id <= 0) {
      setError("Game ID must be a positive number.");
      return;
    }

    try {
      await facade.addFavorite(id);
      setGameIdInput("");
      await loadFavorites();
    } catch {
      setError("Could not add favorite.");
    }
  }

  async function handleRemoveFavorite(gameId) {
    setError("");
    try {
      await facade.removeFavorite(gameId);
      await loadFavorites();
    } catch {
      setError("Could not remove favorite.");
    }
  }

  return (
    <>
      <h1>Favorites</h1>

      <hr />

      <h2>Add favorite (by Game ID)</h2>
      <form
        onSubmit={handleAddFavorite}
        style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
      >
        <input
          value={gameIdInput}
          onChange={(e) => setGameIdInput(e.target.value)}
          placeholder="Game ID (e.g. 1)"
        />
        <button type="submit">Add</button>
      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <hr />

      <h2>Your favorites</h2>

      {loading ? (
        <p>Loading…</p>
      ) : favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((g) => (
            <li key={g.id}>
              <strong>{g.name ?? `Game #${g.id}`}</strong>
              <button
                style={{ marginLeft: "0.5rem" }}
                onClick={() => handleRemoveFavorite(g.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
