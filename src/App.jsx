import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { TokenLaunchpad } from "./components/TokenLaunchpad"


function App() {
  return (
  <div style={{width: "100vw"}}>
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider autoConnect wallets={[]}>
        <WalletModalProvider>
          <div style={{
            display: "flex",
            justifyContent: "center",
            padding: 20
          }}>
            <WalletMultiButton/>
            <WalletDisconnectButton/>
          </div>
          <TokenLaunchpad/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </div>
  )
}

export default App
