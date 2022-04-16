import { Logo } from '@/presentation/components'
import Styles from './header.styles.scss'
import { ApiContext } from '@/presentation/context'
import { useLogout } from '@/presentation/hooks'
import React, { memo, useContext } from 'react'

const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const logout = useLogout()
  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    logout()
  }
  return (
    <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span data-testid="username">{getCurrentAccount().name}</span>
            <a data-testid="logout" onClick={buttonClick}>Sair</a>
          </div>
        </div>
      </header>
  )
}

export default memo(Header)
