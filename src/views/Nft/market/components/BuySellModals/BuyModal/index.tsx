import React, { useState } from 'react'
import { InjectedModalProps } from '@pancakeswap/uikit'
import { ethers } from 'ethers'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import useTokenBalance, { useGetBnbBalance } from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import { ethersToBigNumber } from 'utils/bigNumber'
import tokens from 'config/constants/tokens'
import { parseUnits, formatEther } from 'ethers/lib/utils'
import { useERC20, useNftMarketContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useAppDispatch } from 'state'
import { addUserNft } from 'state/nftMarket/reducer'
import { NftLocation, NftToken } from 'state/nftMarket/types'
import { StyledModal } from './styles'
import ReviewStage from './ReviewStage'
import ConfirmStage from '../shared/ConfirmStage'
import ApproveAndConfirmStage from '../shared/ApproveAndConfirmStage'
import { PaymentCurrency, BuyingStage } from './types'
import TransactionConfirmed from '../shared/TransactionConfirmed'

const modalTitles = {
  [BuyingStage.REVIEW]: 'Review',
  [BuyingStage.APPROVE_AND_CONFIRM]: 'Back',
  [BuyingStage.CONFIRM]: 'Back',
  [BuyingStage.TX_CONFIRMED]: 'Transaction Confirmed',
}

interface BuyModalProps extends InjectedModalProps {
  nftToBuy: NftToken
}

const BuyModal: React.FC<BuyModalProps> = ({ nftToBuy, onDismiss }) => {
  const [stage, setStage] = useState(BuyingStage.REVIEW)
  const [confirmedTxHash, setConfirmedTxHash] = useState('')
  const [paymentCurrency, setPaymentCurrency] = useState<PaymentCurrency>(PaymentCurrency.BNB)
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { callWithGasPrice } = useCallWithGasPrice()

  const { account } = useWeb3React()
  const wcroContract = useERC20(tokens.wcro.address)
  const nftMarketContract = useNftMarketContract()

  const { toastSuccess } = useToast()
  const dispatch = useAppDispatch()

  const nftPriceWei = parseUnits(nftToBuy.marketData.currentAskPrice, 'ether')
  const nftPrice = parseFloat(nftToBuy.marketData.currentAskPrice)

  // BNB - returns ethers.BigNumber
  const { balance: bnbBalance, fetchStatus: bnbFetchStatus } = useGetBnbBalance()
  const formattedBnbBalance = parseFloat(formatEther(bnbBalance))
  // WCRO - returns BigNumber
  const { balance: wcroBalance, fetchStatus: wcroFetchStatus } = useTokenBalance(tokens.wcro.address)
  const formattedWcroBalance = getBalanceNumber(wcroBalance)

  const walletBalance = paymentCurrency === PaymentCurrency.BNB ? formattedBnbBalance : formattedWcroBalance
  const walletFetchStatus = paymentCurrency === PaymentCurrency.BNB ? bnbFetchStatus : wcroFetchStatus

  const notEnoughBnbForPurchase =
    paymentCurrency === PaymentCurrency.BNB
      ? bnbBalance.lt(nftPriceWei)
      : wcroBalance.lt(ethersToBigNumber(nftPriceWei))

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const currentAllowance = await wcroContract.allowance(account, nftMarketContract.address)
        return currentAllowance.gt(0)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return callWithGasPrice(wcroContract, 'approve', [nftMarketContract.address, ethers.constants.MaxUint256])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        t('Contract approved - you can now buy NFT with WCRO!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    onConfirm: () => {
      const payAmount = Number.isNaN(nftPrice)
        ? ethers.BigNumber.from(0)
        : parseUnits(nftToBuy.marketData.currentAskPrice)
      if (paymentCurrency === PaymentCurrency.BNB) {
        return callWithGasPrice(nftMarketContract, 'buyTokenUsingBNB', [nftToBuy.collectionAddress, nftToBuy.tokenId], {
          value: payAmount,
        })
      }
      return callWithGasPrice(nftMarketContract, 'buyTokenUsingWCRO', [
        nftToBuy.collectionAddress,
        nftToBuy.tokenId,
        payAmount,
      ])
    },
    onSuccess: async ({ receipt }) => {
      setConfirmedTxHash(receipt.transactionHash)
      setStage(BuyingStage.TX_CONFIRMED)
      dispatch(
        addUserNft({
          tokenId: nftToBuy.tokenId,
          collectionAddress: nftToBuy.collectionAddress,
          nftLocation: NftLocation.WALLET,
        }),
      )
      toastSuccess(
        t('Your NFT has been sent to your wallet'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
  })

  const continueToNextStage = () => {
    if (paymentCurrency === PaymentCurrency.WCRO && !isApproved) {
      setStage(BuyingStage.APPROVE_AND_CONFIRM)
    } else {
      setStage(BuyingStage.CONFIRM)
    }
  }

  const goBack = () => {
    setStage(BuyingStage.REVIEW)
  }

  const showBackButton = stage === BuyingStage.CONFIRM || stage === BuyingStage.APPROVE_AND_CONFIRM

  return (
    <StyledModal
      title={modalTitles[stage]}
      stage={stage}
      onDismiss={onDismiss}
      onBack={showBackButton ? goBack : null}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      {stage === BuyingStage.REVIEW && (
        <ReviewStage
          nftToBuy={nftToBuy}
          paymentCurrency={paymentCurrency}
          setPaymentCurrency={setPaymentCurrency}
          nftPrice={nftPrice}
          walletBalance={walletBalance}
          walletFetchStatus={walletFetchStatus}
          notEnoughBnbForPurchase={notEnoughBnbForPurchase}
          continueToNextStage={continueToNextStage}
        />
      )}
      {stage === BuyingStage.APPROVE_AND_CONFIRM && (
        <ApproveAndConfirmStage
          variant="buy"
          handleApprove={handleApprove}
          isApproved={isApproved}
          isApproving={isApproving}
          isConfirming={isConfirming}
          handleConfirm={handleConfirm}
        />
      )}
      {stage === BuyingStage.CONFIRM && <ConfirmStage isConfirming={isConfirming} handleConfirm={handleConfirm} />}
      {stage === BuyingStage.TX_CONFIRMED && <TransactionConfirmed txHash={confirmedTxHash} onDismiss={onDismiss} />}
    </StyledModal>
  )
}

export default BuyModal
