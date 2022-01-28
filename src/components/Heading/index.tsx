import { Heading } from '@pancakeswap/uikit'
import type { HeadingProps } from '@pancakeswap/uikit'
import styled from 'styled-components'

const StyledHeading = styled(Heading)<HeadingProps>`
  color: ${({ theme }) => (theme.isDark ? theme.colors.text : '#3b6cdb')};
`

export default StyledHeading
