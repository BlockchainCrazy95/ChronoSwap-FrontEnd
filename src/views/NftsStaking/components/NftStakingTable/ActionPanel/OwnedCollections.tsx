import React from 'react'
import styled from 'styled-components'
import { Heading, Flex, Button, useModal, Skeleton, useMatchBreakpoints } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { DeserializedNft } from 'state/types'
import { NftToken } from 'state/nftMarket/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { ActionContainer, ActionTitles, ActionContent } from './styles'
import NotEnoughTokensModal from '../../NftStakingCard/Modals/NotEnoughTokensModal'
import StakeModal from '../../NftStakingCard/Modals/StakeModal'

// @TODO finalize the interface on integration
export interface NftStakingToken extends NftToken, DeserializedNft {
  isStaked: boolean
}

interface OwnedCollectionsProps {
  totalStaked: number
  collections: NftStakingToken[]
}

interface NftProps {
  nftToken: NftStakingToken
}

const StyledSkeleton = styled(Skeleton)`
  width: ${({ width }) => width ?? '100%'};
  border-radius: 1rem;
  padding: 1.25rem;
  margin-bottom: 0.5rem;
  height: ${({ height }) => height ?? '16rem'};
  background-color: rgba(0, 0, 0, 0.25);
`

const EmptyState: React.FC = () => {
  const { t } = useTranslation()

  return <Heading color="textDisabled">{t("Sorry, you don't have any")}</Heading>
}

const OwnedNft: React.FC<NftProps> = ({ nftToken }) => {
  const {
    stakingToken,
    userData,
    isStaked,
    stakingTokenPrice,
  } = nftToken
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  // @TODO add isStake

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  // @TODO handle insufficient state
  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const [onPresentStake] = useModal(
    <StakeModal
      pool={nftToken}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
      isBnbPool
    />,
  )

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      pool={nftToken}
      stakingTokenPrice={stakingTokenPrice}
      isBnbPool
      isRemovingStake
    />,
  )

  const onStake = () => {
    onPresentStake()
  }

  const onUnstake = () => {
    onPresentUnstake()
  }
  
  return (
    <Flex flexDirection="column" alignSelf="start" padding={isMobile ? '0.75rem 0.5rem' : '1rem 1.5rem' } width={isMobile ? '50%' : '25%'} flexGrow="1">
      { /* @TODO placehoder will be replace by the NFT assset when loaded on the integration task */ }
      <StyledSkeleton height={isMobile ? '13rem' : '16rem'} />
      {isStaked ? (
        <Button
          width="100%"
          marginY="0.25rem"
          onClick={onUnstake}
          variant="secondary"
        >
          {t('Unstake')}
        </Button>
      ) : (
        <>
          <Button
            width="100%"
            marginY="0.25rem"
            onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
            variant="secondary"
          >
            {t('Enable')}
          </Button>
          <Button
            width="100%"
            marginY="0.25rem"
            onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
            variant="secondary"
          >
            {t('Stake')}
          </Button>
        </>
      )}
    </Flex>
  )
}

const OwnedCollections: React.FC<OwnedCollectionsProps> = ({ totalStaked, collections }) => {
  return (
    <ActionContainer>
      <ActionTitles>
        {`Your NFTs, Staked: ${totalStaked}/${collections.length}`}
      </ActionTitles>
      <ActionContent>
        <Flex flex="1" pt="16px" flexDirection="row" flexWrap="wrap" alignSelf="flex-start">
          {
            // @TODO use proper key instead
            collections.length > 0 ? collections.map((nft) => {
              return (
                <OwnedNft key={`nft-${nft.sousId}`} nftToken={nft} />
              )
            }
            ) : (
              <EmptyState />
            )
          }
        </Flex>
      </ActionContent>
    </ActionContainer>
  )
}

export default OwnedCollections
