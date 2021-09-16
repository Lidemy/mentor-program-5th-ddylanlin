/* eslint-disable import/no-unresolved, arrow-parens, no-unused-vars */
import styled from 'styled-components'
import { useState } from 'react'
import Form from './Form'

const MEDIA_QUERY_MD = '@media screen and (min-width: 768px)'

const Board = styled.div`
  background: white;
  width: 85%;
  margin: 3rem auto;
  padding: 1rem;
  border-radius: 5px;
  border-top: 6px solid #FAD312;
  box-shadow: 2px 2px 6px 0px #97a2a0;
  ${MEDIA_QUERY_MD}{
    width: 40%;
    padding: 1rem 3rem;
  }
`
const MustFill = styled.p`
  color: red;
  margin: .5rem 0;
`

function App() {
  const [formData, setFormData] = useState([])
  const [check, setCheck] = useState({
    name: true,
    email: true,
    phone: true,
    type: true,
    how: true
  })

  const handleChange = target => {
    const { value } = document.getElementById(target)
    setFormData({
      ...formData,
      [target]: value
    })
  }

  const handleChangeType = e => {
    setFormData({
      ...formData,
      type: e.target.value
    })
  }

  const handleBlur = target => {
    if (formData[target] === undefined || formData[target] === '') {
      setCheck({
        ...check,
        [target]: false
      })
    } else {
      setCheck({
        ...check,
        [target]: true
      })
    }
  }

  const handleSubmit = e => {
    const { name, email, phone, type, how, others } = formData
    if (name !== undefined && email !== undefined && phone !== undefined && type !== undefined && how !== undefined) {
      alert(`
      提交成功
      暱稱：${name}
      電子郵件：${email}
      電話號碼：${phone}
      報名類型：${type}
      如何知道：${how}
      其他：${others || ''}
      `)
    } else {
      e.preventDefault()
    }
  }

  return (
    <Board>
      <div>
        <h1>新拖延運動報名表單</h1>
        <p>活動日期：2021/08/30~2021/09/05</p>
        <p>活動地點：台北市大安區新生南路二段1號</p>
        <MustFill >* 必填</MustFill>
      </div>
      <Form
        check={check}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleChangeType={handleChangeType}
        handleSubmit={handleSubmit}
      />
    </Board>
  )
}

export default App
