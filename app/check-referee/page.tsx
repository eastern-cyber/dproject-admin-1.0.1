"use client";

import Image from "next/image";
import { useActiveAccount } from "thirdweb/react";
import dprojectIcon from "@/public/DProjectLogo_650x600.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import WalletConnect from "@/components/WalletConnect";

interface UserData {
    userId: string;
    referrerId: string;
    name?: string;
    email?: string;
    tokenId?: string;
    userCreated?: string;
    planA?: string;
    planB?: string;
}

export default function RefereePage() {
    const account = useActiveAccount();
    const [users, setUsers] = useState<UserData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [referrerId, setReferrerId] = useState("");

    const usersUrl = "https://raw.githubusercontent.com/eastern-cyber/dproject-admin-1.0.1/main/public/dproject-users.json";

    useEffect(() => {
        if (account?.address) {
            setReferrerId(account.address);
        }
    }, [account?.address]);

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

    if (loading) return <div className="p-6">Loading...</div>;
    if (!users) return <div className="p-6 text-red-600">Failed to load data.</div>;

    const matchingUsers = users.filter(
        (user) => user.referrerId === referrerId && user.userId.trim() !== ""
    ).map((user, index) => ({ ...user, recordNumber: index + 1 }));

    const matchingUser = users.find(user => user.userId === referrerId);

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
    
        // Manually parse "07/03/2025, 13:39:10" (DD/MM/YYYY, HH:mm:ss)
        const match = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}):(\d{2})$/);
        if (!match) return "Invalid Date";
    
        const [, day, month, year, hour, minute, second] = match.map(Number);
        
        const date = new Date(year, month - 1, day, hour, minute, second); // Month is 0-based in JS
    
        return date.toLocaleDateString("th-TH", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // Ensures 24-hour format
        });
    };

    return (
        <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "5px",
                margin: "20px",
                // border: "1px solid #333",
                // borderRadius: "8px",
            }}>
                <Header />
                <h1 className="text-center text-[20px] font-bold">ตรวจสอบรายชื่อสายงาน</h1>
                <h2 className="text-center text-[16px] break-all">ใส่เลขกระเป๋าของท่าน หรือ เลขกระเป๋าของผู้ที่ต้องการจะตรวจสอบ</h2>
                <input
                    type="text"
                    placeholder="ใส่เลขกระเป๋า..."
                    value={referrerId}
                    onChange={(e) => setReferrerId(e.target.value)}
                    className="text-[18px] text-center border border-gray-400 p-2 rounded mt-4 w-full bg-gray-800 text-white break-all"
                />
                {matchingUser && (
                    <table className="table-auto border-collapse border border-gray-500 mt-4 w-full">
                        <thead>
                            <tr>
                                <th className="text-[19px] border border-gray-400 px-4 py-2">รายละเอียดผู้แนะนำ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="text-[18px] text-left font-normal border border-gray-400 px-6 py-2 break-word">
                                    {/* <div className="text-left break-all"> */}
                                    <b>เลขกระเป๋า:</b> <span className="text-red-500 break-all">{matchingUser.userId}</span><br />
                                    <b>อีเมล:</b> {matchingUser.email || "N/A"}<br />
                                    <b>ชื่อ:</b> {matchingUser.name || "N/A"}<br />
                                    <b>วันลงทะเบียนผู้ใช้:</b> {matchingUser.userCreated || "N/A"}<br />
                                    <b>วันเข้าร่วม Plan A:</b> {matchingUser.planA || "N/A"}<br />
                                    <b>วันเข้าร่วม Plan B:</b> {matchingUser.planB || "N/A"}<br />
                                    <span className="text-[19px] text-red-600">
                                        <b>Token ID: {matchingUser.tokenId || "N/A"}</b>
                                    </span><br />
                                    <b>Sponser by:</b>&nbsp;
                                    <button
                                            className="text-left font-normal text-[18px] text-yellow-500 hover:text-red-500 break-all"
                                            onClick={() => setReferrerId(matchingUser.referrerId)}
                                        >
                                            {matchingUser.referrerId}
                                        </button>
                                    {/* <b>ผู้แนะนำของผู้แนะนำ:</b> <span className="break-all">{matchingUser.referrerId}</span><br /> */}
                                    {/* </div> */}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                )}
                {matchingUsers.length > 0 && (
                    <table className="table-auto border-collapse mt-4 w-full">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">#</th>
                                <th className="text-[19px] border border-gray-400 px-4 py-2">รายละเอียดสมาชิกใต้สายงาน</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchingUsers.map((user) => (
                                <tr key={user.userId}>
                                    <th className="border border-gray-400 px-4 py-2">{user.recordNumber}</th>
                                    <th className="text-[18px] font-normal text-left border border-gray-400 px-4 py-2 break-all">
                                        <b>เลขกระเป๋า:</b>&nbsp;
                                        <button
                                            className="text-left font-normal text-[18px] text-yellow-500 hover:text-red-500 break-all"
                                            onClick={() => setReferrerId(user.userId)}
                                        >
                                            {user.userId}
                                        </button>
                                            <p className="font-normal">
                                            <b>อีเมล:</b> {user.email || "N/A"}<br />
                                            <b>ชื่อ:</b> {user.name || "N/A"}<br />
                                            {/* {user.userCreated? new Date(user.userCreated).toLocaleDateString("en-GB") // 'en-GB' is for dd/mm/yyyy format  */}
                                            <b>วันลงทะเบียนผู้ใช้:</b> {user.userCreated || "N/A"}<br />
                                            <b>วันเข้าร่วม Plan A:</b> {formatDate(user.planA) || "N/A"}<br />
                                            <b>วันเข้าร่วม Plan B:</b> {formatDate(user.planB) || "N/A"}<br />
                                            <span className="text-[19px] text-red-600"><b>Token ID: {user.tokenId || "N/A"}</b></span><br />
                                            </p>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                        <tbody>
                            <tr className="colspan-[1]">
                                <th></th>
                                <th>
                                <div className="text-center">
                                    <p className="text-center m-4 pr-10 text-lg font-semibold">
                                        <span className="text-[19px] text-center">
                                            รวมจำนวนสมาชิกแนะนำตรง : &nbsp;&nbsp;
                                            <span className="text-[24px] text-yellow-500">{matchingUsers.length}</span>
                                            &nbsp;&nbsp; ท่าน</span>
                                    </p>
                                </div>
                                </th>
                            </tr>
                            <tr className="colspan-[1]">
                                <th></th>
                                <th>
                                <div className="text-center">
                                    <p className="text-center m-4 pr-10 text-lg font-semibold">
                                        <span className="text-[19px] text-center">
                                            ส่วนแบ่งค่าแนะนำของท่าน : &nbsp;
                                            <span className="text-[24px] text-yellow-500 animate-blink">
                                                อยู่ระหว่างการคำนวณโครงสร้างรายได้ !!!
                                            </span> &nbsp; POL
                                        </span>
                                    </p>
                                </div>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                )}
                <WalletBalances walletAddress={account?.address || ""} setReferrerId={setReferrerId} />
                <Link className="border border-zinc-500 px-4 py-3 rounded-lg hover:bg-red-600" href="/member-area">
                    กลับสู่พื้นที่สมาชิก
                </Link>
            </div>
        </main>
    );
}

