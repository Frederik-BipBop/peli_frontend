import { useEffect, useState } from "react";

const ITEMS = [
  { id: 1, name: "Zelda" },
  { id: 2, name: "FIFA" },
];

export default function JsxVsVanilla() {
  return (
    <>
      <h1>JSX vs Vanilla JS</h1>

      <div style={{ display: "flex", gap: "1rem" }}>
        <ReactDemo />
        <VanillaDemo />
      </div>
    </>
  );
}

/* ===== React med JSX ===== */
function ReactDemo() {
  const [search, setSearch] = useState("");

  const filtered = ITEMS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "50%" }}>
      <h2>React (JSX)</h2>

      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filtered.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => alert(item.name)}>Click</button>
          </li>
        ))}
      </ul>

      <p>
        JSX ligner HTML, men er JavaScript. React opdaterer automatisk UI,
        når state ændrer sig.
      </p>
    </div>
  );
}

/* ===== Vanilla JavaScript ===== */
function VanillaDemo() {
  useEffect(() => {
    const container = document.getElementById("vanilla");

    container.innerHTML = "<h2>Vanilla JS</h2>";

    const input = document.createElement("input");
    input.placeholder = "Search";
    container.appendChild(input);

    const list = document.createElement("ul");
    container.appendChild(list);

    function render() {
      list.innerHTML = "";

      const filtered = ITEMS.filter((item) =>
        item.name.toLowerCase().includes(input.value.toLowerCase())
      );

      filtered.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.name;

        const btn = document.createElement("button");
        btn.textContent = "Click";
        btn.onclick = () => alert(item.name);

        li.appendChild(btn);
        list.appendChild(li);
      });
      
    }

    input.addEventListener("input", render);
    render();
  }, []);

  return (
  <div style={{ border: "1px solid #ccc", padding: "1rem", width: "50%" }}>
    <div id="vanilla" />
    <p>
      I vanilla JavaScript skal vi selv oprette og opdatere DOM-elementer
      manuelt. Når data ændrer sig, skal vi selv sørge for at opdatere UI’et.
    </p>
  </div>
);
}
