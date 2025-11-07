import { useReadContract } from 'wagmi'
import { CeloSaveABI } from './CeloSaveABI'

const CONTRACT_ADDRESS = '0xF9Ba5E30218B24C521500Fe880eE8eaAd2897055'

interface Goal {
  id: bigint
  name: string
  token: string
  target: bigint
  balance: bigint
  createdAt: bigint
  lockUntil: bigint
  closed: boolean
}

export function GoalList() {
  const { data: goals, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CeloSaveABI,
    functionName: 'getMyGoals',
  }) as { data: Goal[] | undefined; isLoading: boolean }

  if (isLoading) return <div>Loading goals...</div>

  return (
    <div className="goal-list">
      <h3>Your Goals</h3>
      {!goals || goals.length === 0 ? (
        <p>No goals yet. Create your first goal!</p>
      ) : (
        goals.map((goal) => (
          <div key={goal.id.toString()} className="goal-item">
            <h4>{goal.name}</h4>
            <p>Target: {goal.target.toString()}</p>
            <p>Balance: {goal.balance.toString()}</p>
            <p>Token: {goal.token === '0x0000000000000000000000000000000000000000' ? 'CELO' : goal.token}</p>
            <p>Status: {goal.closed ? 'Closed' : 'Active'}</p>
          </div>
        ))
      )}
    </div>
  )
}