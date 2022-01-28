import Cookies from 'js-cookie'
import { ethers } from 'ethers'

if (!process.env.REACT_APP_NODE_1 || !process.env.REACT_APP_NODE_2) {
  throw Error('One base RPC URL is undefined')
}

// Array of available nodes to connect to
export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2]

const nodesSortByFaster = []
nodes.forEach((rpcNode) => {
  const test = new ethers.providers.JsonRpcProvider(rpcNode)
  const currentBlock = test.getBlockNumber()

  currentBlock.then(() => {
    nodesSortByFaster.push(rpcNode)
    Cookies.set('bestRPC', nodesSortByFaster[0])
  })
})

const getNodeUrl = () => {
  return Cookies.get('bestRPC') || nodes[0]
}

export default getNodeUrl
