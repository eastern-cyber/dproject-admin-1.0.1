"use client";

import { useActiveAccount } from "thirdweb/react";import { inAppWallet } from "thirdweb/wallets";
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

    // const matchingUsers = users.filter((user) => user.referrerId === referrerId);
    const matchingUsers = referrerId.trim()
    ? users
        .filter((user) => user.referrerId === referrerId && user.userId.trim() !== "")
        .map((user, index) => ({ ...user, recordNumber: index + 1 }))
    : [];

    // const matchingUsers = referrerId.trim()
    // ? users.filter((user) => user.referrerId === referrerId && user.userId.trim() !== "")
    // : [];

    // const matchingUsers = users.filter((user) => user.referrerId === referrerId && user.userId.trim() !== "");

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
                                            {user.userId.slice(0, 6)}...{user.userId.slice(-4)}
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2">{user.userId}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.name || "N/A"}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.email || "N/A"}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.tokenId || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="mt-4 text-lg font-semibold">
                            รวม : {matchingUsers.length} ท่าน
                        </p>
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
                {/* <Image
                    src={dprojectIcon}
                    alt=""
                    className="mb-4 size-[100px]"
                    style={{ filter: "drop-shadow(0px 0px 24px #a726a9a8" }}
                /> */}
            </Link>
            <h1 className="text-1xl md:text-4xl font-semibold md:font-bold tracking-tighter">
                Admin (Check Referee)
            </h1>
        </header>
    );
}

const WalletBalances: React.FC<{ walletAddress?: string }> = ({ walletAddress }) => {
    return (
        <div className="flex flex-col items-center p-6">
            <p className="text-[19px]"><b>เลขที่กระเป๋าของท่าน</b></p>
            <div className="border border-gray-400 bg-gray-800 p-2 mt-2 rounded">
                <p className="text-[18px] break-all">{walletAddress || "ยังไม่ได้เชื่อมกระเป๋า !"}</p>
            </div>
        </div>
    );
};

// "use client";


// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// interface RefereeData {
//   refereeId: string;
//   referrerId: string;
// }

// export default function RefereeData() {
//   const params = useParams(); // Get dynamic route params
//   const refereeId = params.refereeId as string; // Ensure it's a string

//   const [referrerIds, setReferrerIds] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   const jsonUrl = "https://raw.githubusercontent.com/eastern-cyber/dproject-11/main/public/dproject-users.json";

//   useEffect(() => {
//     fetch(jsonUrl)
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//         return res.json();
//       })
//       .then((jsonData: RefereeData[]) => {
//         setLoading(false);

//         // Find all referrerIds corresponding to the given refereeId from the URL
//         const matchedReferees = jsonData
//           .filter(item => item.refereeId === refereeId)
//           .map(item => item.referrerId)
//           .sort(); // Sort alphabetically

//         setReferrerIds(matchedReferees);
//       })
//       .catch((err) => {
//         console.error("Error loading JSON:", err);
//         setLoading(false);
//       });
//   }, [refereeId]);

//   if (loading) return <div className="p-6">Loading...</div>;
  
//   return (
//     <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
//       <div className="flex flex-col items-center justify-center p-10 m-5 border border-gray-800 rounded-lg">
//         <h1 className="p-4 text-2xl font-semibold tracking-tighter">รายละเอียดสมาชิก</h1>
//         <p className="text-[20px] m-2 text-center font-bold">ข้อมูลสมาชิกเลขที่ {refereeId}</p>
        
//         {referrerIds.length > 0 ? (
//           <div className="mt-4 text-center">
//             <p className="text-lg text-gray-300"><b>Referrer IDs:</b></p>
//             <ul className="text-gray-300 mt-2">
//               {referrerIds.map((id, index) => (
//                 <li key={index}>{id}</li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           <p className="text-gray-400 text-sm mt-2">ไม่มีข้อมูลสำหรับ Referee ID: {refereeId}</p>
//         )}
//       </div>
//     </main>
//   );
// }