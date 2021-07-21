import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ResultsTable = (props) => {
	console.log(props);
	const [energiser, setEnergiser] = useState([]);

	props.location.api ? null : (props.location.api = `/api/wholelist`);

	useEffect(() => {
		fetch(props.location.api)
			.then((res) => res.json())
			.then((data) => {
				setEnergiser(data);
			});
	}, []);

	//Random function
	const shuffle = (arr) => {
		const newArr = arr.slice();
		for (let i = newArr.length - 1; i > 0; i--) {
			const rand = Math.floor(Math.random() * (i + 1));
			[newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
		}
		return newArr;
	};

	return (
		<div className="res-div pt-4">
			<h1 className="text-center p-4">RESULTS TABLE</h1>
			<table className="container table table-success">
				<thead className="font-weight-bold result-thead">
					{/* <td>ID</td> */}
					<td>Name of Energiser</td>
					<td>Difficulty</td>
					<td>Recommended Time</td>
					<td>External Site</td>
					<td>Upvotes</td>
					<td>Downvotes</td>
				</thead>
				{shuffle(energiser).map((item) => (
					<tbody className="result-tbody" key={item.id}>
						<tr>
							{/* <td>{item.id}</td> */}
							<td>
								<Link
									to={{
										pathname: `/description/${item.id}`,
										name: item.name,
										id: item.id,
										description: item.description,
										time: item.time,
									}}
								>
									{item.name}
								</Link>
							</td>
							<td>
								<button className="tag">{item.tag}</button>
							</td>
							<td>
								<button className="tag">{item.time}</button>
							</td>
							<td>
								{item.external ? <button>Yes</button> : <button>No</button>}
							</td>
							<td>150</td>
							<td>30</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ResultsTable;
