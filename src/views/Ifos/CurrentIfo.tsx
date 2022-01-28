import React from 'react'
import { ifosConfig } from 'config/constants'
import useGetPublicIfoData from 'views/Ifos/hooks/v1/useGetPublicIfoData'
import useGetWalletIfoData from 'views/Ifos/hooks/v1/useGetWalletIfoData'
import IfoFoldableCard from './components/IfoFoldableCard'
import IfoLayout from './components/IfoLayout'
import IfoSteps from './components/IfoSteps'
import IfoQuestions from './components/IfoQuestions'

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => {
  const publicIfoData = useGetPublicIfoData(activeIfo)
  const walletIfoData = useGetWalletIfoData(activeIfo)

  return (
    <IfoLayout id="current-ifo">
      <IfoFoldableCard ifo={activeIfo} publicIfoData={publicIfoData} walletIfoData={walletIfoData} isInitiallyVisible />
      <IfoSteps ifo={activeIfo} walletIfoData={walletIfoData} />
    </IfoLayout>
  )
}

export default Ifo
