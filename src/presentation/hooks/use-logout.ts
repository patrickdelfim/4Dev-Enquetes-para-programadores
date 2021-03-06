import { ApiContext } from '@/presentation/context'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  return (): void => {
    setCurrentAccount(undefined)
    navigate('/login')
  }
}
