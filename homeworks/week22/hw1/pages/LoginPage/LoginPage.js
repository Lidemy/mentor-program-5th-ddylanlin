/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-property-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { login, getMe } from '../../WebAPI'
import { setAuthToken } from '../../utils'
import { AuthContext } from '../../contexts'

const PageWrapper = styled.div`
  min-height: calc(100vh - 102px);
  padding-top: 40px;
`
const PageContainer = styled.form`
  border: 2px solid #7F9E23;
  width: 400px;
  height: 300px;
  margin: 100px auto;
  border-radius: 5px;
`

const Title = styled.div`
  font-size: 30px;
  text-align: center;
  margin-top: 30px; 
`

const InputBlock = styled.div`
  margin: 30px auto;
  padding: 0 15px;
  font-size: 20px;
  width: 100%;
  display: flex;
`

const InputTitle = styled.div`
  width: 20%;
`

const InputField = styled.input`
  font-size: 18px;
  padding: 3px;
  width: 80%;
  border-radius: 5px;
  border: 1px solid #aaaaaa;
`

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: -10px;
`

const Btn = styled.div`
  margin: 15px auto;
  width: 200px;
  display: flex;
  justify-content: space-around;
`

const Submit = styled.button`
  font-size: 16px;
  width: 60px;
  padding: 3px 10px;
  border: 1px solid #7F9E23;
  border-radius: 3px;
  background: none;
  &:hover{
    cursor: pointer;
    background: #7F9E23;
    color: white;
  }
`

const Back = styled(Link)`
  text-align: center;
  width: 60px;
  padding: 3px 10px;
  border: 1px solid #7F9E23;
  border-radius: 3px;
  background: none;
  text-decoration: none;
  color: black;
  &:hover{
    cursor: pointer;
    background: #7F9E23;
    color: white;
  }
`

function LoginPage() {
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const history = useHistory()

  const handleSubmit = () => {
    setErrorMessage(null)
    login(username, password).then((data) => {
      console.log(data)
      if (data.ok === 0) {
        return setErrorMessage(data.message)
      }
      setAuthToken(data.token)
      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null)
          return setErrorMessage(response.toString())
        }
        setUser(response.data)
        history.push('/')
      })
    })
  }

  return (
    <PageWrapper>
      <PageContainer onSubmit={handleSubmit}>
        <Title>登入</Title>
        <InputBlock>
          <InputTitle>帳號：</InputTitle>
          <InputField value={username} onChange={(e) => setUsername(e.target.value)}/>
        </InputBlock>
        <InputBlock>
          <InputTitle>密碼：</InputTitle>
          <InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </InputBlock>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Btn>
          <Back to='/register'>註冊</Back>
          <Submit>送出</Submit>
        </Btn>
      </PageContainer>
    </PageWrapper>
  )
}

export default LoginPage
