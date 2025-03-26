import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const POLYGONSCAN_API_KEY = process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY;
const WALLET_ADDRESS = "0x4B7db47A586d5b7D3d8e9aFC6E78CDD35a909040";
const FILE_PATH = path.join(process.cwd(), "public", "transactions.json");

const fetchTransactions = async (fromDate: number, toDate: number) => {
  const url = `https://api.polygonscan.com/api?module=account&action=txlist&address=${WALLET_ADDRESS}&starttimestamp=${fromDate}&endtimestamp=${toDate}&sort=asc&apikey=${POLYGONSCAN_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== "1") {
      throw new Error(data.message);
    }
    
    return data.result;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const fromDate = Math.floor(new Date("2025-01-01").getTime() / 1000);
    const toDate = Math.floor(new Date("2025-03-01").getTime() / 1000);
    
    const transactions = await fetchTransactions(fromDate, toDate);

    // Convert transactions to JSON format
    const jsonData = JSON.stringify(transactions, null, 2);

    // Save JSON to a file in the "public" folder
    fs.writeFileSync(FILE_PATH, jsonData);

    console.log("Transactions saved to transactions.json");

    res.status(200).json({ message: "Transactions saved successfully!", data: transactions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch and store transactions" });
  }
}
