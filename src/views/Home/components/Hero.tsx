import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { Flex, Heading, Button } from '@pancakeswap/uikit'
import type { HeadingProps } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useTheme from 'hooks/useTheme'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'
import CompositeImage, { CompositeImageProps } from './CompositeImage'

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }  
`

const fading = () => keyframes`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }  
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

// const BunnyWrapper = styled.div`
//   width: 100%;
// `

const BunnyWrapper = styled.div`
  width: 100%;
  animation: ${flyingAnim} 5s ease-in-out infinite;
`

const StarsWrapper = styled.div`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;

  & :nth-child(2) {
    animation: ${fading} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${fading} 5s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${fading} 2.5s ease-in-out infinite;
    animation-delay: 0.33s;
  }
`

const HeadingText = styled(Heading)<HeadingProps>`
  color: ${({ theme }) => (theme.isDark ? theme.colors.text : '#103f68')};
`

const starsImage: CompositeImageProps = {
  path: '/images/home/lunar-bunny/',
  attributes: [
    { src: 'star-l', alt: '3D Star' },
    { src: 'star-r', alt: '3D Star' },
    { src: 'star-top-r', alt: '3D Star' },
  ],
}

const Hero: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { theme } = useTheme()

  return (
    <>
      <BgWrapper>
        <InnerWrapper>{theme.isDark ? <SlideSvgDark width="100%" /> : <SlideSvgLight width="100%" />}</InnerWrapper>
      </BgWrapper>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['center', 'center', 'center', 'center']}
        justifyContent="center"
        mt={[account ? '200px' : '10px', null, 0]}
        id="homepage-hero"
      >
        <Flex flex="1" flexDirection="column">
          <HeadingText scale="xxl" mb="24px">
            {t('Trade. Farm. Enter the race.')}
            {/* {t('CNO Fair launch 8:30 pm utc+2')} */}
          </HeadingText>

          {globalThis.tvlFarms && globalThis.tvlPools ? (
            <Heading scale="xl" mb="24px" color="#0095ff">
              TVL : $
              {globalThis.tvlFarms && globalThis.tvlPools
                ? (globalThis.tvlFarms + globalThis.tvlPools).toLocaleString()
                : 0}
            </Heading>
          ) : (
            <Heading scale="xl" mb="24px" />
          )}

          <HeadingText scale="md" mb="24px" color="#103f68">
            {/* {t('Farming start at block 13200')} */}
            ChronoSwap is one of the very first decentralized exchange (DEX) on Cronos Blockchain.
          </HeadingText>
          <Flex>
            {!account && <ConnectWalletButton mr="8px" />}
            <Link to="/swap">
              <Button variant={!account ? 'secondary' : 'primary'}>{t('Trade Now')}</Button>
            </Link>
          </Flex>
        </Flex>
        <Flex
          height={['250px', null, null, '100%']}
          width={['250px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
          position="relative"
        >
          <BunnyWrapper>
            {/* <img src={`${imagePath}${imageSrc}.png`} srcSet={getSrcSet(imagePath, imageSrc)} alt={t('Lunar bunny')} /> */}
            <img src="/images/chronoswap_logo_new.png" alt={t('ChronoSwap Logo')} />
          </BunnyWrapper>
          <StarsWrapper>
            <CompositeImage {...starsImage} />
          </StarsWrapper>
        </Flex>
      </Flex>
    </>
  )
}

export default Hero
