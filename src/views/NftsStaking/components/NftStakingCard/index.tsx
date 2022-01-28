import BigNumber from 'bignumber.js'
import React from 'react'
import { CardBody, Flex, Text, CardRibbon } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { DeserializedNft } from 'state/types'
import { StyledCard } from './StyledCard'
import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'

const NftStakingCard: React.FC<{ nft: DeserializedNft; account: string }> = ({ nft, account }) => {
  const { sousId, stakingToken, earningToken, isFinished, userData } = nft
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)

  return (
    <StyledCard
      isFinished={isFinished && sousId !== 0}
      ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
    >
      <StyledCardHeader
        isStaking={accountHasStakedBalance}
        earningToken={earningToken}
        stakingToken={stakingToken}
        isFinished={isFinished && sousId !== 0}
      />
      <CardBody>
        <Flex mt="24px" flexDirection="column">
          {account ? (
            <CardActions pool={nft} stakedBalance={stakedBalance} />
          ) : (
            <>
              <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                {t('Start earning')}
              </Text>
              <ConnectWalletButton />
            </>
          )}
        </Flex>
      </CardBody>
      <CardFooter pool={nft} account={account} />
    </StyledCard>
  )
}

export default NftStakingCard
