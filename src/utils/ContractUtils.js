// import React from 'react';
// import WalletConnectProvider from '@walletconnect/web3-provider';
// import Web3Modal from 'web3modal';
import Contract from 'web3-eth-contract'
import axios from 'axios'
import Web3 from 'web3'
import BigNumber from 'bignumber.js';
import { getDecimalAmount, getBalanceAmount } from 'utils/formatBalance'

// import NFTCollectionManager from '../contracts/NFTCollectionManager.json';
// import NFTCollectible from '../contracts/NFTCollectible.json';
// import { BIG_TEN } from 'utils/bigNumber';


axios.defaults.xsrfHeaderName = "X-CSRFToken";


const contractABI = {}; // NFTCollectionManager.abi;
const contractNFTABI = {}; // NFTCollectible.abi;

const provider = "provider";
const contractAddress = "0x0000000000000000000000000000000000000000";

const walletProvider = null;
const walletAddress = "";


// const providerOptions = {
//     walletconnect: {
//       package: WalletConnectProvider, // required
//       options: {
//         infuraId: "460f40a260564ac4a4f4b3fffb032dad", // required
//         bridge: "https://bridge.walletconnect.org"
//       }
//     }
// };

// const providerOptions = {
//     walletconnect: {
//       package: WalletConnectProvider, // required
//       options: {
//         infuraId: "460f40a260564ac4a4f4b3fffb032dad", // required
//         bridge: "https://bridge.walletconnect.org"
//       }
//     }
// };



// const web3Modal = new Web3Modal({
//     network: "mainnet", // optional
//     cacheProvider: false, // optional
//     disableInjectedProvider: false,
//     providerOptions // required
// });

// Base Functions
export const getBNBDecimals = () => {
    return 18;
}

export const getWalletProvider = () => {
    return walletProvider;
}
export const getWalletAddres = () => {
    return walletAddress
}

// export const connectWallet = async () => {
//     try{
//         //console.log("Wallet Connecting ... ")
//         await web3Modal.clearCachedProvider()
//         const provider = await web3Modal.connect()
//         const web3 = new Web3(provider)
//         //console.log("web3")

//         web3.eth.extend({
//             methods:[
//                 {
//                     name: "chainId",
//                     call: "eth_chainId",
//                     outputFormatter: web3.utils.hexToNumber
//                 }
//             ]
//         });

//         const chainId = await web3.eth.chainId();
//         if(chainId != 97){ //56: mainnet, 97: testnet
//             return {
//                 address: "",
//                 status: "Please connect to the BSC Mainnet."
//             }
//         }

//         const accounts = await web3.eth.getAccounts();
//         const address = accounts[0];

//         walletProvider = provider;
//         walletAddress = address;
//         //console.log("Connected WalletAddress: ", walletAddress)
//         if(accounts.length > 0) {
//             return {
//                 address: walletAddress,
//                 status: "Success"
//             }
//         } else {
//             return {
//                 address: "",
//                 status: "Connect to wallet"
//             }
//         }
//     } catch(err) {
//         return {
//             address: "",
//             status: err.message
//         }
//     }
    
// }
// export const isWalletConnected = () => {
//     if (walletProvider !== null && walletProvider !== undefined) return true;
//     return false;
// }

// export const disconnectWallet = async () => {
//     //console.log("IsConneted: ", isWalletConnected())
//     //console.log("WalletProvider: ", walletProvider)
//     await web3Modal.clearCachedProvider()
//     if(walletProvider?.disconnect && typeof walletProvider.disconnect === 'function') {
//         await walletProvider.disconnect()        
//     }
//     walletProvider = null
// }

