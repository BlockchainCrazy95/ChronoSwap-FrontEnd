// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Text } from '@pancakeswap/uikit'
import HeadingH1 from 'components/Heading'
import orderBy from 'lodash/orderBy'
import { useTranslation } from 'contexts/Localization'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import {
  useFetchPublicPoolsData,
  usePools,
  useFetchUserPools,
} from 'state/pools/hooks'
import { ViewMode } from 'state/user/actions'
import { usePollFarmsPublicData } from 'state/farms/hooks'
import { latinise } from 'utils/latinise'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { DeserializedNft } from 'state/types'
import { useUserPoolStakedOnly, useUserPoolsViewMode } from 'state/user/hooks'
import Loading from 'components/Loading'
import NftTabButtons from './components/NftTabButtons'
import NftStakingCard from './components/NftStakingCard'
import NftStakingTable from './components/NftStakingTable/NftStakingTable'

// @TODO will be replaced in integration
import nftsMock from './mock/nfts'

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

const NftControls = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const ControlStretch = styled(Flex)`
  > div {
    flex: 1;
  }
`

const NUMBER_OF_NFT_COLLECTIONS_VISIBLE = 12

const NftsStaking: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { userDataLoaded } = usePools()
  const [stakedOnly, setStakedOnly] = useUserPoolStakedOnly()
  const [viewMode, setViewMode] = useUserPoolsViewMode()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numberOfNftCollectionsVisible, setNumberOfNftCollectionsVisible] = useState(NUMBER_OF_NFT_COLLECTIONS_VISIBLE)
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const chosenNftsLength = useRef(0)

  const nfts = nftsMock

  // @TODO replace fetch pools to nft collections
  usePollFarmsPublicData()
  useFetchPublicPoolsData()
  useFetchUserPools(account)

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfNftCollectionsVisible((nftCollectionsCurrentlyVisible) => {
        if (nftCollectionsCurrentlyVisible <= chosenNftsLength.current) {
          return nftCollectionsCurrentlyVisible + NUMBER_OF_NFT_COLLECTIONS_VISIBLE
        }
        return nftCollectionsCurrentlyVisible
      })
    }
  }, [isIntersecting])

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  // @TODO sort logic
  const sortNfts = (nftsToSort: DeserializedNft[]) => {
    switch (sortOption) {
      case 'weeklyStaked':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(
          nftsToSort,
          () => 0,
          'desc',
        )
      case 'multiplier':
        return orderBy(
          nftsToSort,
          (nft: DeserializedNft) => (nft.multiplier ? Number(nft.multiplier.slice(0, -1)) : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          nftsToSort,
          (nft: DeserializedNft) => {
            if (!nft.userData || !nft.earningTokenPrice) {
              return 0
            }
            return nft.userData.pendingReward.times(nft.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          nftsToSort,
          (nft: DeserializedNft) => {
            let totalStaked = Number.NaN
            if (nft.totalStaked?.isFinite()) {
              totalStaked = +formatUnits(ethers.BigNumber.from(nft.totalStaked.toString()), nft.stakingToken.decimals)
            }
            return Number.isFinite(totalStaked) ? totalStaked : 0
          },
          'desc',
        )
      default:
        return nftsToSort
    }
  }

  let chosenNfts = nfts

  if (searchQuery) {
    const lowercaseQuery = latinise(searchQuery.toLowerCase())
    chosenNfts = chosenNfts.filter((nft) =>
      latinise(nft.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
    )
  }

  chosenNfts = sortNfts(chosenNfts)
  chosenNftsLength.current = chosenNfts.length

  const cardLayout = (
    <CardLayout>
      {chosenNfts.map((nft) =>
        <NftStakingCard key={nft.sousId} nft={nft} account={account} />
      )}
    </CardLayout>
  )

  const tableLayout = <NftStakingTable nfts={chosenNfts} account={account} userDataLoaded={userDataLoaded} />

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <HeadingH1 as="h1" scale="xxl" mt="45px" mb="24px">
              NFT STAKING
            </HeadingH1>
            <Heading scale="md" color="text" mt="25px">
              {t('STAKE NFT TO EARN CNFT.')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <NftControls>
          <NftTabButtons
            stakedOnly={stakedOnly}
            setStakedOnly={setStakedOnly}
            hasStakeInFinishedPools
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <FilterContainer>
            <LabelWrapper>
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Sort by')}
              </Text>
              <ControlStretch>
                <Select
                  options={[
                    {
                      label: t('Multiplier'),
                      // @TODO the valid value of Multiplier
                      value: 'multiplier',
                    },
                    {
                      label: t('Weekly CFNT/NFT Staked'),
                      // @TODO the valid value of weekly CFNT/NFT staked
                      value: 'apr',
                    },
                    {
                      label: t('Earned'),
                      value: 'earned',
                    },
                    {
                      label: t('Total staked'),
                      value: 'totalStaked',
                    },
                  ]}
                  onOptionChange={handleSortOptionChange}
                />
              </ControlStretch>
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Search')}
              </Text>
              <SearchInput onChange={handleChangeSearchQuery} placeholder="Search Pools" />
            </LabelWrapper>
          </FilterContainer>
        </NftControls>
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center" mb="4px">
            <Loading />
          </Flex>
        )}
        {viewMode === ViewMode.CARD ? cardLayout : tableLayout}
        <div ref={observerRef} />
      </Page>
    </>
  )
}

export default NftsStaking
