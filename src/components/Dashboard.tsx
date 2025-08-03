import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Moon, 
  Sun, 
  TrendingUp, 
  Activity, 
  Heart, 
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import SpeedometerScore from './SpeedometerScore';
import BodyOverview from './BodyOverview';
import FamilyHealthVault from './FamilyHealthVault';
import PatientProfile from './PatientProfile';
import ScrollableChart from './ScrollableChart';
import GlucoseTrendChart from './charts/GlucoseTrendChart';
import HeartRateChart from './charts/HeartRateChart';
import BloodPressureChart from './charts/BloodPressureChart';
import FinancialProjectionChart from './charts/FinancialProjectionChart';

const Dashboard: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [selectedMember, setSelectedMember] = useState({
    id: 'user',
    name: 'You',
    age: 36,
    biomarkers: {
      glucose: 85,
      cholesterol: 180,
      bp: 120,
      vitaminD: 32,
      hba1c: 5.2,
      crp: 1.8
    }
  });
  const [chartDataIndex, setChartDataIndex] = useState(1);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);

  const charts = [
    { component: GlucoseTrendChart, title: "Glucose Levels" },
    { component: HeartRateChart, title: "Heart Rate" },
    { component: BloodPressureChart, title: "Blood Pressure" }
  ];

  const handleChartNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentChartIndex((prev) => (prev - 1 + charts.length) % charts.length);
    } else {
      setCurrentChartIndex((prev) => (prev + 1) % charts.length);
    }
  };

  const handleTimeNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setChartDataIndex((prev) => Math.max(0, prev - 1));
    } else {
      setChartDataIndex((prev) => Math.min(2, prev + 1));
    }
  };

  const timePeriods = ['Last Week', 'This Week', 'Next Week'];
  const currentPeriod = timePeriods[chartDataIndex];

  const CurrentChart = charts[currentChartIndex].component;

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <h1 className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          Health Dashboard
        </h1>
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className={`p-3 rounded-full transition-all ${
            isDarkTheme 
              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
              : 'bg-white hover:bg-gray-100 text-gray-600 shadow-md'
          }`}
        >
          {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="px-6 pb-6">
        {/* Top Row - Patient Profile and Longevity Score */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PatientProfile 
            name={selectedMember.name} 
            age={selectedMember.age} 
            isDarkTheme={isDarkTheme} 
          />
          <div className={`${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} rounded-xl p-6 border flex items-center justify-center`}>
            <SpeedometerScore score={85} isDarkTheme={isDarkTheme} />
          </div>
        </div>

        {/* Second Row - Body Overview and Family Health Vault */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className={`${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} rounded-xl p-6 border`}>
            <BodyOverview />
          </div>
          <div className={`${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} rounded-xl p-6 border`}>
            <FamilyHealthVault 
              onMemberSelect={setSelectedMember} 
              isDarkTheme={isDarkTheme} 
            />
          </div>
        </div>

        {/* Third Row - Financial Projection and First Ever Outcome */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className={`${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} rounded-xl p-6 border`}>
            <h3 className={`text-xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Financial Projection</h3>
            <FinancialProjectionChart />
          </div>
          <div className={`${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} rounded-xl p-6 border flex items-center justify-center`}>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'}`}>
                $12,500
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                First Ever Outcome
              </h3>
              <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                Projected savings from preventive care
              </p>
            </div>
          </div>
        </div>

        {/* Fourth Row - Health Charts with Navigation */}
        <div className="mb-6">
          <div className={`${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} rounded-xl p-6 border`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                Health Metrics
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleChartNavigation('prev')}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkTheme 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    {charts[currentChartIndex].title}
                  </span>
                  <button
                    onClick={() => handleChartNavigation('next')}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkTheme 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTimeNavigation('prev')}
                    disabled={chartDataIndex === 0}
                    className={`p-2 rounded-lg transition-colors ${
                      chartDataIndex === 0 
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDarkTheme 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    {currentPeriod}
                  </span>
                  <button
                    onClick={() => handleTimeNavigation('next')}
                    disabled={chartDataIndex === 2}
                    className={`p-2 rounded-lg transition-colors ${
                      chartDataIndex === 2 
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDarkTheme 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="h-80">
              <CurrentChart dataIndex={chartDataIndex} isDarkTheme={isDarkTheme} />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} rounded-xl p-4 border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Steps</p>
                <p className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>8,547</p>
              </div>
              <Activity className={`w-8 h-8 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} rounded-xl p-4 border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Heart Rate</p>
                <p className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>72 BPM</p>
              </div>
              <Heart className={`w-8 h-8 ${isDarkTheme ? 'text-red-400' : 'text-red-600'}`} />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} rounded-xl p-4 border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Sleep</p>
                <p className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>7.5h</p>
              </div>
              <Moon className={`w-8 h-8 ${isDarkTheme ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} rounded-xl p-4 border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Energy</p>
                <p className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>85%</p>
              </div>
              <Zap className={`w-8 h-8 ${isDarkTheme ? 'text-yellow-400' : 'text-yellow-600'}`} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;