// NFT Collection Manager
// Send Func
export const createCollection = async (
    contract,
    name,
    symbol,
    baseURI,
    price,
    count
    ) => {
    // if(!walletProvider)
    //     return {
    //         success: false,
    //         status: 'Connect to Wallet'
    //     }
    // const web3 = new Web3(walletProvider);

    // const updatedPrice = web3.utils.toWei(price);
    
    // const contract = await new web3.eth.Contract(contractABI, contractAddress)
    // const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))

    try{
        const updatedPrice = getDecimalAmount(new BigNumber(price));
        const res = await contract.createCollection(name, symbol, baseURI, updatedPrice, count)
        const collectionAddress = res.events.CollectionCreated.returnValues.createdAt
        // let tokenId = res.events.MintNewToken.returnValues['tokenId']
        console.log("Result : ", res);

        return {
            success: true,
            status: collectionAddress
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

// Send Func
export const addCreator = async (contract, creatorAddress) => {
    // if(!walletProvider)
    //     return {
    //         success: false,
    //         status: 'Connect to Wallet'
    //     }
    // const web3 = new Web3(walletProvider);
    // const contract = await new web3.eth.Contract(contractABI, contractAddress)
    
    try{
        const res = await contract.addCreator(creatorAddress)

        // let collectionAddress = res.events.CollectionCreated.returnValues['createdAt']

        // let tokenId = res.events.MintNewToken.returnValues['tokenId']
        console.log("Result : ", res);

        return {
            success: true,
            status: ""
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

// Call Funcs
export const getCollectionListByName = async (tokenName)  => {
    Contract.setProvider(provider)
    const contract = new Contract(contractABI, contractAddress)
    try{
        const res = await contract.methods.getCollectionListByName(tokenName).call()
        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const getCollectionListByOwner = async (ownerAddress)  => {
    Contract.setProvider(provider)
    const contract = new Contract(contractABI, contractAddress)
    try{
        const res = await contract.methods.getCollectionListByOwner(ownerAddress).call()
        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const getAllCollectionAddressList = async ()  => {
    Contract.setProvider(provider)
    const contract = new Contract(contractABI, contractAddress)
    try{
        const res = await contract.methods.getAllCollectionAddressList().call()
        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const getAllDetailedCollectionList = async (contract)  => {
    // Contract.setProvider(provider)
    // const contract = new Contract(contractABI, contractAddress)
    try{
        // const res = await contract.methods.getAllDetailedCollectionList().call()
        let res = await contract.getAllDetailedCollectionList();

        const length = res.length;
        // console.log("[GD], Before UPdate : ", res);
        if (length > 0) {
            const web3 = new Web3();
            res = res.map((item, index) => {

                return {...item, price:web3.utils.fromWei(`${item.price}`), count: item.count.toNumber()};
            })
            
        }
        console.log("[GD], After UPdate : ", res);
        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

// Newly Added
export const hasAdminRole = async (to)  => {
    Contract.setProvider(provider)
    const contract = new Contract(contractABI, contractAddress)
    try{
        const res = await contract.methods.hasAdminRole(to).call()
        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const getAdminList = async ()  => {
    Contract.setProvider(provider)
    const contract = new Contract(contractABI, contractAddress)
    try{
        const res = await contract.methods.getAdminList().call()
        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const getCreatorList = async (contract)  => {
    // Contract.setProvider(provider)
    // const contract = new Contract(contractABI, contractAddress)
    try{
        console.log("[GD], contract = ", contract)
        const res = await contract.getCreatorList()
        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const revokeCreator = async (contract, to)  => {
    // Contract.setProvider(provider)
    // const contract = new Contract(contractABI, contractAddress)
    try{
        const res = await contract.revokeCreator(to)
        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const addAdmin = async (adminAddress) => {
    if(!walletProvider)
        return {
            success: false,
            status: 'Connect to Wallet'
        }
    const web3 = new Web3(walletProvider);
    const contract = await new web3.eth.Contract(contractABI, contractAddress)
    
    try{
        const res = await contract.methods.addAdmin(adminAddress).send({
            from: walletAddress
        });
        console.log("Result : ", res);

        return {
            success: true,
            status: ""
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const revokeAdmin = async (to)  => {
    Contract.setProvider(provider)
    const contract = new Contract(contractABI, contractAddress)
    try{
        const res = await contract.methods.revokeAdmin(to).call()
        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const mintNFTs = async (contract, collectionAddr, count, price) => {
    // if(!walletProvider)
    //     return {
    //         success: false,
    //         status: 'Connect to Wallet'
    //     }
    // const web3 = new Web3(walletProvider);
    // const contract = await new web3.eth.Contract(contractABI, contractAddress)
    const web3 = new Web3()
    const totalPrice = web3.utils.toWei(`${count * price}`)
    try{
        const res = await contract.mintNFTs(collectionAddr, count, {value: totalPrice})

        return {
            success: true,
            status: ""
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const getAllTokensForUser = async (contract, addr)  => {
    // Contract.setProvider(provider)
    // let contract = new Contract(contractABI, contractAddress)
    try{
        const res = await contract.getAllTokensForUser(addr)
        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}


/* NFT Functions */
// Not done
export const setItemPrice = async (contractAddr, newItemPrice) => {
    if(!walletProvider)
        return {
            success: false,
            status: 'Connect to Wallet'
        }
    const web3 = new Web3(walletProvider);
    const contract = await new web3.eth.Contract(contractNFTABI, contractAddr)

    const itemPrice = web3.utils.toWei(newItemPrice);
    
    try{
        const res = await contract.methods.setItemPrice(itemPrice).send({
            from: walletAddress
        });

        // let collectionAddress = res.events.CollectionCreated.returnValues['createdAt']

        // let tokenId = res.events.MintNewToken.returnValues['tokenId']
        console.log("Result : ", res);

        return {
            success: true,
            status: ""
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const setBaseURI = async (contractAddr, newURI) => {
    if(!walletProvider)
        return {
            success: false,
            status: 'Connect to Wallet'
        }
    const web3 = new Web3(walletProvider);
    const contract = await new web3.eth.Contract(contractNFTABI, contractAddr)
    
    try{
        const res = await contract.methods.setBaseURI(newURI).send({
            from: walletAddress
        });

        // let collectionAddress = res.events.CollectionCreated.returnValues['createdAt']

        // let tokenId = res.events.MintNewToken.returnValues['tokenId']
        console.log("Result : ", res);

        return {
            success: true,
            status: ""
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

// export const createNFTs = async (contractAddr, count) => {
//     if(!walletProvider)
//         return {
//             success: false,
//             status: 'Connect to Wallet'
//         }
//     const web3 = new Web3(walletProvider);
//     const contract = await new web3.eth.Contract(contractNFTABI, contractAddr)
    
//     try{
//         const res = await contract.methods.createNFTs(count).send({
//             from: walletAddress
//         });

//         // let collectionAddress = res.events.CollectionCreated.returnValues['createdAt']

//         // let tokenId = res.events.MintNewToken.returnValues['tokenId']
//         console.log("Result : ", res);

//         return {
//             success: true,
//             status: ""
//         }
//     }catch(err){
//         return {
//             success: false,
//             status: err.message
//         }
//     }
// }


// BN -> val
export const getItemPrice = async (contractAddr)  => {
    Contract.setProvider(provider)
    const contract = new Contract(contractNFTABI, contractAddr)
    try{
        let res = await contract.methods.getItemPrice().call()

        res = new Web3().utils.fromWei(res);

        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const totalCount = async (contractAddr)  => {
    Contract.setProvider(provider)
    const contract = new Contract(contractNFTABI, contractAddr)
    try{
        const res = await contract.methods.totalCount().call()

        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const getContractInfo = async (contractAddr)  => {
    Contract.setProvider(provider)
    const contract = new Contract(contractNFTABI, contractAddr)
    try{
        let res = await contract.methods.getContractInfo().call();
        
        res = {...res, 4:new Web3().utils.fromWei(res[4])};

        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const tokensOfOwner = async (contractAddr, addrOwner)  => {
    Contract.setProvider(provider)
    const contract = new Contract(contractNFTABI, contractAddr)
    try{
        const res = await contract.methods.tokensOfOwner(addrOwner).call();

        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const getMintedCount = async (contract)  => {
    // Contract.setProvider(provider)
    // const contract = new Contract(contractNFTABI, contractAddr)
    try{
        const res = await contract.getMintedCount()
        
        return {
            success: true,
            status: res
        }
    }catch(err){
        return {
            success: false,
            status: err.message
        }
    }
}

export const toWei = (price) => {
    const web3 = new Web3()
    const updatedPrice = web3.utils.toWei(price);
    return updatedPrice
}

export const fromWei = (price) => {
    const web3 = new Web3()
    const updatedPrice = web3.utils.fromWei(price);
    return updatedPrice
}

// function withdraw() external payable override onlyOwner


const ContractUtils = {
    getBNBDecimals,
    getWalletProvider,
    getWalletAddres,
    // connectWallet,
    // disconnectWallet,
    // isWalletConnected,
    // NFT collection
    createCollection,
    getCollectionListByName,
    getCollectionListByOwner,
    getAllCollectionAddressList,
    getAllDetailedCollectionList,
    getAdminList,
    getCreatorList,
    getAllTokensForUser,
    addCreator,
    revokeCreator,
    addAdmin,
    revokeAdmin,    

    mintNFTs,



    // NFT Compatible
    setItemPrice,
    setBaseURI,

    getItemPrice,
    totalCount,
    tokensOfOwner,
    getContractInfo,

    getMintedCount,

    toWei,
    fromWei
};

export default ContractUtils;