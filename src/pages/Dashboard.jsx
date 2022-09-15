import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full p-32 flex  justify-evenly">
      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-title">Currently Due</div>
          <div className="stat-value">24</div>
          <div className="stat-desc">Month of September</div>
        </div>

        <div className="stat">
          <div className="stat-title">Past Due</div>
          <div className="stat-value">234</div>
          <div className="stat-desc">From 2016-2022</div>
        </div>

        <div className="stat">
          <div className="stat-title">UCR Registration</div>
          <div className="stat-value">4234</div>
          <div className="stat-desc">Month of September</div>
        </div>
      </div>
      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-title">Active Agents</div>
          <div className="stat-value">2</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Sales</div>
          <div className="stat-value">234</div>
          <div className="stat-desc">Week of September 12</div>
        </div>

        <div className="stat">
          <div className="stat-title">Queue</div>
          <div className="stat-value">3</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
