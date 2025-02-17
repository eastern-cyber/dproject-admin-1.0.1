"use client";

import { useEffect, useState } from "react";

interface RefereeData {
  refereeId: string;
  referrerId: string;
}

export default function RefereePage() {
  const [data, setData] = useState<RefereeData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const jsonUrl = "https://raw.githubusercontent.com/eastern-cyber/dproject-11/main/public/referees.json"; // ✅ Correct URL

  useEffect(() => {
    fetch(jsonUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((jsonData: RefereeData[]) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!data) {
    return <div className="p-6 text-red-600">Failed to load data.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Referee Data</h1>
      <table className="table-auto border-collapse border border-gray-500 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Referee ID</th>
            <th className="border border-gray-400 px-4 py-2">Referrer ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.refereeId}>
              <td className="border border-gray-400 px-4 py-2">{item.refereeId}</td>
              <td className="border border-gray-400 px-4 py-2">{item.referrerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
