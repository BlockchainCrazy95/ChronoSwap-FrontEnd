import { MenuItemsType, DropdownMenuItemType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade'),
    icon: 'Swap',
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Farms'),
    href: '/farms',
    showItemsOnMobile: false,
    icon: 'Earn',
    items: [],
  },
  {
    label: t('Pools'),
    href: '/pools',
    showItemsOnMobile: false,
    icon: 'Trophy',
    items: [],
  },
  // {
  //   label: t('NFT Staking'),
  //   href: '/nft-staking',
  //   showItemsOnMobile: false,
  //   icon: 'Trophy',
  //   items: [],
  // },
  {
    label: t('Launchpad'),
    href: '/ifo',
    showItemsOnMobile: false,
    icon: 'Sell',
    items: [],
  },
  {
    label: t('Admin'),
    href: '/nfthome',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Home'),
        href: '/nfthome'
      },
      {
        label: t('Collection'),
        href: '/nftcollection'
      },
      {
        label: t('Admin'),
        href: '/nftadmin'
      }
    ]
  },
  {
    label: t('Mint'),
    href: '/nftlanding',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Mint'),
        href: '/nftlanding'
      },
      {
        label: t('Collective'),
        href: '/collectives'
      }
    ]
  },
  {
    label: '',
    href: '',
    icon: 'More',
    hideSubNav: true,
    items: [
      // {
      //   label: t('Info'),
      //   href: '/info',
      // },
      // {
      //   label: t('Docs'),
      //   href: '#',
      //   type: DropdownMenuItemType.EXTERNAL_LINK,
      // },
      // {
      //   type: DropdownMenuItemType.DIVIDER,
      // },
      // {
      //   label: t('Blog'),
      //   href: '#',
      // },
      {
        label: t('Info & Analytics'),
        href: '/info',
      },
      {
        label: t('How to Deposit Crypto'),
        href: 'https://cronos.crypto.org/docs/bridge/cdcapp.html#transfer-assets-using-crypto-com-app',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('DexScreener Chart'),
        href: 'https://dexscreener.com/cronos/0xC20397D6D31d4A0ff76b94E4Eaed7a36f5c4d992',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('ChronoSwap Docs'),
        href: 'https://docs.chronoswap.org/',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
    ],
  },
]

export default config
