import React from 'react'
import styled from 'styled-components'

import StarPanel from '../components/StarPanel'
import './home.css'

const Container = styled.div`
	width: 90%;
	//min-width: 600px;
	margin: 0 auto;
`
const StarContainer = styled.div`
    position: absolute;
    top: 0px;
    z-index: 1;
    width: 100%;
`
const ImageWrapper = styled.div`
    background-image: url('/images/nftadmin/shape-v.png');
    width: 100%;
    //height: 100vh;
    background-size: 100% auto;
    background-repeat: no-repeat;
`

const DefaultLayout = (props) => {
    const { children } = props
    return (
        <ImageWrapper>
            <StarContainer>
                <StarPanel />
            </StarContainer>
            <Container style={{zIndex:2, minHeight: "calc(100vh - 130px)"}}>
                {children}
            </Container>
        </ImageWrapper>
    )
}

export default DefaultLayout