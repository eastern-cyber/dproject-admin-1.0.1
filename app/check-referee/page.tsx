"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface UserData {
    userId: string;
    referrerId: string;
    name?: string;
    email?: string;
    tokenId?: string;
}

export default function RefereePage() {
    const [users, setUsers] = useState<UserData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [referrerId, setReferrerId] = useState("");

    const usersUrl = "/dproject-users.json";

    useEffect(() => {
        fetch(usersUrl)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
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

    if (!users) {
        return <div className="p-6 text-red-600">Failed to load data.</div>;
    }

    const matchingUsers = referrerId.trim()
        ? users
              .filter((user) => user.referrerId === referrerId && user.userId.trim() !== "")
              .map((user, index) => ({ ...user, recordNumber: index + 1 }))
        : [];

    return (
        <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                margin: "20px",
                border: "1px solid #333",
                borderRadius: "8px",
            }}>
                <Header />
                
                <h1 className="text-center text-[18px] font-bold">ตรวจสอบรายชื่อผู้ที่ท่านแนะนำ</h1>
                <h2 className="text-center text-[17px]">ใส่เลขกระเป๋าของท่าน</h2>
                <input
                    type="text"
                    placeholder="ใส่เลขกระเป๋าของผู้ที่ต้องการตรวจสอบสายงาน"
                    value={referrerId}
                    onChange={(e) => setReferrerId(e.target.value)}
                    className="border border-gray-400 p-2 rounded mt-4 w-full bg-gray-800 text-white"
                />
                <h2 className="text-center text-[18px] font-semibold mt-4">Matching Referees (รายการผู้ที่ท่านแนะนำ)</h2>
                
                {matchingUsers.length > 0 && (
                    <>
                        <table className="table-auto border-collapse border border-gray-500 mt-4 w-full">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2">#</th>
                                    <th className="border border-gray-400 px-4 py-2">เลขกระเป๋า (ย่อ) </th>
                                    <th className="border border-gray-400 px-4 py-2">เลขกระเป๋า (เต็ม)</th>
                                    <th className="border border-gray-400 px-4 py-2">ชื่อ</th>
                                    <th className="border border-gray-400 px-4 py-2">อีเมล</th>
                                    <th className="border border-gray-400 px-4 py-2">Token ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchingUsers.map((user) => (
                                    <tr key={user.userId}>
                                        <td className="border border-gray-400 px-4 py-2">{user.recordNumber}</td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setReferrerId(user.userId);
                                                }}
                                                className="text-blue-500 underline hover:text-blue-700"
                                            >
                                                {user.userId.slice(0, 6)}...{user.userId.slice(-4)}
                                            </a>
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setReferrerId(user.userId);
                                                }}
                                                className="text-blue-500 underline hover:text-blue-700"
                                            >
                                                {user.userId}
                                            </a>
                                        </td>    
                                        <td className="border border-gray-400 px-4 py-2">{user.name || "N/A"}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.email || "N/A"}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.tokenId || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="mt-4 text-lg font-semibold">รวม : {matchingUsers.length} ท่าน</p>
                    </>
                )}
                <div className="flex flex-col mt-8 justify-center items-center w-full">
                    <Link className="border border-zinc-500 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors hover:border-zinc-800" href="/">
                        <p className="text-center text-[19px]">กลับหน้าแรก</p>
                    </Link>
                </div>
            </div>
        </main>
    );
}

function Header() {
    return (
        <header className="flex flex-col items-center mb-12">
            <Link href="/" passHref>
                {/* Placeholder for image if needed */}
            </Link>
            <h1 className="text-1xl md:text-4xl font-semibold md:font-bold tracking-tighter">
                Admin (Check Referee)
            </h1>
        </header>
    );
}