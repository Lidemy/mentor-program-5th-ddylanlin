/* eslint-disable import/no-unresolved, no-unused-vars */
import styled from 'styled-components'
import { useState } from 'react'

const Square = styled.div`
  outline: 1px solid black;
  height: 20px;
  width: 20px;
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Chess = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  
  ${(props) => props.color === 'Black' && 'background: black;'}
  ${(props) => props.color === 'White' &&
  `border: 1.2px solid black;
   background: white;`}
`

export default function Squares({
  x,
  y,
  blackIsNext,
  updateBoard,
  winner
}) {
  const [color, setColor] = useState(null)

  const handleClick = () => {
    if (color) return
    if (winner) return
    blackIsNext.current ? setColor('Black') : setColor('White')
    blackIsNext.current = !blackIsNext.current
    updateBoard(x, y)
  }
  return (
    <Square onClick={handleClick}>
      <Chess color={color} />
    </Square>
  )
}
