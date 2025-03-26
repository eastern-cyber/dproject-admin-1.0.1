require("dotenv").config();
const { ethers } = require("ethers");

// Infura API key or Alchemy URL
const providerUrl = `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`; // Replace with your own provider URL
const provider = new ethers.JsonRpcProvider(providerUrl);

// Wallet creation with private key and provider
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Now you have a provider attached to the wallet

console.log("Wallet Address: ", wallet.address);

// Contract ABI and address
const contractAddress = "0x60aD2f102FDb0e09ED50e2ab07573079C956aFB8";
const contractABI = [
    "function safeTransferFrom(address from, address to, uint256 tokenId, uint256 amount, bytes calldata data) external"
];

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function mintToMultiple() {
    const toAddresses = [
        "0x12E43878Ab2a41ACA0545a7dCa3536D92e16E8b7" // Add more addresses as needed
    ];
    
    const tokenId = 0;
    const quantity = 1;

    for (const to of toAddresses) {
        try {
            console.log(`Transferring NFT to ${to}...`);
            const tx = await contract.safeTransferFrom(wallet.address, to, tokenId, quantity, "0x");
            console.log(`Transaction Hash: ${tx.hash}`);
            await tx.wait();  // Wait for transaction to be mined
            console.log(`NFT successfully transferred to ${to}`);
        } catch (error) {
            console.log(`Error transferring NFT: ${error.message}`);
        }
    }
}

mintToMultiple();
