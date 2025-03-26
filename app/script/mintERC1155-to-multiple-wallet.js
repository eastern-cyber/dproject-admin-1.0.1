require("dotenv").config();
console.log("Private Key:", process.env.PRIVATE_KEY ? "Loaded" : "Not Found"); // Debugging

// const { ethers } = require("ethers");
const ethers = require("ethers");

// require("dotenv").config();
console.log("Private Key:", process.env.PRIVATE_KEY); // Debugging

// const ethers = require("ethers");
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey);


// Polygon Mainnet RPC
// const provider = new ethers.providers.JsonRpcProvider(
//   `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
// );

const provider = new ethers.JsonRpcProvider(
    `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
  );
  
// Owner wallet (must hold the NFT)
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ERC-1155 Contract Address
const contractAddress = "0x60aD2f102FDb0e09ED50e2ab07573079C956aFB8";

// ERC-1155 ABI (minimal for minting)
const abi = [
  "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) external"
];

// Connect to contract
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Token ID and quantity
const tokenId = 0;
const quantity = 1;

// List of recipient addresses
const recipients = [
  "0x12E43878Ab2a41ACA0545a7dCa3536D92e16E8b7",
  "0xe10E469d765F51e1a46488f08403dCB87f4292be",
  "0x0a11986fd85AAe898Ee34757eBbA93454647C63D"
];

async function mintToMultiple() {
  try {
    for (const recipient of recipients) {
      console.log(`Transferring NFT to ${recipient}...`);

      const tx = await contract.safeTransferFrom(
        wallet.address, // from (owner)
        recipient, // to
        tokenId, // token ID
        quantity, // amount
        "0x" // data (empty)
      );

      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log(`✅ Successfully transferred to ${recipient}`);
    }
  } catch (error) {
    console.error("Error transferring NFT:", error);
  }
}

// Execute the function
mintToMultiple();
