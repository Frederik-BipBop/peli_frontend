import { useEffect, useMemo, useRef, useState } from "react";

const ITEMS = [
  { id: 1, name: "Zelda" },
  { id: 2, name: "FIFA" },
  { id: 3, name: "Dark Souls" },
  { id: 4, name: "Mario Kart" },
];

export default function JsxVsVanilla() {
  return (
    <>
      <h1>JSX vs Vanilla DOM</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          alignItems: "start",
        }}
      >
        <ReactListDemo />
        <VanillaDomDemo />
      </div>
    </>
  );
}

function ReactListDemo() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return ITEMS.filter((x) =>
      x.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <section style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h2>React (JSX)</h2>

      <label>
        Search:
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        />
      </label>

      <ul>
        {filtered.map((x) => (
          <li key={x.id}>
            {x.name}{" "}
            <button onClick={() => alert(`Clicked (React): ${x.name}`)}>
              Click
            </button>
          </li>
        ))}
      </ul>

      <p style={{ fontSize: "0.9rem" }}>
        JSX er syntaktisk sukker for <code>React.createElement</code>. React
        re-render når state ændrer sig.
      </p>
    </section>
  );
}

function VanillaDomDemo() {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Byg grundstruktur manuelt
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = "Vanilla JS (DOM manipulation)";
    container.appendChild(title);

    const label = document.createElement("label");
    label.textContent = "Search:";
    container.appendChild(label);

    const input = document.createElement("input");
    input.style.marginLeft = "0.5rem";
    label.appendChild(input);

    inputRef.current = input;

    const list = document.createElement("ul");
    container.appendChild(list);

    const note = document.createElement("p");
    note.style.fontSize = "0.9rem";
    note.textContent =
      "Her skal vi selv opdatere DOM'en manuelt ved input-ændringer.";
    container.appendChild(note);

    function render() {
      const q = input.value.toLowerCase();
      const filtered = ITEMS.filter((x) => x.name.toLowerCase().includes(q));

      list.innerHTML = "";

      filtered.forEach((x) => {
        const li = document.createElement("li");
        li.textContent = x.name + " ";

        const btn = document.createElement("button");
        btn.textContent = "Click";
        btn.addEventListener("click", () => alert(`Clicked (Vanilla): ${x.name}`));

        li.appendChild(btn);
        list.appendChild(li);
      });
    }

    input.addEventListener("input", render);

    // Første render
    render();

    // Cleanup
    return () => {
      input.removeEventListener("input", render);
    };
  }, []);

  return (
    <section style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <div ref={containerRef} />
    </section>
  );
}
