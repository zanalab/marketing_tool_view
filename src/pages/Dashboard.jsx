import React, { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hashtags = data?.Hashtags;

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
              <DashboardCard04 />
              <DashboardCard05 />
              {loading ? (
                <div className="min-w-full flex justify-center"><BarLoader color="#1e293b" /></div>
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
