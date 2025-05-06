# Solana Token Launchpad

A streamlined web application that allows users to create custom SPL tokens on the Solana blockchain with just a few clicks.

## Features

- Create custom SPL tokens with the TOKEN-2022 Program
- Set your token's name, symbol, and image URL
- Specify initial token supply
- Connect with popular Solana wallets (Phantom, Solflare)
- Automatic token minting to your wallet

## Technology Stack

- **Frontend**: React.js with Vite
- **Blockchain**: Solana blockchain (Devnet)
- **Token Standard**: Solana Program Library (SPL) Token-2022
- **Wallet Integration**: Solana Wallet Adapter

## Prerequisites

- Node.js and npm installed
- A Solana wallet (Phantom or Solflare browser extension)
- Some SOL in your wallet for transaction fees (Devnet SOL)

## Setup

1. Clone the repository

```bash
git clone https://github.com/chauhan-varun/token-launchpad.git
cd token-launchpad
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173

## Usage

1. Connect your wallet using the "Select Wallet" button
2. Fill in the token details:
   - **Name**: Your token's full name
   - **Symbol**: Short abbreviation for your token (typically 3-4 characters)
   - **Image URL**: A URL pointing to your token's image/logo
   - **Initial Supply**: The amount of tokens to mint initially
3. Click "Create a token" and approve the transactions in your wallet
4. Once confirmed, your new token will be minted and added to your wallet

## Notes

- This application uses the Solana devnet. Make sure your wallet is connected to devnet
- The Alchemy RPC endpoint is used for Solana network connections
- All created tokens use 9 decimal places

## License

[MIT](LICENSE)