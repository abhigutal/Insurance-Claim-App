import React from "react";
import DashboardLayout from "../Layout/DashboardLayout";

import DashboardHeader from "../../components/customer/DashboardHeader/DashboardHeader";
import WelcomeBanner from "../../components/customer/WelcomeBanner/WelcomeBanner";
import StatCard from "../../components/customer/StatCard/StatCard";
import RecentClaims from "../../components/customer/RecentClaims/RecentClaims";
import ClaimProgress from "../../components/customer/ClaimProgress/ClaimProgress";
//import QuickActions from "../../components/customer/QuickActions/QuickActions";

import { dashboardStats } from "../../components/customer/dashboardData";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="customer-dashboard">

        <DashboardHeader />

        <WelcomeBanner />

        <section className="stats-grid">
          {dashboardStats.map((item) => (
            <StatCard key={item.title} data={item} />
          ))}
        </section>

        <div className="dashboard-grid">

          <div className="dashboard-left">

            <RecentClaims />

          </div>

          <div className="dashboard-right">

            <ClaimProgress />

            {/* <QuickActions /> */}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;