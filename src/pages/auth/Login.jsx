import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, ArrowLeft, Mail, Lock, Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
    if (result.user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  }

    
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    clearError();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background animation elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bg-blue-200 rounded-full top-20 left-10 w-72 h-72 mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute bg-indigo-200 rounded-full top-40 right-10 w-72 h-72 mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bg-purple-200 rounded-full bottom-20 left-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to home */}
        <Link
          to="/"
          className="absolute left-0 inline-flex items-center text-sm text-gray-600 transition-colors duration-300 -top-16 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to home
        </Link>

        {/* Login card */}
        <div className="p-8 transition-all duration-300 transform border border-gray-100 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-600">Sign in to your CareerPilot account</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center p-3 mb-6 border border-red-200 rounded-lg bg-red-50">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full py-3 pl-10 pr-3 transition-all duration-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full py-3 pl-10 pr-12 transition-all duration-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-blue-600 transition-colors duration-300 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 text-sm text-gray-500">or</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 transition-colors duration-300 hover:text-blue-700">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;