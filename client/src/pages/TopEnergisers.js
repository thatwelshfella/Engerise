import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopEnergisers = (props) => {
	const [energiser, setEnergiser] = useState([]);

	useEffect(() => {
		fetch("/api/topEnergisers")
			.then((res) => res.json())
			.then((data) => {
				setEnergiser(data);
			});
	}, []);


	return (
		<div className="pt-4 border border-dark">
			<h5 className="text-center p-1">Top Favourite Energisers</h5>
			<table className="container table">
				<thead className="">
					{/* <td>ID</td> */}
					{/* <td>Name of Energiser</td> */}
					{/* <td>Difficulty</td>
					<td>Recommended Time</td>
					<td>External Site</td>
					<td>Upvotes</td>
					<td>Downvotes</td> */}
				</thead>
				{energiser.map((item) => (
					<tbody key={item.id}>
						<tr>
							{/* <td>{item.id}</td> */}
							<td className="topEnergiserName" >
								<Link
									to={{
										pathname: `/description/${item.id}`,
										name: item.name,
										id: item.id,
										description: item.description,
										time: item.time,
										upvote: item.upvote,
										downvote: item.downvote,
									}}
								>
									{item.name}
								</Link>
							</td>
							{/* <td>
								<td className="tag">{item.tag}</td>
							</td>
							<td>
								<td className="tag">{item.time}</td>
							</td>
							<td>{item.external ? <td>Yes</td> : <td>No</td>}</td>
							<td>{item.upvote}</td>
							<td>{item.downvote}</td> */}
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default TopEnergisers;
