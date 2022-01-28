import React from 'react'
import {
  Tag,
  VerifiedIcon,
  CommunityIcon,
  RefreshIcon,
  AutoRenewIcon,
  TagProps,
  TimerIcon,
  BlockIcon,
  VoteIcon,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

const CoreTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="secondary" outline startIcon={<VerifiedIcon width="18px" color="secondary" mr="4px" />} {...props}>
      {t('Core')}
    </Tag>
  )
}

const PartnerTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="success" outline startIcon={<VerifiedIcon width="18px" color="success" mr="4px" />} {...props}>
      {t('Partner')}
    </Tag>
  )
}

const ChronoTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="secondary" outline startIcon={<VerifiedIcon width="18px" color="secondary" mr="4px" />} {...props}>
      {t('ChronoSwap')}
    </Tag>
  )
}

const AnySwapTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="binance" outline startIcon={<VerifiedIcon width="18px" color="primary" mr="4px" />} {...props}>
      {t('AnySwap Bridge')}
    </Tag>
  )
}

const CommunityTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="failure" outline startIcon={<CommunityIcon width="18px" color="failure" mr="4px" />} {...props}>
      {t('Community')}
    </Tag>
  )
}

const V1Tag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="failure" outline startIcon={<BlockIcon width="18px" color="primary" mr="4px" />} {...props}>
      {t('Deprecated V1 LP')}
    </Tag>
  )
}

const DualTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="textSubtle" outline {...props}>
      {t('Dual')}
    </Tag>
  )
}

const ManualPoolTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="secondary" outline startIcon={<RefreshIcon width="18px" color="secondary" mr="4px" />} {...props}>
      {t('Manual')}
    </Tag>
  )
}

const CompoundingPoolTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="success" outline startIcon={<AutoRenewIcon width="18px" color="success" mr="4px" />} {...props}>
      {t('Auto')}
    </Tag>
  )
}

const VoteNowTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="success" startIcon={<VoteIcon width="18px" color="success" mr="4px" />} {...props}>
      {t('Vote Now')}
    </Tag>
  )
}

const SoonTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="binance" startIcon={<TimerIcon width="18px" color="success" mr="4px" />} {...props}>
      {t('Soon')}
    </Tag>
  )
}

const ClosedTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="textDisabled" startIcon={<BlockIcon width="18px" color="textDisabled" mr="4px" />} {...props}>
      {t('Closed')}
    </Tag>
  )
}

export {
  CoreTag,
  CommunityTag,
  DualTag,
  ManualPoolTag,
  CompoundingPoolTag,
  VoteNowTag,
  SoonTag,
  ClosedTag,
  PartnerTag,
  ChronoTag,
  AnySwapTag,
  V1Tag,
}
