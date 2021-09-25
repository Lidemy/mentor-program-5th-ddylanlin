/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-property-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { getSinglePost, deletePost } from '../../WebAPI'
import { AuthContext } from '../../contexts'
import { getAuthToken } from '../../utils'

const PageWrapper = styled.div`
  min-height: calc(100vh - 102px);
  padding-top: 40px;
`
const PageContainer = styled.div`
  border: 2px solid #7F9E23;
  width: 60%;
  min-height: 500px;
  margin: 20px auto;
  border-radius: 5px;
  position: relative;
`

const Title = styled.div`
  font-size: 30px;
  text-align: center;
  padding: 10px 80px;
`
const Info = styled.div`
  margin: 5px auto;
  display: flex;
  justify-content: space-around;
  color: #aaaaaa;
  width: 300px;
`
const Time = styled.div``

const Content = styled.div`
  padding: 10px 30px;
  line-height: 25px;
  letter-spacing: 2px;
  word-break: break-word;
  white-space: pre-line;
  word-spacing: initial;
`
const Btn = styled.div`
  position: absolute;
  right: 0;
  top :0;
  margin: 10px;
`

const EditBtn = styled.button`
  border: none;
  border-radius: 5px;
  width: 30px;
  background: rgba(100, 169, 255, .5);
  margin-left: 5px;
  &:hover{
    background: rgb(238 203 96 / 69%);
    cursor: pointer;
  }
  
`

const DeleteBtn = styled(EditBtn)``

function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const { user } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    getSinglePost(id).then((post) => setPost(post))
  }, [id])

  const handleDelete = (id, title) => {
    if (!user) return
    const token = getAuthToken()
    deletePost(token, id).then()
    alert(`刪除 ${title}`)
    history.push('/')
  }

  const handleEdit = (id) => {
    if (!user) return
    history.push(`/upload/${id}`)
  }

  return (
    <PageWrapper>
      <PageContainer >
        <Title>{post && post[0].title}</Title>
        <Info>
          <Time>{post && new Date(post[0].createdAt).toLocaleString()}</Time>
        </Info>
        <Content>{post && post[0].body}</Content>
        {user &&
        <Btn>
          <EditBtn onClick={ () => { handleEdit(post[0].id) }}>E</EditBtn>
          <DeleteBtn onClick={ () => { handleDelete(post[0].id, post[0].title) }}>D</DeleteBtn>
        </Btn>}
      </PageContainer>
    </PageWrapper>
  )
}

export default PostPage
