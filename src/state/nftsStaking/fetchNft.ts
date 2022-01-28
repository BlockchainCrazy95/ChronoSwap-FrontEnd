import { SerializedFarm } from 'state/types'
import fetchPublicNftsStakingData from './fetchPublicNftsStakingData'

const fetchFarm = async (nftStaking: SerializedFarm): Promise<SerializedFarm> => {
  const nftStakingPublicData = await fetchPublicNftsStakingData(nftStaking)

  return { ...nftStaking, ...nftStakingPublicData }
}

export default fetchFarm
