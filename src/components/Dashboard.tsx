import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  Bell, 
  Settings, 
  Sun, 
  Moon, 
  Star,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  Heart,
  Droplets
} from 'lucide-react';
import SpeedometerScore from './SpeedometerScore';
import BodyOverview from './BodyOverview';
import FamilyHealthVault from './FamilyHealthVault';
import PatientProfile from './PatientProfile';
import ScrollableChart from './ScrollableChart';
import CircularProgress from './CircularProgress';
import GlucoseTrendChart from './charts/GlucoseTrendChart';
import HeartRateChart from './charts/HeartRateChart';
import BloodPressureChart from './charts/BloodPressureChart';
import FinancialProjectionChart from './charts/FinancialProjectionChart';

const Dashboard: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const [currentPeriod, setCurrentPeriod] = useState("This Week");

  const periods = ["Last Week", "This Week", "Next Week"];
  
  const charts = [
    { 
      component: GlucoseTrendChart, 
      title: "Glucose Levels",
      icon: Droplets
    },
    { 
      component: HeartRateChart, 
      title: "Heart Rate",
      icon: Heart
    },
    { 
      component: BloodPressureChart, 
      title: "Blood Pressure",
      icon: Activity
    }
  ];

  const handleMemberSelect = (member: any) => {
    setSelectedMember(member);
  };

  const handleChartNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentChartIndex((prev) => (prev - 1 + charts.length) % charts.length);
    } else {
      setCurrentChartIndex((prev) => (prev + 1) % charts.length);
    }
  };

  const handlePeriodNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = periods.indexOf(currentPeriod);
    if (direction === 'prev') {
      const newIndex = (currentIndex - 1 + periods.length) % periods.length;
      setCurrentPeriod(periods[newIndex]);
    } else {
      const newIndex = (currentIndex + 1) % periods.length;
      setCurrentPeriod(periods[newIndex]);
    }
  };

  const CurrentChart = charts[currentChartIndex].component;
  const currentChartIcon = charts[currentChartIndex].icon;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'
    }`}>
      {/* Header */}
      <header className={`${isDarkTheme ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button className={`p-2 ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition-colors`}>
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Longevity Dashboard</h1>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`p-2 ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              >
                {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className={`p-2 ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition-colors`}>
                <Bell className="w-5 h-5" />
              </button>
              <button className={`p-2 ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition-colors`}>
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Longevity Score */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${isDarkTheme ? 'bg-gray-900/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}
            >
              <SpeedometerScore score={87} isDarkTheme={isDarkTheme} />
            </motion.div>
          </div>

          {/* Middle Column - Body Overview */}
          <div className="lg:col-span-6">
            <BodyOverview />
          </div>

          {/* Right Column - Patient Profile */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <PatientProfile 
                name={selectedMember?.name || "John Doe"} 
                age={selectedMember?.age || 36} 
                isDarkTheme={isDarkTheme}
              />
            </motion.div>
          </div>
        </div>

        {/* Second Row - Family Health Vault */}
        <div className="mt-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`${isDarkTheme ? 'bg-gray-900/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}
          >
            <FamilyHealthVault onMemberSelect={handleMemberSelect} isDarkTheme={isDarkTheme} />
          </motion.div>
        </div>

        {/* Third Row - Financial Projection and First Ever Outcome */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Financial Projection */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`${isDarkTheme ? 'bg-gray-900/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Financial Projection</h3>
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <FinancialProjectionChart />
          </motion.div>

          {/* First Ever Outcome */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className={`${isDarkTheme ? 'bg-gray-900/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Health Progress</h3>
              <div className="text-2xl font-bold text-green-400">$19,800</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Preventive Care Savings</span>
                <span className="text-green-400 font-semibold">+$15,200</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Health Score Improvement</span>
                <span className="text-blue-400 font-semibold">+23%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Risk Reduction</span>
                <span className="text-purple-400 font-semibold">-45%</span>
              </div>
              <CircularProgress value={78} size={120} />
            </div>
          </motion.div>
        </div>

        {/* Fourth Row - Health Charts with Navigation */}
        <div className="mt-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={`${isDarkTheme ? 'bg-gray-900/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <currentChartIcon className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">{charts[currentChartIndex].title}</h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePeriodNavigation('prev')}
                    className={`p-2 ${isDarkTheme ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className={`px-3 py-1 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg text-sm font-medium`}>
                    {currentPeriod}
                  </span>
                  <button
                    onClick={() => handlePeriodNavigation('next')}
                    className={`p-2 ${isDarkTheme ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleChartNavigation('prev')}
                    className={`p-2 ${isDarkTheme ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className={`px-3 py-1 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg text-sm font-medium`}>
                    {currentChartIndex + 1} / {charts.length}
                  </span>
                  <button
                    onClick={() => handleChartNavigation('next')}
                    className={`p-2 ${isDarkTheme ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChartIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentChart 
                  dataIndex={periods.indexOf(currentPeriod)} 
                  isDarkTheme={isDarkTheme} 
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;