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

export default function CheckUser() {

    const [users, setUsers] = useState<UserData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [inputUserId, setInputUserId] = useState("0xe10E469d765F51e1a46488f08403dCB87f4292be");
    const [matchingUser, setMatchingUser] = useState<UserData | null>(null);

    // const [users, setUsers] = useState<UserData[] | null>(null);
    // const [loading, setLoading] = useState(true);
    // const [inputUserId, setInputUserId] = useState("");
    // const [matchingUser, setMatchingUser] = useState<UserData | null>(null);

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

    useEffect(() => {
        if (users && inputUserId.trim()) {
            const foundUser = users.find(user => user.userId === inputUserId.trim());
            setMatchingUser(foundUser || null);
        } else {
            setMatchingUser(null);
        }
    }, [inputUserId, users]);

    const handleUserClick = (userId: string) => {
        setInputUserId(userId);
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!users) {
        return <div className="p-6 text-red-600">Failed to load data.</div>;
    }

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
                
                <h1 className="text-center text-[18px] font-bold">ตรวจสอบข้อมูลผู้ใช้</h1>
                <h2 className="text-center text-[17px]">ใส่เลขกระเป๋า</h2>
                <input
                    type="text"
                    placeholder="ใส่เลขกระเป๋าของผู้ที่ต้องการตรวจสอบข้อมูล"
                    value={inputUserId}
                    onChange={(e) => setInputUserId(e.target.value)}
                    className="border border-gray-400 p-2 rounded mt-4 w-full bg-gray-800 text-white"
                />
                <h2 className="text-center text-[18px] font-semibold mt-4">ข้อมูลผู้ใช้</h2>
                
                {matchingUser ? (
                    <table className="table-auto border-collapse border border-gray-500 mt-4 w-full">
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">เลขกระเป๋า</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <button 
                                        className="text-yellow-500 hover:text-red-500 active:text-blue-500"
                                        onClick={() => handleUserClick(matchingUser.userId)}>
                                        {matchingUser.userId}
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">อีเมล</td>
                                <td className="border border-gray-400 px-4 py-2">{matchingUser.email || "N/A"}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">ชื่อ</td>
                                <td className="border border-gray-400 px-4 py-2">{matchingUser.name || "N/A"}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">Token ID</td>
                                <td className="border border-gray-400 px-4 py-2">{matchingUser.tokenId || "N/A"}</td>
                            </tr>
                        </tbody>
                        <p><br /></p>
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">ผู้แนะนำ</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <button 
                                        className="text-yellow-500 hover:text-red-500 active:text-blue-500" 
                                        onClick={() => handleUserClick(matchingUser.referrerId)}>
                                        {matchingUser.referrerId}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-4 text-lg font-semibold text-red-600">ไม่พบข้อมูลผู้ใช้</p>
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
            </Link>
            <h1 className="text-1xl md:text-4xl font-semibold md:font-bold tracking-tighter">
                Admin (Check User Data)
            </h1>
        </header>
    );
}
