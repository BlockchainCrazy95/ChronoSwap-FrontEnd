import React from 'react'
import styled from 'styled-components'
import './home.css'

const Body = styled.div`
    //height: 100vh;
    //background-color: rgba(3, 9, 31, 0.9);
    //background: linear-gradient(139.73deg, rgb(25 30 50) 0%,rgb(0 0 0) 100%)
    //background: linear-gradient(139.73deg, rgb(196, 220, 255) 0%, rgb(212 222 255) 100%);
`

const Container = styled.div`
	width: 90%;
	min-width: 600px;
	margin: 0 auto;
`
const MoviePanel = styled.div`
    position: absolute;
    bottom: 0;
    top: 280px;
    //left: 0;
    width: 500em;
    height: 70%;
    opacity: .1;
    visibility: inherit;
    background: transparent url(/images/nftadmin/graph.png) repeat-x scroll 0 0%;
    -webkit-animation: cloudwash 60s linear infinite;
    animation: cloudwash 60s linear infinite;
    z-index: 0;
`

const ImageWrapper = styled.div`
    background-image: url('/images/nftadmin/shape-v.png');
    width: 100%;
    //height: 100vh;
    background-size: 100% auto;
    background-repeat: no-repeat;
`

const DefaultLayout = (props) => {
    const { walletButton, isMovie, children } = props
    return (
        <ImageWrapper>
            {isMovie?<MoviePanel />:<></>}
            <Container style={{zIndex:2, minHeight: "calc(100vh - 124px)"}}>
                {children}
            </Container>
        </ImageWrapper>
    )
}

export default DefaultLayout