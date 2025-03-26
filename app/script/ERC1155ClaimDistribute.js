require('dotenv').config();
const { ethers } = require("ethers");
const { Wallet } = require('ethers');


// Step 1: Create a provider (using Infura in this case)
const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");

// Step 2: Create your wallet using a private key
const wallet = new ethers.Wallet(privateKey, provider);

// Step 3: Use the wallet to send a transaction
async function sendTransaction() {
    const tx = {
        to: "0xED7D31Aa1a39c3738a5f6dCf3C94bBAe34AE09DE", // Replace with the recipient address
        value: ethers.utils.parseEther("0.1"),  // Amount of Ether to send
        gasLimit: 21000,  // Gas limit
        gasPrice: ethers.utils.parseUnits("20", "gwei")  // Gas price
    };

    // Send the transaction
    try {
        const txResponse = await wallet.sendTransaction(tx);
        console.log("Transaction sent:", txResponse.hash);
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}

// Call the function to send the transaction
sendTransaction();


// const { ethers } = require('ethers');
// const { Wallet } = require('ethers');

// Define your provider (Infura, Alchemy, or your own node URL)
// const provider = new ethers.JsonRpcProvider("https://polygon.rpc.thirdweb.com");

// Define your wallet (make sure the private key is correctly formatted)
// const wallet = new ethers.Wallet( privateKey , provider);

// Now, your wallet is connected to the provider and can send transactions.


// const privateKey = "0x6482638b2f6a5cd906070d861fcf6c18405fb0957f6f50be810d23354a3268e7";
console.log(privateKey);  // Ensure it's in correct format.


// const privateKey = process.env.PRIVATE_KEY?.trim(); // Trim to avoid accidental spaces

if (!privateKey || !/^0x[a-fA-F0-9]{64}$/.test(privateKey)) {
    throw new Error("Invalid private key format!");
}

// const wallet = new Wallet(privateKey);


// const privateKey = process.env.PRIVATE_KEY; // Ensure this is correctly set
// const wallet = new Wallet(privateKey);

// Configuration
const CONTRACT_ADDRESS = "0x2a61627c3457cCEA35482cAdEC698C7360fFB9F2";
const TOKEN_ID = 0;
const AMOUNT_TO_DISTRIBUTE = 1; // Adjust as needed
const RECIPIENTS = [
    "0xED7D31Aa1a39c3738a5f6dCf3C94bBAe34AE09DE",
    "0x12E43878Ab2a41ACA0545a7dCa3536D92e16E8b7",
    "0xE044Ef9C25997Fb463A9637F96B15d4F89E6B8e2"
];

// const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ERC-1155 ABI (minimal for transfer functions)
const ERC1155_ABI = [
    "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) external"
];

async function distributeTokens() {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC1155_ABI, wallet);
    
    for (const recipient of RECIPIENTS) {
        try {
            const tx = await contract.safeTransferFrom(
                wallet.address,
                recipient,
                TOKEN_ID,
                AMOUNT_TO_DISTRIBUTE,
                "0x"
            );
            console.log(`Sent ${AMOUNT_TO_DISTRIBUTE} of Token ID ${TOKEN_ID} to ${recipient}, TX Hash: ${tx.hash}`);
            await tx.wait();
        } catch (error) {
            console.error(`Failed to send to ${recipient}:`, error);
        }
    }
}

distributeTokens().then(() => console.log("Distribution complete."));
