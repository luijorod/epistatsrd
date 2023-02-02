import { Route, Routes } from "react-router-dom";

import "./index.css";
import { About, Navbar, TimeSeriesContainer } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<TimeSeriesContainer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
