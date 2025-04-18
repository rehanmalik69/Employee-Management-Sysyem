import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUsers, FaUserTie, FaClipboardList, FaCog, FaBell, FaSearch, FaSignOutAlt, FaUserPlus, FaChartBar, FaCalendarAlt, FaFileAlt, FaProjectDiagram, FaTasks, FaClock, FaCode, FaEllipsisV, FaRegComments, FaLink, FaRegClock, FaEdit, FaTrash, FaShare, FaCalendarPlus, FaUsersCog, FaVideo, FaUserCog, FaPaintBrush, FaLock, FaChartLine, FaDownload, FaRegFileAlt, FaMoneyBillWave, FaCalendarMinus } from "react-icons/fa";
import { FiTrendingUp, FiTrendingDown, FiUsers, FiDollarSign, FiClock, FiCheckCircle, FiPieChart, FiBarChart2, FiActivity } from "react-icons/fi";
const AdminDashboard = ({ activeTab = "dashboard" }) => {
  const navigate = useNavigate();
  const location = useLocation();
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
    password: '',
    phone: '',
    department: '',
    salary: '',
    joinDate: '',
    address: ''
  });
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-Commerce Platform",
      status: "In Progress",
      progress: 75,
      deadline: "2024-03-15",
      team: ["John Smith", "Sarah Wilson"],
      description: "Building a modern e-commerce platform with React and Node.js",
      priority: "High"
    },
    {
      id: 2,
      name: "Mobile App Development",
      status: "Planning",
      progress: 25,
      deadline: "2024-04-01",
      team: ["Michael Brown", "Emma Davis"],
      description: "Developing a mobile app for inventory management",
      priority: "Medium"
    },
    {
      id: 3,
      name: "CRM System Update",
      status: "Completed",
      progress: 100,
      deadline: "2024-02-28",
      team: ["James Johnson"],
      description: "Upgrading the existing CRM system with new features",
      priority: "Low"
    }
  ]);
  const [projectSearchTerm, setProjectSearchTerm] = useState('');
  const [activeProjectFilter, setActiveProjectFilter] = useState('All');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    team: [],
    priority: 'Medium',
    status: 'Planning'
  });
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Weekly Team Sync",
      date: "2024-02-20",
      time: "10:00",
      type: "Virtual",
      attendees: ["John Smith", "Sarah Wilson", "Michael Brown"],
      description: "Weekly team progress update and planning meeting"
    },
    {
      id: 2,
      title: "Project Review",
      date: "2024-02-21",
      time: "14:00",
      type: "In-Person",
      attendees: ["Emma Davis", "James Johnson"],
      description: "Review of Q1 project milestones and deliverables"
    }
  ]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleFormData, setScheduleFormData] = useState({
    title: '',
    date: '',
    time: '',
    type: 'Virtual',
    attendees: [],
    description: ''
  });
  const [settingsTab, setSettingsTab] = useState('profile');
  const [profileSettings, setProfileSettings] = useState(() => {
    const savedSettings = localStorage.getItem('appearanceSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      // Profile settings
      name: 'Admin User',
      email: 'admin@gmail.com',
      phone: '+1 234 567 8900',
      bio: '',
      timezone: 'UTC',
      
      // Appearance settings
      theme: 'dark',
      fontSize: 14,
      accentColor: 'indigo',
      layoutDensity: 'Comfortable',
      
      // Notification settings
      emailUpdates: true,
      emailProjects: true,
      emailMeetings: true,
      emailMessages: true,
      pushAlerts: true,
      pushChat: true,
      pushTasks: true,
      
      // Security settings
      twoFactorEnabled: false,
      lastPasswordChange: new Date().toISOString(),
      activeSessions: [],
      passwordStrength: 'strong',
      loginAlerts: true,
      
      // Additional preferences
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      weekStart: 'Monday',
      currency: 'USD'
    };
  });

  // Add new handler for appearance settings
  const handleAppearanceUpdate = (setting, value) => {
    const newSettings = { ...profileSettings, [setting]: value };
    setProfileSettings(newSettings);
    localStorage.setItem('appearanceSettings', JSON.stringify(newSettings));
    applyAppearanceSettings(newSettings);
  };

  // Function to apply appearance settings
  const applyAppearanceSettings = (settings) => {
    // Apply theme
    document.documentElement.className = settings.theme;
    
    // Apply font size
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
    
    // Apply accent color
    document.documentElement.style.setProperty('--accent-color', `var(--${settings.accentColor}-500)`);
    
    // Apply layout density
    const densityClasses = {
      'Compact': 'density-compact',
      'Comfortable': 'density-comfortable',
      'Spacious': 'density-spacious'
    };
    document.body.className = densityClasses[settings.layoutDensity];
  };

  // Apply settings on initial load
  useEffect(() => {
    applyAppearanceSettings(profileSettings);
  }, []);

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
      setFormData({ name: '', email: '', role: '', password: '', phone: '', department: '', salary: '', joinDate: '', address: '' });
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

  const handleNavigation = (tab, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Only update if the tab is actually changing
    if (currentTab !== tab) {
      setCurrentTab(tab);
      if (tab === "employees") {
        navigate("/admin/employees");
      } else if (tab === "projects") {
        navigate("/admin/projects");
      } else if (tab === "schedule") {
        navigate("/admin/schedule");
      } else if (tab === "settings") {
        navigate("/admin/settings");
      } else {
        navigate("/admin-dashboard");
      }
    }
  };

  // Add department options
  const departments = [
    'Engineering',
    'Design',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations'
  ];

  // Add roles options
  const roles = [
    'Software Engineer',
    'UI/UX Designer',
    'Project Manager',
    'Marketing Specialist',
    'Sales Representative',
    'HR Manager',
    'Financial Analyst',
    'Operations Manager'
  ];

  // Add project status colors
  const statusColors = {
    "In Progress": "bg-blue-400/20 text-blue-200",
    "Planning": "bg-yellow-400/20 text-yellow-200",
    "Completed": "bg-green-400/20 text-green-200",
    "On Hold": "bg-red-400/20 text-red-200"
  };

  const handleProjectSearch = (term) => {
    setProjectSearchTerm(term);
  };

  const handleFilterProjects = (filter) => {
    setActiveProjectFilter(filter);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(projectSearchTerm.toLowerCase());
    const matchesFilter = activeProjectFilter === 'All' || project.status === activeProjectFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddProject = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      ...projectFormData,
      progress: 0
    };
    setProjects([...projects, newProject]);
    setShowProjectModal(false);
    setProjectFormData({
      name: '',
      description: '',
      deadline: '',
      team: [],
      priority: 'Medium',
      status: 'Planning'
    });
  };

  const handleProjectAction = (action, projectId) => {
    switch(action) {
      case 'delete':
        if(window.confirm('Are you sure you want to delete this project?')) {
          setProjects(projects.filter(p => p.id !== projectId));
        }
        break;
      case 'edit':
        const project = projects.find(p => p.id === projectId);
        setProjectFormData(project);
        setShowProjectModal(true);
        break;
      case 'share':
        // Implement share functionality
        console.log('Share project:', projectId);
        break;
      default:
        break;
    }
  };

  const handleAddMeeting = (e) => {
    e.preventDefault();
    const newMeeting = {
      id: Date.now(),
      ...scheduleFormData
    };
    setMeetings([...meetings, newMeeting]);
    setShowScheduleModal(false);
    setScheduleFormData({
      title: '',
      date: '',
      time: '',
      type: 'Virtual',
      attendees: [],
      description: ''
    });
  };

  const handleDeleteMeeting = (meetingId) => {
    if(window.confirm('Are you sure you want to delete this meeting?')) {
      setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
    }
  };

  const handleSettingsUpdate = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update settings
    setProfileSettings({
      ...profileSettings,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  // Update the appearance section JSX
  const appearanceContent = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Appearance Settings</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Theme Selection */}
        <div className="p-3 bg-white/10 rounded-lg">
          <label className="text-white text-sm mb-2 block font-medium">Theme</label>
          <div className="grid grid-cols-3 gap-2">
            {['dark', 'light', 'system'].map((theme) => (
              <button
                key={theme}
                onClick={() => handleAppearanceUpdate('theme', theme)}
                className={`p-2 rounded-lg border ${
                  profileSettings.theme === theme 
                    ? 'border-indigo-500 bg-indigo-500/20' 
                    : 'border-white/20 hover:border-white/40'
                } transition-colors`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${
                    theme === 'dark' ? 'bg-gray-900' :
                    theme === 'light' ? 'bg-gray-100' : 'bg-gradient-to-r from-gray-900 to-gray-100'
                  }`} />
                  <span className="text-white capitalize text-sm">{theme}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="p-3 bg-white/10 rounded-lg">
          <label className="text-white text-sm mb-2 block font-medium">
            Font Size: {profileSettings.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="20"
            value={profileSettings.fontSize}
            onChange={(e) => handleAppearanceUpdate('fontSize', parseInt(e.target.value))}
            className="w-full accent-indigo-500"
          />
          <div className="flex justify-between text-white/60 text-xs mt-1">
            <span>12px</span>
            <span>16px</span>
            <span>20px</span>
          </div>
        </div>

        {/* Color Scheme */}
        <div className="p-3 bg-white/10 rounded-lg">
          <label className="text-white text-sm mb-2 block font-medium">Accent Color</label>
          <div className="grid grid-cols-6 gap-2">
            {['indigo', 'purple', 'blue', 'green', 'red', 'orange'].map((color) => (
              <button
                key={color}
                onClick={() => handleAppearanceUpdate('accentColor', color)}
                className={`w-8 h-8 rounded-full bg-${color}-500 transition-all ${
                  profileSettings.accentColor === color 
                    ? 'ring-2 ring-offset-2 ring-offset-black ring-white' 
                    : 'hover:scale-110'
                }`}
                title={color.charAt(0).toUpperCase() + color.slice(1)}
              />
            ))}
          </div>
        </div>

        {/* Layout Density */}
        <div className="p-3 bg-white/10 rounded-lg">
          <label className="text-white text-sm mb-2 block font-medium">Layout Density</label>
          <div className="grid grid-cols-3 gap-2">
            {['Compact', 'Comfortable', 'Spacious'].map((density) => (
              <button
                key={density}
                onClick={() => handleAppearanceUpdate('layoutDensity', density)}
                className={`py-2 px-3 rounded-lg text-sm ${
                  profileSettings.layoutDensity === density
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                } transition-colors`}
              >
                {density}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => {
            const defaultSettings = {
              theme: 'dark',
              fontSize: 14,
              accentColor: 'indigo',
              layoutDensity: 'Comfortable'
            };
            setProfileSettings({ ...profileSettings, ...defaultSettings });
            localStorage.setItem('appearanceSettings', JSON.stringify({ ...profileSettings, ...defaultSettings }));
            applyAppearanceSettings(defaultSettings);
          }}
          className="text-white/60 hover:text-white text-sm"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );

  // Add new state for security settings
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Add password change handler
  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Add password validation logic here
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      // Update password logic here
      setShowPasswordModal(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  // Add new state for report generation
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    type: 'performance',
    dateRange: 'month',
    format: 'pdf',
    includeCharts: true
  });

  // Add new state for report loading
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Update report generation handler
  const handleGenerateReport = async (e) => {
    e.preventDefault();
    setIsGeneratingReport(true);

    try {
      // Simulate API call with actual data
      const reportData = {
        ...reportForm,
        reportId: Date.now(),
        generatedAt: new Date().toISOString(),
        data: {
          employees: reportForm.type === 'performance' ? employees : null,
          projects: reportForm.type === 'projects' ? projects : null,
          meetings: reportForm.type === 'attendance' ? meetings : null,
          // Add financial data if needed
          financial: reportForm.type === 'financial' ? {
            revenue: "$54.2K",
            expenses: "$32.1K",
            profit: "$22.1K"
          } : null
        }
      };

      // Simulate report generation delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate report content based on type
      const reportContent = generateReportContent(reportData);

      // Create and download file
      const fileName = `${reportForm.type}_report_${new Date().toISOString().split('T')[0]}.${reportForm.format}`;
      downloadReport(reportContent, fileName, reportForm.format);

      setShowReportModal(false);
      setReportForm({
        type: 'performance',
        dateRange: 'month',
        format: 'pdf',
        includeCharts: true
      });
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Add helper function to generate report content
  const generateReportContent = (reportData) => {
    // This is a mock function - replace with actual report generation logic
    const content = {
      title: `${reportData.type.charAt(0).toUpperCase() + reportData.type.slice(1)} Report`,
      date: new Date().toLocaleDateString(),
      data: reportData.data
    };
    return JSON.stringify(content, null, 2);
  };

  // Add helper function to download report
  const downloadReport = (content, fileName, format) => {
    const blob = new Blob([content], { type: getContentType(format) });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Add helper function to get content type
  const getContentType = (format) => {
    switch (format) {
      case 'pdf':
        return 'application/pdf';
      case 'excel':
        return 'application/vnd.ms-excel';
      case 'csv':
        return 'text/csv';
      default:
        return 'text/plain';
    }
  };

  // Update Quick Actions section in the dashboard with correct handler
  const quickActionsContent = (
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
        onClick={() => setShowReportModal(true)}
      />
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-20 p-6 hover:bg-opacity-25 transition-all duration-300">
        <div className="bg-purple-500 text-white p-3 rounded-lg inline-block mb-4">
          <FaCalendarAlt />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white">Schedule Management</h3>
        <p className="text-white mb-4">View and manage team meetings and schedules</p>
        <button
          onClick={() => handleNavigation("schedule")}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 justify-center"
        >
          <FaCalendarAlt /> View Schedule
        </button>
      </div>
    </div>
  );

  // Add Report Modal component
  const ReportModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Generate Report</h3>
          <button
            onClick={() => !isGeneratingReport && setShowReportModal(false)}
            className="text-white/60 hover:text-white"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleGenerateReport} className="space-y-4">
          <div>
            <label className="block text-white text-sm mb-1">Report Type</label>
            <select
              value={reportForm.type}
              onChange={(e) => setReportForm({...reportForm, type: e.target.value})}
              className="w-full p-2 rounded bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
              disabled={isGeneratingReport}
            >
              <option value="performance">Employee Performance</option>
              <option value="attendance">Attendance</option>
              <option value="projects">Project Status</option>
              <option value="financial">Financial Summary</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">Date Range</label>
            <select
              value={reportForm.dateRange}
              onChange={(e) => setReportForm({...reportForm, dateRange: e.target.value})}
              className="w-full p-2 rounded bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
              disabled={isGeneratingReport}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">Format</label>
            <select
              value={reportForm.format}
              onChange={(e) => setReportForm({...reportForm, format: e.target.value})}
              className="w-full p-2 rounded bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
              disabled={isGeneratingReport}
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeCharts"
              checked={reportForm.includeCharts}
              onChange={(e) => setReportForm({...reportForm, includeCharts: e.target.checked})}
              className="rounded border-white/40 bg-white/10 text-indigo-600"
              disabled={isGeneratingReport}
            />
            <label htmlFor="includeCharts" className="ml-2 text-white text-sm">
              Include charts and graphs
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowReportModal(false)}
              className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 disabled:opacity-50"
              disabled={isGeneratingReport}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
              disabled={isGeneratingReport}
            >
              {isGeneratingReport ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <FaFileAlt /> Generate
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Add new states for notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'meeting',
      title: 'New Meeting Scheduled',
      message: 'Team meeting scheduled for tomorrow at 10:00 AM',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'project',
      title: 'Project Update',
      message: 'E-Commerce Platform project progress updated to 80%',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'employee',
      title: 'New Employee Added',
      message: 'Sarah Wilson has joined the Design team',
      time: '2 hours ago',
      read: true
    }
  ]);

  // Add notification handlers
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification =>
      notification.id !== notificationId
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Add these state variables after other useState declarations
  const [tasks, setTasks] = useState([
    { id: 1, title: "Website Redesign", status: "completed", dueDate: "2024-02-20" },
    { id: 2, title: "Database Migration", status: "in_progress", dueDate: "2024-02-25" },
    { id: 3, title: "API Integration", status: "in_progress", dueDate: "2024-02-22" },
    { id: 4, title: "Security Audit", status: "pending", dueDate: "2024-02-28" },
    { id: 5, title: "User Testing", status: "completed", dueDate: "2024-02-19" },
    { id: 6, title: "Performance Review", status: "overdue", dueDate: "2024-02-15" },
  ]);
  const [taskTimeFilter, setTaskTimeFilter] = useState('week');

  // Add these functions before the return statement
  const getFilteredTasks = () => {
    const now = new Date();
    const taskDate = (task) => new Date(task.dueDate);
    
    switch(taskTimeFilter) {
      case 'today':
        return tasks.filter(task => 
          taskDate(task).toDateString() === now.toDateString()
        );
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return tasks.filter(task => taskDate(task) >= weekAgo);
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return tasks.filter(task => taskDate(task) >= monthAgo);
      default:
        return tasks;
    }
  };

  const getTaskStats = () => {
    const filteredTasks = getFilteredTasks();
    const total = filteredTasks.length;
    const completed = filteredTasks.filter(t => t.status === 'completed').length;
    const inProgress = filteredTasks.filter(t => t.status === 'in_progress').length;
    const overdue = filteredTasks.filter(t => t.status === 'overdue').length;
    
    const previousPeriodTasks = tasks.length - total;
    const changePercentage = previousPeriodTasks === 0 ? 0 : 
      ((total - previousPeriodTasks) / previousPeriodTasks * 100).toFixed(0);

    return {
      total,
      completed,
      inProgress,
      overdue,
      changePercentage
    };
  };

  // Add these new states for analytics
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState('month');
  const [analyticsData] = useState({
    revenue: {
      total: 154200,
      change: 12.5,
      history: [12400, 13200, 12800, 14500, 13900, 15000],
    },
    employees: {
      total: 156,
      active: 142,
      onLeave: 8,
      new: 6,
      distribution: {
        Engineering: 45,
        Design: 28,
        Marketing: 22,
        Sales: 35,
        HR: 12,
        Finance: 14,
      }
    },
    projects: {
      total: 43,
      completed: 28,
      ongoing: 12,
      delayed: 3,
      successRate: 87,
    },
    performance: {
      averageProductivity: 84,
      taskCompletion: 92,
      attendance: 96,
      deadlineMet: 89,
    }
  });

  // Add new states for leaves and salary
  const [leaveRequests] = useState([
    {
      id: 1,
      employeeName: "John Smith",
      type: "Sick Leave",
      startDate: "2024-02-20",
      endDate: "2024-02-22",
      status: "Pending",
      reason: "Medical appointment"
    },
    {
      id: 2,
      employeeName: "Sarah Wilson",
      type: "Vacation",
      startDate: "2024-03-01",
      endDate: "2024-03-05",
      status: "Approved",
      reason: "Family vacation"
    }
  ]);

  const [salaryData] = useState([
    {
      id: 1,
      employeeName: "John Smith",
      basicSalary: 5000,
      bonuses: 500,
      deductions: 200,
      netSalary: 5300,
      month: "February 2024",
      status: "Paid"
    },
    {
      id: 2,
      employeeName: "Sarah Wilson",
      basicSalary: 4500,
      bonuses: 300,
      deductions: 150,
      netSalary: 4650,
      month: "February 2024",
      status: "Pending"
    }
  ]);

  // Add these new states at the top with other state declarations
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [leaveFilters, setLeaveFilters] = useState('all');
  const [salaryMonth, setSalaryMonth] = useState(new Date().toISOString().slice(0, 7));
  const [leaveFormData, setLeaveFormData] = useState({
    employeeId: '',
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'pending'
  });
  const [salaryFormData, setSalaryFormData] = useState({
    employeeId: '',
    month: '',
    basicSalary: 0,
    bonuses: 0,
    deductions: 0,
    comments: ''
  });

  // Add these handler functions
  const handleLeaveAction = (leaveId, action) => {
    setLeaveRequests(leaveRequests.map(request =>
      request.id === leaveId
        ? { ...request, status: action }
        : request
    ));
  };

  const handleSalaryProcess = (salaryId) => {
    setSalaryData(salaryData.map(salary =>
      salary.id === salaryId
        ? { ...salary, status: 'Paid', paidDate: new Date().toISOString() }
        : salary
    ));
  };

  // Add these handler functions near other handlers
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    const newLeave = {
      id: Date.now(),
      ...leaveFormData,
      status: 'Pending'
    };
    setLeaveRequests([...leaveRequests, newLeave]);
    setShowLeaveModal(false);
    setLeaveFormData({
      employeeId: '',
      type: '',
      startDate: '',
      endDate: '',
      reason: '',
      status: 'pending'
    });
  };

  const handleSalarySubmit = (e) => {
    e.preventDefault();
    const newSalary = {
      id: Date.now(),
      ...salaryFormData,
      status: 'Pending'
    };
    setSalaryData([...salaryData, newSalary]);
    setShowSalaryModal(false);
    setSalaryFormData({
      employeeId: '',
      month: '',
      basicSalary: 0,
      bonuses: 0,
      deductions: 0,
      comments: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} min-h-screen sticky top-0 bg-white bg-opacity-20 backdrop-blur-lg border-r border-white border-opacity-20 transition-all duration-300 ease-in-out`}>
          <div className="p-6">
            <h2 className={`font-bold text-2xl mb-8 text-white ${!sidebarOpen && 'hidden'}`}>WorkXFlow</h2>
            <nav className="space-y-6">
              <SidebarItem 
                icon={<FaUsers />} 
                text="Dashboard" 
                active={currentTab === "dashboard"} 
                collapsed={!sidebarOpen}
                onClick={(e) => handleNavigation("dashboard", e)} 
              />
              <SidebarItem 
                icon={<FaUserTie />} 
                text="Employees" 
                active={currentTab === "employees"} 
                collapsed={!sidebarOpen}
                onClick={(e) => handleNavigation("employees", e)} 
              />
              <SidebarItem 
                icon={<FaClipboardList />} 
                text="Projects" 
                active={currentTab === "projects"}
                collapsed={!sidebarOpen}
                onClick={(e) => handleNavigation("projects", e)}
              />
              <SidebarItem 
                icon={<FaCalendarAlt />} 
                text="Schedule" 
                active={currentTab === "schedule"}
                collapsed={!sidebarOpen}
                onClick={(e) => handleNavigation("schedule", e)}
              />
              <SidebarItem 
                icon={<FaChartLine />} 
                text="Analytics" 
                active={currentTab === "analytics"}
                collapsed={!sidebarOpen}
                onClick={(e) => handleNavigation("analytics", e)}
              />
              <SidebarItem 
                icon={<FaCalendarMinus />} 
                text="Leaves" 
                active={currentTab === "leaves"}
                collapsed={!sidebarOpen}
                onClick={(e) => handleNavigation("leaves", e)}
              />
              <SidebarItem 
                icon={<FaMoneyBillWave />} 
                text="Salary" 
                active={currentTab === "salary"}
                collapsed={!sidebarOpen}
                onClick={(e) => handleNavigation("salary", e)}
              />
              <SidebarItem 
                icon={<FaCog />} 
                text="Settings" 
                active={currentTab === "settings"}
                collapsed={!sidebarOpen}
                onClick={(e) => handleNavigation("settings", e)}
              />
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-white/20 backdrop-blur-lg border-b border-white/20">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:text-gray-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <span className="text-white/60 text-sm">Welcome back,</span>
                  <h1 className="text-2xl font-bold text-white">
                    {profileSettings.name} <span className="text-xs font-normal bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">Admin</span>
                  </h1>
                </div>
              </div>
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
                  <button
                    onClick={handleNotificationClick}
                    className="text-white hover:text-indigo-300 transition-colors relative"
                  >
                    <FaBell className="text-xl" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-96 bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Notifications</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                        {notifications.length > 0 ? (
                          <div className="divide-y divide-white/10">
                            {notifications.map(notification => (
                              <div
                                key={notification.id}
                                className={`px-4 py-3 hover:bg-white/5 transition-colors relative ${
                                  !notification.read ? 'bg-indigo-500/10' : ''
                                }`}
                              >
                                <div className="flex justify-between">
                                  <h4 className="text-white text-sm font-medium pr-8">{notification.title}</h4>
                                  <button
                                    onClick={() => handleDeleteNotification(notification.id)}
                                    className="text-white/40 hover:text-red-400 text-xs absolute top-3 right-4"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                                <p className="text-white/70 text-sm mt-1">{notification.message}</p>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-white/40 text-xs">{notification.time}</span>
                                  {!notification.read && (
                                    <button
                                      onClick={() => handleMarkAsRead(notification.id)}
                                      className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                                    >
                                      Mark as read
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="px-4 py-6 text-white/60 text-sm text-center">
                            No notifications
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
            {currentTab === "dashboard" ? (
              // Original dashboard content
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                  ))}
                </div>

                {/* Quick Actions */}
                {quickActionsContent}

                {/* Task Overview */}
                <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">Task Overview</h3>
                    <div className="flex gap-2">
                      <select 
                        className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white appearance-none cursor-pointer hover:bg-white/20 transition-colors [&>option]:bg-gray-800 [&>option]:text-white"
                        value={taskTimeFilter}
                        onChange={(e) => setTaskTimeFilter(e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.5rem center',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem'
                        }}
                      >
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-white/60">Total Tasks</div>
                        <div className="text-2xl font-semibold text-white">{getTaskStats().total}</div>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        <span className={getTaskStats().changePercentage > 0 ? "text-green-400" : "text-red-400"}>
                          {getTaskStats().changePercentage > 0 ? "↑" : "↓"} {Math.abs(getTaskStats().changePercentage)}%
                        </span>
                        <span className="text-white/60">vs previous period</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-white/60">Completed</div>
                        <div className="text-2xl font-semibold text-white">{getTaskStats().completed}</div>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        <span className="text-green-400">
                          {((getTaskStats().completed / getTaskStats().total) * 100).toFixed(0)}%
                        </span>
                        <span className="text-white/60">completion rate</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-white/60">In Progress</div>
                        <div className="text-2xl font-semibold text-white">{getTaskStats().inProgress}</div>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        <span className="text-blue-400">→ {((getTaskStats().inProgress / getTaskStats().total) * 100).toFixed(0)}%</span>
                        <span className="text-white/60">of total tasks</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-white/60">Overdue</div>
                        <div className="text-2xl font-semibold text-white">{getTaskStats().overdue}</div>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        {getTaskStats().overdue > 0 ? (
                          <span className="text-red-400">! Action needed</span>
                        ) : (
                          <span className="text-green-400">✓ On track</span>
                        )}
                      </div>
                    </div>
                  </div>
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
                                  setFormData({ name: employee.name, email: employee.email, role: employee.role, password: '', phone: employee.phone, department: employee.department, salary: employee.salary, joinDate: employee.joinDate, address: employee.address });
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
            ) : currentTab === "employees" ? (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white mb-6">Employee Management</h2>
                {/* Employee Table Section */}
                <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20">
                  <div className="p-6 flex justify-between items-center border-b border-white/20">
                    <h3 className="text-xl font-semibold text-white">All Employees</h3>
                    <button
                      onClick={() => {
                        setModalType('add');
                        setShowModal(true);
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaUserPlus /> Add Employee
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Search employees..."
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/40 focus:border-white/100 focus:outline-none text-white placeholder-white/60"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-black/20">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/20">
                          {filteredEmployees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-white/10">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <img src={`https://ui-avatars.com/api/?name=${employee.name}&background=random`} alt={employee.name} className="w-8 h-8 rounded-full mr-3" />
                                  <div className="text-sm font-medium text-white">{employee.name}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{employee.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{employee.role}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {employee.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  className="text-white hover:text-blue-300 mr-3"
                                  onClick={() => {
                                    setSelectedEmployee(employee);
                                    setFormData({ name: employee.name, email: employee.email, role: employee.role, password: '', phone: employee.phone, department: employee.department, salary: employee.salary, joinDate: employee.joinDate, address: employee.address });
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
              </div>
            ) : currentTab === "projects" ? (
              <div className="space-y-8">
                {/* Projects Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Project Management</h2>
                    <p className="text-white/60 mt-1">Manage and track project progress</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search projects..."
                        value={projectSearchTerm}
                        onChange={(e) => handleProjectSearch(e.target.value)}
                        className="w-64 px-4 py-2 rounded-lg bg-white/10 border border-white/40 focus:border-white/100 focus:outline-none text-white placeholder-white/60"
                      />
                      <FaSearch className="absolute right-3 top-3 text-white/60" />
                    </div>
                    <button 
                      onClick={() => setShowProjectModal(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaProjectDiagram /> New Project
                    </button>
                  </div>
                </div>

                {/* Project Filter Tabs */}
                <div className="flex items-center space-x-4 border-b border-white/20 pb-4">
                  {["All", "In Progress", "Completed", "Planning", "On Hold"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleFilterProjects(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeProjectFilter === tab 
                          ? "bg-white/20 text-white" 
                          : "text-white/60 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map(project => (
                    <div key={project.id} className="relative group">
                      {/* Add dropdown menu */}
                      <button 
                        onClick={() => handleProjectAction('showMenu', project.id)}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <FaEllipsisV className="text-white/60" />
                      </button>
                      {/* Add action buttons */}
                      <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => handleProjectAction('edit', project.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Edit Project"
                        >
                          <FaEdit className="text-white/60" />
                        </button>
                        <button
                          onClick={() => handleProjectAction('delete', project.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Delete Project"
                        >
                          <FaTrash className="text-white/60" />
                        </button>
                        <button
                          onClick={() => handleProjectAction('share', project.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Share Project"
                        >
                          <FaShare className="text-white/60" />
                        </button>
                      </div>
                      {/* Existing project card content */}
                      <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 hover:bg-white/25 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white hover:text-indigo-300 cursor-pointer transition-colors">
                              {project.name}
                            </h3>
                            <span className={`inline-block px-2 py-1 mt-2 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                              {project.status}
                            </span>
                          </div>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <FaEllipsisV className="text-white/60" />
                          </button>
                        </div>
                        
                        <p className="text-white/80 text-sm mb-6 line-clamp-2">{project.description}</p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-white/80">
                            <div className="flex items-center gap-2">
                              <FaRegClock className="text-white/60" />
                              <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                                <FaRegComments className="text-white/60" />
                              </button>
                              <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                                <FaLink className="text-white/60" />
                              </button>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm text-white/80 mb-2">
                              <span>Progress</span>
                              <span className="font-medium">{project.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  project.progress >= 80 ? 'bg-green-500' :
                                  project.progress >= 40 ? 'bg-blue-500' :
                                  'bg-yellow-500'
                                }`}
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                              {project.team.map((member, index) => (
                                <img
                                  key={index}
                                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member)}&background=random`}
                                  alt={member}
                                  title={member}
                                  className="w-8 h-8 rounded-full border-2 border-white/20 hover:transform hover:scale-110 transition-transform cursor-pointer"
                                />
                              ))}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              project.priority === 'High' ? 'bg-red-400/20 text-red-200' :
                              project.priority === 'Medium' ? 'bg-yellow-400/20 text-yellow-200' :
                              'bg-green-400/20 text-green-200'
                            }`}>
                              {project.priority} Priority
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Project Modal */}
                {showProjectModal && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-8 max-w-2xl w-full mx-4">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                          {projectFormData.id ? 'Edit Project' : 'New Project'}
                        </h2>
                        <button
                          onClick={() => setShowProjectModal(false)}
                          className="text-white hover:text-gray-200"
                        >
                          ×
                        </button>
                      </div>
                      <form onSubmit={handleAddProject} className="space-y-6">
                        <div>
                          <label className="block text-white text-sm mb-1">Project Name*</label>
                          <input
                            type="text"
                            required
                            value={projectFormData.name}
                            onChange={(e) => setProjectFormData({...projectFormData, name: e.target.value})}
                            className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white text-sm mb-1">Description*</label>
                          <textarea
                            required
                            value={projectFormData.description}
                            onChange={(e) => setProjectFormData({...projectFormData, description: e.target.value})}
                            className="w-full p-2 rounded bg-white/10 border border-white/40 text-white h-24"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white text-sm mb-1">Deadline*</label>
                            <input
                              type="date"
                              required
                              value={projectFormData.deadline}
                              onChange={(e) => setProjectFormData({...projectFormData, deadline: e.target.value})}
                              className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-white text-sm mb-1">Priority*</label>
                            <select
                              required
                              value={projectFormData.priority}
                              onChange={(e) => setProjectFormData({...projectFormData, priority: e.target.value})}
                              className="w-full p-2 rounded bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowProjectModal(false)}
                            className="px-4 py-2 bg-white/10 text-white rounded"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded"
                          >
                            {projectFormData.id ? 'Save Changes' : 'Create Project'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : currentTab === "schedule" ? (
              <div className="space-y-8">
                {/* Schedule Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Schedule Management</h2>
                    <p className="text-white/60 mt-1">Manage meetings and events</p>
                  </div>
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <FaCalendarPlus /> Schedule Meeting
                  </button>
                </div>

                {/* Meetings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {meetings.map(meeting => (
                    <div key={meeting.id} className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 hover:bg-white/25 transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-white">{meeting.title}</h3>
                        <button
                          onClick={() => handleDeleteMeeting(meeting.id)}
                          className="text-white/60 hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white/80">
                          <FaCalendarAlt className="text-white/60" />
                          <span>{new Date(meeting.date).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-white/80">
                          <FaClock className="text-white/60" />
                          <span>{meeting.time}</span>
                        </div>

                        <div className="flex items-center gap-2 text-white/80">
                          {meeting.type === 'Virtual' ? <FaVideo className="text-white/60" /> : <FaUsersCog className="text-white/60" />}
                          <span>{meeting.type}</span>
                        </div>

                        <div className="text-white/80 text-sm">{meeting.description}</div>

                        <div className="border-t border-white/20 pt-4">
                          <p className="text-white/60 text-sm mb-2">Attendees:</p>
                          <div className="flex flex-wrap gap-2">
                            {meeting.attendees.map((attendee, index) => (
                              <img
                                key={index}
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(attendee)}&background=random`}
                                alt={attendee}
                                title={attendee}
                                className="w-8 h-8 rounded-full border-2 border-white/20"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Schedule Modal */}
                {showScheduleModal && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-8 max-w-2xl w-full mx-4">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Schedule New Meeting</h2>
                        <button
                          onClick={() => setShowScheduleModal(false)}
                          className="text-white hover:text-gray-200"
                        >
                          ×
                        </button>
                      </div>
                      <form onSubmit={handleAddMeeting} className="space-y-6">
                        <div>
                          <label className="block text-white text-sm mb-1">Meeting Title*</label>
                          <input
                            type="text"
                            required
                            value={scheduleFormData.title}
                            onChange={(e) => setScheduleFormData({...scheduleFormData, title: e.target.value})}
                            className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                            placeholder="Enter meeting title"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white text-sm mb-1">Date*</label>
                            <input
                              type="date"
                              required
                              value={scheduleFormData.date}
                              onChange={(e) => setScheduleFormData({...scheduleFormData, date: e.target.value})}
                              className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-white text-sm mb-1">Time*</label>
                            <input
                              type="time"
                              required
                              value={scheduleFormData.time}
                              onChange={(e) => setScheduleFormData({...scheduleFormData, time: e.target.value})}
                              className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-white text-sm mb-1">Meeting Type*</label>
                          <select
                            required
                            value={scheduleFormData.type}
                            onChange={(e) => setScheduleFormData({...scheduleFormData, type: e.target.value})}
                            className="w-full p-2 rounded bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                          >
                            <option value="Virtual">Virtual</option>
                            <option value="In-Person">In-Person</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-white text-sm mb-1">Description</label>
                          <textarea
                            value={scheduleFormData.description}
                            onChange={(e) => setScheduleFormData({...scheduleFormData, description: e.target.value})}
                            className="w-full p-2 rounded bg-white/10 border border-white/40 text-white h-24"
                            placeholder="Enter meeting description"
                          />
                        </div>

                        <div>
                          <label className="block text-white text-sm mb-1">Attendees*</label>
                          <select
                            multiple
                            required
                            value={scheduleFormData.attendees}
                            onChange={(e) => setScheduleFormData({
                              ...scheduleFormData,
                              attendees: Array.from(e.target.selectedOptions, option => option.value)
                            })}
                            className="w-full p-2 rounded bg-white/10 border border-white/40 text-white h-32 appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                          >
                            {employees.map(emp => (
                              <option key={emp.id} value={emp.name}>{emp.name}</option>
                            ))}
                          </select>
                          <p className="text-white/60 text-xs mt-1">Hold Ctrl/Cmd to select multiple</p>
                        </div>

                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowScheduleModal(false)}
                            className="px-4 py-2 bg-white/10 text-white rounded"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded"
                          >
                            Schedule Meeting
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : currentTab === "settings" ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
                
                <div className="grid grid-cols-12 gap-6">
                  {/* Settings Navigation - Made more compact */}
                  <div className="col-span-12 md:col-span-3">
                    <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-3">
                      {[
                        { id: 'profile', icon: <FaUserCog />, label: 'Profile' },
                        { id: 'appearance', icon: <FaPaintBrush />, label: 'Appearance' },
                        { id: 'notifications', icon: <FaBell />, label: 'Notifications' },
                        { id: 'security', icon: <FaLock />, label: 'Security' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSettingsTab(item.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors mb-1 ${
                            settingsTab === item.id 
                              ? 'bg-white/20 text-white' 
                              : 'text-white/60 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Settings Content - Optimized spacing */}
                  <div className="col-span-12 md:col-span-9">
                    <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-4">
                      {settingsTab === 'profile' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Profile Settings</h3>
                          
                          <div className="flex items-start gap-6">
                            {/* Profile Picture */}
                            <div className="flex flex-col items-center space-y-3">
                              <div className="relative group">
                                <img 
                                  src={`https://ui-avatars.com/api/?name=${profileSettings.name}&size=128&background=random`} 
                                  alt="Profile" 
                                  className="w-32 h-32 rounded-full border-4 border-white/20"
                                />
                                <button className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                  Change Photo
                                </button>
                              </div>
                              <p className="text-white/60 text-sm">Click to change photo</p>
                            </div>

                            {/* Profile Form */}
                            <div className="flex-1 grid grid-cols-2 gap-4">
                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-white text-sm mb-1">Full Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  value={profileSettings.name}
                                  onChange={handleSettingsUpdate}
                                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                                />
                              </div>
                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-white text-sm mb-1">Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={profileSettings.email}
                                  onChange={handleSettingsUpdate}
                                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                                />
                              </div>
                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-white text-sm mb-1">Phone</label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={profileSettings.phone}
                                  onChange={handleSettingsUpdate}
                                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                                />
                              </div>
                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-white text-sm mb-1">Time Zone</label>
                                <select
                                  name="timezone"
                                  value={profileSettings.timezone}
                                  onChange={handleSettingsUpdate}
                                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                                >
                                  <option value="UTC">UTC</option>
                                  <option value="EST">Eastern Time</option>
                                  <option value="CST">Central Time</option>
                                  <option value="PST">Pacific Time</option>
                                </select>
                              </div>
                              <div className="col-span-2">
                                <label className="block text-white text-sm mb-1">Bio</label>
                                <textarea
                                  name="bio"
                                  value={profileSettings.bio}
                                  onChange={handleSettingsUpdate}
                                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white h-24 resize-none"
                                  placeholder="Tell us about yourself"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end pt-4">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                              Save Changes
                            </button>
                          </div>
                        </div>
                      )}

                      {settingsTab === 'appearance' && appearanceContent}

                      {settingsTab === 'notifications' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
                          
                          <div className="space-y-6">
                            {/* Email Notifications */}
                            <div className="bg-white/10 rounded-lg p-4">
                              <h4 className="text-white font-medium mb-3">Email Notifications</h4>
                              <div className="space-y-3">
                                {[
                                  { id: 'emailUpdates', label: 'System Updates & News' },
                                  { id: 'emailProjects', label: 'Project Updates' },
                                  { id: 'emailMeetings', label: 'Meeting Reminders' },
                                  { id: 'emailMessages', label: 'Direct Messages' }
                                ].map(item => (
                                  <label key={item.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded">
                                    <span className="text-white text-sm">{item.label}</span>
                                    <input
                                      type="checkbox"
                                      name={item.id}
                                      checked={profileSettings[item.id]}
                                      onChange={handleSettingsUpdate}
                                      className="w-4 h-4 rounded border-white/40 bg-white/10 text-indigo-600 focus:ring-indigo-500"
                                    />
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Push Notifications */}
                            <div className="bg-white/10 rounded-lg p-4">
                              <h4 className="text-white font-medium mb-3">Push Notifications</h4>
                              <div className="space-y-3">
                                {[
                                  { id: 'pushAlerts', label: 'Important Alerts' },
                                  { id: 'pushChat', label: 'Chat Messages' },
                                  { id: 'pushTasks', label: 'Task Updates' }
                                ].map(item => (
                                  <label key={item.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded">
                                    <span className="text-white text-sm">{item.label}</span>
                                    <input
                                      type="checkbox"
                                      name={item.id}
                                      checked={profileSettings[item.id]}
                                      onChange={handleSettingsUpdate}
                                      className="w-4 h-4 rounded border-white/40 bg-white/10 text-indigo-600 focus:ring-indigo-500"
                                    />
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end pt-4">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                              Save Preferences
                            </button>
                          </div>
                        </div>
                      )}

                      {settingsTab === 'security' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
                          
                          {/* Password Section */}
                          <div className="bg-white/10 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-3">Password</h4>
                            <p className="text-white/60 text-sm mb-3">Last changed: 30 days ago</p>
                            <button
                              onClick={() => setShowPasswordModal(true)}
                              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                            >
                              Change Password
                            </button>
                          </div>

                          {/* 2FA Section */}
                          <div className="bg-white/10 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                                <p className="text-white/60 text-sm mt-1">
                                  Add an extra layer of security to your account
                                </p>
                              </div>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  name="twoFactorEnabled"
                                  checked={profileSettings.twoFactorEnabled}
                                  onChange={handleSettingsUpdate}
                                  className="sr-only"
                                />
                                <div className={`w-11 h-6 rounded-full transition-colors ${
                                  profileSettings.twoFactorEnabled ? 'bg-indigo-600' : 'bg-white/20'
                                }`}>
                                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                                    profileSettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                                  }`} />
                                </div>
                              </label>
                            </div>
                          </div>

                          {/* Active Sessions */}
                          <div className="bg-white/10 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-3">Active Sessions</h4>
                            <div className="space-y-3">
                              {[
                                { device: 'Windows PC', location: 'New York, US', current: true },
                                { device: 'iPhone 12', location: 'New York, US', current: false }
                              ].map((session, index) => (
                                <div key={index} className="flex items-center justify-between p-2 hover:bg-white/5 rounded">
                                  <div>
                                    <p className="text-white text-sm font-medium">
                                      {session.device}
                                      {session.current && (
                                        <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded">
                                          Current
                                        </span>
                                      )}
                                    </p>
                                    <p className="text-white/60 text-xs">{session.location}</p>
                                  </div>
                                  {!session.current && (
                                    <button className="text-red-400 hover:text-red-300 text-sm">
                                      End Session
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Password Change Modal */}
                      {showPasswordModal && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                          <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 w-full max-w-md">
                            <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
                            <form onSubmit={handlePasswordChange} className="space-y-4">
                              <div>
                                <label className="block text-white text-sm mb-1">Current Password</label>
                                <input
                                  type="password"
                                  value={passwordForm.currentPassword}
                                  onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-white text-sm mb-1">New Password</label>
                                <input
                                  type="password"
                                  value={passwordForm.newPassword}
                                  onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-white text-sm mb-1">Confirm New Password</label>
                                <input
                                  type="password"
                                  value={passwordForm.confirmPassword}
                                  onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                                  required
                                />
                              </div>
                              <div className="flex justify-end gap-3 pt-4">
                                <button
                                  type="button"
                                  onClick={() => setShowPasswordModal(false)}
                                  className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                  Update Password
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : currentTab === "analytics" ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
                  <select
                    value={analyticsTimeframe}
                    onChange={(e) => setAnalyticsTimeframe(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="quarter">Last Quarter</option>
                    <option value="year">Last Year</option>
                  </select>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-white mt-1">${(analyticsData.revenue.total / 1000).toFixed(1)}K</h3>
                      </div>
                      <div className={`${analyticsData.revenue.change >= 0 ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                        {analyticsData.revenue.change >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                        <span className="ml-1">{Math.abs(analyticsData.revenue.change)}%</span>
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60">Active Employees</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{analyticsData.employees.active}</h3>
                      </div>
                      <div className="text-green-400">
                        <FiUsers size={24} />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-white/60">Attendance Rate:</span>
                      <span className="ml-2 text-green-400">{analyticsData.performance.attendance}%</span>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60">Project Success Rate</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{analyticsData.projects.successRate}%</h3>
                      </div>
                      <div className="text-purple-400">
                        <FiCheckCircle size={24} />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-white/60">Completed:</span>
                      <span className="ml-2 text-purple-400">{analyticsData.projects.completed}</span>
                      <span className="mx-2 text-white/40">|</span>
                      <span className="text-white/60">Ongoing:</span>
                      <span className="ml-2 text-yellow-400">{analyticsData.projects.ongoing}</span>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60">Average Productivity</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{analyticsData.performance.averageProductivity}%</h3>
                      </div>
                      <div className="text-blue-400">
                        <FiActivity size={24} />
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{width: `${analyticsData.performance.averageProductivity}%`}}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Department Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Department Distribution</h3>
                    <div className="space-y-4">
                      {Object.entries(analyticsData.employees.distribution).map(([dept, count]) => (
                        <div key={dept}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white">{dept}</span>
                            <span className="text-white/60">{count} employees</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 rounded-full" 
                              style={{width: `${(count / analyticsData.employees.total) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                    <div className="space-y-6">
                      {Object.entries(analyticsData.performance).map(([metric, value]) => (
                        <div key={metric} className="flex items-center">
                          <div className="w-1/2">
                            <p className="text-white capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</p>
                          </div>
                          <div className="w-1/2">
                            <div className="flex items-center">
                              <div className="flex-grow h-2 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    value >= 90 ? 'bg-green-500' :
                                    value >= 70 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{width: `${value}%`}}
                                ></div>
                              </div>
                              <span className="ml-3 text-white min-w-[3rem]">{value}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { type: 'project', text: 'New project "E-Commerce Platform" started', time: '2 hours ago' },
                      { type: 'employee', text: 'Sarah Wilson completed training program', time: '4 hours ago' },
                      { type: 'performance', text: 'Q1 Performance reviews completed', time: '1 day ago' },
                      { type: 'revenue', text: 'Monthly revenue target exceeded by 12%', time: '2 days ago' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white/5">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'project' ? 'bg-purple-500/20' :
                          activity.type === 'employee' ? 'bg-blue-500/20' :
                          activity.type === 'performance' ? 'bg-green-500/20' :
                          'bg-yellow-500/20'
                        }`}>
                          {activity.type === 'project' ? <FaProjectDiagram /> :
                           activity.type === 'employee' ? <FaUserTie /> :
                           activity.type === 'performance' ? <FaChartLine /> :
                           <FaFileAlt />}
                        </div>
                        <div className="flex-1">
                          <p className="text-white">{activity.text}</p>
                          <p className="text-white/60 text-sm">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : currentTab === "leaves" ? (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Leave Management</h2>
                    <p className="text-white/60 mt-1">Track and manage employee leave requests</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      className="px-4 py-2 rounded-lg bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                      value={leaveFilters}
                      onChange={(e) => setLeaveFilters(e.target.value)}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.5rem center',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="all">All Requests</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button 
                      onClick={() => setShowLeaveModal(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaCalendarMinus /> New Leave Request
                    </button>
                  </div>
                </div>

                {/* Leave Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white/60">Total Requests</h3>
                      <span className="text-2xl font-bold text-white">{leaveRequests.length}</span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white/60">Pending</h3>
                      <span className="text-2xl font-bold text-yellow-400">
                        {leaveRequests.filter(r => r.status === 'Pending').length}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white/60">Approved</h3>
                      <span className="text-2xl font-bold text-green-400">
                        {leaveRequests.filter(r => r.status === 'Approved').length}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white/60">Rejected</h3>
                      <span className="text-2xl font-bold text-red-400">
                        {leaveRequests.filter(r => r.status === 'Rejected').length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Leave Requests Table */}
                <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
                  <div className="p-6 border-b border-white/20">
                    <h3 className="text-xl font-semibold text-white">Leave Requests</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-black/20">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Employee</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Duration</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/20">
                        {leaveRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-white/10">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{request.employeeName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{request.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                request.status === 'Approved' ? 'bg-green-400/20 text-green-200' :
                                request.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-200' :
                                'bg-red-400/20 text-red-200'
                              }`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-white hover:text-green-300 mr-3" onClick={() => handleLeaveAction(request.id, 'Approved')}>Approve</button>
                              <button className="text-white hover:text-red-300" onClick={() => handleLeaveAction(request.id, 'Rejected')}>Reject</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : currentTab === "salary" ? (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Salary Management</h2>
                    <p className="text-white/60 mt-1">Process and track employee payroll</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="month"
                      value={salaryMonth}
                      onChange={(e) => setSalaryMonth(e.target.value)}
                      className="px-4 py-2 rounded-lg bg-white/10 border border-white/40 text-white"
                    />
                    <button 
                      onClick={() => setShowSalaryModal(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaMoneyBillWave /> Process Payroll
                    </button>
                  </div>
                </div>

                {/* Salary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-white/60">Total Payroll</h3>
                      <span className="text-2xl font-bold text-white">
                        ${salaryData.reduce((acc, curr) => acc + curr.netSalary, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-white/60">Current Month</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-white/60">Pending</h3>
                      <span className="text-2xl font-bold text-yellow-400">
                        ${salaryData.filter(s => s.status === 'Pending')
                          .reduce((acc, curr) => acc + curr.netSalary, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-white/60">To be processed</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-white/60">Total Bonuses</h3>
                      <span className="text-2xl font-bold text-green-400">
                        ${salaryData.reduce((acc, curr) => acc + curr.bonuses, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-white/60">Current Month</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-white/60">Deductions</h3>
                      <span className="text-2xl font-bold text-red-400">
                        ${salaryData.reduce((acc, curr) => acc + curr.deductions, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-white/60">Current Month</div>
                  </div>
                </div>

                {/* Salary Records Table */}
                <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
                  <div className="p-6 border-b border-white/20">
                    <h3 className="text-xl font-semibold text-white">Salary Records</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-black/20">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Employee</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Basic Salary</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bonuses</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Deductions</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Net Salary</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/20">
                        {salaryData.map((salary) => (
                          <tr key={salary.id} className="hover:bg-white/10">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{salary.employeeName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${salary.basicSalary}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">+${salary.bonuses}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400">-${salary.deductions}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">${salary.netSalary}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                salary.status === 'Paid' ? 'bg-green-400/20 text-green-200' : 'bg-yellow-400/20 text-yellow-200'
                              }`}>
                                {salary.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-white hover:text-blue-300 mr-3">Edit</button>
                              <button className="text-white hover:text-green-300" onClick={() => handleSalaryProcess(salary.id)}>Pay</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : null}
          </main>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {modalType === 'add' ? 'Add New Employee' : 'Edit Employee'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                  <div>
                    <label className="block text-white text-sm mb-1">Full Name*</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-2 rounded bg-white/10 border border-white/40 text-white placeholder-white/60"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">Email Address*</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full p-2 rounded bg-white/10 border border-white/40 text-white placeholder-white/60"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      className="w-full p-2 rounded bg-white/10 border border-white/40 text-white placeholder-white/60"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">Address</label>
                    <textarea
                      placeholder="Enter address"
                      className="w-full p-2 rounded bg-white/10 border border-white/40 text-white placeholder-white/60 h-20"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>

                {/* Employment Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Employment Details</h3>
                  <div>
                    <label className="block text-white text-sm mb-1">Department*</label>
                    <select
                      className="w-full p-2 rounded bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">Role*</label>
                    <select
                      className="w-full p-2 rounded bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      required
                    >
                      <option value="">Select Role</option>
                      {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">Joining Date*</label>
                    <input
                      type="date"
                      className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                      value={formData.joinDate}
                      onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">Salary</label>
                    <input
                      type="number"
                      placeholder="Enter salary"
                      className="w-full p-2 rounded bg-white/10 border border-white/40 text-white placeholder-white/60"
                      value={formData.salary}
                      onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    />
                  </div>
                  {modalType === 'add' && (
                    <div>
                      <label className="block text-white text-sm mb-1">Password*</label>
                      <input
                        type="password"
                        placeholder="Enter password"
                        className="w-full p-2 rounded bg-white/10 border border-white/40 text-white placeholder-white/60"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-white/20">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors flex items-center"
                >
                  {modalType === 'add' ? (
                    <>
                      <FaUserPlus className="mr-2" />
                      Add Employee
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Report Modal */}
      {showReportModal && <ReportModal />}

      {/* Add modals at the end of the component */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">New Leave Request</h3>
            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div>
                <label className="block text-white text-sm mb-1">Employee</label>
                <select
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                  value={leaveFormData.employeeId}
                  onChange={(e) => setLeaveFormData({...leaveFormData, employeeId: e.target.value})}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white text-sm mb-1">Leave Type</label>
                <select
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                  value={leaveFormData.type}
                  onChange={(e) => setLeaveFormData({...leaveFormData, type: e.target.value})}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                    value={leaveFormData.startDate}
                    onChange={(e) => setLeaveFormData({...leaveFormData, startDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-1">End Date</label>
                  <input
                    type="date"
                    className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                    value={leaveFormData.endDate}
                    onChange={(e) => setLeaveFormData({...leaveFormData, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-white text-sm mb-1">Reason</label>
                <textarea
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white h-24"
                  value={leaveFormData.reason}
                  onChange={(e) => setLeaveFormData({...leaveFormData, reason: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSalaryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">Process Salary</h3>
            <form onSubmit={handleSalarySubmit} className="space-y-4">
              <div>
                <label className="block text-white text-sm mb-1">Employee</label>
                <select
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white appearance-none hover:bg-white/20 transition-colors cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                  value={salaryFormData.employeeId}
                  onChange={(e) => setSalaryFormData({...salaryFormData, employeeId: e.target.value})}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white text-sm mb-1">Month</label>
                <input
                  type="month"
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                  value={salaryFormData.month}
                  onChange={(e) => setSalaryFormData({...salaryFormData, month: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-1">Basic Salary</label>
                <input
                  type="number"
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                  value={salaryFormData.basicSalary}
                  onChange={(e) => setSalaryFormData({...salaryFormData, basicSalary: Number(e.target.value)})}
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-1">Bonuses</label>
                <input
                  type="number"
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                  value={salaryFormData.bonuses}
                  onChange={(e) => setSalaryFormData({...salaryFormData, bonuses: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-1">Deductions</label>
                <input
                  type="number"
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white"
                  value={salaryFormData.deductions}
                  onChange={(e) => setSalaryFormData({...salaryFormData, deductions: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-1">Comments</label>
                <textarea
                  className="w-full p-2 rounded bg-white/10 border border-white/40 text-white h-24"
                  value={salaryFormData.comments}
                  onChange={(e) => setSalaryFormData({...salaryFormData, comments: e.target.value})}
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSalaryModal(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Process Salary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Component for sidebar items
const SidebarItem = ({ icon, text, active, collapsed, onClick }) => (
  <div 
    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
      active ? 'bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-20'
    }`}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof onClick === 'function') {
        onClick(e);
      }
    }}
  >
    <div className="text-xl text-white">{icon}</div>
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

// Component for quick action cards - Update the component structure
const QuickActionCard = ({ title, icon, description, buttonText, color, onClick }) => (
  <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-20 p-6 hover:bg-opacity-25 transition-all duration-300">
    <div className={`${color} text-white p-3 rounded-lg inline-block mb-4`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    <p className="text-white mb-4">{description}</p>
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 w-full justify-center"
    >
      {icon} {buttonText}
    </button>
  </div>
);

export default AdminDashboard;
