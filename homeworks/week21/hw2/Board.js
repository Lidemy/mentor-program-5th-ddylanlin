/* eslint-disable import/no-unresolved, arrow-parens, no-unused-vars */
import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import Squares from './Squares'

const boardSize = 19

const DescBlock = styled.div`
  position: absolute;
  top: -6rem;
  text-align: center;
`
const Title = styled.div`
  font-size: 2rem;
`
const StatusWrapper = styled.div`
  display: flex;
  margin: .5rem 0;
`
const PlayerStatus = styled.div`
  min-width: 10rem;
  font-size: 1.2rem;
`
const BoardBg = styled.div`
  height: ${boardSize * 20 + 30}px;
  width: ${boardSize * 20 + 30}px;
  border: 2px solid black;
  margin: 10rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #e7b266;
  position: relative;
`
const BoardBlock = styled.div`
  height: ${boardSize * 20}px;
  width: ${boardSize * 20}px;
  outline: 2px solid black;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
`

export default function Board() {
  const [board, setBoard] = useState(Array(boardSize).fill(Array(boardSize).fill(null)))
  const [winner, setWinner] = useState(null)
  const blackIsNext = useRef(true)
  const currentX = useRef()
  const currentY = useRef()

  const updateBoard = (x, y) => {
    currentX.current = x
    currentY.current = y
    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard[y][x] = blackIsNext.current ? 'Black' : 'White'
    setBoard(newBoard)
  }

  // 二層map更新
  // const updateBoard = (x, y) => {
  //   currentX.current = x
  //   currentY.current = y
  //   setBoard(board => {
  //     return board.map((row, y) => {
  //       if (y !== currentY.current) return row
  //       return row.map((col, x) => {
  //         if (x !== currentX.current) return col
  //         return x = blackIsNext.current ? 'Black' : 'White'
  //       })
  //     })
  //   })
  // }

  useEffect(() => {
    if (!currentX.current && !currentY.current) return
    isWin(board, currentY.current, currentX.current)
    function isWin(board, y, x) {
      if (
        countChess(board, y, x, 1, 0) + countChess(board, y, x, -1, 0) >= 4 ||
        countChess(board, y, x, 0, 1) + countChess(board, y, x, 0, -1) >= 4 ||
        countChess(board, y, x, 1, 1) + countChess(board, y, x, -1, -1) >= 4 ||
        countChess(board, y, x, 1, -1) + countChess(board, y, x, -1, 1) >= 4
      ) {
        setWinner(board[y][x])
      }
    }

    function countChess(board, y, x, directionX, directionY) {
      const now = board[y][x]
      let tempX = x
      let tempY = y
      let total = 0
      while (total >= 0) {
        tempX += directionX
        tempY += directionY
        if (board[tempY] && board[tempY][tempX] === now) {
          total++
        } else {
          break
        }
      }
      return total
    }
  }, [board])

  const handleReset = () => {
    window.location.reload()
  }

  return (
    <BoardBg>

      <DescBlock>
        <Title>五子棋</Title>
        <StatusWrapper>
          <PlayerStatus>
            {winner ? `贏家：${winner === 'Black' ? '白子' : '黑子'}` : `下一位：${blackIsNext.current ? '黑子' : '白子'}`}
          </PlayerStatus>
          <button onClick={handleReset}>重新開始</button>
        </StatusWrapper>
      </DescBlock>

      <BoardBlock>
        {board.map((row, y) => (
            <div key={y}>
              {row.map((col, x) => (
                  <Squares
                    key={x}
                    x={x}
                    y={y}
                    blackIsNext={blackIsNext}
                    updateBoard={updateBoard}
                    winner={winner}
                  />)
              )}
            </div>)
        )}
      </BoardBlock>

    </BoardBg>
  )
}
