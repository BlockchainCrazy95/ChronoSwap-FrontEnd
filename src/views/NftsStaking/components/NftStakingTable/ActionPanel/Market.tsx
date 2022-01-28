import React from 'react'
import {
  Button,
  Skeleton,
  Text,
  LinkExternal,
} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useWeb3React } from '@web3-react/core'
import { DeserializedNft } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { ActionContainer, ActionTitles, ActionContent } from './styles'

interface EmptyStateProps {
  title: string
  children: React.ReactNode
}

interface StackedActionProps {
  nft: DeserializedNft
  userDataLoaded: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, children }) => {
  return (
    <ActionContainer>
      <ActionTitles>
        <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
          {title}
        </Text>
      </ActionTitles>
      <ActionContent>
        {children}
      </ActionContent>
    </ActionContainer>
  )
}

const Market: React.FunctionComponent<StackedActionProps> = ({ nft, userDataLoaded }) => {
  const {
    earningToken,
    isFinished,
  } = nft
  const { t } = useTranslation()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <EmptyState title={t('Marketplace')}>
        <ConnectWalletButton width="100%" />
      </EmptyState>
    )
  }

  if (!userDataLoaded) {
    return (
      <EmptyState title={t('Marketplace')}>
        <Skeleton width={180} height="32px" marginTop={14} />
      </EmptyState>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <LinkExternal href={earningToken.projectLink} bold={false}>
          {t('Marketplace Link')}
        </LinkExternal>
      </ActionTitles>
      <ActionContent>
        <Button
          width="100%"
          onClick={() => { /* @TODO add action on buy Button */ }}
          variant="secondary"
          disabled={isFinished}
        >
          {t('Buy')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default Market
