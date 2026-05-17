import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import MatchCandidates from "./pages/MatchCandidates";
import AIRecommendations from "./pages/AIRecommendations";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/candidates"
          element={<Candidates />}
        />

        <Route
          path="/match"
          element={<MatchCandidates />}
        />

        <Route
          path="/ai"
          element={<AIRecommendations />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;