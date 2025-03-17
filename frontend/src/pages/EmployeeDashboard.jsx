import React from "react";
import { FaUser, FaCalendar, FaClock, FaFileAlt } from "react-icons/fa";

const EmployeeDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Employee Dashboard</h1>
          <p>Welcome back!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quick Actions Cards */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <FaUser className="text-3xl text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Profile</h3>
            <p className="text-gray-600">View and update your profile information</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <FaCalendar className="text-3xl text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Attendance</h3>
            <p className="text-gray-600">Check your attendance record</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <FaClock className="text-3xl text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Time Off</h3>
            <p className="text-gray-600">Request and manage your leave</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <FaFileAlt className="text-3xl text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Documents</h3>
            <p className="text-gray-600">Access your documents</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
