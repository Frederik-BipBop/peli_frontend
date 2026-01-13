import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import facade from "../apiFacade.js";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await facade.getGames();
        setGames(Array.isArray(data) ? data : []);
      } catch {
        setError("Could not load games from backend.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // HOF-eksempel: flatMap + map + filter
  const allGenres = useMemo(() => {
    const names = games
      .flatMap((g) => g.genres ?? [])
      .map((x) => x.name)
      .filter(Boolean);
    return ["All", ...Array.from(new Set(names)).sort()];
  }, [games]);

  const filteredGames = useMemo(() => {
    if (genreFilter === "All") return games;
    return games.filter((g) => (g.genres ?? []).some((x) => x.name === genreFilter));
  }, [games, genreFilter]);

  return (
    <>
      <h1>Games</h1>

      <div className="card">
        <div className="row">
          <label>
            Filter genre:&nbsp;
            <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
              {allGenres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          <div>
            <strong>Count:</strong> {filteredGames.length}
          </div>
        </div>
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="grid">
          {filteredGames.map((g) => (
            <div className="card" key={g.id}>
              <h3>{g.name}</h3>

              <p style={{ margin: 0 }}>
                <strong>Genres:</strong>{" "}
                {(g.genres ?? []).map((x) => x.name).join(", ") || "—"}
              </p>

              <div style={{ marginTop: "0.75rem" }}>
                <Link to={`/games/${g.id}`}>
                  <button>Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
