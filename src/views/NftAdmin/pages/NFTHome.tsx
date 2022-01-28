import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import { ListItem, ListItemButton, ListItemText, Pagination, PaginationItem,Table, TableHead, TableBody, TableContainer, TableCell, TableRow } from '@mui/material';
import { Flex } from '@pancakeswap/uikit'
import { tableCellClasses } from '@mui/material/TableCell'
import { useNFTCollectionManagerContract } from 'hooks/useContract';

import {createCollection, getAllDetailedCollectionList} from 'utils/ContractUtils';
import DefaultLayout from './Layout'
import Toolbar from '../components/Toolbar'
import NFTCard from '../components/NFTCard'
import IPFSUtils from '../utils/IPFSUtils';
import Toast from '../components/Toast';


const ITEM_COUNT_PER_PAGE = 8;

interface FileProps {
	name?: string
}

const CollectionInfoSection = styled.section`
	padding: 80px 30px 50px;
	display: flex;
`

const LandingSection = styled.section`
	//background-image: url('/images/nftadmin/landing.png');
	background-size: 80% auto;
	background-repeat: no-repeat;
	//min-height: 760px;
	//height: calc(100vh - 80px - 50px);
	background-position-x: 50%;
	background-position-y: 30%;
	padding: 0px 30px 50px;
`
const CollectionContainer = styled.div`
	margin: 0 auto;
	//background-color: rgba(255, 255, 255, 0.8);
	margin-top: 20px;
	//box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	padding: 10px 15px;
	//border: 1px solid #202020;
	display: flex;
	justify-content: space-between;
	flex-flow: row wrap;
`
/* display: grid;
	grid-template-columns: auto auto auto auto;
	grid-template-rows: auto auto auto;
	@media (max-width: 900px) {
		grid-template-columns: auto auto auto;
		grid-template-rows: auto auto auto auto;
		padding: 6px;
	}
	@media (max-width: 795px) {
		grid-template-columns: auto auto;
		grid-template-rows: auto auto auto auto auto auto;
		padding: 4px;
	} */
const CustomLabel = styled.span`
	font-size: 20px;
	color: white;
	margin: auto;
`
const CustomInput = styled.input`
	display: inline;
	border: 1px solid hsla(0,0%,100%,.2);
	background: none;
	padding: 10px 40px 10px 25px;
	color: white!important;
	border-radius: 20px;
	transition: all .5s ease;
    height: 42px;
    font-size: 18px;
    line-height: 24px;
	color: #fff;
    border: 1px solid hsla(0,0%,100%,.4);
    background: none;
	margin-left: 10px;
`

const StyledLayout = styled.div`
	background: linear-gradient(139.73deg, rgb(7 11 26) 0%,rgb(0 0 0) 100%);
`
const styles = {
	title:{
		fontSize: '45px'
	}
}
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
// const items = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
// const items = []

const getCollectionItems = (files, page) => {
	const items = [];
	const stIndex = (page - 1) * ITEM_COUNT_PER_PAGE;
	for(let i = 0;i<ITEM_COUNT_PER_PAGE;i++){
		if(!files[i + stIndex])
			break;
		items[i] = files[i + stIndex]
	}
	const res = items.map(item => {
		return (<NFTCard key={item.path} file={item.content} />)
	})
	if(items.length && items.length % 4 !== 0){
		for(let i = 0;i<4-items.length%4;i++){
			res.push(<NFTCard key={`NFT${i}`} isEmpty />)
		}
	}
	return res
}

const EmptyCollectionContainer = () => {
	return (
		<div style={{
			width: '100%',
			minHeight: 500,
			border: '1px dashed grey',
			borderRadius: 10,
			backgroundColor: "#20202080",
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-around',
			alignItems: 'center'
		}}>
				{/* <div style={{
					minHeight: 200,
					backgroundImage: "url('/assets/images/gray-image.png')",
					backgroundSize: '100%',
					backgroundRepeat: 'no-repeat'
				}}
				>
				</div> */}
				<img src="/images/nftadmin/gray-image.png" style={{width:"40%", margin: 'auto'}} alt="No files" />
				<span style={{
					fontSize: '30px',
					color: 'grey',
					margin: 'auto 0px'
				}}>No Files...</span>
		</div>
	)
}

