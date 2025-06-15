import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import AssessmentPage from './pages/AssessmentPage';
import MyPlanPage from './pages/MyPlanPage';
import MindfulnessPage from './pages/MindfulnessPage';
import SoundsPage from './pages/SoundsPage';
import LogSleepPage from './pages/LogSleepPage';
import InsightsPage from './pages/InsightsPage';
import LearnPage from './pages/LearnPage';
import SettingsPage from './pages/SettingsPage';
import { UserContextProvider } from './contexts/UserContext';

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/my-plan" element={<MyPlanPage />} />
          <Route path="/mindfulness" element={<MindfulnessPage />} />
          <Route path="/sounds" element={<SoundsPage />} />
          <Route path="/log-sleep" element={<LogSleepPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </UserContextProvider>
  );
};

export default App;