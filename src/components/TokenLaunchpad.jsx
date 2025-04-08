import {
  createAssociatedTokenAccountInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  ExtensionType,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React from "react";

export const TokenLaunchpad = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const createToken = async () => {
    try {
      if (!wallet || !wallet.publicKey) {
        alert("Please connect your wallet.");
        return;
      }
  
      const name = document.getElementById("name").value.trim();
      const symbol = document.getElementById("symbol").value.trim();
      const uri = document.getElementById("img").value.trim();
      const supplyInput = document.getElementById("supply").value.trim();
  
      if (!name || !symbol || !uri || !supplyInput) {
        alert("All fields are required.");
        return;
      }
  
      const amountToMint = parseFloat(supplyInput);
      if (isNaN(amountToMint) || amountToMint <= 0) {
        alert("Please enter a valid supply amount.");
        return;
      }
  
      const mintkeypair = Keypair.generate();
      const metaData = { mint: mintkeypair.publicKey, name, symbol, uri, additionalMetadata: [] };
  
      const minLen = getMintLen([ExtensionType.MetadataPointer]);
      const lamports = await connection.getMinimumBalanceForRentExemption(minLen);
  
      // Check wallet balance
      const balance = await connection.getBalance(wallet.publicKey);
      if (balance < lamports) {
        alert("Insufficient SOL balance to create the token.");
        return;
      }
  
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintkeypair.publicKey,
          space: minLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintkeypair.publicKey,
          wallet.publicKey,
          mintkeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintkeypair.publicKey,
          9,
          wallet.publicKey,
          wallet.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          metadata: mintkeypair.publicKey,
          updateAuthority: wallet.publicKey,
          mint: mintkeypair.publicKey,
          mintAuthority: wallet.publicKey,
          name,
          symbol,
          uri,
        })
      );
  
      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      transaction.partialSign(mintkeypair);
  
      console.log("Transaction:", transaction);
  
      await wallet.sendTransaction(transaction, connection);
      alert(`Token created: ${mintkeypair.publicKey.toBase58()}`);
    } catch (error) {
      console.error("Error creating token:", error);
      alert("An error occurred while creating the token. Please try again.");
    }
  };
  return (
    <div>
      <input type="text" id="name" placeholder="name" />
      <input type="text" id="symbol" placeholder="symbol" />
      <input type="text" id="img" placeholder="Image URL" />
      <input type="text" id="supply" placeholder="initial supply" />
      <button onClick={createToken}>Create Token</button>
    </div>
  );
};
