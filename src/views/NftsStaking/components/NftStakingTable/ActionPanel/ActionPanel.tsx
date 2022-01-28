// @ts-nocheck
import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import {
  Box,
  Button,
  Flex,
  LinkExternal,
  MetamaskIcon,
  Text,
} from '@pancakeswap/uikit'
import { BASE_BSC_SCAN_URL } from 'config'
import { DeserializedNft } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getAddress } from 'utils/addressHelpers'
import { registerToken } from 'utils/wallet'
import Harvest from './Harvest'
import Market from './Market'
import Publisher from './Publisher'
import OwnedCollections from './OwnedCollections'
import { ActionContent } from './styles'
import mockCollecitons from '../../../mock/collections'

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 700px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 700px;
  }
  to {
    max-height: 0px;
  }
`

const StyledActionPanel = styled.div<{ expanded: boolean }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dropdown};
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

type MediaBreakpoints = {
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
  isXxl: boolean
}

interface ActionPanelProps {
  account: string
  pool: DeserializedNft
  userDataLoaded: boolean
  expanded: boolean
  breakpoints: MediaBreakpoints
}

const InfoSection = styled(Box)`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  padding: 8px 8px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0;
    flex-basis: 230px;
  }
`

const ActionPanel: React.FC<ActionPanelProps> = ({ account, pool, userDataLoaded, expanded }) => {
  const {
    stakingToken,
    earningToken,
    contractAddress,
  } = pool
  const { t } = useTranslation()
  const nftContractAddress = getAddress(contractAddress)

  const isMetaMaskInScope = !!window.ethereum?.isMetaMask
  const tokenAddress = earningToken.address || ''

  return (
    <>
      <StyledActionPanel expanded={expanded}>
        <InfoSection>
          <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
            <LinkExternal href={earningToken.projectLink} bold={false}>
              {t('View Project Site')}
            </LinkExternal>
          </Flex>
          {nftContractAddress && (
            <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
              <LinkExternal
                href={`${BASE_BSC_SCAN_URL}/address/${nftContractAddress}`}
                bold={false}
              >
                {t('View Contract')}
              </LinkExternal>
            </Flex>
          )}
          {account && isMetaMaskInScope && tokenAddress && (
            <Flex mb="8px" justifyContent={['flex-end', 'flex-end', 'flex-start']}>
              <Button
                variant="text"
                p="0"
                height="auto"
                onClick={() => registerToken(tokenAddress, earningToken.symbol, earningToken.decimals)}
              >
                <Text color="primary">{t('Add to Metamask')}</Text>
                <MetamaskIcon ml="4px" />
              </Button>
            </Flex>
          )}
        </InfoSection>
        <ActionContainer>
          <Harvest {...pool} userDataLoaded={userDataLoaded} />
        </ActionContainer>
        <Market nft={pool} userDataLoaded={userDataLoaded} />
      </StyledActionPanel>
      <StyledActionPanel expanded={expanded}>
        <OwnedCollections totalStaked={1} collections={mockCollecitons} />
      </StyledActionPanel>
      <StyledActionPanel expanded={expanded}>
        <ActionContainer>
          <ActionContent style={{ width: '100%' }}>
            <Publisher style={{ width: '50%' }} imageSrc={`/images/tokens/${stakingToken.address}.png`} symbol="Project X" />
            <Text textAlign="right">
              Multiplier 15x
            </Text>
          </ActionContent>
        </ActionContainer>
      </StyledActionPanel>
    </>
  )
}

export default ActionPanel
