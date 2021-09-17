/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-property-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled from 'styled-components'

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  margin: 30px auto;

`
const FirstPage = styled.a`
  text-decoration: none;
  color: #7F9E23;
  &:hover{
    cursor: pointer;
  }
`
const PrevPage = styled(FirstPage)``
const NextPage = styled(FirstPage)``
const LastPage = styled(FirstPage)``
const PageNumber = styled.div``

function Pagination({ page, setPage, totalPages }) {
  const handleChangePage = (page) => {
    setPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <PaginationWrapper>
      <FirstPage onClick={() => { handleChangePage(1) }}>{page !== 1 && '頁首'}</FirstPage>
      <PrevPage onClick={() => { handleChangePage(page - 1) }}>{page !== 1 && '上一頁'}</PrevPage>
      <PageNumber>{page} / {totalPages}</PageNumber>
      <NextPage onClick={() => { handleChangePage(page + 1) }}>{page !== totalPages && '下一頁'}</NextPage>
      <LastPage onClick={() => { handleChangePage(totalPages) }}>{page !== totalPages && '頁尾'}</LastPage>
    </PaginationWrapper>
  )
}

export default Pagination
