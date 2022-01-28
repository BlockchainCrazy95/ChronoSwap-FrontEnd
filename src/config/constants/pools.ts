import { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

const pools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokens.cake,
    earningToken: serializedTokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      25: '0x3790F3A1cf8A478042Ec112A70881Dcfa9c7fd2a',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.5',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 1,
    stakingToken: serializedTokens.cake,
    earningToken: serializedTokens.liq,
    contractAddress: {
      97: '',
      25: '0xB7040D9A66774965d22D263A98Fb8CF1eA3C0DC6',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 999,
    tokenPerBlock: '0.00833',
  },
]

export default pools
