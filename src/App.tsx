import { useState } from 'react'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { celoAlfajores } from 'viem/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoalForm } from './GoalForm'
import { GoalList } from './GoalList'
import './App.css'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '2f05a7db73b6e7a4c24c7cb5db29e0a6' // Replace with your WalletConnect project ID

// 2. Create wagmiConfig
const metadata = {
  name: 'GoalSave',
  description: 'Goal-based CELO savings vault',
  url: 'http://localhost:5173',
  icons: ['https://walletconnect.com/walletconnect-logo.png']
}

const chains = [celoAlfajores]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

const queryClient = new QueryClient()

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleGoalCreated = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <header>
            <h1>GoalSave - Goal-Based Savings</h1>
            <w3m-button />
          </header>

          <main>
            <GoalForm onGoalCreated={handleGoalCreated} />
            <GoalList key={refreshKey} />
          </main>

          <footer>
            <p>Built with Vite + React + WalletConnect on Celo</p>
          </footer>
        </div>
      </QueryClientProvider>
    </WagmiConfig>
  )
}

export default App
