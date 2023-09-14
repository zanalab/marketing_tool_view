import React, { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import RealtimeChart from "../charts/RealtimeChart";
import FollowerGrowthChart from "../charts/LineChart";
import EngagementChart from "../charts/EngagementChart";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hashtags = data?.Hashtags;
  const follower = data?.Follower;
  useEffect(() => {
    // Fetch data when the component is mounted
    fetch(
      "https://api.allorigins.win/raw?url=https://boutlastnight.somebot.de/data"
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* <DashboardCard04 /> */}
              <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <EngagementChart width={595} height={248} />
              </div>
              

              <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <FollowerGrowthChart width={595} height={248} />
              </div>
              {loading ? (
                <div className="min-w-full flex justify-center">
                  <BarLoader color="#1e293b" />
                </div>
              ) : (
                <DashboardCard07 hashtags={hashtags} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
