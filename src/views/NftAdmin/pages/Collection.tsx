import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useNFTCollectionManagerContract } from 'hooks/useContract';
import { getAllDetailedCollectionList } from 'utils/ContractUtils'
import { ellipseAddress } from 'utils'
import DefaultLayout from './Layout'
import SectionContainer from '../components/SectionContainer'

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

const Collection = (props) => {
    const { account } = useWeb3React()
	const [ isWaiting, setWaiting ] = useState(false)
	const [ waitMessage, setWaitMessage ] = useState('Loading...')
    const [ collectionInfo, setCollectionInfo ] = useState([])

    const managerContract = useNFTCollectionManagerContract()

    useEffect(() => {
        setWaiting(true)
        const loadInfo = async () => {
            const res = await getAllDetailedCollectionList(managerContract)
            console.log("[GD], Collection: res = ", res)
            if(res.success){
                setCollectionInfo(res.status)
            }
        }
        if(account){
            loadInfo()
        }
        setWaiting(false)
    }, [managerContract, account ])

    return (
        <StyledLayout>
            <DefaultLayout walletButton>
                <SectionContainer>
                    <TableContainer style={{color: 'white', borderRadius: "5px", border: "1px solid #fff"}}>
                        <Table aria-label="Collection Table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell> No</StyledTableCell>
                                    <StyledTableCell align="center">Collection Name</StyledTableCell>
                                    <StyledTableCell align="center">Symbol</StyledTableCell>
                                    <StyledTableCell align="center">Address</StyledTableCell>
                                    <StyledTableCell align="center">Count</StyledTableCell>
                                    <StyledTableCell align="center">Price</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    collectionInfo.map((collection, index) => (
                                        <StyledTableRow
                                            key={collection.addr}
                                            selected
                                        >
                                            <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                            <StyledTableCell align="center">{collection.name}</StyledTableCell>
                                            <StyledTableCell align="center">{collection.symbol}</StyledTableCell>
                                            <StyledTableCell align="center">{ellipseAddress(collection.addr)}</StyledTableCell>
                                            <StyledTableCell align="center">{collection.count}</StyledTableCell>
                                            <StyledTableCell align="center">{collection.price}</StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }
                                {/* rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        selected={true}
                                        
                                    >
                                        <CustomCell  component="th" scope="row">
                                            {row.name}
                                        </CustomCell>
                                        <CustomCell align="right">{row.calories}</CustomCell>
                                        <CustomCell align="right">{row.fat}</CustomCell>
                                        <CustomCell align="right">{row.carbs}</CustomCell>
                                        <CustomCell align="right">{row.carbs}</CustomCell>
                                        <CustomCell align="right">{row.carbs}</CustomCell>
                                    </TableRow>
                                )) */}
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
                </SectionContainer>
            </DefaultLayout>
        </StyledLayout>
    )
}

export default Collection
