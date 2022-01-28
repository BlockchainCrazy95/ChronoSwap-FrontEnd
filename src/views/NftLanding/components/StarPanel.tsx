import React from 'react'
import styled from 'styled-components'

const StarIcon = styled.div`
width: 6px;
height: 6px;
border-radius: 50%;
background-color: white;
box-shadow: 0px 0px 20px white;
`


const StarPanel = () => {
    const res = [];
    for(let i = 0;i<20;i++){
        res.push(
            <div className='star'
                style={{
                    top: Math.random()*(window.innerHeight - 220) + 50,
                    left: Math.random()*(window.innerWidth - 120) + 50,
                    opacity: Math.random()
                }}
            > <StarIcon style={{
                animation: `twinkle ${((Math.random()*10) + 3)}s linear ${((Math.random()*10) + 3)}s infinite`,
                }} />
            </div>
        )
    }

    return <>{res}</>;
}
export default React.memo(StarPanel)