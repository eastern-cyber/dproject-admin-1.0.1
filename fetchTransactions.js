import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const WALLET_ADDRESS = "0xYourWalletAddress";
const FILE_PATH = "./transactions.json";

const fetchTransactions = async (fromDate, toDate) => {
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

const saveTransactions = async () => {
  try {
    const fromDate = Math.floor(new Date("2025-01-01").getTime() / 1000);
    const toDate = Math.floor(new Date("2025-03-01").getTime() / 1000);

    const transactions = await fetchTransactions(fromDate, toDate);

    fs.writeFileSync(FILE_PATH, JSON.stringify(transactions, null, 2));

    console.log("✅ Transactions saved to transactions.json");
  } catch (error) {
    console.error("❌ Failed to fetch and save transactions", error);
  }
};

saveTransactions();

