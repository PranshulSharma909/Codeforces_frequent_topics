import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FrequencyPage from "./pages/FrequencyPage";
import ContestsPage from "./pages/ContestsPage";
import ProblemsPage from "./pages/ProblemsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tags/frequency" element={<FrequencyPage />} />
        <Route path="/recent-contests" element={<ContestsPage />} />
        <Route path="/recent-problems" element={<ProblemsPage />} />
      </Routes>
    </Router>
  );
}
