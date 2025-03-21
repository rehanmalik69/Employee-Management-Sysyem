import React, { useState, useEffect } from "react";
import { FaUser, FaCalendar, FaClock, FaFileAlt, FaBell, FaChartLine, FaCheckCircle, FaEnvelope, FaSignOutAlt, FaTasks, FaCheck, FaTimes, FaUsers, FaVideo, FaHome, FaChartPie, FaComments, FaCog, FaUserShield, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [user, setUser] = useState({ name: '', profileImage: '' });
  const navigate = useNavigate();

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
    { icon: <FaHome />, label: "Dashboard", active: true },
    { icon: <FaChartPie />, label: "Analytics" },
    { icon: <FaUsers />, label: "Team" },
    { icon: <FaTasks />, label: "Tasks" },
    { icon: <FaCalendar />, label: "Calendar" },
    { icon: <FaComments />, label: "Chat" },
    { icon: <FaCog />, label: "Settings" },
  ];

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
            <div className="relative hidden md:block">
              <input
                type="search"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-white/20 focus:bg-white/10 focus:outline-none text-white placeholder-white/50 text-sm"
              />
              <FaSearch className="absolute right-3 top-2.5 text-white/50" />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
                <FaBell className="text-xl text-white/80" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-purple-500">3</span>
              </button>

              <div className="h-8 w-px bg-white/10"></div>

              <div className="flex items-center gap-3">
                <div className="relative group">
                  <img 
                    src={user.profileImage || "https://ui-avatars.com/api/?name=User&background=random"} 
                    alt="Profile" 
                    className="w-9 h-9 rounded-lg border-2 border-white/20 group-hover:border-white/40 transition-colors" 
                  />
                  <div className="w-2 h-2 bg-green-500 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-purple-500"></div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/80 hover:text-white flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  <span className="hidden md:block text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className="w-20 md:w-64 min-h-[calc(100vh-4rem)] bg-white/5 backdrop-blur-lg border-r border-white/10 fixed left-0 top-16">
          <div className="p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  item.active 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`${item.active ? 'bg-white/20' : 'bg-white/5'} p-2 rounded-lg transition-colors`}>
                  {item.icon}
                </div>
                <span className="hidden md:block text-sm font-medium">{item.label}</span>
                {item.active && <div className="w-1 h-6 bg-white/80 rounded-full absolute right-0"></div>}
              </div>
            ))}
          </div>
        </aside>

        {/* Adjust main content margin */}
        <main className="flex-1 ml-20 md:ml-64 p-6">
          <div className="max-w-[2000px] mx-auto">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
