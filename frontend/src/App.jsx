import { useEffect, useState } from "react";

function App() {
  const [inspections, setInspections] = useState([]);
  const [imageName, setImageName] = useState("");

  const fetchInspections = async () => {
    const response = await fetch("http://localhost:8000/inspections");
    const data = await response.json();

    setInspections(data);
  };

  const createInspection = async (event) => {
    event.preventDefault();

    if (!imageName.trim()) {
      return;
    }

    await fetch(
      `http://localhost:8000/inspections?image_name=${encodeURIComponent(imageName)}`,
      {
        method: "POST",
      }
    );

    setImageName("");
    fetchInspections();
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  return (
    <div>
      <h1>AI Inspection Platform</h1>

      <p>Backend status: Connected</p>

      <form onSubmit={createInspection}>
        <input
          type="text"
          placeholder="Image name"
          value={imageName}
          onChange={(event) => setImageName(event.target.value)}
        />

        <button type="submit">
          Create Inspection
        </button>
      </form>

      <h2>Inspections</h2>

      {inspections.length === 0 ? (
        <p>No inspections found.</p>
      ) : (
        <ul>
          {inspections.map((inspection) => (
            <li key={inspection.id}>
              {inspection.image_name} — {inspection.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;