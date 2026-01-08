export default function GameCard({ game, onSelect }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
      <h3>{game.title}</h3>
      <p>Genre: {game.genre}</p>
      <button onClick={() => onSelect(game)}>
        Select
      </button>
    </div>
  );
}
