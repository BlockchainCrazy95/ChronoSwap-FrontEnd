import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Flex, Heading } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import PageHeader from 'components/PageHeader'
import HeadingH1 from 'components/Heading'
import CurrentIfo from './CurrentIfo'
import PastIfo from './PastIfo'

const Ifos = () => {
  const { t } = useTranslation()
  const { path, url, isExact } = useRouteMatch()

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <HeadingH1 as="h1" scale="xxl" mt="45px" mb="24px">
              CHRONO LAUNCHPAD
            </HeadingH1>
            <Heading scale="md" color="text" mt="25px">
              {t('invest in brand new tokens, even before they are launched.')}
            </Heading>
            <Heading scale="md" color="text">
              {t('$CNFT Launchpad 25th Jan. at 8PM UTC')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <Container>
        <Flex justifyContent="center" alignItems="center" mb="32px" mt="32px">
          <ButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="subtle">
            <ButtonMenuItem as={Link} to={`${url}`}>
              {t('Next IFO')}
            </ButtonMenuItem>
            <ButtonMenuItem id="past-ifos-button" as={Link} to={`${url}/history`}>
              {t('Past IFOs')}
            </ButtonMenuItem>
          </ButtonMenu>
        </Flex>
        <Route exact path={`${path}`}>
          <CurrentIfo />
        </Route>
        <Route path={`${path}/history`}>
          <PastIfo />
        </Route>
      </Container>
    </>
  )
}

export default Ifos
