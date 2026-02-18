import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useAuthStore } from '../authStore';
import { 
    LayoutDashboard, 
    Layers, 
    Box, 
    Settings, 
    User, 
    LogOut,
    Hexagon
} from 'lucide-react';

/**
 * --- Reusable NavLink Component ---
 * Keeps your exact styling logic: Active = Blue/White, Inactive = Slate/Hover
 */
const NavLink = ({ to, icon, children }) => (
    <RouterNavLink
        to={to}
        end // Ensures accurate active state for exact paths
        className={({ isActive }) =>
            `flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${
                isActive 
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/20' 
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`
        }
    >
        {icon}
        <span className="ml-4 text-sm">{children}</span>
    </RouterNavLink>
);

/**
 * --- Main Sidebar Component ---
 */
export default function Sidebar() {
    // We grab the logout function from your store
    const logout = useAuthStore((state) => state.logout);

    return (
        // Main Container: Fixed width, Full height, Dark Blue Gradient
        <div className="h-screen w-72 bg-linear-to-b from-slate-900 to-blue-950 border-r border-slate-700 flex flex-col shrink-0 transition-all duration-300">
            
            {/* Header: Project Branding */}
            <div className="p-6 border-b border-slate-700 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <Hexagon className="h-6 w-6 text-white fill-blue-600" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-100 tracking-tight">ProjectName</h1>
                </div>
                <p className="text-xs text-gray-400 pl-1">Admin Dashboard</p>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
                
                {/* Group 1: Main App */}
                <div>
                    <h2 className="px-3 mb-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                        Overview
                    </h2>
                    <NavLink to="/app/dashboard" icon={<LayoutDashboard size={20} />}>
                        Dashboard
                    </NavLink>
                </div>

                {/* Group 2: Features (Mapped to your App.jsx files) */}
                <div>
                    <h2 className="px-3 mb-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                        Management
                    </h2>
                    <NavLink to="/app/feature-one" icon={<Box size={20} />}>
                        Inventory
                    </NavLink>
                    <NavLink to="/app/feature-two" icon={<Layers size={20} />}>
                        Analytics
                    </NavLink>
                </div>
            </nav>

            {/* Footer Section: User Profile & Logout */}
            <div className="p-4 border-t border-slate-700 bg-slate-900/50">
                <div className="space-y-1">
                    <NavLink to="/app/profile" icon={<User size={20} />}>
                        My Profile
                    </NavLink>
                    <NavLink to="/app/settings" icon={<Settings size={20} />}>
                        Settings
                    </NavLink>
                    
                    {/* Logout Button */}
                    <button 
                        onClick={logout}
                        className="w-full flex items-center p-3 my-1 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                    >
                        <LogOut size={20} />
                        <span className="ml-4 text-sm font-medium">Log Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
}