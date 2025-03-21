import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    // Redirect if already logged in
    if (isAuth && userRole === 'admin') {
      navigate('/admin-dashboard');
    } else if (isAuth && userRole === 'employee') {
      navigate('/employee-dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Attempting login with:", { email, password }); // Debug log

    try {
      // Admin login
      if (email.trim().toLowerCase() === "admin@gmail.com" && password === "admin") {
        console.log("Admin login successful"); // Debug log
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Always store authentication
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('user', JSON.stringify({
          name: 'Admin',
          profileImage: 'https://ui-avatars.com/api/?name=Admin&background=random'
        }));

        // Only store credentials if remember me is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPassword', password);
        }

        navigate("/admin-dashboard");
        return;
      }

      // Employee credentials with full names
      const employeeCredentials = [
        { email: "john@example.com", password: "employee123", name: "John Smith", profileImage: "https://ui-avatars.com/api/?name=John+Smith&background=random" },
        { email: "sarah@example.com", password: "employee123", name: "Sarah Wilson", profileImage: "https://ui-avatars.com/api/?name=Sarah+Wilson&background=random" },
        { email: "michael@example.com", password: "employee123", name: "Michael Brown", profileImage: "https://ui-avatars.com/api/?name=Michael+Brown&background=random" },
        { email: "emma@example.com", password: "employee123", name: "Emma Davis", profileImage: "https://ui-avatars.com/api/?name=Emma+Davis&background=random" },
        { email: "james@example.com", password: "employee123", name: "James Johnson", profileImage: "https://ui-avatars.com/api/?name=James+Johnson&background=random" }
      ];

      const employee = employeeCredentials.find(
        emp => emp.email.toLowerCase() === email.trim().toLowerCase() && 
        emp.password === password
      );
      
      if (employee) {
        console.log("Employee login successful"); // Debug log
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Always store authentication
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'employee');
        localStorage.setItem('user', JSON.stringify({
          name: employee.name,
          profileImage: employee.profileImage
        }));

        // Only store credentials if remember me is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPassword', password);
        }

        navigate("/employee-dashboard");
        return;
      }

      console.log("Invalid credentials"); // Debug log
      setError("Invalid email or password");
    } catch (err) {
      console.error("Login error:", err); // Debug log
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-4">
          <FaUserShield className="text-white text-5xl" />
          <h2 className="text-3xl font-semibold text-white text-center mt-2">
            WorkXflow
          </h2>
        </div>
        <p className="text-white text-center mb-6">
          Welcome Back! Please log in.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500 bg-opacity-20 text-white p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-30 border border-white focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white placeholder-gray-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-30 border border-white focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white placeholder-gray-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center text-white text-sm">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2 cursor-pointer"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="cursor-pointer">
                Remember me
              </label>
            </div>
            <a href="#forgot" className="hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="text-center text-white mt-4">or</div>
          <div className="flex flex-col space-y-3 mt-4">
            <button className="flex items-center justify-center w-full py-3 bg-white text-gray-700 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300">
              <FaGoogle className="mr-2" /> Login with Google
            </button>
            <button className="flex items-center justify-center w-full py-3 bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300">
              <FaGithub className="mr-2" /> Login with GitHub
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
