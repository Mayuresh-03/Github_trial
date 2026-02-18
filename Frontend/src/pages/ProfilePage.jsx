import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../authStore';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Camera, 
  Save, 
  X,
  Edit2
} from 'lucide-react';

const ProfilePage = () => {
  // 1. Get user data from Global Store
  const user = useAuthStore((state) => state.user);
  
  // 2. Local State for Form Handling
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form with store data (or defaults)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    role: ''
  });

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || 'User Name',
        email: user.email || '',
        phone: user.phone || '',       // Assuming these fields exist in your user object
        location: user.location || '', // or serve as placeholders
        bio: user.bio || '',
        role: user.role || 'User'
      });
    }
  }, [user]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Save (Simulated API Call)
  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      console.log("Saving profile data:", formData);
      // Here you would call: await api.updateProfile(formData);
      // And then update the authStore with set({ user: updatedUser });
      
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  // Handle Cancel
  const handleCancel = () => {
    // Reset to original user data
    if (user) {
        setFormData(prev => ({
            ...prev,
            full_name: user.full_name || '',
            phone: user.phone || '',
            location: user.location || '',
            bio: user.bio || ''
        }));
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      
      {/* --- Header / Cover Image --- */}
      <div className="relative h-48 rounded-xl bg-linear-to-r from-blue-600 to-indigo-700 overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* --- Profile Card --- */}
      <div className="relative px-6 sm:px-10">
        
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center -mt-12 mb-6 gap-4">
          <div className="relative group">
            <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md flex items-center justify-center">
               {/* Use generic avatar if no image */}
               <span className="text-4xl font-bold text-gray-400">
                 {formData.full_name.charAt(0)}
               </span>
               {/* <img src={user.avatarUrl} alt="Profile" className="h-full w-full object-cover" /> */}
            </div>
            
            {/* Edit Photo Button */}
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all">
                <Camera size={16} />
              </button>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left mt-2 sm:mt-12">
             <h1 className="text-2xl font-bold text-gray-900">{formData.full_name}</h1>
             <p className="text-gray-500 font-medium capitalize flex items-center justify-center sm:justify-start gap-1">
                <Briefcase size={14} />
                {formData.role} Account
             </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 sm:mt-12">
             {!isEditing ? (
                 <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
                 >
                    <Edit2 size={16} />
                    Edit Profile
                 </button>
             ) : (
                 <div className="flex gap-2">
                    <button 
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
                    >
                        <X size={16} />
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-70"
                    >
                        {isLoading ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                    </button>
                 </div>
             )}
          </div>
        </div>

        {/* --- Form Fields --- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                 <input 
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                 />
              </div>
            </div>

            {/* Email (Usually Read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                 <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                 <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled={true} // Email is usually immutable
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                 />
              </div>
              {isEditing && <p className="text-xs text-gray-400">Email cannot be changed.</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                 <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                 <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                 />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <div className="relative">
                 <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                 <input 
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="City, Country"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                 />
              </div>
            </div>

            {/* Bio (Full Width) */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">About Me</label>
              <textarea 
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Write a short bio about yourself..."
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-70 disabled:cursor-not-allowed transition-all resize-none"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;