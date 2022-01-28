import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import SectionContainer from '../../components/SectionContainer'
import Flex from '../../components/Flex'
import { landingContent, landingTitle } from '../../constants'

const RoundImage = styled.div`
    display: flex;
    border-radius: 50%;
    background-color: #161c42;
    box-shadow: 0px 0px 15px #4b64c1;
`

const LandingSection = () => {
    const nftBack = useRef(null)
    const [ changed, setChanged ] = useState(false)

    useEffect(() => {
        setTimeout(()=> {
            const r = (Math.random() * 200) + 30
            const g = (Math.random() * 200) + 30
            const b = (Math.random() * 200) + 30
            if(nftBack.current)
                nftBack.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            setChanged(!changed)
        }, 300)
    }, [changed])

    return (
        <SectionContainer style={{minHeight: "calc(100vh - 74px)"}}>
            <Flex flexDirection={["column", "column", "row"]} alignItems="center">
                <Flex flex="4" flexDirection="column">
                    <div style={{color: 'white', fontSize: "40px", lineHeight:"40px", marginBottom: 32}}>{landingTitle}</div>
                    <p style={{fontSize: 22, color: '#b7b9e3'}}>{landingContent}</p>
                </Flex>
                <Flex flex="2" sx={{ pl: ["0px", "50px"], mt:["50px"], mb:["50px"]}} justifyContent="center">
                    <RoundImage ref={nftBack}>
                        <img style={{width: '100%', height: 'auto', margin: '0 auto', zIndex: 2}} src="images/nftlanding/nft-car.gif" alt="NFT-CAR" />
                    </RoundImage>
                </Flex>
            </Flex>
        </SectionContainer>
    )
}

export default LandingSection