import { ApiContext } from '@/presentation/context'
import { AccessDeniedError } from '@/domain/errors'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

type CallBackType = (error: Error) => void
type ResultType = CallBackType
export const useErrorHandler = (callback: CallBackType): ResultType => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      navigate('/login')
    } else {
      callback(error)
    }
  }
}
