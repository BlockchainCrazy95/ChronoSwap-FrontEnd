import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled as muiStyled } from '@mui/material/styles';
import { blue, blueGrey, indigo  } from '@mui/material/colors';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import { Table, TableContainer, TableHead, TableBody, TableRow} from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3'
import { ethers } from 'ethers'
import useActiveWeb3React from 'hooks/useActiveWeb3React';

import { getAllDetailedCollectionList, getMintedCount, mintNFTs } from 'utils/ContractUtils';
import { useNFTCollectionManagerContract } from 'hooks/useContract'
import {
    getNFTCollectionManagerAddress
} from 'utils/addressHelpers'
;
import Flex from '../../components/Flex'
import SectionContainer from '../../components/SectionContainer'
import Toast from '../../components/Toast';
import NFTCollectibleJSON from '../../contracts/NFTCollectible.json'
// import NFTCollectionManagerJSON from '../../contracts/NFTCollectionManager.json'

const NFTCollectibleABI = NFTCollectibleJSON.abi
// const NFTCollectionManagerABI = NFTCollectionManagerJSON.abi

const MAX_BUY_COUNT = 1000

const RandomCard = styled.div`
    width: 230px;
    height: 230px;
    background-color: #16151A;
    border-radius: 15px;
    box-shadow: 0 3px 20px 0px rgba(0,0,0, 12);
    transition-property: opacity, transform, -webkit-transform;
    display: flex;
    padding-left: 20px;
`
const CustomInput = styled.input`
    text-align: center;
    border: 1px solid grey;
    border-radius: 20px;
    font-size: 28px;
    line-height: 32px;
    background-color: transparent;
    width:150px;
    margin: 0px 30px;
    color: #ffffff;
`
const PriceText = styled.p`
    color: white;
    margin-top: 15px;
    font-size: 24px;
`
const InfoText = styled.p`
    color: white;
    margin-top: 15px;
    font-size: 18px;
`

const MintButton = muiStyled(Button)(({ theme }) => ({
    color: "#fff",
    background: "linear-gradient(45deg,#e73f76 23%,#e73f76 23%,#873fe6 70%)",
    '&:hover': {
        background: "#fff",
        color: "#e73f76",
        fontWeight: 'bold'
    }
}))

const ControlButton = muiStyled(Button)(({ theme }) => ({
    marginLeft: 20,
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: "#e73f76",// indigo[500],
    '&:hover': {
      backgroundColor: indigo[800],
    },
}));

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

const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
        minWidth: 200
    },{
        id: "symbol",
        numeric: false,
        disablePadding: false,
        label: "Symbol",
        minWidth: 100
    },{
        id: "price",
        numeric: false,
        disablePadding: false,
        label: "Price",
        minWidth: 100
    },{
        id: "count",
        numeric: false,
        disablePadding: false,
        label: "Count",
        minWidth: 100
    }
]

