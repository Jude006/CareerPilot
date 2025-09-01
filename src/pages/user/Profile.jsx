import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap,
  Edit3, Save, X, Upload, Shield, Bell, Globe, Plus
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    education: '',
    website: '',
    bio: '',
    skills: [],
    avatar: 'default-avatar.png'
  });
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view profile');
        return;
      }
      
      const res = await api.get('/auth/me');
      
      if (res.data.success && res.data.data) {
        const userData = res.data.data;
        setProfileData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          location: userData.location || '',
          jobTitle: userData.jobTitle || '',
          education: userData.education || '',
          website: userData.website || '',
          bio: userData.bio || '',
          skills: Array.isArray(userData.skills) ? userData.skills : [],
          avatar: userData.avatar || 'default-avatar.png'
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const updateData = {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        jobTitle: profileData.jobTitle,
        education: profileData.education,
        website: profileData.website,
        bio: profileData.bio,
        skills: profileData.skills
      };
      
      const res = await api.put('/auth/updatedetails', updateData);
      
      if (res.data.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        fetchProfile(); // Refresh profile data
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProfile();
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setError('');
      const res = await api.post('/auth/uploadavatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (res.data.success) {
        setProfileData(prev => ({ 
          ...prev, 
          avatar: res.data.data.avatar 
        }));
        setSuccess('Avatar updated successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl px-4 mx-auto animate-fade-in sm:px-6 lg:px-8">
      {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
      {success && <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">{success}</div>}
      {loading && <div className="p-4 mb-4 text-blue-700 bg-blue-100 rounded-lg">Loading...</div>}

      {/* Header */}
      <div className="flex flex-col mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 sm:w-auto"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex w-full space-x-3 sm:w-auto">
            <button
              onClick={handleCancel}
              className="flex items-center justify-center flex-1 px-4 py-2 text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50 sm:flex-none"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center justify-center flex-1 px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 sm:flex-none"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <div className="h-full p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="mb-6 text-center">
              <div className="relative inline-block">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-3 overflow-hidden text-2xl font-bold text-white rounded-full">
                  {profileData.avatar && profileData.avatar !== 'default-avatar.png' ? (
                    <img 
                      src={profileData.avatar} 
                      alt="Profile" 
                      className="object-cover w-full h-full" 
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500">
                      {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-2 transition-colors duration-200 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50">
                    <Upload className="w-4 h-4 text-gray-600" />
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      disabled={loading}
                    />
                  </label>
                )}
              </div>
              <h2 className="mb-1 text-xl font-bold text-gray-900">{profileData.name || 'Unknown User'}</h2>
              <p className="text-sm text-gray-600">{profileData.jobTitle || 'No Title'}</p>
            </div>
            
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">Applications</span>
                <span className="font-semibold text-blue-600">0</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">Interviews</span>
                <span className="font-semibold text-green-600">0</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">Offers</span>
                <span className="font-semibold text-purple-600">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Personal Information */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
              <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.name || 'No Name'}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.email || 'No Email'}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.phone || 'No Phone'}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.location || 'No Location'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
              <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                Professional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Job Title</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.jobTitle || 'No Title'}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Education</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.education || 'No Education'}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center text-blue-600">
                      <Globe className="w-4 h-4 mr-2" />
                      {profileData.website || 'No Website'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl lg:col-span-2">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Bio</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="leading-relaxed text-gray-700">
                  {profileData.bio || 'No bio added yet.'}
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl lg:col-span-2">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.skills.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                        disabled={loading}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
                {profileData.skills.length === 0 && !isEditing && (
                  <p className="text-gray-500">No skills added yet.</p>
                )}
              </div>
              {isEditing && (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <button
                    onClick={addSkill}
                    className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading || !newSkill.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;