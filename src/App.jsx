import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { TokenLaunchpad } from "./components/TokenLaunchpad";
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  const endpoint = process.env.REACT_APP_SOLANA_RPC_ENDPOINT || "https://solana-devnet.g.alchemy.com/v2/OmpV8pByLQt4GL68rAeSLc9iKtIgy7ly";

  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ];

  return (
    <div style={{ width: "100vw" }}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider autoConnect wallets={wallets}>
          <WalletModalProvider>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: 20,
              }}
            >
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <TokenLaunchpad />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;