import React, { useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { DeserializedNft } from 'state/types'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import NameCell from './Cells/NameCell'
import EarningsCell from './Cells/EarningsCell'
import TotalStakedCell from './Cells/TotalStakedCell'
import ExpandActionCell from './Cells/ExpandActionCell'
import ActionPanel from './ActionPanel/ActionPanel'

interface NftStakingRowProps {
  nft: DeserializedNft
  account: string
  userDataLoaded: boolean
}

const StyledRow = styled.div`
  background-color: transparent;
  display: flex;
  cursor: pointer;
`

const NftStakingRow: React.FC<NftStakingRowProps> = ({ nft, account, userDataLoaded }) => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl, isTablet, isDesktop } = useMatchBreakpoints()
  const [expanded, setExpanded] = useState(false)
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        <NameCell pool={nft} />
        <EarningsCell pool={nft} account={account} userDataLoaded={userDataLoaded} />
        <TotalStakedCell pool={nft} />
        <ExpandActionCell expanded={expanded} isFullLayout={isTablet || isDesktop} />
      </StyledRow>
      {shouldRenderActionPanel && (
        <ActionPanel
          account={account}
          pool={nft}
          userDataLoaded={userDataLoaded}
          expanded={expanded}
          breakpoints={{ isXs, isSm, isMd, isLg, isXl, isXxl }}
        />
      )}
    </>
  )
}

export default NftStakingRow
