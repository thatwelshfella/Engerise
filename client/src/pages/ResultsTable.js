import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ResultsTable = (props) => {
	console.log(props);
	const [energiser, setEnergiser] = useState([]);

	props.location.api ? null : (props.location.api = "/api/wholelist");

	useEffect(() => {
		fetch(props.location.api)
			.then((res) => res.json())
			.then((data) => {
				setEnergiser(data);
			});
	},[]);

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
			<div className="mt-3 detail-div text-center">
					<Link to="/">
						<button className="generate_btn">BACK</button>
					</Link>
				</div>
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
										upvote: item.upvote,
										downvote: item.downvote,
									}}
								>
									{item.name}
								</Link>
							</td>
							<td>
								<td className="tag">{item.tag}</td>
							</td>
							<td>
								<td className="tag">{item.time}</td>
							</td>
							<td>
								{item.external ? <td>Yes</td> : <td>No</td>}
							</td>
							<td>{item.upvote}</td>
							<td>{item.downvote}</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ResultsTable;
