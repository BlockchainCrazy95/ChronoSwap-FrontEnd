import React from 'react'
import styled from 'styled-components'

import DefaultLayout from './Layout'
import SectionContainer from '../components/SectionContainer'
import { Button } from '@mui/material'

const NotFound = (props) => {

    return (
        <DefaultLayout walletButton={true} isMovie={false}>
            <SectionContainer justifyContent="center">
                <span style={{color: 'white', fontSize: "60px"}}>404: Page Not Found</span>
            </SectionContainer>
        </DefaultLayout>
    )
}

export default NotFound