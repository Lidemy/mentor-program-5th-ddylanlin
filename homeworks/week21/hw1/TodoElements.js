/* eslint-disable import/no-unresolved, no-unused-vars */
import styled from 'styled-components'

const MEDIA_QUERY_MD = '@media screen and (min-width: 768px)'

const TodoItems = styled.div`
  display: flex;
  font-size: 1.2rem;
  width: 100%;
  margin-bottom: .3rem;
  justify-content: space-between;
  ${MEDIA_QUERY_MD}{
    margin-top: .5rem;
    margin-bottom: .5rem;
  }
`
const TodoContent = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  &:hover{
    cursor: pointer;
  }
  ${MEDIA_QUERY_MD}{
    font-size: 1.5rem;
  }
  ${(props) =>
    props.$isDone && 'text-decoration: line-through'}
`
const TodoCheck = styled.input`
  margin: .4rem;
`

const TodoText = styled.a`
  word-break: break-word;
  margin-left: .5rem;
`

const TodoBtn = styled.div`
  width: 15%;
`
const TodoDelete = styled.button`
  background: white;
  border: 1px solid #f35252;
  border-radius: 3px;
  color: #f35252;
  &:hover{
    cursor: pointer;
    background-color: #f35252;
    color: white;
  }
  ${MEDIA_QUERY_MD}{
    font-size: 1.2rem;
    width: 100%;
    height: 100%; 
  }
`

const BoardBottom = styled.div`
  font-size: .8rem;
  display: flex;
  justify-content: space-between;
  max-width: 95%;
  margin: .5rem auto;
`
const Left = styled.div`
  display: flex;
  align-items: center;
  color: #747577;
  ${MEDIA_QUERY_MD}{
    font-size: 1.1rem;
  }
`
const Status = styled.div`
  display: flex;
`
const StatusAll = styled(TodoDelete)`
  border: none;
  color: black;
  width: 4rem;
  &:hover{
    cursor: pointer;
    background-color: white;
    color: #2aca7a;
  }
  ${MEDIA_QUERY_MD}{
    margin: auto 0;
    font-size: 1.4rem;
    width: 8rem; 
  }
`
const StatusActive = styled(StatusAll)``
const StatusCompleted = styled(StatusAll)``
const Clear = styled(StatusAll)`
  color: #747577;
  ${MEDIA_QUERY_MD}{
    width: fit-content;
    font-size: 1.1rem;
  }
`

export function TodoItem({
  todo,
  handleToggleCheck,
  handleDelete
}) {
  return (
    <TodoItems key={todo.id}>
      <TodoContent $isDone={todo.isDone} onClick={() => { handleToggleCheck(todo.id) }}>
        <TodoCheck type="checkbox" onChange={() => { handleToggleCheck(todo.id) }} checked={todo.isDone}/>
        <TodoText>{todo.content}</TodoText>
      </TodoContent>
      <TodoBtn>
        <TodoDelete onClick={() => { handleDelete(todo.id) }}>Delete</TodoDelete>
      </TodoBtn>
    </TodoItems>
  )
}

export function TodoBottom({
  unDone,
  status,
  handleSwitch,
  handleClear
}) {
  return (
      <BoardBottom>
        <Left>{unDone.length} left</Left>
        <Status>
          <StatusAll className={ status === 'All' ? 'active' : '' } onClick={handleSwitch}>All</StatusAll>
          <StatusActive className={ status === 'Active' ? 'active' : '' } onClick={handleSwitch}>Active</StatusActive>
          <StatusCompleted className={ status === 'Completed' ? 'active' : '' } onClick={handleSwitch}>Completed</StatusCompleted>
        </Status>
        <Clear onClick={handleClear}>Clear</Clear>
      </BoardBottom>
  )
}
