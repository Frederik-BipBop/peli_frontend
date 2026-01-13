import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import facade from "../apiFacade.js";

export default function GameDetailsPage() {
  const { id } = useParams();
  const gameId = Number(id);

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await facade.getGameById(gameId);
        setGame(data);
      } catch {
        setError("Could not load game details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [gameId]);

  async function addToFavorites() {
    setError("");
    setMsg("");
    try {
      await facade.addFavorite(gameId);
      setMsg("Added to favorites.");
    } catch {
      setError("Could not add favorite. Are you logged in?");
    }
  }

  return (
    <>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1>Game details</h1>
        <Link to="/games">
          <button>Back</button>
        </Link>
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {msg && <p>{msg}</p>}

      {loading ? (
        <p>Loading…</p>
      ) : !game ? (
        <p>Not found.</p>
      ) : (
        <div className="card">
          <h2 style={{ marginTop: 0 }}>{game.name}</h2>

          <p>
            <strong>Release:</strong> {game.firstReleaseDate ?? "—"}
          </p>

          <p>
            <strong>Genres:</strong>{" "}
            {(game.genres ?? []).map((x) => x.name).join(", ") || "—"}
          </p>

          <p>
            <strong>Summary:</strong> {game.summary ?? "—"}
          </p>

          <div className="row" style={{ marginTop: "1rem" }}>
            <button onClick={addToFavorites} disabled={!facade.loggedIn()}>
              Add to favorites
            </button>

            {!facade.loggedIn() && (
              <span style={{ fontSize: "0.9rem" }}>
                (Login required)
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
