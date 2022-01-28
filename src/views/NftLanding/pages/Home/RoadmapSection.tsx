import React from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex'

import SectionContainer from '../../components/SectionContainer'
import { roadmapStep } from '../../constants'

const TitleDiv = styled.div`
    position: relative;
    top: -50px;
    color: white;
    text-align: center;
    font-size: 40px;
`

const RoadmapSection = (props) => {
    return (
    <SectionContainer style={{justifyContent:"center"}}>
        <div className="tc-light ov-v">
            <TitleDiv>ROADMAP</TitleDiv>
            <div className="container">
                <Flex flexDirection="row" justifyContent="center">
                    <div className="roadmap-wrap roadmap-wrap-s5 mb-0">
                    {roadmapStep.map(step => {
                        return (
                        <div key={step.time} className={`roadmap roadmap-s5 ${step.step%2?"roadmap-right":"roadmap-left"} ${step.isFinished?"roadmap-finished":""}`}>
                            <div className="roadmap-step roadmap-step-s5">
                                <div className="roadmap-head roadmap-head-s5">
                                    <span className="roadmap-time roadmap-time-s5">{step.time}</span>
                                </div>
                                <p>{step.content}</p>
                            </div>
                        </div>
                        )
                    })}
                    </div>
                </Flex>
            </div>
        </div>
    </SectionContainer>)
}

export default RoadmapSection