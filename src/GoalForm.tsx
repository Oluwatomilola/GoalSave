import React, { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CeloSaveABI } from './CeloSaveABI'

const CONTRACT_ADDRESS = '0xF9Ba5E30218B24C521500Fe880eE8eaAd2897055'

interface GoalFormProps {
  onGoalCreated: () => void
}

export function GoalForm({ onGoalCreated }: GoalFormProps) {
  const [name, setName] = useState('')
  const [token, setToken] = useState('0x0000000000000000000000000000000000000000') // CELO
  const [target, setTarget] = useState('')
  const [lockUntil, setLockUntil] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !target) return

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CeloSaveABI,
      functionName: 'createGoal',
      args: [name, token, BigInt(target), BigInt(lockUntil || '0')],
    })
  }

  // Reset form when transaction is confirmed
  React.useEffect(() => {
    if (hash && !isConfirming) {
      onGoalCreated()
      setName('')
      setTarget('')
      setLockUntil('')
    }
  }, [hash, isConfirming, onGoalCreated])

  return (
    <div className="goal-form">
      <h3>Create New Goal</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Token address (0x0 for CELO)"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          type="number"
          placeholder="Target amount"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Lock until timestamp (0 for no lock)"
          value={lockUntil}
          onChange={(e) => setLockUntil(e.target.value)}
        />
        <button type="submit" disabled={isPending || isConfirming}>
          {isPending ? 'Creating...' : isConfirming ? 'Confirming...' : 'Create Goal'}
        </button>
      </form>
    </div>
  )
}