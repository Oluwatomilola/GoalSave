import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { celoAlfajores } from 'viem/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './contexts/ThemeContext'
import { ThemeToggle } from './components/ThemeToggle'
import { LanguageSwitcher } from './components/LanguageSwitcher'
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

const chains = [celoAlfajores] as const
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId })

const queryClient = new QueryClient()

function App() {
  const { t } = useTranslation()
  const [refreshKey, setRefreshKey] = useState(0)

  const handleGoalCreated = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <ThemeProvider>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <div className="app">
            <header>
              <h1>{t('appTitle')}</h1>
              <div className="header-controls">
                <LanguageSwitcher />
                <ThemeToggle />
                <w3m-button />
              </div>
            </header>

            <main>
              <GoalForm onGoalCreated={handleGoalCreated} />
              <GoalList key={refreshKey} />
            </main>

            <footer>
              <p>{t('footerText')}</p>
            </footer>
          </div>
        </QueryClientProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}

export default App
