import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import ImprovementPlan from "./pages/ImprovementPlan";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/interview"
        element={
          <ProtectedRoute>
            <Interview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/result/:skill"
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        }
      />

      <Route
        path="/improvement/:skill"
        element={
          <ProtectedRoute>
            <ImprovementPlan />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
