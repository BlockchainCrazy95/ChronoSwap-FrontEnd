import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 23%;
    //height: 150px;
    display: flex;
    margin: 10px 1%;
    &:hover{
        //transform: translate(0, -10px);
        transform: scale(1.1);
        box-shadow: 2px 2px 10px #3c3f4a;
    }
`
const CustomCard = styled.div`
    //background-color: #413584;
    padding: 8px;
    //margin: 8px ;
`
// box-shadow: 2px 2px 2px white;
const NFTCard = (props) => {
    const { isEmpty, file } = props
    return (
        <Container className='gradient-item' style={{visibility: isEmpty? 'hidden':'visible'}}>
            <CustomCard style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {!isEmpty?(<img src={URL.createObjectURL(file)} alt={`SportCar${file.name}`} />):(<></>)}
            </CustomCard>
        </Container>
    )
}

export default NFTCard