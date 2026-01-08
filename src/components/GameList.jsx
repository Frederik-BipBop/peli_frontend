import GameCard from "./GameCard.jsx";

export default function GameList({ games, onSelect }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
      {games.map(game => (
        <GameCard
          key={game.id}
          game={game}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
