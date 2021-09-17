/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-property-newline */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
  background: #7F9E23;
  height: 30px;
  color: #e8e8e8;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
`

function Footer() {
  return (
   <FooterContainer>
     Copyright © 2021 Flow Open Money Come All Rights Reserved
   </FooterContainer>
  )
}

export default Footer
