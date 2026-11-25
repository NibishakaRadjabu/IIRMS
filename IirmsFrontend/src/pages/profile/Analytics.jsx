// Analytics.js
import { useEffect, useState } from "react";
import api from "../../utils/axios"; // Axios instance with JWT interceptor
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Analytics() {
  const [stats, setStats] = useState({
    submissionsByDept: {},
    paymentsTrend: [],
    userRoles: {}
  });

  useEffect(() => {
    // Fetch analytics data
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/analytics");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      {/* Submissions per Department */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Submissions by Department</h2>
        <Bar
          data={{
            labels: Object.keys(stats.submissionsByDept),
            datasets: [
              {
                label: "Submissions",
                data: Object.values(stats.submissionsByDept),
                backgroundColor: "rgba(75, 192, 192, 0.6)"
              }
            ]
          }}
        />
      </div>

      {/* Payments Trend */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Payments Trend</h2>
        <Line
          data={{
            labels: stats.paymentsTrend.map((p) => p.date),
            datasets: [
              {
                label: "Payments ($)",
                data: stats.paymentsTrend.map((p) => p.amount),
                borderColor: "rgba(153, 102, 255, 0.8)",
                fill: false
              }
            ]
          }}
        />
      </div>

      {/* User Roles Distribution */}
      <div>
        <h2 className="text-xl font-semibold mb-2">User Roles Distribution</h2>
        <Pie
          data={{
            labels: Object.keys(stats.userRoles),
            datasets: [
              {
                data: Object.values(stats.userRoles),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)"
                ]
              }
            ]
          }}
        />
      </div>
    </div>
  );
}

export default Analytics;
