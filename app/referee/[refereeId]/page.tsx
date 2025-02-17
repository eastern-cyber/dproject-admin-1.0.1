"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface RefereeData {
  refereeId: string;
  referrerId: string;
}

export default function RefereeData() {
  const params = useParams(); // Get dynamic route params
  const refereeId = params.refereeId as string; // Ensure it's a string

  const [referrerIds, setReferrerIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const jsonUrl = "https://raw.githubusercontent.com/eastern-cyber/dproject-11/main/public/referees.json";

  useEffect(() => {
    fetch(jsonUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((jsonData: RefereeData[]) => {
        setLoading(false);

        // Find all referrerIds corresponding to the given refereeId from the URL
        const matchedReferees = jsonData
          .filter(item => item.refereeId === refereeId)
          .map(item => item.referrerId)
          .sort(); // Sort alphabetically

        setReferrerIds(matchedReferees);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setLoading(false);
      });
  }, [refereeId]);

  if (loading) return <div className="p-6">Loading...</div>;
  
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
      <div className="flex flex-col items-center justify-center p-10 m-5 border border-gray-800 rounded-lg">
        <h1 className="p-4 text-2xl font-semibold tracking-tighter">รายละเอียดสมาชิก</h1>
        <p className="text-[20px] m-2 text-center font-bold">ข้อมูลสมาชิกเลขที่ {refereeId}</p>
        
        {referrerIds.length > 0 ? (
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-300"><b>Referrer IDs:</b></p>
            <ul className="text-gray-300 mt-2">
              {referrerIds.map((id, index) => (
                <li key={index}>{id}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-400 text-sm mt-2">ไม่มีข้อมูลสำหรับ Referee ID: {refereeId}</p>
        )}
      </div>
    </main>
  );
}