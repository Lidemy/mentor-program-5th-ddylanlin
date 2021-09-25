/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-property-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { addPost } from '../../WebAPI'
import { AuthContext } from '../../contexts'
import { getAuthToken } from '../../utils'

const PageWrapper = styled.div`
  min-height: calc(100vh - 102px);
  padding-top: 40px;
`
const PageContainer = styled.form`
  border: 1px solid #7F9E23;
  width: 50%;
  height: 500px;
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
`

const Title = styled.input`
  font-size: 25px;
  text-align: center;
  margin: 20px 30px;
  padding: 5px;
  width: 90%;
  border-radius: 5px;
  border: 1px solid #aaaaaa;
`

const Content = styled.textarea`
  font-size: 20px;
  padding: 5px;
  width: 90%; 
  margin: 0px 30px;
  min-height: 70%; 
  border-radius: 5px;
  border: 1px solid #aaaaaa;
`

const Btn = styled.button`
  position: absolute;
  right: 40px;
  bottom :20px;
  width: 100px;
  background: none;
  border-radius: 5px;
  border: 1.5px solid #7F9E23;
  padding: 5px 10px;
  text-align: center;
  :hover{
    background: #7F9E23;
    color: white;
    cursor: pointer;
  }
`
const ErrorMessage = styled.div`
  color: red;
`

function NewPostPage() {
  const { user } = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const history = useHistory()

  if (!user) history.push('/')

  const handleSubmit = (e) => {
    setErrorMessage(null)
    const token = getAuthToken()
    if (token) {
      addPost(token, title, body).then((data) => {
        if (data.ok === 0) {
          return setErrorMessage(data.message)
        }
        history.push('/')
      })
    }
  }

  return (
    <PageWrapper>
      <PageContainer onSubmit={handleSubmit}>
        <Title placeholder="標題" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <Content cols="10" placeholder="內文" value={body} onChange={(e) => setBody(e.target.value)}/>
        <Btn>送出</Btn>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </PageContainer>
    </PageWrapper>
  )
}

export default NewPostPage
