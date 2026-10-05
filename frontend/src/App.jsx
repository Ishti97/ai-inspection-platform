import { useEffect, useState } from "react";
const API_URL = "/api";

function App() {
  const [inspections, setInspections] = useState([]);
  const [imageName, setImageName] = useState("");
  const [backendStatus, setBackendStatus] = useState("Checking...");

  const fetchInspections = async () => {
    try {
      const response = await fetch(`${API_URL}/inspections`);

      if (!response.ok) {
        throw new Error("Failed to fetch inspections");
      }

      const data = await response.json();
      setInspections(data);
      setBackendStatus("Connected");
    } catch (error) {
      console.error(error);
      setBackendStatus("Disconnected");
    }
  };

  const createInspection = async (event) => {
    event.preventDefault();

    if (!imageName.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/inspections?image_name=${encodeURIComponent(imageName)}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create inspection");
      }

      setImageName("");
      fetchInspections();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  return (
    <div>
      <h1>AI Inspection Platform</h1>

      <p>Backend status: {backendStatus}</p>

      <form onSubmit={createInspection}>
        <input
          type="text"
          placeholder="Image name"
          value={imageName}
          onChange={(event) => setImageName(event.target.value)}
        />

        <button type="submit">Create Inspection</button>
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