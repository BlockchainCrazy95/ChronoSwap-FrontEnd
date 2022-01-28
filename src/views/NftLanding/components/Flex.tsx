import React from 'react'
import { Box } from '@mui/material'
import styled from 'styled-components'

const FlexContainer = styled(Box)`
    display: flex;
`

const Flex = (props) => {
    const { children } = props
    return (
        <FlexContainer {...props}>
            {children}
        </FlexContainer>
    )
}

export default Flex