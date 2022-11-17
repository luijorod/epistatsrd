import { useEffect } from "react";

import { draw } from "./assets/d3test";
import "./style.css";

function App() {
  useEffect(() => {
    draw();
  }, []);

  return (
    <div id="chart">
      <div id="tooltip">
        <div className="value"></div>
        <div className="date"></div>
      </div>
    </div>
  );
}

export default App;
