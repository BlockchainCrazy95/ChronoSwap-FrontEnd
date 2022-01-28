import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 23%;
    justify-content: space-between;
    min-width: 160px;
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
    const { isEmpty, item } = props
    let url = "";
    if(!isEmpty){
        url = item.uri;
        if(url[url.length - 1] !== "/") url += "/";
        url += (parseInt(item.id) + 1)
        return (
        <Container className='gradient-item' style={{flexDirection:'column'}}>
            <CustomCard style={{justifyContent: 'center', alignItems: 'center'}}>
                <img src={url} alt={`${item.symbol}#${parseInt(item.id) + 1}`} />
            </CustomCard>
            <div style={{color: 'white', textAlign: 'center', fontSize: "20px", marginTop: 8}}>
                {`${item.symbol}#${parseInt(item.id) + 1}`}<br/>
                {item.price} CRO
            </div>
        </Container>)
    }
    return (
        <Container className='gradient-item' style={{visibility: isEmpty? 'hidden':'visible'}} />
    )
}

export default NFTCard