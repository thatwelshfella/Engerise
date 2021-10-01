import React, { useState, useEffect } from "react";

const TopEnergisers = () => {
	const [energiser, setEnergiser] = useState([]);

	useEffect(() => {
		fetch("/api/topEnergisers")
			.then((res) => res.json())
			.then((data) => {
				setEnergiser(data);
			});
	}, []);

	return (
		<div className="pt-2 border border-dark">
			<h4 className="text-center WhatIsAnEnergiser">
				Top Favourite Energisers
			</h4>
			<table className="container table">
				<thead></thead>
				{energiser.map((item) => (
					<tbody key={item.id}>
						<tr>
							<td className="topEnergiserName">
								<a href={`/description?id=${item.id}`}>{item.name}</a>
							</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default TopEnergisers;
