/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-property-newline */
/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components'

const PageWrapper = styled.div`
  min-height: calc(100vh - 102px);
  padding-top: 40px;
`
const PageContainer = styled.div`
  border: 2px solid #7F9E23;
  width: 45%;
  height: 500px;
  margin: 0 auto;
  border-radius: 5px;
`
const Title = styled.div`
  font-size: 50px;
  text-align: center;
  margin-top: 10px; 
`
const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 60px;
`
const Image = styled.img`
  height: 250px;
`
const Desc = styled.div`
  font-size: 25px;
`

function AboutPage() {
  return (
    <PageWrapper>
      <PageContainer >
        <Title>About</Title>
        <Content>
          <Image src='https://upload.cc/i1/2021/09/15/MqJFbK.jpg'></Image>
          <Desc>我是野原新之助</Desc>
        </Content>
      </PageContainer>
    </PageWrapper>
  )
}

export default AboutPage
