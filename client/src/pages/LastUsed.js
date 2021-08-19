import React, { useState, useEffect } from 'react';

function LastUsed(props) {
	// describeMe will be the energiser that we want to render
	const [lastUsed, setLastUsed] = useState([]);

	//fetches description data from API
	useEffect(() => {
		fetch(`/api/lastused/${props.energiser}`)
			.then((res) => res.json())
			.then((data) => {
				setLastUsed(data);
			});
	}, []);

	return (
		<div>
			{lastUsed.length===0? <div>Be the first to use this energiser!</div>	:		lastUsed.map((x) => (
				<div key={x.class}>
					<div>{x.class} - {x.date_used.slice(0,10)}</div>
				</div>
			))}

		</div>
	);
}

export default LastUsed;