const MintingSection = () => {
    const { account } = useWeb3React()

    const [ price, setPrice ] = useState(0)
    const [ buyCount, setBuyCount ] = useState(1)
    const [ count, setCount] = useState(0)
    const [ totalCount, setTotalCount] = useState(0)
    const [ contractAddress, setContractAddress] = useState()
    
    const [ isWaiting, setWaiting ] = useState(false)
	const [ waitMessage, setWaitMessage ] = useState('Loading...')
    const [ showToast, setShowToast ] = useState(false)
	const [ toastMessage, setToastMessage ] = useState("")
	const [ toastType, setToastType ] = useState(2) // 1: success, 2: error
    
    const [ collectionInfo, setCollectionInfo ] = useState([])
    const [ selIndex, setSelIndex ] = useState(0)
    const { library } = useActiveWeb3React()
    // const web3 = new Web3(library)

    const [ isFirst, setIsFirst ] = useState(true)

    const managerContract = useNFTCollectionManagerContract()    
    useEffect(() => {
        console.log("[GD], MintingSection:useEffect:account = ", account)
        if(!isFirst) return
        setWaiting(true)
        const loadInfo = async () => {
            const res = await getAllDetailedCollectionList(managerContract)
            console.log("[GD], MintingSection res = ", res)
            if(res.success){
                setCollectionInfo(res.status)
                if(res.status.length){
                    setPrice(res.status[0].price)
                    setTotalCount(res.status[0].count)
                    setContractAddress(res.status[0].addr)
                    // getMintedCountInfo(res.status[0].addr)
                }
                setIsFirst(false)
            }
        }
        if(account){
            loadInfo()
        }
        setWaiting(false)
    }, [ managerContract, account, isFirst ])

    // const getNFTContract = async (addr) => {
    //     return useNFTCollectibleContract(addr)
    // }

    const onToastClose = () => {
		setShowToast(false);
	}

    const showToastMessage = (msg, type) => {
		setToastMessage(msg)
		setToastType(type)
		setShowToast(true)
	}

    const getMintedCountInfo = async (addr) => {
        setWaiting(true)
        const nftContract = new ethers.Contract(addr, NFTCollectibleABI, library.getSigner())
        const res = await getMintedCount(nftContract)
        if(res.success)
            setCount(parseInt(res.status))
        else
            setCount(0)
        setWaiting(false)
    }

    const onRowClick = async (index) => {
        setPrice(collectionInfo[index].price)
        setTotalCount(collectionInfo[index].count)
        setSelIndex(index)
        setContractAddress(collectionInfo[index].addr)
        getMintedCountInfo(collectionInfo[index].addr)
    }

    const onRemoveClick = () => {
        if(buyCount === 1) return
        setBuyCount(buyCount - 1)
    }

    const onAddClick = () => {
        if(buyCount >= MAX_BUY_COUNT) return
        setBuyCount(buyCount + 1)
    }

    const onMintClick = async () => {
        if(buyCount + count > totalCount) {
            showToastMessage(`Cannot mint more than ${totalCount}`, 2)
            return;
        }
        if(!account) return;
        setWaiting(true)
        // const res = await ContractUtils.mintNFTs(contractAddress, buyCount, price);
        // const nftContract = new ethers.Contract(contractAddress, NFTCollectibleABI, library.getSigner())
        // console.log("[GD], mintNFTs.nftContract=", nftContract)
        // console.log("[GD], mintNFTs.contractAddress=", contractAddress)
        const res = await mintNFTs(managerContract, contractAddress, buyCount, price)
        console.log("[GD], mintNFTs.res=", res)
        if(!res.success){
            showToastMessage(res.status, 2)
        }else{
            setCount(count + buyCount)
            setBuyCount(1)
        }
        setWaiting(false)
    }

    const onBuyCountChange = (e) => {
        const val = parseInt(e.target.value)
        if(Number.isNaN(val))
            setBuyCount(1) 
        else if(val > MAX_BUY_COUNT)
            setBuyCount(MAX_BUY_COUNT)
        else if(val <= 0)
            setBuyCount(1)
        else
            setBuyCount(val)
    }

    return (
        <SectionContainer style={{paddingTop: 100, background: "radial-gradient(closest-side, rgb(7 11 26), rgb(21 27 50), rgb(7 11 26))", justifyContent:"center"}}>
            <Flex flexDirection={["column", null, "row"]} justifyContent="space-between" style={{width: "100%"}}>
                <Flex flex="1" flexDirection="row" alignItems="center" justifyContent="center" >
                    <TableContainer sx={{height: 500, width: "100%", borderRadius: "5px", border: "1px solid #fff", overflowY: 'scroll'}}>
                        <Table stickyHeader aria-label=" table">
                            <TableHead>
                                <StyledTableRow>
                                    {headCells.map(cell => (
                                        <StyledTableCell
                                            key={cell.id}
                                            align='center'
                                            style={{minWidth: cell.minWidth, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}
                                        >
                                            {cell.label}
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {collectionInfo.map((collection, index) => {
                                    const isSel = index === selIndex
                                    return (
                                    <StyledTableRow 
                                        key={collection.addr} 
                                        role="checkbox" hover tabIndex={-1} onClick={() => onRowClick(index)}
                                        aria-checked={isSel} selected={isSel}
                                    >
                                        <StyledTableCell align='center'>{collection.name}</StyledTableCell>
                                        <StyledTableCell align='center'>{collection.symbol}</StyledTableCell>
                                        <StyledTableCell align='center'>{collection.price}</StyledTableCell>
                                        <StyledTableCell align='center'>{collection.count}</StyledTableCell>
                                    </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Flex>
                <Flex flex="1" flexDirection="column" alignItems="center" sx={{zIndex: 2, mt: [5, 5, 0]}}>
                    <RandomCard >
                        <img src="images/nftlanding/question-mark.svg" alt="quiz" style={{margin:"0 auto"}} />
                    </RandomCard>
                    <Flex flexDirection="row" sx={{mt:3}}>
                        <ControlButton variant="contained" onClick={onRemoveClick}> <RemoveIcon /> </ControlButton>
                        <CustomInput value={buyCount} onChange={onBuyCountChange} />
                        <ControlButton variant="contained" onClick={onAddClick} > <AddIcon/> </ControlButton>
                    </Flex>
                    <PriceText>Cost: {Number.isNaN(price * buyCount)?0:(price*buyCount)} CRO</PriceText>
                    <MintButton variant="contained" style={{borderRadius: 25, width: 120, height: 42}} onClick={onMintClick}>Mint</MintButton>
                    <InfoText> Sold: {count} / {totalCount}</InfoText>
                </Flex>
            </Flex>
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
    )
}

export default MintingSection