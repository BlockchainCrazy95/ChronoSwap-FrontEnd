import { ChainId, Token } from '@pancakeswap/sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { SerializedToken } from './types'

const { MAINNET, TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

interface SerializedTokenList {
  [symbol: string]: SerializedToken
}

export const mainnetTokens = {
  wcro: new Token(
    MAINNET,
    '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    18,
    'WCRO',
    'Wrapped CRO',
    'https://www.crypto.com/',
  ),
  // bnb here points to the wcro contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  cro: new Token(MAINNET, '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23', 18, 'CRO', 'CRO', 'https://www.crypto.com/'),
  cake: new Token(
    MAINNET,
    '0x322e21dcAcE43d319646756656b29976291d7C76',
    18,
    'CNO',
    'ChronoSwap Token',
    'https://chronoswap.org/',
  ),
  syrup: new Token(
    MAINNET,
    '0x3790F3A1cf8A478042Ec112A70881Dcfa9c7fd2a',
    18,
    'CHRONOBAR',
    'ChronoBar Token',
    'https://chronoswap.org/',
  ),
  usdc: new Token(MAINNET, '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59', 6, 'USDC', 'USDC', 'https://chronoswap.org/'),
  usdt: new Token(MAINNET, '0x66e428c3f67a68878562e79A0234c1F83c208770', 6, 'USDT', 'USDT', 'https://chronoswap.org/'),
  wbtc: new Token(MAINNET, '0x062E66477Faf219F25D27dCED647BF57C3107d52', 8, 'WBTC', 'WBTC', 'https://chronoswap.org/'),
  weth: new Token(MAINNET, '0xe44Fd7fCb2b1581822D0c862B68222998a0c299a', 18, 'WETH', 'WETH', 'https://chronoswap.org/'),
  dai: new Token(MAINNET, '0xF2001B145b43032AAF5Ee2884e456CCd805F677D', 18, 'DAI', 'DAI', 'https://chronoswap.org/'),
  bnb: new Token(MAINNET, '0xfa9343c3897324496a05fc75abed6bac29f8a40f', 18, 'BNB', 'BNB', 'https://chronoswap.org/'),
  matic: new Token(
    MAINNET,
    '0xc9baa8cfdde8e328787e29b4b078abf2dadc2055',
    18,
    'MATIC',
    'MATIC',
    'https://chronoswap.org/',
  ),
  avax: new Token(MAINNET, '0x765277eebeca2e31912c9946eae1021199b39c61', 18, 'AVAX', 'AVAX', 'https://chronoswap.org/'),
  ftm: new Token(MAINNET, '0xB44a9B6905aF7c801311e8F4E76932ee959c663C', 18, 'FTM', 'FTM', 'https://chronoswap.org/'),
  busd: new Token(MAINNET, '0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8', 18, 'BUSD', 'BUSD', 'https://chronoswap.org/'),
  croshiba: new Token(
    MAINNET,
    '0x5617EA36c5da5dAFaB51A8634B02609459fEE94F',
    4,
    'CROSHIBA',
    'CROSHIBA',
    'https://croshiba.io/',
  ),
  doge: new Token(MAINNET, '0x1a8E39ae59e5556B56b76fCBA98d22c9ae557396', 8, 'DOGE', 'DOGE', 'https://chronoswap.org/'),
  shib: new Token(MAINNET, '0xbED48612BC69fA1CaB67052b42a95FB30C1bcFee', 18, 'SHIB', 'SHIB', 'https://chronoswap.org/'),
  crystl: new Token(
    MAINNET,
    '0xCbDE0E17d14F49e10a10302a32d17AE88a7Ecb8B',
    18,
    'CRYSTL',
    'CRYSTL',
    'https://cronos.crystl.finance/',
  ),
  duo: new Token(MAINNET, '0x4ff6334aa95aFfC85F09738eEfc866cBEA7DC7c6', 18, 'DUO', 'DUO', 'https://singular.farm/'),
  caddy: new Token(
    MAINNET,
    '0x09ad12552ec45f82bE90B38dFE7b06332A680864',
    18,
    'CADDY',
    'CADDY',
    'https://adamant.finance/',
  ),
  liq: new Token(
    MAINNET,
    '0xABd380327Fe66724FFDa91A87c772FB8D00bE488',
    18,
    'LIQ',
    'LIQ',
    'https://www.liquidus.finance/',
  ),
  link: new Token(MAINNET, '0xBc6f24649CCd67eC42342AccdCECCB2eFA27c9d9', 18, 'LINK', 'LINK', 'https://chronoswap.org/'),
  atom: new Token(MAINNET, '0xB888d8Dd1733d72681b30c00ee76BDE93ae7aa93', 6, 'ATOM', 'ATOM', 'https://chronoswap.org/'),
  enj: new Token(MAINNET, '0x0A92ea8a197919aCb9BC26660Ed0D43D01ed26b7', 18, 'ENJ', 'ENJ', 'https://chronoswap.org/'),
  elon: new Token(MAINNET, '0x02DCcaf514C98451320a9365C5b46C61d3246ff3', 18, 'ELON', 'ELON', 'https://chronoswap.org/'),
  tusd: new Token(MAINNET, '0x87EFB3ec1576Dec8ED47e58B832bEdCd86eE186e', 18, 'TUSD', 'TUSD', 'https://chronoswap.org/'),
  cnft: new Token(MAINNET, '0x87EFB3ec1576Dec8ED47e58B832bEdCd86eE186e', 18, 'CNFT', 'CNFT', 'https://chronoswap.org/'),
}

export const testnetTokens = {
  wcro: new Token(
    TESTNET,
    '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F',
    18,
    'WCRO',
    'Wrapped BNB',
    'https://www.binance.com/',
  ),
  cake: new Token(
    TESTNET,
    '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/',
  ),
  syrup: new Token(
    TESTNET,
    '0xfE1e507CeB712BDe086f3579d2c03248b2dB77f9',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://pancakeswap.finance/',
  ),
}

const tokens = (): TokenList => {
  const chainId = process.env.REACT_APP_CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    }, {})
  }

  return mainnetTokens
}

export const serializeTokens = (): SerializedTokenList => {
  const unserializedTokens = tokens()
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {})

  return serializedTokens
}

export default tokens()
