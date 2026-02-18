import React from 'react';
import { useAuthStore } from '../authStore'; // Adjust path
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Clock
} from 'lucide-react';

/**
 * --- Helper Component: Stat Card ---
 */
const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
    <div className="flex items-center mt-4">
      <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        {change}
      </span>
      <span className="text-sm text-gray-400 ml-2">vs last month</span>
    </div>
  </div>
);

/**
 * --- Main Dashboard Component ---
 */
const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const userName = user?.full_name?.split(' ')[0] || 'User';

  // Dummy Data for the "Chart"
  const chartData = [40, 70, 45, 90, 65, 85, 100, 75, 50, 80, 60, 95];

  return (
    <div className="space-y-6">
      
      {/* --- 1. Header Section --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {userName} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                Last updated: Just now
            </span>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
                + New Report
            </button>
        </div>
      </div>

      {/* --- 2. Statistics Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$54,230" 
          change="12.5%" 
          isPositive={true} 
          icon={DollarSign} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Active Users" 
          value="2,453" 
          change="8.2%" 
          isPositive={true} 
          icon={Users} 
          color="bg-purple-500"
        />
        <StatCard 
          title="Bounce Rate" 
          value="42.3%" 
          change="2.1%" 
          isPositive={false} 
          icon={Activity} 
          color="bg-orange-500"
        />
        <StatCard 
          title="New Sales" 
          value="+574" 
          change="22.4%" 
          isPositive={true} 
          icon={TrendingUp} 
          color="bg-green-500"
        />
      </div>

      {/* --- 3. Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Analytics Chart (Simulated with CSS) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Performance Overview</h3>
            <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
                <MoreHorizontal size={20} />
            </button>
          </div>
          
          {/* Visual Chart Bars */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4">
             {chartData.map((height, index) => (
                 <div key={index} className="w-full relative group">
                     {/* Tooltip */}
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                         {height}%
                     </div>
                     {/* Bar */}
                     <div 
                        style={{ height: `${height}%` }} 
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                            index === chartData.length - 1 
                            ? 'bg-blue-600' // Highlight last bar
                            : 'bg-blue-100 hover:bg-blue-200'
                        }`}
                     ></div>
                 </div>
             ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium uppercase tracking-wide">
             <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
             <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
             <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Right Col: Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            
            {[1, 2, 3, 4, 5].map((item, index) => (
                <div key={index} className="flex gap-4">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold border border-gray-200">
                            U{item}
                        </div>
                        {index === 0 && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                    </div>
                    <div>
                        <p className="text-sm text-gray-800 font-medium">
                            <span className="font-bold">User {item}</span> completed a task in <span className="text-blue-600">Project Alpha</span>.
                        </p>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                            <Clock size={12} className="mr-1" />
                            {index * 15 + 2} minutes ago
                        </div>
                    </div>
                </div>
            ))}

            <div className="pt-4 border-t border-gray-50 mt-auto">
                <button className="w-full py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                    View All Activity
                </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;