import React from 'react'
import { Flex, Text, Image } from '@pancakeswap/uikit'

type Publisher = {
  imageSrc: string
  symbol: string
}

const Publisher: React.FC<Publisher> = ({ imageSrc, symbol }) => {
  return (
    <Flex>
      <Image src={imageSrc} width={24} height={24} alt={symbol} />
      <Text ml="4px" bold>{symbol}</Text>
    </Flex>
  )
}

export default Publisher