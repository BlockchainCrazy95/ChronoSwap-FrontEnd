import { SerializedFarmConfig } from 'config/constants/types'
import fetchNftStaking from './fetchNft'

const fetchNftsStaking = async (nftsStakingToFetch: SerializedFarmConfig[]) => {
  const data = await Promise.all(
    nftsStakingToFetch.map(async (nftStakingConfig) => {
      const nftStaking = await fetchNftStaking(nftStakingConfig)
      const serializedFarm = { ...nftStaking, token: nftStaking.token, quoteToken: nftStaking.quoteToken }
      return serializedFarm
    }),
  )
  return data
}

export default fetchNftsStaking
