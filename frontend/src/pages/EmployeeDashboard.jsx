import React, { useState, useEffect, useCallback } from "react";
import { FaUser, FaCalendar, FaClock, FaFileAlt, FaBell, FaChartLine, FaCheckCircle, FaEnvelope, FaSignOutAlt, FaTasks, FaCheck, FaTimes, FaUsers, FaVideo, FaHome, FaChartPie, FaComments, FaCog, FaUserShield, FaSearch, FaProjectDiagram, FaTachometerAlt, FaFlag, FaPlus, FaFilter, FaPhone, FaSmile, FaPaperclip, FaPaperPlane, FaEllipsisV, FaCamera, FaLock, FaMoon, FaGlobe, FaShieldAlt, FaChevronLeft, FaChevronRight, FaEraser, FaBellSlash, FaBan, FaSun, FaDesktop } from "react-icons/fa";
import { FiBarChart2, FiTrendingUp, FiTrendingDown, FiPieChart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const buttonBaseClass = "px-4 py-2.5 border-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2";
const primaryButtonClass = `${buttonBaseClass} bg-indigo-500 hover:bg-indigo-600 text-white border-indigo-400 hover:border-indigo-500`;
const secondaryButtonClass = `${buttonBaseClass} bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30`;
const dangerButtonClass = `${buttonBaseClass} bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 border-red-500/30 hover:border-red-500/50`;
const successButtonClass = `${buttonBaseClass} bg-green-500/20 hover:bg-green-500/30 text-green-300 hover:text-green-200 border-green-500/30 hover:border-green-500/50`;

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

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
  const [teamMembers, setTeamMembers] = useState([
    { 
      id: 1, 
      name: "Sarah Wilson", 
      role: "Team Lead", 
      status: "online", 
      email: "sarah.wilson@example.com",
      phone: "+1 234-567-8901",
      department: "Development",
      joinDate: "2023-01-15",
      projects: ["Project X", "Project Y"],
      skills: ["React", "Node.js", "Project Management"],
      image: "https://ui-avatars.com/api/?name=Sarah+Wilson&background=random" 
    },
    { 
      id: 2, 
      name: "Michael Brown", 
      role: "Developer", 
      status: "offline", 
      email: "michael.brown@example.com",
      phone: "+1 234-567-8902",
      department: "Development",
      joinDate: "2023-03-20",
      projects: ["Project Z"],
      skills: ["JavaScript", "Python", "AWS"],
      image: "https://ui-avatars.com/api/?name=Michael+Brown&background=random" 
    },
    { 
      id: 3, 
      name: "Emma Davis", 
      role: "Designer", 
      status: "online", 
      email: "emma.davis@example.com",
      phone: "+1 234-567-8903",
      department: "Design",
      joinDate: "2023-02-10",
      projects: ["Project X", "Project W"],
      skills: ["UI/UX", "Figma", "Adobe XD"],
      image: "https://ui-avatars.com/api/?name=Emma+Davis&background=random" 
    },
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

  // Add these new state declarations after other state declarations
  const [teamSearch, setTeamSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');

  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberModal, setShowMemberModal] = useState(false);

  // Add these new state declarations after other state declarations
  const [taskPriorities] = useState([
    { id: 'high', label: 'High', color: 'red' },
    { id: 'medium', label: 'Medium', color: 'yellow' },
    { id: 'low', label: 'Low', color: 'green' }
  ]);

  const [taskSort, setTaskSort] = useState('deadline');
  const [taskView, setTaskView] = useState('list');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskNotes, setTaskNotes] = useState({});

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'meeting'
  });

  // Add these new states after other state declarations
  const [chatHistory, setChatHistory] = useState({
    1: [
      {
        id: 1,
        sender: 'Sarah Wilson',
        message: 'Hey, how\'s the project coming along?',
        time: '10:30 AM',
        isSelf: false,
        isRead: true
      },
      {
        id: 2,
        message: 'Going well! Almost finished with the documentation.',
        time: '10:32 AM',
        isSelf: true,
        isRead: true
      }
    ],
    2: [
      {
        id: 3,
        sender: 'Michael Brown',
        message: 'Can you review my latest commits?',
        time: '11:15 AM',
        isSelf: false,
        isRead: false
      }
    ],
    3: []
  });

  const [chatSearch, setChatSearch] = useState('');
  const [unreadMessages, setUnreadMessages] = useState(new Set([2]));

  // Add these new states after other state declarations
  const [showChatMenu, setShowChatMenu] = useState(false);

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
  const [analyticsData, setAnalyticsData] = useState({
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
  const [calendarEvents, setCalendarEvents] = useState([
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
    
    const newMessageObj = {
      id: Date.now(),
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
      isRead: true
    };

    setChatHistory(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessageObj]
    }));

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

  // New analytics states
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsPeriod, setAnalyticsPeriod] = useState('week');
  const [analyticsRefreshTimer, setAnalyticsRefreshTimer] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Analytics data fetching function
  const fetchAnalyticsData = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      // Simulate API call - replace with actual API call
      const response = await new Promise(resolve => setTimeout(() => {
        resolve({
          performance: {
            tasks: {
              completed: Math.floor(Math.random() * 20) + 40,
              total: 52,
              trend: Math.floor(Math.random() * 10) + 10
            },
            attendance: {
              present: Math.floor(Math.random() * 5) + 18,
              total: 23,
              trend: Math.floor(Math.random() * 5) + 3
            },
            productivity: {
              current: Math.floor(Math.random() * 10) + 80,
              previous: 82,
              trend: Math.floor(Math.random() * 5) + 4
            }
          },
          timeTracking: {
            weekly: Array(7).fill(0).map(() => Math.floor(Math.random() * 10) + 30),
            distribution: {
              'Project Work': 45,
              'Meetings': 20,
              'Training': 15,
              'Documentation': 12,
              'Other': 8
            }
          }
        });
      }, 1000));

      setAnalyticsData(response);
      setLastRefreshed(new Date());
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  // Set up auto-refresh
  useEffect(() => {
    if (activeTabState === 'analytics') {
      fetchAnalyticsData();
      const timer = setInterval(fetchAnalyticsData, 300000); // Refresh every 5 minutes
      setAnalyticsRefreshTimer(timer);
    }
    return () => {
      if (analyticsRefreshTimer) {
        clearInterval(analyticsRefreshTimer);
      }
    };
  }, [activeTabState, fetchAnalyticsData]);

  // Handle period change
  const handlePeriodChange = (period) => {
    setAnalyticsPeriod(period);
    fetchAnalyticsData();
  };

  // Analytics content rendering
  const renderAnalyticsContent = () => {
    if (analyticsLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full"></div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Header with controls */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Analytics Overview</h2>
            <p className="text-white/60 text-sm mt-1">
              Last updated: {lastRefreshed.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={analyticsPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-900/50 border-2 border-white/20 text-white hover:bg-gray-900/70 focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center',
                backgroundSize: '16px',
                paddingRight: '32px'
              }}
            >
              <option value="week" className="bg-gray-900 text-white">This Week</option>
              <option value="month" className="bg-gray-900 text-white">This Month</option>
              <option value="quarter" className="bg-gray-900 text-white">This Quarter</option>
            </select>
            <button
              onClick={fetchAnalyticsData}
              className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors"
              title="Refresh Analytics"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Rest of analytics content */}
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
    );
  };

  // Add these new functions after other function declarations
  const sortTasks = useCallback((tasks) => {
    return [...tasks].sort((a, b) => {
      switch (taskSort) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });
  }, [taskSort]);

  const getFilteredAndSortedTasks = useCallback(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(taskSearch.toLowerCase());
      const matchesFilter = taskFilter === 'all' || task.status === taskFilter;
      return matchesSearch && matchesFilter;
    });
    return sortTasks(filtered);
  }, [tasks, taskSearch, taskFilter, sortTasks]);

  const handleAddTaskNote = (taskId, note) => {
    setTaskNotes(prev => ({
      ...prev,
      [taskId]: [...(prev[taskId] || []), {
        id: Date.now(),
        text: note,
        timestamp: new Date().toISOString(),
        user: user.name
      }]
    }));
  };

  const calculateTaskProgress = (task) => {
    if (task.status === 'completed') return 100;
    if (task.status === 'accepted') return 50;
    return 0;
  };

  const checkDeadlineStatus = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'overdue';
    if (diffDays <= 2) return 'due-soon';
    return 'on-track';
  };

  // Replace the existing tasks section content with this enhanced version
  const renderTasksContent = () => (
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
            value={taskSort}
            onChange={(e) => setTaskSort(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-900/50 border-2 border-white/20 text-white hover:bg-gray-900/70 focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
              backgroundSize: '16px',
              paddingRight: '32px'
            }}
          >
            <option value="deadline">Deadline</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
          <select
            value={taskFilter}
            onChange={(e) => setTaskFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-900/50 border-2 border-white/20 text-white hover:bg-gray-900/70 focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
              backgroundSize: '16px',
              paddingRight: '32px'
            }}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="accepted">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTaskView('list')}
              className={`${buttonBaseClass} ${
                taskView === 'list' 
                  ? primaryButtonClass 
                  : secondaryButtonClass
              } px-3 py-2 text-sm`}
            >
              <FaTasks />
            </button>
            <button
              onClick={() => setTaskView('board')}
              className={`${buttonBaseClass} ${
                taskView === 'board' 
                  ? primaryButtonClass 
                  : secondaryButtonClass
              } px-3 py-2 text-sm`}
            >
              <FaChartPie />
            </button>
          </div>
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
        {['pending', 'accepted', 'completed'].map((status) => (
          <div key={status} className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60">{status.charAt(0).toUpperCase() + status.slice(1)}</p>
                <h3 className="text-2xl font-bold text-white">
                  {tasks.filter(t => t.status === status).length}
                </h3>
              </div>
              <div className={`text-${
                status === 'completed' ? 'green' : 
                status === 'accepted' ? 'blue' : 
                'yellow'
              }-400`}>
                {status === 'completed' ? <FaCheckCircle className="text-xl" /> :
                 status === 'accepted' ? <FaChartLine className="text-xl" /> :
                 <FaClock className="text-xl" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task List/Board View */}
      {taskView === 'list' ? (
        <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <div className="space-y-4">
            {getFilteredAndSortedTasks().map((task) => (
              <div key={task.id} 
                className="flex items-center justify-between p-4 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-300"
                onClick={() => {
                  setSelectedTask(task);
                  setShowTaskModal(true);
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <h3 className="text-white font-medium">{task.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        checkDeadlineStatus(task.deadline) === 'overdue' ? 'bg-red-500/20 text-red-300' :
                        checkDeadlineStatus(task.deadline) === 'due-soon' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {task.deadline}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                        task.status === 'accepted' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${calculateTaskProgress(task)}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/60">
                          {calculateTaskProgress(task)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {task.status === 'pending' && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskAction(task.id, 'accepted');
                        }}
                        className={`${primaryButtonClass} text-sm`}
                      >
                        Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskAction(task.id, 'rejected');
                        }}
                        className={`${dangerButtonClass} text-sm`}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {task.status === 'accepted' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTaskAction(task.id, 'completed');
                      }}
                      className={`${successButtonClass} text-sm`}
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['pending', 'accepted', 'completed'].map((status) => (
            <div key={status} className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </h3>
              <div className="space-y-4">
                {getFilteredAndSortedTasks()
                  .filter(task => task.status === status)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="p-4 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-all duration-200"
                      onClick={() => {
                        setSelectedTask(task);
                        setShowTaskModal(true);
                      }}
                    >
                      <h4 className="text-white font-medium">{task.title}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                          task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-white/60 text-xs">{task.deadline}</span>
                      </div>
                      <div className="mt-3">
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${calculateTaskProgress(task)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Add task modal component
  const renderTaskModal = () => (
    showTaskModal && selectedTask && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-900/95 border border-white/20 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{selectedTask.title}</h3>
              <button 
                onClick={() => setShowTaskModal(false)}
                className={`${secondaryButtonClass} text-sm`}
              >
                <FaTimes />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-white/60 mb-2">Status</h4>
                <span className={`px-3 py-1.5 rounded-lg text-sm ${
                  selectedTask.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                  selectedTask.status === 'accepted' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {selectedTask.status.charAt(0).toUpperCase() + selectedTask.status.slice(1)}
                </span>
              </div>
              <div>
                <h4 className="text-white/60 mb-2">Priority</h4>
                <span className={`px-3 py-1.5 rounded-lg text-sm ${
                  selectedTask.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                  selectedTask.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-white/60 mb-2">Progress</h4>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${calculateTaskProgress(selectedTask)}%` }}
                />
              </div>
              <p className="text-white/60 text-sm mt-1">
                {calculateTaskProgress(selectedTask)}% Complete
              </p>
            </div>

            <div>
              <h4 className="text-white/60 mb-2">Notes</h4>
              <div className="space-y-2">
                {(taskNotes[selectedTask.id] || []).map(note => (
                  <div key={note.id} className="p-3 bg-white/10 rounded-lg">
                    <p className="text-white">{note.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-white/60 text-xs">{note.user}</span>
                      <span className="text-white/40 text-xs">
                        {new Date(note.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const noteText = e.target.note.value;
                  if (noteText.trim()) {
                    handleAddTaskNote(selectedTask.id, noteText);
                    e.target.note.value = '';
                  }
                }}
                className="mt-4"
              >
                <input
                  type="text"
                  name="note"
                  placeholder="Add a note..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50"
                />
              </form>
            </div>
          </div>
          <div className="p-6 border-t border-white/10 flex justify-end gap-4">
            {selectedTask.status === 'pending' && (
              <>
                <button
                  onClick={() => {
                    handleTaskAction(selectedTask.id, 'accepted');
                    setShowTaskModal(false);
                  }}
                  className={`${primaryButtonClass} text-sm`}
                >
                  Accept Task
                </button>
                <button
                  onClick={() => {
                    handleTaskAction(selectedTask.id, 'rejected');
                    setShowTaskModal(false);
                  }}
                  className={`${dangerButtonClass} text-sm`}
                >
                  Reject Task
                </button>
              </>
            )}
            {selectedTask.status === 'accepted' && (
              <button
                onClick={() => {
                  handleTaskAction(selectedTask.id, 'completed');
                  setShowTaskModal(false);
                }}
                className={`${successButtonClass} text-sm`}
              >
                Mark as Completed
              </button>
            )}
            <button
              onClick={() => setShowTaskModal(false)}
              className={`${secondaryButtonClass} text-sm`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Add these new functions after other function declarations
  const filterTeamMembers = useCallback(() => {
    return teamMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
                           member.role.toLowerCase().includes(teamSearch.toLowerCase()) ||
                           member.department.toLowerCase().includes(teamSearch.toLowerCase());
      const matchesFilter = teamFilter === 'all' || 
                           (teamFilter === 'online' && member.status === 'online') ||
                           (teamFilter === 'offline' && member.status === 'offline');
      return matchesSearch && matchesFilter;
    });
  }, [teamMembers, teamSearch, teamFilter]);

  const handleContactMember = (memberId) => {
    handleTeamMemberMessage(memberId);
  };

  // Replace the existing team section content with this enhanced version
  const renderTeamContent = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">My Team</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={teamSearch}
            onChange={(e) => setTeamSearch(e.target.value)}
            placeholder="Search team members..."
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/40 text-white placeholder-white/60"
          />
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-900/50 border-2 border-white/20 text-white hover:bg-gray-900/70 focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
              backgroundSize: '16px',
              paddingRight: '32px'
            }}
          >
            <option value="all">All Members</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Rest of the team section remains the same */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterTeamMembers().map(member => (
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
              <button 
                onClick={() => {
                  setSelectedMember(member);
                  setShowMemberModal(true);
                }}
                className={`${secondaryButtonClass} text-sm`}
              >
                View Profile
              </button>
              <button 
                onClick={() => handleContactMember(member.id)}
                className={`${secondaryButtonClass} text-sm`}
              >
                Message
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
  );

  // Add this modal component after your existing JSX
  const renderMemberModal = () => (
    showMemberModal && selectedMember && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-900/95 border border-white/20 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name} 
                  className="w-16 h-16 rounded-xl"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedMember.name}</h3>
                  <p className="text-white/60">{selectedMember.role}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMemberModal(false)}
                className={`${secondaryButtonClass} text-sm`}
              >
                <FaTimes />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-white/60 mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <p className="text-white flex items-center gap-2">
                    <FaEnvelope className="text-white/60" />
                    {selectedMember.email}
                  </p>
                  <p className="text-white flex items-center gap-2">
                    <FaPhone className="text-white/60" />
                    {selectedMember.phone}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-white/60 mb-2">Department</h4>
                <p className="text-white">{selectedMember.department}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-white/60 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white/10 rounded-full text-white text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white/60 mb-2">Current Projects</h4>
              <div className="space-y-2">
                {selectedMember.projects.map((project, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-white/10 rounded-lg text-white"
                  >
                    {project}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-white/10 flex justify-end gap-4">
            <button
              onClick={() => handleContactMember(selectedMember.id)}
              className={`${primaryButtonClass} text-sm`}
            >
              Contact Member
            </button>
            <button
              onClick={() => setShowMemberModal(false)}
              className={`${secondaryButtonClass} text-sm`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEventObj = {
      id: Date.now(),
      ...newEvent
    };
    setCalendarEvents(prev => [...prev, newEventObj]);
    setShowAddEventModal(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      type: 'meeting'
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0];
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const hasEvents = calendarEvents.some(event => event.date === dateString);
      
      days.push(
        <div 
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`aspect-square p-2 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors relative
            ${isSelected ? 'bg-indigo-500/30 border-indigo-500' : ''}
          `}
        >
          <div className="text-white text-sm">{day}</div>
          {hasEvents && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  // Add these new functions after existing functions
  const handleTeamMemberMessage = (memberId) => {
    setSelectedChat(memberId);
    setActiveTabState('chat');
  };

  const markChatAsRead = (chatId) => {
    setUnreadMessages(prev => {
      const newSet = new Set(prev);
      newSet.delete(chatId);
      return newSet;
    });
  };

  const getFilteredChats = useCallback(() => {
    return teamMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(chatSearch.toLowerCase());
      const matchesFilter = chatFilter === 'all' || 
        (chatFilter === 'unread' && unreadMessages.has(member.id));
      return matchesSearch && matchesFilter;
    });
  }, [teamMembers, chatSearch, chatFilter, unreadMessages]);

  // Add this function with other handlers
  const handleChatMenuOption = (action) => {
    switch (action) {
      case 'clearHistory':
        setChatHistory(prev => ({
          ...prev,
          [selectedChat]: []
        }));
        break;
      case 'mute':
        // Add mute functionality
        break;
      case 'block':
        // Add block functionality
        break;
      case 'report':
        // Add report functionality
        break;
    }
    setShowChatMenu(false);
  };

  // Add useEffect to handle clicking outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showChatMenu && !event.target.closest('.relative')) {
        setShowChatMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showChatMenu]);

  // Add these new states for settings
  const [userSettings, setUserSettings] = useState({
    profile: {
      firstName: user.name?.split(' ')[0] || '',
      lastName: user.name?.split(' ')[1] || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      taskReminders: true,
      meetingReminders: true,
      updates: true
    },
    appearance: {
      theme: 'dark',
      fontSize: 'medium',
      compactMode: false,
      animationsEnabled: true
    },
    privacy: {
      profileVisibility: 'all',
      showStatus: true,
      showLastSeen: true,
      allowMessages: true
    }
  });

  const handleSettingsSave = (section, data) => {
    setUserSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
    // Show success message
    setNotifications(prev => [{
      id: Date.now(),
      title: 'Settings Updated',
      message: `Your ${section} settings have been updated successfully`,
      time: 'Just now'
    }, ...prev]);
  };

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
                className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <FaBell className="text-xl text-white/80 hover:text-white" />
                {notifications.some(n => !n.isRead) && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-indigo-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-gray-900">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>

              {/* Enhanced Notifications Dropdown */}
              {showNotificationsDropdown && (
                <div className="absolute right-0 mt-2 w-[420px] bg-gray-900/95 backdrop-blur-lg border border-indigo-500/20 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-6 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-500/20 rounded-xl">
                        <FaBell className="text-2xl text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-xl">Notifications</h3>
                        <p className="text-white/60">
                          You have {notifications.filter(n => !n.isRead).length} unread notifications
                        </p>
                      </div>
                      <button 
                        onClick={markAllNotificationsAsRead}
                        className={`${primaryButtonClass} text-sm`}
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>

                  <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                    <div className="p-3 space-y-1">
                      {notifications.map(notification => (
                        <button 
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className="w-full p-4 flex items-start gap-4 hover:bg-white/5 rounded-xl transition-all duration-200 group relative"
                        >
                          <div className={`p-3 rounded-xl ${
                            !notification.isRead 
                              ? 'bg-indigo-500/20 text-indigo-300' 
                              : 'bg-white/10 text-white/60'
                          }`}>
                            <FaBell className="text-xl" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className={`text-base font-medium ${
                              notification.isRead ? 'text-white/80' : 'text-white'
                            } group-hover:text-indigo-400 transition-colors`}>
                              {notification.title}
                            </p>
                            <p className="text-white/60 text-sm mt-1">{notification.message}</p>
                            <div className="flex items-center gap-3 mt-3">
                              <p className="text-white/40 text-xs flex items-center gap-2">
                                <FaClock className="text-xs" />
                                {notification.time}
                              </p>
                            </div>
                          </div>
                          {!notification.isRead && (
                            <div className="absolute right-4 top-4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                          )}
                        </button>
                      ))}
                    </div>
                    {notifications.length === 0 && (
                      <div className="py-12 text-center">
                        <div className="inline-flex p-6 rounded-full bg-white/5 mb-4">
                          <FaBell className="text-4xl text-white/40" />
                        </div>
                        <p className="text-white/60 text-lg">No notifications yet</p>
                      </div>
                    )}
                    <div className="p-4 border-t border-white/10 bg-white/5">
                      <button 
                        onClick={() => setShowNotificationsDropdown(false)}
                        className={`${secondaryButtonClass} text-sm`}
                      >
                        <span>Close notifications</span>
                        <FaTimes className="text-sm" />
                      </button>
                    </div>
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
                className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg group transition-all duration-200"
              >
                <div className="relative">
                  <img 
                    src={user.profileImage || "https://ui-avatars.com/api/?name=User&background=random"} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-lg border-2 border-indigo-500/50 group-hover:border-indigo-500 transition-colors" 
                  />
                  <div className="w-3 h-3 bg-green-500 rounded-full absolute -bottom-1 -right-1 border-2 border-gray-900 shadow-lg"></div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-white font-medium leading-none group-hover:text-indigo-300 transition-colors">
                    {user.name?.split(' ')[0]}
                  </p>
                  <p className="text-white/60 text-sm">Employee</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-lg border border-indigo-500/20 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.profileImage || "https://ui-avatars.com/api/?name=User&background=random"}
                        alt={user.name}
                        className="w-12 h-12 rounded-lg border-2 border-indigo-500/50"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{user.name}</h4>
                        <p className="text-white/60 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-white/5">
                    <button 
                      onClick={() => {
                        handleTabChange('settings');
                        setShowProfileDropdown(false);
                      }}
                      className={`${secondaryButtonClass} text-sm`}
                    >
                      <FaCog className="text-lg text-indigo-400" />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className={`${dangerButtonClass} text-sm`}
                    >
                      <FaSignOutAlt className="text-lg" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Sidebar */}
      <div className="flex">
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
                          <button className={`${primaryButtonClass} !p-2`}>
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
                                className={`${primaryButtonClass} text-sm`}
                                title="Accept Task"
                              >
                                <FaCheck className="text-sm" />
                              </button>
                            )}
                            {task.status === 'accepted' && (
                              <button
                                onClick={() => handleTaskAction(task.id, 'completed')}
                                className={`${successButtonClass} text-sm`}
                                title="Mark as Completed"
                              >
                                <FaCheckCircle className="text-sm" />
                              </button>
                            )}
                            {task.status === 'pending' && (
                              <button
                                onClick={() => handleTaskAction(task.id, 'rejected')}
                                className={`${dangerButtonClass} text-sm`}
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

            {activeTabState === "analytics" && renderAnalyticsContent()}

            {activeTabState === "team" && renderTeamContent()}

            {activeTabState === "tasks" && renderTasksContent()}

            {activeTabState === "calendar" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-white">Calendar</h2>
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                      <button
                        onClick={handlePrevMonth}
                        className={`${secondaryButtonClass} !p-2`}
                      >
                        <FaChevronLeft />
                      </button>
                      <span className="text-white px-4">
                        {new Date(currentYear, currentMonth).toLocaleDateString('default', { 
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <button
                        onClick={handleNextMonth}
                        className={`${secondaryButtonClass} !p-2`}
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={eventFilter}
                      onChange={(e) => setEventFilter(e.target.value)}
                      className="px-4 py-2 rounded-lg bg-gray-900/50 border-2 border-white/20 text-white hover:bg-gray-900/70 focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 8px center',
                        backgroundSize: '16px',
                        paddingRight: '32px'
                      }}
                    >
                      <option value="all">All Events</option>
                      <option value="meeting">Meetings</option>
                      <option value="deadline">Deadlines</option>
                      <option value="call">Calls</option>
                      <option value="event">Events</option>
                    </select>
                    <button
                      onClick={() => setShowAddEventModal(true)}
                      className={`${primaryButtonClass} text-sm`}
                    >
                      <FaPlus />
                      <span>Add Event</span>
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <div className="grid grid-cols-7 gap-1">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-white/60 text-sm py-2">
                          {day}
                        </div>
                      ))}
                      {renderCalendarDays()}
                    </div>
                  </div>

                  {/* Rest of your existing calendar components */}
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
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
                
                {/* Add Event Modal */}
                {showAddEventModal && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-900/95 border border-white/20 rounded-xl w-full max-w-md mx-4">
                      <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-white">Add New Event</h3>
                          <button 
                            onClick={() => setShowAddEventModal(false)}
                            className={`${secondaryButtonClass} !p-2`}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                      <form onSubmit={handleAddEvent} className="p-6 space-y-4">
                        <div>
                          <label className="block text-white/60 mb-2">Event Title</label>
                          <input
                            type="text"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-white/60 mb-2">Date</label>
                          <input
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-white/60 mb-2">Time</label>
                          <input
                            type="time"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-white/60 mb-2">Event Type</label>
                          <select
                            value={newEvent.type}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          >
                            <option value="meeting">Meeting</option>
                            <option value="deadline">Deadline</option>
                            <option value="call">Call</option>
                            <option value="event">Event</option>
                          </select>
                        </div>
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            onClick={() => setShowAddEventModal(false)}
                            className={`${secondaryButtonClass} text-sm`}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className={`${primaryButtonClass} text-sm`}
                          >
                            Add Event
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTabState === "chat" && (
              <div className="flex h-[calc(100vh-7rem)] bg-white/5 rounded-xl overflow-hidden border border-white/10">
                {/* Chat Sidebar */}
                <div className="w-96 border-r border-white/10 flex flex-col">
                  {/* Search and Filters */}
                  <div className="p-4 border-b border-white/10 space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={chatSearch}
                        onChange={(e) => setChatSearch(e.target.value)}
                        placeholder="Search conversations..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:border-white/20 transition-all"
                      />
                      <FaSearch className="absolute right-4 top-3.5 text-white/40" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setChatFilter('all')}
                        className={`flex-1 ${buttonBaseClass} ${
                          chatFilter === 'all' 
                            ? primaryButtonClass 
                            : secondaryButtonClass
                        } justify-center py-2 text-sm`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setChatFilter('unread')}
                        className={`flex-1 ${buttonBaseClass} ${
                          chatFilter === 'unread' 
                            ? primaryButtonClass 
                            : secondaryButtonClass
                        } justify-center py-2 text-sm relative`}
                      >
                        Unread
                        {unreadMessages.size > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {unreadMessages.size}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Chat List */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="space-y-1 p-2">
                      {getFilteredChats().map(member => (
                        <div
                          key={member.id}
                          onClick={() => {
                            setSelectedChat(member.id);
                            markChatAsRead(member.id);
                          }}
                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                            selectedChat === member.id 
                              ? 'bg-white/20' 
                              : 'hover:bg-white/10'
                          }`}
                        >
                          <div className="relative">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-12 h-12 rounded-xl"
                            />
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-gray-900 rounded-full ${
                              member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h4 className="text-white font-medium truncate">{member.name}</h4>
                              {unreadMessages.has(member.id) && (
                                <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></span>
                              )}
                            </div>
                            <p className="text-white/60 text-sm truncate">
                              {member.status === 'online' ? 'Online' : 'Offline'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chat Main Area */}
                <div className="flex-1 flex flex-col">
                  {selectedChat ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 bg-white/5 border-b border-white/10 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img 
                              src={teamMembers.find(m => m.id === selectedChat)?.image}
                              alt={teamMembers.find(m => m.id === selectedChat)?.name}
                              className="w-12 h-12 rounded-xl border border-white/10"
                            />
                            <div>
                              <h3 className="text-white font-medium">
                                {teamMembers.find(m => m.id === selectedChat)?.name}
                              </h3>
                              <p className="text-white/60 text-sm">
                                {teamMembers.find(m => m.id === selectedChat)?.role}
                              </p>
                            </div>
                          </div>
                          <div className="relative">
                            <button 
                              onClick={() => setShowChatMenu(!showChatMenu)}
                              className={`${secondaryButtonClass} !p-2`}
                            >
                              <FaEllipsisV />
                            </button>
                            {showChatMenu && (
                              <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 rounded-xl border border-white/10 shadow-xl">
                                <div className="py-1">
                                  <button
                                    onClick={() => handleChatMenuOption('clearHistory')}
                                    className="w-full px-4 py-2 text-left text-white hover:bg-white/10 flex items-center gap-2"
                                  >
                                    <FaEraser className="text-white/60" />
                                    <span>Clear History</span>
                                  </button>
                                  <button
                                    onClick={() => handleChatMenuOption('mute')}
                                    className="w-full px-4 py-2 text-left text-white hover:bg-white/10 flex items-center gap-2"
                                  >
                                    <FaBellSlash className="text-white/60" />
                                    <span>Mute Notifications</span>
                                  </button>
                                  <button
                                    onClick={() => handleChatMenuOption('block')}
                                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-white/10 flex items-center gap-2"
                                  >
                                    <FaBan className="text-red-400/60" />
                                    <span>Block User</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Messages Area */}
                      <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {chatHistory[selectedChat]?.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex ${message.isSelf ? 'flex-row-reverse' : 'flex-row'} items-end gap-3 max-w-[70%]`}>
                              {!message.isSelf && (
                                <img 
                                  src={teamMembers.find(m => m.id === selectedChat)?.image}
                                  alt={teamMembers.find(m => m.id === selectedChat)?.name}
                                  className="w-8 h-8 rounded-lg"
                                />
                              )}
                              <div 
                                className={`${
                                  message.isSelf 
                                    ? 'bg-indigo-500 text-white rounded-2xl rounded-br-none' 
                                    : 'bg-white/10 text-white rounded-2xl rounded-bl-none'
                                } px-4 py-2.5 shadow-lg`}
                              >
                                <p className="text-sm">{message.message}</p>
                                <p className="text-xs opacity-60 mt-1">{message.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 bg-white/5 border-t border-white/10">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                          <button
                            type="button"
                            className={`${secondaryButtonClass} !p-2.5`}
                          >
                            <FaSmile className="text-lg" />
                          </button>
                          <button
                            type="button"
                            className={`${secondaryButtonClass} !p-2.5`}
                          >
                            <FaPaperclip className="text-lg" />
                          </button>
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-white/50 focus:border-white/20 transition-all"
                          />
                          <button
                            type="submit"
                            className={`${primaryButtonClass} !p-2.5`}
                          >
                            <FaPaperPlane className="text-lg" />
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center bg-white/5">
                      <div className="text-center p-8 rounded-2xl">
                        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <FaComments className="text-3xl text-white/60" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">Select a conversation</h3>
                        <p className="text-white/60">Choose a team member to start chatting</p>
                      </div>
                    </div>
                  )}
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
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 sticky top-24">
                      <nav className="space-y-2">
                        {[
                          { id: 'profile', icon: <FaUser />, label: 'Profile Settings' },
                          { id: 'notifications', icon: <FaBell />, label: 'Notifications' },
                          { id: 'security', icon: <FaLock />, label: 'Security' },
                          { id: 'appearance', icon: <FaMoon />, label: 'Appearance' },
                          { id: 'privacy', icon: <FaShieldAlt />, label: 'Privacy' }
                        ].map(item => (
                          <button
                            key={item.id}
                            onClick={() => setSettingsTab(item.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                              settingsTab === item.id
                                ? 'bg-white/20 text-white border border-white/20'
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
                  <div className="lg:col-span-3">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
                      {settingsTab === 'profile' && (
                        <div className="divide-y divide-white/10">
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-white">Profile Settings</h3>
                            <p className="text-white/60 text-sm mt-1">Manage your profile information</p>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                              <div className="relative">
                                <img
                                  src={user.profileImage || "https://ui-avatars.com/api/?name=User&background=random"}
                                  alt="Profile"
                                  className="w-24 h-24 rounded-xl border-2 border-white/20"
                                />
                                <button className={`${primaryButtonClass} !p-2 absolute -bottom-2 -right-2`}>
                                  <FaCamera className="text-sm" />
                                </button>
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{user.name}</h4>
                                <p className="text-white/60 text-sm">Update your photo and personal details</p>
                              </div>
                            </div>
                            
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              handleSettingsSave('profile', userSettings.profile);
                            }} className="space-y-6 mt-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-white/60 mb-2">First Name</label>
                                  <input
                                    type="text"
                                    value={userSettings.profile.firstName}
                                    onChange={(e) => setUserSettings(prev => ({
                                      ...prev,
                                      profile: { ...prev.profile, firstName: e.target.value }
                                    }))}
                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-white/20 transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-white/60 mb-2">Last Name</label>
                                  <input
                                    type="text"
                                    value={userSettings.profile.lastName}
                                    onChange={(e) => setUserSettings(prev => ({
                                      ...prev,
                                      profile: { ...prev.profile, lastName: e.target.value }
                                    }))}
                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-white/20 transition-all"
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-white/60 mb-2">Email</label>
                                <input
                                  type="email"
                                  value={userSettings.profile.email}
                                  onChange={(e) => setUserSettings(prev => ({
                                    ...prev,
                                    profile: { ...prev.profile, email: e.target.value }
                                  }))}
                                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-white/20 transition-all"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-white/60 mb-2">Phone Number</label>
                                <input
                                  type="tel"
                                  value={userSettings.profile.phone}
                                  onChange={(e) => setUserSettings(prev => ({
                                    ...prev,
                                    profile: { ...prev.profile, phone: e.target.value }
                                  }))}
                                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-white/20 transition-all"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-white/60 mb-2">Bio</label>
                                <textarea
                                  value={userSettings.profile.bio}
                                  onChange={(e) => setUserSettings(prev => ({
                                    ...prev,
                                    profile: { ...prev.profile, bio: e.target.value }
                                  }))}
                                  rows="4"
                                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-white/20 transition-all resize-none"
                                ></textarea>
                              </div>
                              
                              <div className="flex justify-end">
                                <button type="submit" className={`${primaryButtonClass}`}>
                                  Save Changes
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}

                      {settingsTab === 'notifications' && (
                        <div className="divide-y divide-white/10">
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-white">Notification Preferences</h3>
                            <p className="text-white/60 text-sm mt-1">Manage your notification settings</p>
                          </div>
                          
                          <div className="p-6 space-y-6">
                            {Object.entries(userSettings.notifications).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                                  <p className="text-white/60 text-sm">Receive notifications for {key.toLowerCase()}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => {
                                      setUserSettings(prev => ({
                                        ...prev,
                                        notifications: {
                                          ...prev.notifications,
                                          [key]: e.target.checked
                                        }
                                      }));
                                      handleSettingsSave('notifications', { [key]: e.target.checked });
                                    }}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {settingsTab === 'security' && (
                        <div className="divide-y divide-white/10">
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-white">Security Settings</h3>
                            <p className="text-white/60 text-sm mt-1">Manage your account security</p>
                          </div>
                          
                          <div className="p-6 space-y-6">
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              handleSettingsSave('security', userSettings.security);
                            }} className="space-y-6">
                              {/* Change Password */}
                              <div>
                                <h4 className="text-lg font-medium text-white mb-4">Change Password</h4>
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-white/60 mb-2">Current Password</label>
                                    <input
                                      type="password"
                                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white"
                                      placeholder="Enter current password"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-white/60 mb-2">New Password</label>
                                    <input
                                      type="password"
                                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white"
                                      placeholder="Enter new password"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-white/60 mb-2">Confirm New Password</label>
                                    <input
                                      type="password"
                                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white"
                                      placeholder="Confirm new password"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Two-Factor Authentication */}
                              <div className="pt-6 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-lg font-medium text-white">Two-Factor Authentication</h4>
                                    <p className="text-white/60 text-sm mt-1">Add an extra layer of security</p>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                  </label>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex justify-end gap-4 pt-6">
                                <button type="submit" className={primaryButtonClass}>
                                  Save Changes
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}

                      {settingsTab === 'appearance' && (
                        <div className="divide-y divide-white/10">
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-white">Appearance Settings</h3>
                            <p className="text-white/60 text-sm mt-1">Customize your interface</p>
                          </div>
                          
                          <div className="p-6 space-y-6">
                            <div>
                              <h4 className="text-lg font-medium text-white mb-4">Theme Preferences</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['dark', 'light', 'system'].map(theme => (
                                  <button
                                    key={theme}
                                    onClick={() => handleSettingsSave('appearance', { theme })}
                                    className={`p-4 border-2 rounded-xl ${
                                      userSettings.appearance.theme === theme
                                        ? 'border-indigo-500 bg-indigo-500/20'
                                        : 'border-white/10 hover:border-white/20 bg-white/5'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`p-2 rounded-lg bg-white/10`}>
                                        {theme === 'dark' ? <FaMoon /> : theme === 'light' ? <FaSun /> : <FaDesktop />}
                                      </div>
                                      <span className="text-white capitalize">{theme}</span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                              <h4 className="text-lg font-medium text-white mb-4">Interface Settings</h4>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h5 className="text-white font-medium">Compact Mode</h5>
                                    <p className="text-white/60 text-sm">Reduce spacing between elements</p>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={userSettings.appearance.compactMode}
                                      onChange={(e) => handleSettingsSave('appearance', { compactMode: e.target.checked })}
                                      className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                  </label>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div>
                                    <h5 className="text-white font-medium">Enable Animations</h5>
                                    <p className="text-white/60 text-sm">Show interface animations</p>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={userSettings.appearance.animationsEnabled}
                                      onChange={(e) => handleSettingsSave('appearance', { animationsEnabled: e.target.checked })}
                                      className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {settingsTab === 'privacy' && (
                        <div className="divide-y divide-white/10">
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-white">Privacy Settings</h3>
                            <p className="text-white/60 text-sm mt-1">Manage your privacy preferences</p>
                          </div>
                          
                          <div className="p-6 space-y-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-white font-medium">Profile Visibility</h4>
                                  <p className="text-white/60 text-sm">Control who can see your profile</p>
                                </div>
                                <select
                                  value={userSettings.privacy.profileVisibility}
                                  onChange={(e) => handleSettingsSave('privacy', { profileVisibility: e.target.value })}
                                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                >
                                  <option value="all">Everyone</option>
                                  <option value="team">Team Only</option>
                                  <option value="private">Private</option>
                                </select>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-white font-medium">Show Online Status</h4>
                                  <p className="text-white/60 text-sm">Display when you're online</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={userSettings.privacy.showStatus}
                                    onChange={(e) => handleSettingsSave('privacy', { showStatus: e.target.checked })}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                </label>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-white font-medium">Show Last Seen</h4>
                                  <p className="text-white/60 text-sm">Allow others to see when you were last active</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={userSettings.privacy.showLastSeen}
                                    onChange={(e) => handleSettingsSave('privacy', { showLastSeen: e.target.checked })}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                </label>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-white font-medium">Message Privacy</h4>
                                  <p className="text-white/60 text-sm">Control who can send you messages</p>
                                </div>
                                <select
                                  value={userSettings.privacy.messagePrivacy}
                                  onChange={(e) => handleSettingsSave('privacy', { messagePrivacy: e.target.value })}
                                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                >
                                  <option value="everyone">Everyone</option>
                                  <option value="team">Team Members</option>
                                  <option value="none">No One</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      {renderMemberModal()}
      {renderTaskModal()}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        select option {
          background-color: rgb(17, 24, 39);
          color: white;
          padding: 8px;
        }

        select option:hover {
          background-color: rgb(55, 65, 81);
        }
      `}</style>
    </div>
  );
};

export default EmployeeDashboard;
