import React from "react";

const api = {
  key: "643bbfb06345ab7789fa491e585154d5",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
          ></input>
          <h1>Heloo</h1>
        </div>
      </main>
    </div>
  );
}

export default App;