interface WalletBalancesProps {
    walletAddress?: string;
    setReferrerId: (id: string) => void;
}

const WalletBalances: React.FC<WalletBalancesProps>= ({ walletAddress, setReferrerId }) => (
    <div className="flex flex-col items-center p-6">
        <p className="text-[19px]"><b>เลขกระเป๋าของท่าน</b></p>
        <div className="text-[18px] border border-gray-500 bg-[#1e1d59] p-2 mt-2 rounded">
            <button
                className="text-yellow-500 hover:text-red-500 text-[18px] break-all"
                onClick={() => setReferrerId(walletAddress ?? "")}
            >
                {walletAddress || "ยังไม่ได้เชื่อมกระเป๋า !"}
            </button>
        </div>
            <p className="my-3 text-[16px]">
                คลิ๊กเลขกระเป๋าด้านบนนี้ เพื่อกลับไปเริ่มต้นที่สายงานของท่าน
            </p>
    </div>
);

function Header() {
    return (
        <header className="flex flex-col items-center mb-4">
            <Link href="/">
                <Image src={dprojectIcon} alt="" className="m-8 size-[100px]" />
            </Link>
            <h1 className="text-1xl md:text-4xl font-semibold md:font-bold mb-6">Check Referee</h1>
            <WalletConnect />
        </header>
    );
}

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// interface UserData {
//     userId: string;
//     referrerId: string;
//     name?: string;
//     email?: string;
//     tokenId?: string;
//     userCreated?: string;
//     planA?: string;
// }

// export default function RefereePage() {
//     const [users, setUsers] = useState<UserData[] | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [referrerId, setReferrerId] = useState("0xe10E469d765F51e1a46488f08403dCB87f4292be");

