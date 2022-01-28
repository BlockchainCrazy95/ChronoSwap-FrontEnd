import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('Documentation'),
    items: [
      {
        label: t('How to trade'),
        href: 'https://docs.chronoswap.org/product-informations/exchange',
      },
      {
        label: t('Add liquidity'),
        href: 'https://docs.chronoswap.org/product-informations/exchange/liquidity-pools-and-adding-liquidity',
      },
      {
        label: t('CNO token'),
        href: 'https://docs.chronoswap.org/tokens-and-economics/the-usdcno-token',
      },
      {
        label: t('Road Map'),
        href: 'https://docs.chronoswap.org/road-map/what-next',
      },
      {
        label: '—',
      },
      {
        label: t('AUDITED BY TECH AUDIT'),
        href: 'https://github.com/Tech-Audit/Smart-Contract-Audits/blob/main/TECHAUDIT_CHRONOSWAP.pdf',
        isHighlighted: true,
      },
      {
        label: t('AUDIT BY CERTIK'),
        href: 'https://www.certik.com/projects/chronoswap',
        isHighlighted: true,
      },
    ],
  },
  {
    label: t('Cross-Chain Bridge'),
    items: [
      {
        label: 'How to use the bridge',
        href: 'https://docs.chronoswap.org/the-basics/anyswap-bridge',
      },
      {
        label: t('(BNB) BSC <> CRONOS'),
        href: 'https://anyswap.exchange/#/router',
      },
      {
        label: t('(AVAX) AVALANCHE <> CRONOS'),
        href: 'https://anyswap.exchange/#/router',
      },
      {
        label: t('(MATIC) POLYGON <> CRONOS'),
        href: 'https://anyswap.exchange/#/router',
      },
      {
        label: t('(FTM) FANTOM <> CRONOS'),
        href: 'https://anyswap.exchange/#/router',
      },
    ],
  },
  {
    label: t('Statistics'),
    items: [
      {
        label: `TVL : $${
          globalThis.tvlFarms && globalThis.tvlPools ? (globalThis.tvlFarms + globalThis.tvlPools).toLocaleString() : 0
        }`,
      },
      {
        label: `Market Cap : $${globalThis.mcap ? Math.round(globalThis.mcap.toNumber()).toLocaleString() : 0}`,
      },
      {
        label: `Circ. Supply : ${globalThis.cakeSupply ? Math.round(globalThis.cakeSupply).toLocaleString() : 0} CNO`,
      },
      {
        label: `Burned : ${globalThis.burnedBalance ? Math.round(globalThis.burnedBalance).toLocaleString() : 0} CNO`,
      },
      {
        label: t('Distributed CNO / Block : 1.50'),
      },
    ],
  },
]
