/* eslint-disable import/no-unresolved, arrow-parens, no-unused-vars */
import styled from 'styled-components'
import { useState, useRef } from 'react'
import { TodoBottom, TodoItem } from './TodoElements'

const MEDIA_QUERY_MD = '@media screen and (min-width: 768px)'

const Board = styled.div`
  background: white;
  width: 95%;
  margin: 3rem auto;
  border: 1px solid #198754;
  border-radius: 3px;
  box-shadow: 1px 1px 5px #747474;
  ${MEDIA_QUERY_MD}{
    width: 50%;
  }
`
const BoardTitle = styled.div`
  margin: .5rem auto;
  text-align: center;
  font-size: 2rem;
  ${MEDIA_QUERY_MD}{
    font-size: 2.5rem;
  }
`
const InputField = styled.input`
  margin: .5rem auto;
  display: block;
  width: 95%;
  font-size: 1.1rem;
  border: 1px solid #c0d8cd;
  border-radius: 3px;
  ${MEDIA_QUERY_MD}{
    font-size: 1.5rem;
  }
`
const TodoWrapper = styled.div`
  max-width: 95%;
  margin: 1rem auto;
  min-height: 10rem;
  border-top: 2px solid #ced4da;
  padding: .5rem 0;
`

function App() {
  const [todos, setTodos] = useState([])
  const id = useRef(1)

  const [value, setValue] = useState('')

  const [status, setStatus] = useState('All')

  const handleInputChange = e => {
    setValue(e.target.value)
  }

  const handleInputSubmit = e => {
    if (e.key === 'Enter') {
      setTodos([
        {
          id: id.current,
          content: value,
          isDone: false
        },
        ...todos
      ])
      setValue('')
      id.current++
    }
  }

  const handleDelete = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleToggleCheck = id => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }

  const unDone = todos.filter(todo => todo.isDone === false)
  const Done = todos.filter(todo => todo.isDone === true)
  const handleClear = () => {
    setTodos(unDone)
  }

  const handleSwitch = e => {
    setStatus(e.target.innerText)
  }

  let result = []
  if (status === 'All') {
    result = [...todos]
  } else if (status === 'Active') {
    result = unDone
  } else if (status === 'Completed') {
    result = Done
  }

  return (
    <Board>
      <BoardTitle>To Do List</BoardTitle>
      <InputField
      type="text"
      placeholder="What need to be done?"
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleInputSubmit}
      />

      <TodoWrapper>
        {result.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleToggleCheck={handleToggleCheck}
            handleDelete={handleDelete}
          />
        ))}
      </TodoWrapper>

      <TodoBottom
        unDone={unDone}
        status={status}
        handleSwitch={handleSwitch}
        handleClear={handleClear}
      />

    </Board>
  )
}

export default App
