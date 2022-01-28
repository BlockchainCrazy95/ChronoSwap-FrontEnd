import React from 'react';
import styled from 'styled-components';

import DefaultLayout from '../Layout'
import LandingSection from './LandingSection'
import MintingSection from './MintingSection'
import RoadmapSection from './RoadmapSection'
import FAQSection from './FAQSection'


const StyledLayout = styled.div`
	background: rgb(7, 11,26);
`
const NFTLanding = () => {
	return (
		<StyledLayout>
			<DefaultLayout>
				<LandingSection />
				<MintingSection />
				<LandingSection />
				<RoadmapSection />
				<FAQSection />
			</DefaultLayout>
		</StyledLayout>
	)
}

export default NFTLanding