const NFTHome = () => {
	// const creator = useSelector(state => state.home.address)
	const { account } = useWeb3React()

	const [ page, setPage ] = useState(1)
	const [ isWaiting, setWaiting ] = useState(false)
	const [ waitMessage, setWaitMessage ] = useState('')
	const [ showToast, setShowToast ] = useState(false)
	const [ toastMessage, setToastMessage ] = useState("")
	const [ toastType, setToastType ] = useState(2) // 1: success, 2: error
	
	const [ fileList, setFileList ] = useState([])
	const [ collectionName, setCollectionName ] = useState('')
	const [ collectionSymbol, setCollectionSymbol ] = useState('')
	const [ collectionPrice, setCollectionPrice ] = useState('')
	const [ collectionInfo, setCollectionInfo ] = useState([])

	const nftCollectionManagerContract = useNFTCollectionManagerContract();

	useEffect(() => {
		console.log("[GD], useEffect")
		setWaitMessage("Loading...")
		// setWaiting(true)
		const loadInfo = async () => {
			console.log("[GD], loadInfo, nftCollectionManagerContract = ", nftCollectionManagerContract)		
			// const res = await nftCollectionManagerContract.getAllDetailedCollectionList()
			// let res = await ContractUtils.getAllDetailedCollectionList()
			const res = await getAllDetailedCollectionList(nftCollectionManagerContract);
			console.log("[GD], Res: " , res)
			if(res.success){
				setCollectionInfo(res.status)
			}	
		}
		if (account) {
			loadInfo();
		}
		// setWaiting(false)
	}, [nftCollectionManagerContract, account])
	
	const onPageChange = (e, value) => {
		setPage(value)
	}

	const onToastClose = () => {
		setShowToast(false);
	}

	const onFileSelected = (e) => {
		if(e.target.files.length === 0) {
			return;
		}
		setWaitMessage("Loading...")
		setWaiting(true)
		const fileObjectsArray = Array.from(e.target.files).map((file:FileProps) => {
			const name = file.name.replace(".png", "")
            return {
                path: name,
                content: file
            }
        })
		setFileList(fileObjectsArray)
		setWaiting(false)
	}

	const showToastMessage = (msg, type) => {
		setToastMessage(msg)
		setToastType(type)
		setShowToast(true)
	}

	const onMintClick = async () => {
		try{
			if(collectionName.trim() === '' || collectionSymbol.trim() === '' || collectionPrice.trim() === '' || fileList.length === 0) {
				showToastMessage("Input collection infos before creation", 2)
				return;
			} 
			if(!account) {
				showToastMessage("Connect wallet", 2)
				return;
			}
			setWaitMessage("Uploading...")
			setWaiting(true)
			let baseURI = await IPFSUtils.uploadFolderToIPFS(fileList)
			if(baseURI[baseURI.length - 1] !== "/")
				baseURI += "/"
			console.log("[GD], baseURI = ", baseURI)
			setWaitMessage("Creating Collection...")
			const res = await createCollection(nftCollectionManagerContract, collectionName, collectionSymbol, baseURI, collectionPrice, fileList.length);
			const nftContractAddress = res.status
			// console.log("[GD], nftContractAddress = ", nftContractAddress)
			setWaiting(false)
			if(!res.success){
				showToastMessage(res.status, 2)
			}else{
				showToastMessage("Created Successfully!", 1)
				console.log("[GD], Created Successfully")
				const newCol = collectionInfo
				newCol.push({
					name: collectionName,
					symbol: collectionSymbol,
					addr: nftContractAddress,
					price: collectionPrice,
					count: fileList.length
				})
				console.log("[GD], newCol: ", newCol)
				setCollectionInfo(newCol)
			}
		} catch(err) {
			// showToastMessage(err.message, 2)
		} finally {
			setWaiting(false)
		}
		
	}

	const onCollectionNameChange = (e) => {
		setCollectionName(e.target.value)
	}
	const onCollectionSymbolChange = (e) => {
		setCollectionSymbol(e.target.value)
	}
	const onCollectionPriceChange = (e) => {
		setCollectionPrice(e.target.value)
	}
	return (
		<StyledLayout>
			<DefaultLayout walletButton isMovie>
				<CollectionInfoSection style={{flexDirection:"column"}}>
					<Flex justifyContent="space-between" alignItems = "center">
						<div className='gradient-text' style={styles.title}>Collection Info</div>
						{/* <div>
							<CustomInput placeholder='Search by Name/Address' value="" />
						</div> */}
					</Flex>
					<Flex flexDirection={["column", null, "row"]} justifyContent="space-around">
						<Flex flexDirection="column" mr={3} >
							{/* <CustomInput placeholder='Collection Address' style={{marginBottom: 10, marginRight: 10, borderRadius:"5px"}} value=""/> */}
							{/* <Box
								sx={{ width: 340, height: 280, maxWidth: 500, bgcolor: 'transparent', border: '1px solid grey', color: 'white', mr: "15px", margin: '0 auto', borderRadius: "5px"}}
							>
								<ListItem component="div" disablePadding>
									<ListItemButton>
										<ListItemText primary={`Item 3`} />
									</ListItemButton>
								</ListItem>
							</Box> */}
							<TableContainer sx={{ minWidth: 300, maxHeight: 280, color: 'white!important', borderRadius: "5px", border: "1px solid #fff"}}>
								<Table stickyHeader aria-label=" table">
									<TableHead>
										<StyledTableRow>
											{["Name", "Symbol"].map(column => (
												<StyledTableCell
													key={column}
													align='center'
													style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}
												>
													{column}
												</StyledTableCell>
											))}
										</StyledTableRow>
									</TableHead>
									<TableBody>
										{collectionInfo.map(collection => (
											<StyledTableRow key={collection.addr} hover tabIndex={-1} >
												<StyledTableCell align='center'>{collection.name}</StyledTableCell>
												<StyledTableCell align='center'>{collection.symbol}</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Flex>
						<Flex flexDirection="column" justifyContent="space-between">
							<Flex flexDirection={["column", null, null, "row"]} justifyContent="space-between">
								<div style={{margin:"30px 10px 0px 10px", display:'flex'}}><CustomLabel>Name:</CustomLabel> <CustomInput onChange={onCollectionNameChange} value={collectionName}/></div>
								<div style={{margin:"30px 10px 0px 10px", display:'flex'}}><CustomLabel>Symbol:</CustomLabel> <CustomInput onChange={onCollectionSymbolChange} value={collectionSymbol} /></div>
							</Flex>
							<Flex flexDirection={["column", null, null, "row"]} justifyContent="space-between">
								<div style={{margin:"30px 10px 0px 10px", display:'flex'}}>
									<CustomLabel>Price:</CustomLabel>
									<CustomInput onChange={onCollectionPriceChange} value={collectionPrice}/>
								</div>
								<div style={{margin:"30px 10px 0px 10px", display:'flex'}}>
									<CustomLabel>Count:</CustomLabel>
									<CustomInput value={fileList.length} readOnly />
								</div>
							</Flex>
							<div style={{margin:"30px 10px 0px 10px", display:'flex'}}><CustomLabel>Create By:</CustomLabel> <CustomInput style={{width: "500px"}} value={account} readOnly /></div>
							{/* <Flex justifyContent={["center", null, "end"]}>
								<Button variant="contained" color="error" sx={{float: 'right', mt: 2}}>Create</Button>
							</Flex> */}
						</Flex>
					</Flex>
				</CollectionInfoSection>
				<LandingSection>
					<div style={{display: 'flex', justifyContent:'space-between'}}>
						<div className='gradient-text' style={styles.title}>Mint</div>
						<Pagination 
							count={Math.ceil(fileList.length / ITEM_COUNT_PER_PAGE)} page={page} onChange={onPageChange} variant="outlined" shape="rounded" color="standard" size="large" sx={{display:'flex'}} />
						<Toolbar
							onFileSelected={onFileSelected}
							onMintClick={onMintClick}
						/>
					</div>
					<CollectionContainer>
						{fileList.length !== 0 ? getCollectionItems(fileList, page) : (<EmptyCollectionContainer />)}
					</CollectionContainer>
				</LandingSection>
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
			</DefaultLayout>
		</StyledLayout>
	)
}

export default NFTHome;