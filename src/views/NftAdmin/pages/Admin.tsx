import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { getCreatorList, addCreator, revokeCreator } from 'utils/ContractUtils'
import { useNFTCollectionManagerContract } from 'hooks/useContract';
import DefaultLayout from './Layout'
import SectionContainer from '../components/SectionContainer'
import Flex from '../components/Flex'
import Toast from '../components/Toast';


const StyledLayout = styled.div`
	background: linear-gradient(139.73deg, rgb(7 11 26) 0%,rgb(0 0 0) 100%);
`

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
	  backgroundColor: "#03050b",
      // backgroundColor: "transparent",
	  color: "white",
	},
	[`&.${tableCellClasses.body}`]: {
	  fontSize: 14,
	  color: "white",
	  borderBottom: "1px solid #444"
	},
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: "transparent",
		color: 'white'
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
		color: 'white'
	},
}));

const CustomInput = styled.input`
	display: inline;
	border: 1px solid hsla(0,0%,100%,.2);
	background: none;
	padding: 10px 20px;
    min-width: 445px;
	color: white!important;
	border-radius: 20px;
	transition: all .5s ease;
    height: 42px;
    line-height: 24px;
	color: #fff;
    border: 1px solid hsla(0,0%,100%,.4);
    background: none;
	margin-left: 10px;
`

const Admin = (props) => {

	const [ isWaiting, setWaiting ] = useState(false)
	const [ waitMessage, setWaitMessage ] = useState('Loading...')
    const [ showToast, setShowToast ] = useState(false)
	const [ toastMessage, setToastMessage ] = useState("")
	const [ toastType, setToastType ] = useState(2) // 1: success, 2: error
    const [ creatorInfo, setCreatorInfo ] = useState([])

    const [ newAddress, setNewAddess ] = useState('')
    const managerContract = useNFTCollectionManagerContract()

    useEffect(() => {
        setWaiting(true)
        const loadInfo = async () => {
            const res = await getCreatorList(managerContract)
            if(res.success){
                setCreatorInfo(res.status)
            }    
            console.log("[GD], Collection: res = ", res)
        }
        loadInfo()
        setWaiting(false)
    }, [ managerContract ])

    const onToastClose = () => {
		setShowToast(false);
	}

    const showToastMessage = (msg, type) => {
        setToastMessage(msg)
        setToastType(type)
        setShowToast(true)
    }

    const onAddressChange = (e) => {
        setNewAddess(e.target.value)
    }

    const onAddClick = async () => {
        if(!newAddress){
            showToastMessage("Input Address correctly!", 2)
            return
        }
        const res = await addCreator(managerContract, newAddress)
        console.log("[GD], onAddClick: res = ", res)
        if(res.success)
            showToastMessage("Add Creator successfully!", 1)
        else
            showToastMessage(res.status, 2)
    }

    const onRemoveClick = async () => {
        if(!newAddress){
            showToastMessage("Input Address correctly!", 2)
            return
        }
        const res = await revokeCreator(managerContract, newAddress)
        console.log("[GD], onRemoveClick: res = ", res)
        if(res.success)
            showToastMessage("Revoke Creator successfully!", 1)
        else
            showToastMessage(res.status, 2)
    }

    return (
        <StyledLayout>
            <DefaultLayout walletButton isMovie>
                <SectionContainer style={{maxWidth: 780, margin: '0 auto', flexDirection:"column"}}>
                    <Flex justifyContent="space-between" sx={{mb: 3}} flexDirection={["column", null, "row"]}>
                        <CustomInput style={{marginTop: 24}}  onChange={onAddressChange} value={newAddress} />
                        <Flex sx={{ ml: 3, mt: 3}} justifyContent="end">
                            <Button variant="contained" color="primary" onClick={onAddClick}>Add</Button>
                            <Button variant="contained" color="error" sx={{ml: 3}} onClick={onRemoveClick}>Remove</Button>
                        </Flex>
                    </Flex>
                    <TableContainer style={{color: 'white', borderRadius: "5px", border: "1px solid #fff"}}>
                        <Table aria-label="Collection Table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell> No</StyledTableCell>
                                    <StyledTableCell align="center">Address</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    creatorInfo.map((creator, index) => (
                                        <StyledTableRow
                                            key={creator}
                                            selected
                                        >
                                            <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                            <StyledTableCell align="center">{creator}</StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isWaiting}
                    >
                        <CircularProgress color="inherit" />
                        <span style={{marginLeft: 10}}>{waitMessage}</span>
                    </Backdrop>
                    <Toast
                        open={showToast}
                        message={toastMessage}
                        handleClose={onToastClose}
                        type={toastType}
                    />
                </SectionContainer>
            </DefaultLayout>
        </StyledLayout>
    )
}

export default Admin
