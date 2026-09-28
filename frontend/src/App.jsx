import { useEffect, useState } from "react";

function App() {
  const [apiStatus, setApiStatus] = useState("Checking...");

  useEffect(() => {
    fetch("http://localhost:8000/health")
      .then((response) => response.json())
      .then((data) => {
        setApiStatus(data.status);
      })
      .catch(() => {
        setApiStatus("Backend unavailable");
      });
  }, []);

  return (
    <div>
      <h1>AI Inspection Platform</h1>

      <p>
        Backend status: <strong>{apiStatus}</strong>
      </p>
    </div>
  );
}

export default App;