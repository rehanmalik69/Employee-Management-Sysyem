import React, { useState, useEffect } from "react";
import { FaUser, FaCalendar, FaClock, FaFileAlt, FaBell, FaChartLine, FaCheckCircle, FaEnvelope, FaSignOutAlt, FaTasks, FaCheck, FaTimes, FaUsers, FaVideo, FaHome, FaChartPie, FaComments, FaCog, FaUserShield, FaSearch, FaProjectDiagram, FaTachometerAlt, FaFlag, FaPlus, FaFilter, FaPhone, FaSmile, FaPaperclip, FaPaperPlane, FaEllipsisV, FaCamera, FaLock, FaMoon, FaGlobe, FaShieldAlt } from "react-icons/fa";
import { FiBarChart2, FiTrendingUp, FiTrendingDown, FiPieChart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = ({ activeTab = "dashboard" }) => {
  const [user, setUser] = useState({ name: '', profileImage: '' });
  const navigate = useNavigate();
  const [activeTabState, setActiveTabState] = useState(activeTab);
  const [settingsTab, setSettingsTab] = useState('profile');

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!isAuth || userRole !== 'employee' || !userData) {
      navigate('/login');
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete Project Documentation", status: "pending", deadline: "2024-02-20", priority: "high" },
    { id: 2, title: "Review Code Changes", status: "pending", deadline: "2024-02-18", priority: "medium" },
    { id: 3, title: "Team Meeting Preparation", status: "accepted", deadline: "2024-02-19", priority: "low" },
    { id: 4, title: "Client Presentation", status: "completed", deadline: "2024-02-17", priority: "high" },
  ]);
  const [teamMembers] = useState([
    { id: 1, name: "Sarah Wilson", role: "Team Lead", status: "online", image: "https://ui-avatars.com/api/?name=Sarah+Wilson&background=random" },
    { id: 2, name: "Michael Brown", role: "Developer", status: "offline", image: "https://ui-avatars.com/api/?name=Michael+Brown&background=random" },
    { id: 3, name: "Emma Davis", role: "Designer", status: "online", image: "https://ui-avatars.com/api/?name=Emma+Davis&background=random" },
  ]);

  const [meetings] = useState([
    { id: 1, title: "Daily Standup", time: "10:00 AM", date: "Today", attendees: 5 },
    { id: 2, title: "Project Review", time: "02:00 PM", date: "Tomorrow", attendees: 8 },
    { id: 3, title: "Sprint Planning", time: "11:00 AM", date: "23 Feb", attendees: 12 },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const [attendanceData, setAttendanceData] = useState({
    totalHours: 176.5,
    attendanceRate: 98.2,
    averageHours: 8.5,
    overtimeHours: 12
  });

  const [leaveBalance, setLeaveBalance] = useState({
    annual: 12,
    sick: 7,
    casual: 5,
    total: 24,
    used: 8
  });

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'pending'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Leave Request Approved', message: 'Your leave request for 15th March has been approved', time: '2 hours ago' },
    { id: 2, title: 'New Task Assigned', message: 'You have been assigned to Project X', time: '1 day ago' },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Add these state declarations with other states
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notificationHighlight, setNotificationHighlight] = useState(false);

  // Handle leave request submission
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    const newLeaveRequest = {
      id: Date.now(),
      ...leaveForm,
      submittedDate: new Date().toISOString()
    };
    
    // Update leave balance
    setLeaveBalance(prev => ({
      ...prev,
      used: prev.used + calculateLeaveDays(leaveForm.startDate, leaveForm.endDate)
    }));

    // Add notification
    setNotifications(prev => [{
      id: Date.now(),
      title: 'Leave Request Submitted',
      message: `Your ${leaveForm.type} leave request has been submitted for approval`,
      time: 'Just now'
    }, ...prev]);

    setShowLeaveModal(false);
    setLeaveForm({
      type: '',
      startDate: '',
      endDate: '',
      reason: '',
      status: 'pending'
    });
  };

  // Calculate leave days
  const calculateLeaveDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleTaskAction = (taskId, action) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: action, updatedAt: new Date().toISOString() } 
        : task
    ));

    // Add notification for task update
    setNotifications(prev => [{
      id: Date.now(),
      title: 'Task Updated',
      message: `Task status changed to ${action}`,
      time: 'Just now'
    }, ...prev]);
  };

  // Get task statistics
  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'accepted').length;
    const pending = tasks.filter(t => t.status === 'pending').length;

    return {
      total,
      completed,
      inProgress,
      pending,
      completionRate: total ? Math.round((completed / total) * 100) : 0,
      progressRate: total ? Math.round((inProgress / total) * 100) : 0
    };
  };

  // Update profile
  const handleProfileUpdate = (updatedData) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const newUserData = { ...userData, ...updatedData };
    localStorage.setItem('user', JSON.stringify(newUserData));
    setUser(newUserData);
    setProfileModalOpen(false);
  };

  // Clock in/out functionality
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);

  const handleClockInOut = () => {
    if (!clockedIn) {
      setClockInTime(new Date());
      // Add clock in record to attendance
      setAttendanceData(prev => ({
        ...prev,
        totalHours: prev.totalHours + 0.0001 // This would be calculated properly in a real system
      }));
    } else {
      // Calculate hours worked and update attendance
      const hoursWorked = clockInTime ? 
        (new Date() - clockInTime) / (1000 * 60 * 60) : 0;
      setAttendanceData(prev => ({
        ...prev,
        totalHours: prev.totalHours + hoursWorked
      }));
      setClockInTime(null);
    }
    setClockedIn(!clockedIn);
  };

  // Add new JSX elements for Clock In/Out button
  const clockInOutButton = (
    <button
      onClick={handleClockInOut}
      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
        clockedIn 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-green-500 hover:bg-green-600 text-white'
      }`}
    >
      {clockedIn ? 'Clock Out' : 'Clock In'}
    </button>
  );

  const sidebarItems = [
    { icon: <FaHome />, label: "Dashboard", id: "dashboard" },
    { icon: <FaChartPie />, label: "Analytics", id: "analytics" },
    { icon: <FaUsers />, label: "Team", id: "team" },
    { icon: <FaTasks />, label: "Tasks", id: "tasks" },
    { icon: <FaCalendar />, label: "Calendar", id: "calendar" },
    { icon: <FaComments />, label: "Chat", id: "chat" },
    { icon: <FaCog />, label: "Settings", id: "settings" },
  ];

  const [teamStats] = useState({
    totalMembers: 12,
    activeProjects: 5,
    completionRate: 87,
    teamEfficiency: 92
  });

  // Add new analytics state
  const [analyticsData] = useState({
    performance: {
      tasks: {
        completed: 45,
        total: 52,
        trend: +15
      },
      attendance: {
        present: 22,
        total: 23,
        trend: +5
      },
      productivity: {
        current: 87,
        previous: 82,
        trend: +6
      }
    },
    timeTracking: {
      weekly: [32, 36, 40, 38, 42, 35, 38],
      distribution: {
        'Project Work': 45,
        'Meetings': 20,
        'Training': 15,
        'Documentation': 12,
        'Other': 8
      }
    }
  });

  // Add new state for task filters
  const [taskFilter, setTaskFilter] = useState('all');
  const [taskSearch, setTaskSearch] = useState('');

  // Add filtered tasks function
  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(taskSearch.toLowerCase());
      const matchesFilter = taskFilter === 'all' || task.status === taskFilter;
      return matchesSearch && matchesFilter;
    });
  };

  // Add new state for calendar
  const [calendarEvents] = useState([
    { id: 1, title: 'Team Meeting', date: '2024-02-20', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Project Deadline', date: '2024-02-22', time: '06:00 PM', type: 'deadline' },
    { id: 3, title: 'Client Call', date: '2024-02-21', time: '02:30 PM', type: 'call' },
    { id: 4, title: 'Team Building', date: '2024-02-23', time: '03:00 PM', type: 'event' },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventFilter, setEventFilter] = useState('all');

  // Add new chat state
  const [messages] = useState([
    {
      id: 1,
      sender: 'Sarah Wilson',
      message: 'Hey, how\'s the project coming along?',
      time: '10:30 AM',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=random',
      isRead: true
    },
    {
      id: 2,
      sender: 'You',
      message: 'Going well! Almost finished with the documentation.',
      time: '10:32 AM',
      isSelf: true,
      isRead: true
    },
    {
      id: 3,
      sender: 'Michael Brown',
      message: 'Can you review my latest commits?',
      time: '11:15 AM',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=random',
      isRead: false
    }
  ]);

  const [chatFilter, setChatFilter] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState('team');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add message handling logic here
    setNewMessage('');
  };

  // Update the click handler for sidebar items
  const handleTabChange = (tabId) => {
    setActiveTabState(tabId);
    if (tabId === 'dashboard') {
      navigate('/employee-dashboard');
    } else {
      navigate(`/employee-dashboard/${tabId}`);
    }
  };

  // Add event handling functions
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getEventsForDate = (date) => {
    return calendarEvents.filter(event => event.date === date.toISOString().split('T')[0]);
  };

  // Add useEffect to handle URL params
  useEffect(() => {
    const path = window.location.pathname;
    const tab = path.split("/").pop();
    if (tab && tab !== "employee-dashboard") {
      setActiveTabState(tab);
    }
  }, []);

  // Add these handler functions
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleNotificationClick = (notification) => {
    // Handle notification click
    console.log('Notification clicked:', notification);
    setShowNotificationsDropdown(false);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotificationsDropdown || showProfileDropdown) {
        if (!event.target.closest('.relative')) {
          setShowNotificationsDropdown(false);
          setShowProfileDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotificationsDropdown, showProfileDropdown]);

  // Add this useEffect for notification animation
  useEffect(() => {
    if (notifications.some(n => !n.isRead)) {
      setNotificationHighlight(true);
      const timer = setTimeout(() => setNotificationHighlight(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      {/* Enhanced Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-6 mx-auto">
          {/* Left Side - Logo & Welcome */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <FaUserShield className="text-2xl text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white hidden md:block">WorkXFlow</h1>
            </div>
            <div className="hidden md:block h-8 w-px bg-white/10"></div>
            <div className="hidden md:block">
              <p className="text-white/60 text-sm">Welcome back,</p>
              <p className="text-white font-medium">{user.name}</p>
            </div>
          </div>
          
          {/* Right Side - Search, Notifications & Profile */}
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-white/20 focus:bg-white/10 focus:outline-none text-white placeholder-white/50 text-sm"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-white/50 hover:text-white">
                <FaSearch />
              </button>
            </form>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotificationsDropdown(!showNotificationsDropdown);
                  setShowProfileDropdown(false);
                }}
                className={`relative p-3 hover:bg-white/10 rounded-xl transition-all duration-300 ${
                  notificationHighlight ? 'animate-bounce' : ''
                }`}
              >
                <FaBell className="text-2xl text-white/90 hover:text-white transition-colors" />
                {notifications.some(n => !n.isRead) && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-indigo-900 shadow-lg animate-pulse">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>

              {/* Enhanced Notifications Dropdown */}
              {showNotificationsDropdown && (
                <div className="absolute right-0 mt-3 w-96 bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 transform transition-all duration-300 ease-out">
                  <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <FaBell className="text-xl text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg">Notifications</h3>
                        <p className="text-white/60 text-sm">
                          {notifications.filter(n => !n.isRead).length} unread
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={markAllNotificationsAsRead}
                      className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-sm rounded-lg transition-colors"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                    <div className="p-2">
                      {notifications.map(notification => (
                        <button
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className="w-full p-4 flex items-start gap-4 hover:bg-white/5 rounded-lg transition-all duration-200 group relative"
                        >
                          <div className={`p-2 rounded-lg ${
                            !notification.isRead 
                              ? 'bg-indigo-500/20 text-indigo-300' 
                              : 'bg-white/10 text-white/60'
                          }`}>
                            <FaBell className="text-lg" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className={`text-sm font-medium ${
                              notification.isRead ? 'text-white/80' : 'text-white'
                            } group-hover:text-indigo-400 transition-colors`}>
                              {notification.title}
                            </p>
                            <p className="text-white/60 text-sm mt-1">{notification.message}</p>
                            <p className="text-white/40 text-xs mt-2 flex items-center gap-2">
                              <FaClock className="text-xs" />
                              {notification.time}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <div className="absolute right-4 top-4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {notifications.length === 0 && (
                    <div className="p-8 text-center">
                      <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                        <FaBell className="text-3xl text-white/40" />
                      </div>
                      <p className="text-white/60">No notifications yet</p>
                    </div>
                  )}
                  
                  <div className="p-3 border-t border-white/10 bg-white/5">
                    <button className="w-full px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-white/10"></div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotificationsDropdown(false);
                }}
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <img 
                    src={user.profileImage || "https://ui-avatars.com/api/?name=User&background=random"} 
                    alt="Profile" 
                    className="w-9 h-9 rounded-lg border-2 border-white/20 group-hover:border-white/40 transition-colors" 
                  />
                  <div className="w-2 h-2 bg-green-500 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-purple-500"></div>
                </div>
                <span className="hidden md:block text-white/80 group-hover:text-white text-sm font-medium">
                  {user.name?.split(' ')[0]}
                </span>
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-white/60 text-sm">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => {
                        handleTabChange('settings');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <FaCog className="text-sm" />
                      <span className="text-sm">Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-2 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <FaSignOutAlt className="text-sm" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className="w-20 md:w-64 min-h-[calc(100vh-4rem)] bg-white/5 backdrop-blur-lg border-r border-white/10 fixed left-0 top-16">
          <div className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeTabState === item.id
                    ? 'bg-white/10 text-white' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`${activeTabState === item.id ? 'bg-white/20' : 'bg-white/5'} p-2 rounded-lg transition-colors`}>
                  {item.icon}
                </div>
                <span className="hidden md:block text-sm font-medium">{item.label}</span>
                {activeTabState === item.id && <div className="w-1 h-6 bg-white/80 rounded-full absolute right-0"></div>}
              </div>
            ))}
          </div>
        </aside>

        {/* Adjust main content margin */}
        <main className="flex-1 ml-20 md:ml-64 p-6">
          <div className="max-w-[2000px] mx-auto">
            {activeTabState === "dashboard" && (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 hover:bg-white/30 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/80 text-sm">Total Hours</p>
                        <h3 className="text-2xl font-bold text-white">176.5</h3>
                      </div>
                      <FaChartLine className="text-white text-2xl" />
                    </div>
                    <div className="mt-2">
                      <span className="text-green-400 text-sm">+2.5% </span>
                      <span className="text-white/60 text-sm">vs last month</span>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 hover:bg-white/30 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/80 text-sm">Attendance Rate</p>
                        <h3 className="text-2xl font-bold text-white">98.2%</h3>
                      </div>
                      <FaCheckCircle className="text-white text-2xl" />
                    </div>
                    <div className="mt-2">
                      <span className="text-green-400 text-sm">+1.2% </span>
                      <span className="text-white/60 text-sm">vs last month</span>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 hover:bg-white/30 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/80 text-sm">Leave Balance</p>
                        <h3 className="text-2xl font-bold text-white">12 days</h3>
                      </div>
                      <FaClock className="text-white text-2xl" />
                    </div>
                    <div className="mt-2">
                      <span className="text-white/60 text-sm">Annual leave remaining</span>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 hover:bg-white/30 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/80 text-sm">Pending Tasks</p>
                        <h3 className="text-2xl font-bold text-white">5</h3>
                      </div>
                      <FaFileAlt className="text-white text-2xl" />
                    </div>
                    <div className="mt-2">
                      <span className="text-orange-500 text-sm">3 due soon</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions and Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Quick Actions */}
                  <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button className="flex items-center p-6 bg-white/20 backdrop-blur-lg rounded-lg border border-white/20 hover:bg-white/30 transition-all duration-300">
                        <FaUser className="text-3xl text-white mr-4" />
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-white">My Profile</h3>
                          <p className="text-sm text-white/60">View and edit details</p>
                        </div>
                      </button>

                      <button className="flex items-center p-6 bg-white/20 backdrop-blur-lg rounded-lg border border-white/20 hover:bg-white/30 transition-all duration-300">
                        <FaCalendar className="text-3xl text-white mr-4" />
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-white">Attendance</h3>
                          <p className="text-sm text-white/60">View attendance history</p>
                        </div>
                      </button>

                      <button className="flex items-center p-6 bg-white/20 backdrop-blur-lg rounded-lg border border-white/20 hover:bg-white/30 transition-all duration-300">
                        <FaClock className="text-3xl text-white mr-4" />
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-white">Leave Request</h3>
                          <p className="text-sm text-white/60">Apply for leave</p>
                        </div>
                      </button>

                      <button className="flex items-center p-6 bg-white/20 backdrop-blur-lg rounded-lg border border-white/20 hover:bg-white/30 transition-all duration-300">
                        <FaEnvelope className="text-3xl text-white mr-4" />
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-white">Messages</h3>
                          <p className="text-sm text-white/60">View communications</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Recent Activities</h2>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center p-2 hover:bg-white/10 rounded-lg">
                          <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                          <div>
                            <p className="text-sm text-white">Attendance marked for today</p>
                            <p className="text-xs text-white/60">2 hours ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* New Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                  {/* Task Statistics */}
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Task Statistics</h2>
                    <div className="space-y-4">
                      <div className="relative pt-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white">Completed Tasks</span>
                          <span className="text-sm text-white">75%</span>
                        </div>
                        <div className="overflow-hidden h-2 bg-white/20 rounded">
                          <div className="w-3/4 h-full bg-green-500 rounded"></div>
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white">In Progress</span>
                          <span className="text-sm text-white">20%</span>
                        </div>
                        <div className="overflow-hidden h-2 bg-white/20 rounded">
                          <div className="w-1/5 h-full bg-blue-500 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Team Members</h2>
                    <div className="space-y-4">
                      {teamMembers.map(member => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full" />
                            <div>
                              <p className="text-white font-medium">{member.name}</p>
                              <p className="text-sm text-white/60">{member.role}</p>
                            </div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Meetings */}
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Upcoming Meetings</h2>
                    <div className="space-y-4">
                      {meetings.map(meeting => (
                        <div key={meeting.id} className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg transition-all duration-200">
                          <div>
                            <h3 className="text-white font-medium">{meeting.title}</h3>
                            <div className="flex items-center space-x-2 text-white/60 text-sm">
                              <span>{meeting.time}</span>
                              <span>•</span>
                              <span>{meeting.date}</span>
                            </div>
                          </div>
                          <button className="p-2 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-lg text-white transition-colors duration-200">
                            <FaVideo />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tasks Section */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-white mb-4">My Tasks</h2>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="space-y-4">
                      {tasks.map((task) => (
                        <div key={task.id} 
                          className="flex items-center justify-between p-4 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-300"
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              task.priority === 'high' ? 'bg-red-500' :
                              task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`} />
                            <div>
                              <h3 className="text-white font-medium">{task.title}</h3>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-xs text-white/60">Deadline: {task.deadline}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  task.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                                  task.status === 'accepted' ? 'bg-blue-500/20 text-blue-300' :
                                  'bg-yellow-500/20 text-yellow-300'
                                }`}>
                                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {task.status === 'pending' && (
                              <button
                                onClick={() => handleTaskAction(task.id, 'accepted')}
                                className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-white transition-colors duration-200"
                                title="Accept Task"
                              >
                                <FaCheck className="text-sm" />
                              </button>
                            )}
                            {task.status === 'accepted' && (
                              <button
                                onClick={() => handleTaskAction(task.id, 'completed')}
                                className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-white transition-colors duration-200"
                                title="Mark as Completed"
                              >
                                <FaCheckCircle className="text-sm" />
                              </button>
                            )}
                            {task.status === 'pending' && (
                              <button
                                onClick={() => handleTaskAction(task.id, 'rejected')}
                                className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-white transition-colors duration-200"
                                title="Reject Task"
                              >
                                <FaTimes className="text-sm" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTabState === "analytics" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Analytics Overview</h2>
                  <select className="px-4 py-2 rounded-lg bg-white/10 border border-white/40 text-white">
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                  </select>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/60">Task Completion</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {Math.round((analyticsData.performance.tasks.completed / analyticsData.performance.tasks.total) * 100)}%
                        </h3>
                      </div>
                      <div className="text-green-400 flex items-center">
                        <FiTrendingUp />
                        <span className="ml-1">{analyticsData.performance.tasks.trend}%</span>
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{width: `${(analyticsData.performance.tasks.completed / analyticsData.performance.tasks.total) * 100}%`}}
                      />
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/60">Attendance Rate</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {Math.round((analyticsData.performance.attendance.present / analyticsData.performance.attendance.total) * 100)}%
                        </h3>
                      </div>
                      <div className="text-green-400 flex items-center">
                        <FiTrendingUp />
                        <span className="ml-1">{analyticsData.performance.attendance.trend}%</span>
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{width: `${(analyticsData.performance.attendance.present / analyticsData.performance.attendance.total) * 100}%`}}
                      />
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/60">Productivity</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{analyticsData.performance.productivity.current}%</h3>
                      </div>
                      <div className="text-green-400 flex items-center">
                        <FiTrendingUp />
                        <span className="ml-1">{analyticsData.performance.productivity.trend}%</span>
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full"
                        style={{width: `${analyticsData.performance.productivity.current}%`}}
                      />
                    </div>
                  </div>
                </div>

                {/* Weekly Time Tracking */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Weekly Hours</h3>
                    <div className="h-[200px] flex items-end justify-between gap-2">
                      {analyticsData.timeTracking.weekly.map((hours, index) => (
                        <div key={index} className="relative group">
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white/10 rounded text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            {hours}h
                          </div>
                          <div 
                            className="w-8 bg-indigo-500/50 hover:bg-indigo-500/75 rounded-t transition-all duration-200"
                            style={{height: `${(hours/45)*100}%`}}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 text-white/60 text-sm">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  {/* Time Distribution */}
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Time Distribution</h3>
                    <div className="space-y-4">
                      {Object.entries(analyticsData.timeTracking.distribution).map(([category, percentage]) => (
                        <div key={category}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white">{category}</span>
                            <span className="text-white/60">{percentage}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                category === 'Project Work' ? 'bg-green-500' :
                                category === 'Meetings' ? 'bg-blue-500' :
                                category === 'Training' ? 'bg-purple-500' :
                                category === 'Documentation' ? 'bg-yellow-500' :
                                'bg-gray-500'
                              }`}
                              style={{width: `${percentage}%`}}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTabState === "team" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">My Team</h2>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Search team members..."
                      className="px-4 py-2 rounded-lg bg-white/10 border border-white/40 text-white placeholder-white/60"
                    />
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Contact Team
                    </button>
                  </div>
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/60">Team Members</p>
                        <h3 className="text-2xl font-bold text-white">{teamStats.totalMembers}</h3>
                      </div>
                      <FaUsers className="text-white/80 text-xl" />
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/60">Active Projects</p>
                        <h3 className="text-2xl font-bold text-white">{teamStats.activeProjects}</h3>
                      </div>
                      <FaProjectDiagram className="text-white/80 text-xl" />
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/60">Completion Rate</p>
                        <h3 className="text-2xl font-bold text-white">{teamStats.completionRate}%</h3>
                      </div>
                      <FaChartLine className="text-white/80 text-xl" />
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/60">Team Efficiency</p>
                        <h3 className="text-2xl font-bold text-white">{teamStats.teamEfficiency}%</h3>
                      </div>
                      <FaTachometerAlt className="text-white/80 text-xl" />
                    </div>
                  </div>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map(member => (
                    <div key={member.id} className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6 hover:bg-white/25 transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <img src={member.image} alt={member.name} className="w-12 h-12 rounded-lg" />
                          <div>
                            <h3 className="text-white font-semibold">{member.name}</h3>
                            <p className="text-white/60 text-sm">{member.role}</p>
                          </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                        }`} />
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <button className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white text-sm hover:bg-white/20 transition-colors">
                          Message
                        </button>
                        <button className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white text-sm hover:bg-white/20 transition-colors">
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Team Activity */}
                <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Recent Team Activity</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Project meeting scheduled", time: "2 hours ago", type: "meeting" },
                      { title: "New task assigned to team", time: "4 hours ago", type: "task" },
                      { title: "Project milestone completed", time: "1 day ago", type: "milestone" },
                      { title: "Team collaboration update", time: "2 days ago", type: "update" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg transition-colors">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'meeting' ? 'bg-blue-500/20' :
                          activity.type === 'task' ? 'bg-green-500/20' :
                          activity.type === 'milestone' ? 'bg-purple-500/20' :
                          'bg-yellow-500/20'
                        }`}>
                          {activity.type === 'meeting' ? <FaVideo /> :
                           activity.type === 'task' ? <FaTasks /> :
                           activity.type === 'milestone' ? <FaFlag /> :
                           <FaBell />}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{activity.title}</p>
                          <p className="text-white/60 text-xs">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTabState === "tasks" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h2 className="text-2xl font-bold text-white">Task Management</h2>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        value={taskSearch}
                        onChange={(e) => setTaskSearch(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 rounded-lg bg-white/10 border border-white/40 text-white placeholder-white/60"
                      />
                      <FaSearch className="absolute right-3 top-3 text-white/60" />
                    </div>
                    <select
                      value={taskFilter}
                      onChange={(e) => setTaskFilter(e.target.value)}
                      className="px-4 py-2 rounded-lg bg-white/10 border border-white/40 text-white"
                    >
                      <option value="all">All Tasks</option>
                      <option value="pending">Pending</option>
                      <option value="accepted">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Task Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/60">Total Tasks</p>
                        <h3 className="text-2xl font-bold text-white">{tasks.length}</h3>
                      </div>
                      <FaTasks className="text-white/80 text-xl" />
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/60">In Progress</p>
                        <h3 className="text-2xl font-bold text-white">
                          {tasks.filter(t => t.status === 'accepted').length}
                        </h3>
                      </div>
                      <div className="text-blue-400">
                        <FaChartLine className="text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/60">Completed</p>
                        <h3 className="text-2xl font-bold text-white">
                          {tasks.filter(t => t.status === 'completed').length}
                        </h3>
                      </div>
                      <div className="text-green-400">
                        <FaCheckCircle className="text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/60">Pending</p>
                        <h3 className="text-2xl font-bold text-white">
                          {tasks.filter(t => t.status === 'pending').length}
                        </h3>
                      </div>
                      <div className="text-yellow-400">
                        <FaClock className="text-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Task List */}
                <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                  <div className="space-y-4">
                    {getFilteredTasks().map((task) => (
                      <div key={task.id} 
                        className="flex items-center justify-between p-4 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-300"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            task.priority === 'high' ? 'bg-red-500' :
                            task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <h3 className="text-white font-medium">{task.title}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-white/60">Deadline: {task.deadline}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                task.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                                task.status === 'accepted' ? 'bg-blue-500/20 text-blue-300' :
                                'bg-yellow-500/20 text-yellow-300'
                              }`}>
                                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                                task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-green-500/20 text-green-300'
                              }`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {task.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleTaskAction(task.id, 'accepted')}
                                className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-white text-sm transition-colors duration-200"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleTaskAction(task.id, 'rejected')}
                                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-white text-sm transition-colors duration-200"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {task.status === 'accepted' && (
                            <button
                              onClick={() => handleTaskAction(task.id, 'completed')}
                              className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-white text-sm transition-colors duration-200"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTabState === "calendar" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Calendar</h2>
                  <div className="flex items-center gap-4">
                    <select
                      value={eventFilter}
                      onChange={(e) => setEventFilter(e.target.value)}
                      className="px-4 py-2 rounded-lg bg-white/10 border border-white/40 text-white"
                    >
                      <option value="all">All Events</option>
                      <option value="meeting">Meetings</option>
                      <option value="deadline">Deadlines</option>
                      <option value="call">Calls</option>
                      <option value="event">Events</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      <FaPlus />
                      <span>Add Event</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Calendar Overview */}
                  <div className="lg:col-span-2 bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="grid grid-cols-7 gap-1">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-white/60 text-sm py-2">
                          {day}
                        </div>
                      ))}
                      {[...Array(31)].map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square p-2 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors
                            ${i + 1 === selectedDate.getDate() ? 'bg-indigo-500/30 border-indigo-500' : ''}
                          `}
                          onClick={() => setSelectedDate(new Date(2024, 1, i + 1))}
                        >
                          <div className="text-white text-sm">{i + 1}</div>
                          {calendarEvents.some(event => new Date(event.date).getDate() === i + 1) && (
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mx-auto mt-1"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Events List */}
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Upcoming Events
                    </h3>
                    <div className="space-y-4">
                      {calendarEvents
                        .filter(event => eventFilter === 'all' || event.type === eventFilter)
                        .map(event => (
                          <div
                            key={event.id}
                            className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-white font-medium">{event.title}</h4>
                                <p className="text-white/60 text-sm mt-1">
                                  {event.date} - {event.time}
                                </p>
                              </div>
                              <div className={`p-2 rounded-lg ${
                                event.type === 'meeting' ? 'bg-blue-500/20 text-blue-300' :
                                event.type === 'deadline' ? 'bg-red-500/20 text-red-300' :
                                event.type === 'call' ? 'bg-green-500/20 text-green-300' :
                                'bg-purple-500/20 text-purple-300'
                              }`}>
                                {event.type === 'meeting' ? <FaVideo /> :
                                 event.type === 'deadline' ? <FaClock /> :
                                 event.type === 'call' ? <FaPhone /> :
                                 <FaCalendar />}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Event Timeline */}
                <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Today's Schedule</h3>
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-4 w-px bg-white/20"></div>
                    <div className="space-y-6">
                      {[9, 10, 11, 12, 13, 14, 15, 16, 17].map(hour => (
                        <div key={hour} className="flex items-start gap-8">
                          <div className="w-8 text-white/60 text-sm">{`${hour}:00`}</div>
                          <div className="flex-1 pl-8">
                            {calendarEvents
                              .filter(event => {
                                const eventHour = parseInt(event.time.split(':')[0]);
                                return eventHour === hour;
                              })
                              .map(event => (
                                <div
                                  key={event.id}
                                  className="p-3 bg-white/10 rounded-lg border border-white/10"
                                >
                                  <h4 className="text-white font-medium">{event.title}</h4>
                                  <p className="text-white/60 text-sm">{event.time}</p>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTabState === "chat" && (
              <div className="flex h-[calc(100vh-7rem)]">
                {/* Chat Sidebar */}
                <div className="w-80 bg-white/10 backdrop-blur-lg border-r border-white/10 p-4">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50"
                      />
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setChatFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          chatFilter === 'all' 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setChatFilter('unread')}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          chatFilter === 'unread' 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Unread
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2">
                      {teamMembers.map(member => (
                        <div
                          key={member.id}
                          onClick={() => setSelectedChat(member.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                            selectedChat === member.id 
                              ? 'bg-white/20' 
                              : 'hover:bg-white/10'
                          }`}
                        >
                          <div className="relative">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-10 h-10 rounded-full"
                            />
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-gray-900 rounded-full ${
                              member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{member.name}</h4>
                            <p className="text-white/60 text-sm">Online</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chat Main Area */}
                <div className="flex-1 flex flex-col bg-white/5">
                  {/* Chat Header */}
                  <div className="p-4 bg-white/10 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img 
                        src={teamMembers[0].image}
                        alt={teamMembers[0].name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="text-white font-medium">{teamMembers[0].name}</h3>
                        <p className="text-white/60 text-sm">{teamMembers[0].role}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white">
                      <FaEllipsisV />
                    </button>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex ${message.isSelf ? 'flex-row-reverse' : 'flex-row'} items-end gap-2 max-w-[70%]`}>
                          {!message.isSelf && (
                            <img 
                              src={message.avatar}
                              alt={message.sender}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div className={`${
                            message.isSelf 
                              ? 'bg-indigo-500 text-white' 
                              : 'bg-white/10 text-white'
                            } rounded-2xl px-4 py-2`}
                          >
                            <p>{message.message}</p>
                            <p className="text-xs opacity-60 mt-1">{message.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 bg-white/10 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white"
                      >
                        <FaSmile />
                      </button>
                      <button
                        type="button"
                        className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white"
                      >
                        <FaPaperclip />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50"
                      />
                      <button
                        type="submit"
                        className="p-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white"
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTabState === "settings" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Settings</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Settings Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4">
                      <nav className="space-y-2">
                        {[
                          { id: 'profile', icon: <FaUser />, label: 'Profile Settings' },
                          { id: 'notifications', icon: <FaBell />, label: 'Notifications' },
                          { id: 'security', icon: <FaLock />, label: 'Password & Security' },
                          { id: 'appearance', icon: <FaMoon />, label: 'Appearance' },
                          { id: 'language', icon: <FaGlobe />, label: 'Language' },
                          { id: 'privacy', icon: <FaShieldAlt />, label: 'Privacy' }
                        ].map(item => (
                          <button
                            key={item.id}
                            onClick={() => setSettingsTab(item.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                              settingsTab === item.id
                                ? 'bg-white/20 text-white'
                                : 'text-white/60 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>

                  {/* Settings Content Area */}
                  <div className="lg:col-span-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    {/* Profile Section */}
                    {settingsTab === 'profile' && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Profile Settings</h3>
                        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                          <div className="relative">
                            <img
                              src={user.profileImage || "https://ui-avatars.com/api/?name=User&background=random"}
                              alt="Profile"
                              className="w-24 h-24 rounded-xl"
                            />
                            <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600">
                              <FaCamera className="text-sm" />
                            </button>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{user.name}</h4>
                            <p className="text-white/60">Upload a new photo</p>
                          </div>
                        </div>
                        <form className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white/60 mb-2">First Name</label>
                              <input
                                type="text"
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                placeholder="John"
                              />
                            </div>
                            <div>
                              <label className="block text-white/60 mb-2">Last Name</label>
                              <input
                                type="text"
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                placeholder="Doe"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-white/60 mb-2">Email</label>
                            <input
                              type="email"
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                              placeholder="john@example.com"
                            />
                          </div>
                          <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                            Save Changes
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
