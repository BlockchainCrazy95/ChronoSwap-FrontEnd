import React from 'react'
import { Heading, Text, light, dark } from '@pancakeswap/uikit'
import type { HeadingProps, TextProps } from '@pancakeswap/uikit'

import styled, { DefaultTheme } from 'styled-components'
import { useTranslation } from 'contexts/Localization'

interface PositionProps {
  position: 'left' | 'right'
}

const Wrapper = styled.div`
  width: 100%;
`

const Container = styled.div`
  margin-top: 10px;
  padding: 0 40px;
`

const HeadingStyle = (theme: DefaultTheme) => `
  white-space: nowrap;
  text-align: center;
`

const TextStyle = (theme: DefaultTheme) => `
  font-size: 12px;
`

const H2Styles = (theme: DefaultTheme) => `
  ${HeadingStyle(theme)}
  font-size: 30px;
  margin-bottom: 80px;
`

const invertColorTheme =
  (property) =>
  ({ theme }) =>
    theme.isDark ? light.colors[property] : dark.colors[property]

const H4Styles = (theme: DefaultTheme) => `
  ${HeadingStyle(theme)}
  font-size: 16px;
  margin-bottom: 0px;
`

const HeadingText = styled(Heading)<HeadingProps>`
  ${({ theme }) => H2Styles(theme)}
`

const SubheadingTextInverted = styled(Heading)<HeadingProps>`
  ${({ theme }) => H4Styles(theme)}
  color: ${invertColorTheme('text')};
`

const TextInverted = styled(Text)<TextProps>`
  ${({ theme }) => TextStyle(theme)}
  color: ${invertColorTheme('text')};
`

const Circle = styled.div<PositionProps>`
  width: 70px;
  height: 70px;
  background: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: -30px;
  animation: jump 3s infinite;
  ${({ position }) => (position === 'right' ? 'right: -36px;' : 'left: -36px;')}

  @keyframes jump {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }
`

const Line = styled.div<PositionProps>`
  position: relative;
  border-color: ${({ theme }) => theme.colors.text};
  border-style: solid;
  border-bottom-width: 3px;
  ${({ position }) =>
    position === 'right'
      ? `
    border-bottom-right-radius: 10px;
    border-right-width: 3px;
  `
      : `
    border-bottom-left-radius: 10px;
    border-left-width: 3px;
  `}
`

const List = styled.li`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`

const Raodmap: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Container>
        <HeadingText>{t('Roadmap')}</HeadingText>
        <div className="fp">
          <Line position="left">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Circle position="left">
                  <SubheadingTextInverted>Q4</SubheadingTextInverted>
                  <TextInverted>2021</TextInverted>
                </Circle>
              </div>
              <div style={{ paddingLeft: '70px', paddingBottom: '40px', paddingTop: '40px' }}>
                <ul>
                  <List>✅ List every promising pair.</List>
                  <List>✅ Regular NFT drops</List>
                  <List>✅ Info & Analytics page</List>
                  <List>✅ Audits of the contracts</List>
                </ul>
              </div>
            </div>
          </Line>
          <Line position="right">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Circle position="right">
                  <SubheadingTextInverted>Q1</SubheadingTextInverted>
                  <TextInverted>2022</TextInverted>
                </Circle>
              </div>
              <div style={{ paddingRight: '40px', paddingBottom: '40px', paddingTop: '40px' }}>
                <ul style={{ padding: '10px 0' }}>
                  <List>
                    ✅ Reduce CNO distribution (
                    <u>
                      <a
                        href="https://chronoswap.medium.com/chronoswap-brand-new-farming-pools-v2-4db405027aa3"
                        target="_blank"
                        rel="noreferrer"
                      >
                        read more
                      </a>
                    </u>
                    )
                  </List>
                  <List>
                    ⌛ $CNFT Launchpad (
                    <u>
                      <a
                        href="https://chronoswap.medium.com/introducing-chronoswap-new-token-the-cnft-2e652b950e7e"
                        target="_blank"
                        rel="noreferrer"
                      >
                        read more
                      </a>
                    </u>
                    )
                  </List>
                  <List>
                    ⌛ First NFT COLLECTION (
                    <u>
                      <a
                        href="https://chronoswap.medium.com/the-fouding-member-f1-9ed9782a7fc0"
                        target="_blank"
                        rel="noreferrer"
                      >
                        read more
                      </a>
                    </u>
                    )
                  </List>
                  <List>⌛ NFT STAKING</List>
                  <List>CMC & Coingecko Listings</List>
                  <List>NFT marketplace</List>
                </ul>
              </div>
            </div>
          </Line>
          <Line position="left">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Circle position="left">
                  <SubheadingTextInverted>Q2</SubheadingTextInverted>
                  <TextInverted>2022</TextInverted>
                </Circle>
              </div>
              <div style={{ paddingLeft: '40px', paddingBottom: '40px', paddingTop: '40px' }}>
                <ul style={{ padding: '10px 30px' }}>
                  <List>Lottery system for burning mechanism</List>
                  <List>Make ChronoSwap a crosschain Dex</List>
                  <List>DAO token for governance</List>
                  <List>Listing on CEX</List>
                </ul>
              </div>
            </div>
          </Line>
        </div>
      </Container>
    </Wrapper>
  )
}

export default Raodmap