//     const usersUrl = "/dproject-users.json";

//     useEffect(() => {
//         fetch(usersUrl)
//             .then((res) => res.json())
//             .then((data) => {
//                 setUsers(data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Error loading JSON:", err);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <div className="p-6">Loading...</div>;
//     }

//     if (!users) {
//         return <div className="p-6 text-red-600">Failed to load data.</div>;
//     }

//     const matchingUsers = referrerId.trim()
//         ? users
//               .filter((user) => user.referrerId === referrerId && user.userId.trim() !== "")
//               .map((user, index) => ({ ...user, recordNumber: index + 1 }))
//         : [];

//     return (
//         <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
//             <div style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 padding: "20px",
//                 margin: "20px",
//                 border: "1px solid #333",
//                 borderRadius: "8px",
//             }}>
//                 <Header />
                
//                 <h1 className="text-center text-[18px] font-bold">ตรวจสอบรายชื่อผู้ที่ท่านแนะนำ</h1>
//                 <h2 className="text-center text-[17px]">ใส่เลขกระเป๋าของท่าน</h2>
//                 <input
//                     type="text"
//                     placeholder="ใส่เลขกระเป๋าของผู้ที่ต้องการตรวจสอบสายงาน"
//                     value={referrerId}
//                     onChange={(e) => setReferrerId(e.target.value)}
//                     className="border border-gray-400 p-2 rounded mt-4 w-full bg-gray-800 text-white"
//                 />
//                 <h2 className="text-center text-[18px] font-semibold mt-4">Matching Referees (รายการผู้ที่ท่านแนะนำ)</h2>
                
//                 {matchingUsers.length > 0 && (
//                     <>
//                         <table className="table-auto border-collapse border border-gray-500 mt-4 w-full">
//                             <thead>
//                                 <tr>
//                                     <th className="border border-gray-400 px-4 py-2">#</th>
//                                     <th className="border border-gray-400 px-4 py-2">รายละเอียดสมาชิก</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {matchingUsers.map((user) => (
//                                     <tr key={user.userId}>
//                                         <td className="border border-gray-400 px-4 py-2">{user.recordNumber}</td>
//                                         {/* <td className="border border-gray-400 px-4 py-2">
//                                             <Link
//                                                 href="#"
//                                                 onClick={(e) => {
//                                                     e.preventDefault();
//                                                     setReferrerId(user.userId);
//                                                 }}
//                                                 className="text-yellow-500 hover:text-red-500 active:text-blue-500"
//                                             >
//                                                 {user.userId.slice(0, 6)}...{user.userId.slice(-4)}
//                                             </Link>
//                                         </td> */}
//                                         <td className="border border-gray-400 px-4 py-2">
//                                         เลขกระเป๋า:
//                                             <Link
//                                                 href="#"
//                                                 onClick={(e) => {
//                                                     e.preventDefault();
//                                                     setReferrerId(user.userId);
//                                                 }}
//                                                 className="text-yellow-500 hover:text-red-500 active:text-blue-500"
//                                             >
//                                                 {user.userId}
//                                             </Link><br />
//                                             อีเมล: {user.email || "N/A"}<br />
//                                             ชื่อ: {user.name || "N/A"}<br />
//                                             Token ID: {user.tokenId || "N/A"}<br />
//                                             วันลงทะเบียนผู้ใช้:&nbsp;
//                                                 {user.userCreated? new Date(user.userCreated).toLocaleDateString("en-GB") // 'en-GB' is for dd/mm/yyyy format 
//                                                 : "N/A"}<br />
//                                             วันเข้าร่วม Plan A: {user.planA || "N/A"}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <p className="mt-4 text-lg font-semibold">รวม : {matchingUsers.length} ท่าน</p>
//                     </>
//                 )}
//                 <div className="flex flex-col mt-8 justify-center items-center w-full">
//                     <Link className="border border-zinc-500 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors hover:border-zinc-800" href="/">
//                         <p className="text-center text-[19px]">กลับหน้าแรก</p>
//                     </Link>
//                 </div>
//             </div>
//         </main>
//     );
// }

// function Header() {
//     return (
//         <header className="flex flex-col items-center mb-12">
//             <Link href="/" passHref>
//                 {/* Placeholder for image if needed */}
//             </Link>
//             <h1 className="text-1xl md:text-4xl font-semibold md:font-bold tracking-tighter">
//                 Admin (Check Referee)
//             </h1>
//         </header>
//     );
// }