import React from "react";

function WhatIsAnEnergiser() {
	return (
		<div>
			<br />
			<br />
			<br />
			{/* data-testid='WhatIsAnEnergiser' added as a locator for
				testing library to aim for */}
			<p className="WhatIsAnEnergiser" data-testid='WhatIsAnEnergiser'>
				What is an Energiser? <br />
				<br /> An energiser is an activity or game designed to welcome attendees
				and warm up the conversation among participants in a meeting or training
				class. Any event that requires people to comfortably interact with each
				other and a facilitator is an opportunity to use an icebreaker.
			</p>
		</div>
	);
}

export default WhatIsAnEnergiser;
