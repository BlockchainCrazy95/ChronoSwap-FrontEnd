import React from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex'

import SectionContainer from '../../components/SectionContainer'
import { faqs } from '../../constants'

const TitleDiv = styled.div`
    position: relative;
    top: -50px;
    color: white;
    text-align: center;
    font-size: 40px;
`

const FAQSection = (props) => {
    return (
        <SectionContainer className="tc-light" style={{flexDirection:"column"}}>
            <TitleDiv> FAQs </TitleDiv>
            <div className="container">
                <Flex flexDirection={["column", null, "row"]} justifyContent="center" alignItems="center">
                    <Flex flex={["0", "0", "2"]} />
                    <Flex flex="8" flexDirection="column" id="faq-50">
                        {faqs.map(faq => {
                            return (
                                <div key={faq.index} className='accordion-item accordion-item-s2 bg-theme-alt'>
                                    <h5 className="accordion-title accordion-title-sm collapsed" data-toggle="collapse" data-target={`#faq-${faq.index}`}>
                                        {faq.quiz}
                                        <span className="accordion-icon accordion-icon-s2" />
                                    </h5>
                                    <div id={`faq-${faq.index}`} className="collapse" data-parent="#faq-50">
                                        <div className="accordion-content">
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Flex>
                    <Flex flex={["0","0","2"]} />
                </Flex>
            </div>
        </SectionContainer>
    )
}

export default FAQSection