import React from 'react'
import styled from 'styled-components'
import { Box } from '@pancakeswap/uikit'
import Container from '../Layout/Container'
import { PageHeaderProps } from './types'

const Outer = styled(Box)<{ background?: string }>`
  background: ${({ theme, background }) => background || theme.colors.gradients.bubblegum};
  margin-top: -10px;
`

// const Outer = styled(Box)<{ background?: string }>`
//   background-image: ${({ theme, background }) => 'url("/images/coverPools.png")'};
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   margin-top: -10px;
// `

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
`

const PageHeader: React.FC<PageHeaderProps> = ({ background, children, ...props }) => (
  <Outer background={background} {...props}>
    <Inner>{children}</Inner>
  </Outer>
)

export default PageHeader
