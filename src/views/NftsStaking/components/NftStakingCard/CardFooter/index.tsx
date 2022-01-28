// @TODO this component might be used or removed when do the integration
import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, ExpandableLabel, HelpIcon, useTooltip } from '@pancakeswap/uikit'
import { DeserializedNft } from 'state/types'
import { ManualPoolTag } from 'components/Tags'
import ExpandedFooter from './ExpandedFooter'

interface FooterProps {
  pool: DeserializedNft
  account: string
}

const ExpandableButtonWrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  button {
    padding: 0;
  }
`

const Footer: React.FC<FooterProps> = ({ pool, account }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  const manualTooltipText = t('You must harvest and compound your earnings from this pool manually.')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(manualTooltipText, {
    placement: 'bottom',
  })

  return (
    <CardFooter>
      <ExpandableButtonWrapper>
        <Flex alignItems="center">
          <ManualPoolTag />
          {tooltipVisible && tooltip}
          <Flex ref={targetRef}>
            <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
          </Flex>
        </Flex>
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? t('Hide') : t('Details')}
        </ExpandableLabel>
      </ExpandableButtonWrapper>
      {isExpanded && <ExpandedFooter pool={pool} account={account} />}
    </CardFooter>
  )
}

export default Footer
