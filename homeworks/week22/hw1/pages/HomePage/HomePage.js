/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-property-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { get5Posts, getTotalPosts, deletePost } from '../../WebAPI'
import { AuthContext } from '../../contexts'
import { getAuthToken } from '../../utils'
import Pagination from './Pagination'

const PageWrapper = styled.div`
  min-height: calc(100vh - 102px);
  padding-top: 40px;
`
const PageContainer = styled.div`
  width: 60%;
  min-height: 500px;
  margin: 0 auto;
  border-radius: 5px;
  
`
const Card = styled.div`
  border: 2px solid #7F9E23;
  border-radius: 5px;
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
  display: flex;
  position: relative;
`
const Image = styled.img`
  height: 146px;
  border-radius: 3px;
  vertical-align: middle;
`
const Content = styled.div`
  padding: 5px 10px 0 10px;
  height: 100%;
  max-width: calc(100% - 183px);
  
`
const Title = styled(Link)`
  display: block;
  width: 100%;
  font-size: 26px;
  overflow : hidden;
  text-overflow : ellipsis;
  white-space : nowrap;
  text-decoration: none;
  color: black;
`
const Desc = styled(Link)`
  display: block;
  height: 55%;
  line-height: 25px;
  letter-spacing: 2px;
  padding-top: 5px;
  overflow: hidden;
  word-break: break-all;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient: vertical; 
  text-decoration: none;
  color: black;
`
const Info = styled.div`
  display: flex;
  color: #aaaaaa;
  height: 20px;
  margin-top: 5px;
`
const Author = styled.div`
  font-size: 17px;  
  line-height: 23px;
`
const Time = styled.div`
  margin: 0 15px;
`

const Btn = styled.div`
  position: absolute;
  right: 0;
  bottom :0;
  padding: 5px;
`

const EditBtn = styled.button`
  border: none;
  border-radius: 5px;
  background: rgb(238 203 96 / 30%);
  margin-left: 5px;
  &:hover{
    background: rgba(100, 169, 255, .5);
    cursor: pointer;
  }
  
`

const DeleteBtn = styled(EditBtn)``

function HomePage() {
  const imgUrl = 'https://picsum.photos/500/400?random='
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { user } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    getTotalPosts().then((count) => setTotalPages(Math.ceil(count / 5)))
    get5Posts(page).then((post) => setPosts(post))
  }, [page])

  const handleDelete = (id, title) => {
    if (!user) return
    const token = getAuthToken()
    deletePost(token, id).then()
    alert(`刪除 ${title}`)
    window.location.reload()
  }

  const handleEdit = (id) => {
    if (!user) return
    history.push(`/upload/${id}`)
  }

  return (
    <PageWrapper>
      <PageContainer >
        {posts.map((post) => (
          <Card key={post.id}>
            <Image src={imgUrl + post.id} />
            <Content>
              <Title to={`/post/${post.id}`}>{post.title}</Title>
              <Desc to={`/post/${post.id}`}>{post.body}</Desc>
              <Info>
                <Author>userId:{post.userId}</Author>
                <Time>{new Date(post.createdAt).toLocaleString()}</Time>
                {user &&
                <Btn>
                  <EditBtn onClick={() => { handleEdit(post.id) }}>E</EditBtn>
                  <DeleteBtn onClick={() => { handleDelete(post.id, post.title) }}>D</DeleteBtn>
                </Btn>}
              </Info>
            </Content>
          </Card>
        ))}
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </PageContainer>
    </PageWrapper>
  )
}

export default HomePage
