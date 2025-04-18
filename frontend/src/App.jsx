import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard activeTab="dashboard" />} />
        <Route path="/admin/employees" element={<AdminDashboard activeTab="employees" />} />
        <Route path="/admin/projects" element={<AdminDashboard activeTab="projects" />} />
        <Route path="/admin/schedule" element={<AdminDashboard activeTab="schedule" />} />
        <Route path="/admin/analytics" element={<AdminDashboard activeTab="analytics" />} />
        <Route path="/admin/leaves" element={<AdminDashboard activeTab="leaves" />} />
        <Route path="/admin/salary" element={<AdminDashboard activeTab="salary" />} />
        <Route path="/admin/settings" element={<AdminDashboard activeTab="settings" />} />

        {/* Simplified Employee Routes */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard activeTab="dashboard" />} />
        <Route path="/employee-dashboard/:tab" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
