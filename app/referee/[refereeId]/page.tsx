"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface RefereeData {
  refereeId: string;
  referrerId: string;
}

export default function RefereeData({ params }: { params: { refereeId: string } }) {
  const [refereeData, setRefereeData] = useState<{ email?: string; name?: string; tokenId?: string } | null>(null);
    const router = useRouter();

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
    <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
            <div className="flex flex-col items-center justify-center p-10 m-5 border border-gray-800 rounded-lg">
                {/* <Image
                    src={dprojectIcon}
                    alt=""
                    className="mb-4 size-[100px] md:size-[100px]"
                    style={{
                        filter: "drop-shadow(0px 0px 24px #a726a9a8",
                    }}
                /> */}
                <h1 className="p-4 md:text-2xl text-2xl font-semibold md:font-bold tracking-tighter">
                    สมัครใช้งาน
                </h1>
                <div className="flex flex-col items-center justify-center p-2 m-2">
                <p className="flex flex-col items-center justify-center text-[20px] m-2 text-center">
                        <b>ขณะนี้ ท่านกำลังดำเนินการสมัครสมาชิก ภายใต้การแนะนำของ</b>
                    </p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #666",
                            background: "#222",
                            padding: "10px",
                            margin: "6px",
                            borderRadius: "8px",
                        }}
                    >
                        <p style={{ fontSize: "18px" }}>
                            {params.refereeId ? `${params.refereeId.slice(0, 6)}...${params.refereeId.slice(-4)}` : "ไม่พบกระเป๋า"}
                        </p>
                    </div>
                    {refereeData ? (
                        <div className="mt-4 text-center gap-6">
                            <p className="text-lg text-gray-300 break-all">
                                <b>อีเมล:</b> {refereeData.email}
                            </p>
                            <p className="text-lg text-gray-300 mt-1">
                                <b>ชื่อ:</b> {refereeData.name}
                            </p>
                            <p className="text-lg text-red-600 mt-1">
                                <b>Token ID: {refereeData.tokenId} </b>
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm mt-2">ไม่พบข้อมูลผู้แนะนำ</p>
                    )}
                </div>
                {/* <div className="flex flex-col items-center mb-6">
                    <button onClick={navigateToMintingPage} className="flex flex-col mt-1 border border-zinc-100 px-4 py-3 rounded-lg bg-red-700 hover:bg-zinc-800 transition-colors hover:border-zinc-400">
                        ดำเนินการต่อ
                    </button>
                </div> */}
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
            </div>
        </main>
  );
}
