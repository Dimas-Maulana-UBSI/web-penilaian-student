import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import GradePage from "./pages/dashboard/detail_assignments";
import ProtectedRoute from "./router/protected_routes";
import Home from "./pages/student/home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute roles={["mentor"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:repo_name" element={<GradePage />} />
      </Route>
      <Route path="/unauthorized" element={<h1>Akses Ditolak!</h1>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  );
}
