import { Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import "./index.css";
import { About, Navbar, VizContainer } from "./components";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path="/" element={<VizContainer />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
