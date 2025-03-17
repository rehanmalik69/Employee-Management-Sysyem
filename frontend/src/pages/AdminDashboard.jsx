import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaUserTie, FaClipboardList, FaCog, FaBell, FaSearch, FaSignOutAlt, FaUserPlus, FaChartBar, FaCalendarAlt, FaFileAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  });

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuth || userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  // Initialize employees with dummy data
  useEffect(() => {
    setEmployees([
      { id: 1, name: "John Smith", email: "john@example.com", role: "Developer", status: "Active", joined: "2024-01-15" },
      { id: 2, name: "Sarah Wilson", email: "sarah@example.com", role: "Designer", status: "Active", joined: "2024-02-01" },
      { id: 3, name: "Michael Brown", email: "michael@example.com", role: "Manager", status: "On Leave", joined: "2023-12-10" },
      { id: 4, name: "Emma Davis", email: "emma@example.com", role: "Developer", status: "Active", joined: "2024-01-20" },
      { id: 5, name: "James Johnson", email: "james@example.com", role: "Analyst", status: "Active", joined: "2024-02-05" }
    ]);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add API call here to create/update employee
      if (modalType === 'add') {
        setEmployees([...employees, { ...formData, id: Date.now(), status: 'Active', joined: new Date().toISOString().split('T')[0] }]);
      } else if (modalType === 'edit' && selectedEmployee) {
        setEmployees(employees.map(emp => 
          emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp
        ));
      }
      setShowModal(false);
      setFormData({ name: '', email: '', role: '', password: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle employee deletion
  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        // Add API call here to delete employee
        setEmployees(employees.filter(emp => emp.id !== employeeId));
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dummy data for demonstration
  const stats = [
    { title: "Total Employees", value: "156", icon: <FaUsers />, change: "+12%", color: "bg-blue-500" },
    { title: "Active Projects", value: "43", icon: <FaClipboardList />, change: "+5%", color: "bg-green-500" },
    { title: "Tasks Complete", value: "89%", icon: <FaChartBar />, change: "+2%", color: "bg-purple-500" },
    { title: "Total Revenue", value: "$54.2K", icon: <FaFileAlt />, change: "+8%", color: "bg-yellow-500" },
  ];

  // Update the employee table to use employees state instead of recentEmployees
  const displayEmployees = searchTerm ? filteredEmployees : employees;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} min-h-screen sticky top-0 bg-white bg-opacity-20 backdrop-blur-lg border-r border-white border-opacity-20 transition-all duration-300 ease-in-out`}>
          <div className="p-6">
            <h2 className={`font-bold text-2xl mb-8 text-white ${!sidebarOpen && 'hidden'}`}>WorkFlowX</h2>
            <nav className="space-y-6">
              <SidebarItem icon={<FaUsers />} text="Dashboard" active={true} collapsed={!sidebarOpen} />
              <SidebarItem icon={<FaUserTie />} text="Employees" collapsed={!sidebarOpen} />
              <SidebarItem icon={<FaClipboardList />} text="Projects" collapsed={!sidebarOpen} />
              <SidebarItem icon={<FaCalendarAlt />} text="Schedule" collapsed={!sidebarOpen} />
              <SidebarItem icon={<FaCog />} text="Settings" collapsed={!sidebarOpen} />
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-white/20 backdrop-blur-lg border-b border-white/20">
            <div className="flex items-center justify-between p-6">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 px-4 py-2 rounded-lg bg-white/10 border border-white/40 focus:border-white/100 focus:outline-none text-white placeholder-white/60"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute right-3 top-3 text-white/80" />
                </div>
                <div className="relative">
                  <FaBell className="text-white text-xl cursor-pointer hover:text-indigo-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin" className="w-8 h-8 rounded-full" />
                  <span className="font-medium text-white">Admin</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white hover:text-red-300"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8">
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <QuickActionCard
                  title="Add New Employee"
                  icon={<FaUserPlus />}
                  description="Create a new employee profile"
                  buttonText="Add Employee"
                  color="bg-green-500"
                  onClick={() => {
                    setModalType('add');
                    setShowModal(true);
                  }}
                />
                <QuickActionCard
                  title="Generate Report"
                  icon={<FaFileAlt />}
                  description="Create monthly performance report"
                  buttonText="Generate"
                  color="bg-blue-500"
                />
                <QuickActionCard
                  title="Schedule Meeting"
                  icon={<FaCalendarAlt />}
                  description="Set up team meetings"
                  buttonText="Schedule"
                  color="bg-purple-500"
                />
              </div>

              {/* Recent Employees Table */}
              <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20">
                <div className="p-6 border-b border-white/20">
                  <h3 className="text-xl font-semibold text-white">Recent Employees</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/20">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/20">
                      {displayEmployees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-white/10">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img src={`https://ui-avatars.com/api/?name=${employee.name}&background=random`} alt={employee.name} className="w-8 h-8 rounded-full mr-3" />
                              <div className="text-sm font-medium text-white">{employee.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{employee.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {employee.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{employee.joined}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              className="text-white hover:text-blue-300 mr-3"
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setFormData({ name: employee.name, email: employee.email, role: employee.role, password: '' });
                                setModalType('edit');
                                setShowModal(true);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="text-white hover:text-red-300"
                              onClick={() => handleDelete(employee.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal - Update styles */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-white">
              {modalType === 'add' ? 'Add New Employee' : 'Edit Employee'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white placeholder-white/60"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white placeholder-white/60"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white placeholder-white/60"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  required
                />
                {modalType === 'add' && (
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 rounded bg-white/10 border border-white/40 text-white placeholder-white/60"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-white hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    {modalType === 'add' ? 'Add' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Component for sidebar items
const SidebarItem = ({ icon, text, active, collapsed }) => (
  <div className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
    active ? 'bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-20'
  }`}>
    <div className="text-xl">{icon}</div>
    {!collapsed && <span className="ml-3 text-white">{text}</span>}
  </div>
);

// Component for stat cards
const StatCard = ({ title, value, icon, change, color }) => (
  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 hover:bg-white/30 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-white/80 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className={`${color} text-white p-3 rounded-lg`}>
        {icon}
      </div>
    </div>
    <p className="text-sm text-green-400 mt-2">{change} from last month</p>
  </div>
);

// Component for quick action cards
const QuickActionCard = ({ title, icon, description, buttonText, color, onClick }) => (
  <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-20 p-6 hover:bg-opacity-25 transition-all duration-300">
    <div className={`${color} text-white p-3 rounded-lg inline-block mb-4`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    <p className="text-white mb-4">{description}</p>
    <button
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      onClick={onClick}
    >
      {buttonText}
    </button>
  </div>
);

export default AdminDashboard;
