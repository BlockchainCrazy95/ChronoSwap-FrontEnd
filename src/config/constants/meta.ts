import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'ChronoSwap',
  description: 'Say Hello to DeFi exchange on Crypto.com Cronos Chain (CRO), enter the race !',
  image: 'https://testnet.chronoswap.org/cover-chronoswap.jpg',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('ChronoSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('ChronoSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('ChronoSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('ChronoSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('ChronoSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('ChronoSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('ChronoSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('ChronoSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('ChronoSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('ChronoSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('ChronoSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('ChronoSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('ChronoSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('ChronoSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('ChronoSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('ChronoSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('ChronoSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('ChronoSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('ChronoSwap Info & Analytics')}`,
        description: 'View statistics for ChronoSwap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('ChronoSwap Info & Analytics')}`,
        description: 'View statistics for ChronoSwap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('ChronoSwap Info & Analytics')}`,
        description: 'View statistics for ChronoSwap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('ChronoSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('ChronoSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('ChronoSwap')}`,
      }
    default:
      return null
  }
}
