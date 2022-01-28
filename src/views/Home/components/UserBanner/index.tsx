import React from 'react'
import { Box } from '@pancakeswap/uikit'
import HarvestCard from './HarvestCard'

const UserBanner: React.FC = () => {
  return (
    <Box p={['16px', null, null, '24px']}>
      <HarvestCard />
    </Box>
  )
}

export default UserBanner
