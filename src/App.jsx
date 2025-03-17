import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import './App.css'
import { TokenLaunchpad } from './components/TokenLaunchpad'
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'

function App() {
  return (
  <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider autoConnect wallets={[]}>
        <WalletModalProvider>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <WalletMultiButton />
            <WalletDisconnectButton/>
          </div>
          <TokenLaunchpad />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
