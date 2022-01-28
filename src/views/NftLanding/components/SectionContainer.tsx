import React from 'react'
import styled from "styled-components"

const Container = styled.section`
    display: flex;
    padding: 50px;
`

const SectionContainer = (props) => {
    const { children } = props
    return (
        <Container {...props}>
            {children}
        </Container>
    )
}

export default SectionContainer