import React, { memo, useContext } from 'react'
import { Logo } from '@/presentation/components'
import Styles from './header.styles.scss'
import { ApiContext } from '@/presentation/context'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const logout = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    navigate('/login')
  }
  return (
    <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span>Patrick</span>
            <a data-testid="logout" onClick={logout}>Sair</a>
          </div>
        </div>
      </header>
  )
}

export default memo(Header)
