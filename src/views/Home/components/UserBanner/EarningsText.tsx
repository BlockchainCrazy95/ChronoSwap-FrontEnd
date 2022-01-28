import { ContextApi } from 'contexts/Localization/types'
import BigNumber from 'bignumber.js'

export const getEarningsText = (
  numFarmsToCollect: number,
  hasCakePoolToCollect: boolean,
  earningsBusd: BigNumber,
  t: ContextApi['t'],
): string => {
  const data = {
    earningsBusd: earningsBusd.toString(),
    count: numFarmsToCollect,
  }

  let earningsText = t('%earningsBusd% to collect', data)

  if (numFarmsToCollect > 0 && hasCakePoolToCollect) {
    if (numFarmsToCollect > 1) {
      earningsText = t('%earningsBusd% from %count% farms and CNO pool', data)
    } else {
      earningsText = t('%earningsBusd% from %count% farm and CNO pool', data)
    }
  } else if (numFarmsToCollect > 0) {
    if (numFarmsToCollect > 1) {
      earningsText = t('%earningsBusd% from %count% farms', data)
    } else {
      earningsText = t('%earningsBusd% from %count% farm', data)
    }
  } else if (hasCakePoolToCollect) {
    earningsText = t('%earningsBusd% from CNO pool', data)
  }

  return earningsText
}
