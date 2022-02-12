import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import Context from '@/presentation/context/form/form-context'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)

  return (
  <div data-testid="error-wrap" className={Styles.errorWrapper}>
    {isLoading && <Spinner className={Styles.spinner} />}
    { (errorMessage.length > 0) && <span className={Styles.error}>{errorMessage}</span>}
  </div>

  )
}

export default FormStatus
