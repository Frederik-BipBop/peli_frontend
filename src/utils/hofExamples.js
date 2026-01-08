// Higher-order function: tager en callback og returnerer en ny funktion
export function withLogging(fn, label = "fn") {
  return (...args) => {
    console.log(`[${label}] args:`, args);
    const result = fn(...args);
    console.log(`[${label}] result:`, result);
    return result;
  };
}

// Higher-order function: returnerer en predicate-funktion
export function byGenre(selectedGenre) {
  return (game) => selectedGenre === "All" || game.genre === selectedGenre;
}
