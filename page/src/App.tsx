import { Route, Routes } from "react-router-dom";

import "./index.css";
import { About, Navbar, VizContainer } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<VizContainer />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
