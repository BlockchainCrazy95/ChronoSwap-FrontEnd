import { Token, ChainId } from '@pancakeswap/sdk'
import tokens from './tokens'
import farms from './farms'
import { Ifo } from './types'

const cakeBnbLpToken = new Token(ChainId.TESTNET, farms[1].lpAddresses[ChainId.TESTNET], 18, farms[1].lpSymbol)

const ifos: Ifo[] = [
  {
    id: 'cnft',
    address: '0xaf80E16aC8232C0fb32562B8F5606239a203f2ca',
    isActive: true,
    name: 'Chronoswap NFT (CNFT)',
    poolUnlimited: {
      saleAmount: '500,000 CNFT',
      raiseAmount: '375,000 CNO',
      cakeToBurn: '0',
      distributionRatio: 1,
    },
    currency: tokens.cake,
    token: tokens.cnft,
    releaseBlockNumber: 1142100,
    campaignId: '0',
    articleUrl: 'https://chronoswap.medium.com/introducing-chronoswap-new-token-the-cnft-2e652b950e7e',
    tokenOfferingPrice: 0.1,
    version: 1,
  },
]

export default ifos
