import { ethers } from "ethers";
import fs from "fs";

const POLYGON_RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL!;
const NFT_CONTRACT_ADDRESS = "0x2a61627c3457ccea35482cadec698c7360ffb9f2";

// ERC-1155 TransferSingle and TransferBatch event signatures
const TRANSFER_SINGLE_TOPIC = ethers.id("TransferSingle(address,address,address,uint256,uint256)");
const TRANSFER_BATCH_TOPIC = ethers.id("TransferBatch(address,address,address,uint256[],uint256[])");

export const fetchClaims = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(POLYGON_RPC_URL);

    // Fetch logs for TransferSingle
    const logs = await provider.getLogs({
      address: NFT_CONTRACT_ADDRESS,
      topics: [TRANSFER_SINGLE_TOPIC], // Filter for TransferSingle events
      fromBlock: 0, // Adjust for performance
      toBlock: "latest",
    });

    const claims = await Promise.all(
      logs.map(async (log) => {
        const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
          ["address", "address", "address", "uint256", "uint256"],
          log.data
        );

        const to = decoded[2]; // Receiver address
        const tokenId = decoded[3]; // NFT ID

        // Get the block timestamp
        const block = await provider.getBlock(log.blockNumber);
        const timestamp = block.timestamp;

        return {
          userId: to,
          planA: timestamp, // Unix timestamp of claim event
          tokenId: tokenId.toString(),
        };
      })
    );

    // Convert to JSON
    const jsonData = JSON.stringify(claims, null, 2);

    // Save as JSON file
    fs.writeFileSync("claims.json", jsonData);

    console.log("Claims data saved to claims.json");

    return claims;
  } catch (error) {
    console.error("Error fetching claims:", error);
    throw error;
  }
};
