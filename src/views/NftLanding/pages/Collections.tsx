import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core';
import { Pagination } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useNFTCollectionManagerContract } from 'hooks/useContract';
import { getAllTokensForUser, fromWei } from 'utils/ContractUtils';
import DefaultLayout from './Layout'
import SectionContainer from '../components/SectionContainer'
import NFTCard from '../components/NFTCard'
import Toast from '../components/Toast';

const ITEM_COUNT_PER_PAGE = 8;

const StyledLayout = styled.div`
	background: linear-gradient(139.73deg, rgb(7 11 26) 0%,rgb(0 0 0) 100%);
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

const getCollectionItems = (collections, page) => {
	const items = [];
	const stIndex = (page - 1) * ITEM_COUNT_PER_PAGE;
	for(let i = 0;i<ITEM_COUNT_PER_PAGE;i++){
		if(!collections[i + stIndex])
			break;
		items[i] = collections[i + stIndex]
	}
	const res = items.map(item => {
		return (<NFTCard key={item.uri + item.id} item={item} />)
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
				<img src="/images/nftadmin/gray-image.png" style={{width:"40%", margin: 'auto'}} alt="No files" />
				<span style={{
					fontSize: '30px',
					color: 'grey',
					margin: 'auto 0px'
				}}>No Files...</span>
		</div>
	)
}


const Collections = () => {
	const { account } = useWeb3React()
	const [ page, setPage ] = useState(1)
	const [ isWaiting, setWaiting ] = useState(false)
	const [ waitMessage, setWaitMessage ] = useState('')
	const [ showToast, setShowToast ] = useState(false)
	const [ toastMessage, setToastMessage ] = useState("")
	const [ toastType, setToastType ] = useState(2) // 1: success, 2: error
	const [ collectionInfo, setCollectionInfo ] = useState([])

	const [ isFirst, setIsFirst ] = useState(true)

	const managerContract = useNFTCollectionManagerContract()

	useEffect(() => {
		const loadInfo = async () => {
			const res = await getAllTokensForUser(managerContract, account)
			console.log("[GD], getAllTokensForUser: res = ", res)
			if(res.success) {
				const colInfo = []
				res.status.map(collection => {
					if(collection.id.length>0){
						const tmpCol = {
							name: collection.collectionName,
							symbol: collection.collectionSymbol,
							price: fromWei(`${collection.price}`),
							uri: collection.uri
						}
						collection.id.map(colId => {
							return colInfo.push({...tmpCol, id: fromWei(`${colId}`)})
						})
					}
					return true
				})
				setCollectionInfo(colInfo)
				setIsFirst(false)
			}
		}
		if(account && isFirst){
			loadInfo()
		}		
	}, [managerContract, account, isFirst])

	const onToastClose = () => {
		setShowToast(false);
	}

	const onPageChange = (e, value) => {
		setPage(value)
	}

    return (
		<StyledLayout>
			<DefaultLayout>
				<SectionContainer style={{flexDirection: "column"}}>
					<Pagination 
						count={Math.ceil(collectionInfo.length / ITEM_COUNT_PER_PAGE)} page={page} onChange={onPageChange} variant="outlined" shape="rounded" color="standard" size="large" sx={{display:'flex'}} />

					{/* style={{minHeight: 500,width: "90%"}} */}
					<CollectionContainer >
						{collectionInfo.length !== 0 ? getCollectionItems(collectionInfo, page) : (<EmptyCollectionContainer />)}
					</CollectionContainer>
				</SectionContainer>
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

export default Collections