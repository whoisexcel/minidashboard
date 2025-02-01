import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
