import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(response => setMessage(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1>Backend Message: {message}</h1>
    </div>
  );
}

export default App;