import React, { useRef } from 'react'
import styled from 'styled-components'

import Button from '@mui/material/Button'


const Container = styled.div`
    margin-left: 30px;
    padding: 10px 0px;
    display: flex;
    justify-content: flex-end;
`
const Toolbar = (props) => {
    const fileInput = useRef(null)
    const { onFileSelected, onMintClick } = props

    const onImportClick = () => {
        fileInput.current.click()
    }
    return (
        <Container>
            <Button variant="contained" color="primary" sx={{mr:1}} onClick={onImportClick}>Import</Button>
            <input 
                type="file" onChange={onFileSelected} ref={fileInput} multiple hidden
            /* @ts-expect-error */
             directory="" webkitdirectory=""  />
            <Button variant="contained" color="error" style={{float: 'right'}} onClick={onMintClick}>Create Collection</Button>
        </Container>
    )
}

export default Toolbar