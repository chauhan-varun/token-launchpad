import {
  createInitializeInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createMint,
  ExtensionType,
  getMinimumBalanceForRentExemptMint,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React from "react";

export const TokenLaunchpad = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const createToken = async () => {
    const keypair = Keypair.generate();
    const metaData = {
      mint: keypair.publicKey,
      name: document.getElementById("name").value,
      symbol: document.getElementById("symbol").value,
      uri: document.getElementById("img").value,
      additionalMetadata: [],
    };
    const minLen = getMintLen([ExtensionType.MetadataPointer]);
    const metaDataLen = TYPE_SIZE + LENGTH_SIZE + pack(metaData).length;
    const lamports = getMinimumBalanceForRentExemptMint(minLen + metaDataLen);
    // createMint()
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: minLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        keypair.publicKey,
        wallet.publicKey,
        keypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMintInstruction(
        keypair.publicKey,
        9,
        wallet.publicKey,
        wallet.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        metadata: keypair.publicKey,
        updateAuthority: wallet.publicKey,
        mint: keypair.publicKey,
        mintAuthority: wallet.publicKey,
        name: metaData.name,
        symbol: metaData.symbol,
        uri: metaData.uri,
      })
    );

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.partialSign(keypair.publicKey);

    await wallet.sendTransaction(transaction, connection);
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
