/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-property-newline */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { setAuthToken } from '../../utils'

const HeaderContainer = styled.div`
  width: 100%;
  height: 72px;
  background: #F4F5F4;
  border-top: 12px solid #7F9E23;
  display: flex;
  justify-content: space-between;
`
const LeftHeader = styled.div`
  padding: 0 100px;
  display: flex;
  align-items: center;
`

const Brand = styled(Link)`
  font-size: 30px;
  font-family: monospace;
  color: black;
  text-decoration: none;
  &:hover{
    cursor: pointer;
  }
`

const RightHeader = styled.div`
`

const NavbarList = styled.div`
  padding: 0 60px;
  display: flex;
`

const Nav = styled(Link)`
  width: 120px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  border-radius: 0 0 5px 5px;
  background: none;
  border: 2px solid #7F9E23;
  border-top: none;
  text-decoration: none;
  color: black;
  &:hover{
    cursor: pointer;
    background: #7F9E23;
    color: white;
  }
  ${(props) => props.$active && 'background: #7F9E23; color: white;'}
`

function Header() {
  const location = useLocation()
  const history = useHistory()
  const { user, setUser } = useContext(AuthContext)

  const handleLogout = () => {
    setAuthToken('')
    setUser(null)
    alert('你已登出')
    if (location.pathname !== '/') {
      history.push('/')
    }
  }

  return (
    <HeaderContainer>
      <LeftHeader>
        <Brand to='/'>Blog</Brand>
      </LeftHeader>
      {user && `你好 ${user.nickname}`}
      <RightHeader>
        <NavbarList>
          <Nav to='/about' $active={location.pathname === '/about'} >About</Nav>
          <Nav to='/' $active={location.pathname === '/'} >文章列表</Nav>
          {!user && <Nav to='/login' $active={location.pathname === '/login' || location.pathname === '/register'}>
            {location.pathname === '/register' ? '註冊' : '登入'}
          </Nav>}
          {user && <Nav to='/new-post' $active={location.pathname === '/new-post'} >新增文章</Nav> }
          {user && <Nav to='/' $active={location.pathname === '/logout'} onClick={handleLogout}>登出</Nav> }
        </NavbarList>
      </RightHeader>
    </HeaderContainer>
  )
}

export default Header
