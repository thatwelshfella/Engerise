import React from "react";
import data from "../data/energiser.json";
import { Link } from "react-router-dom";

const ResultsTable = () => {

	//Random function
	const shuffle = (arr) => {
		const newArr = arr.slice();
		for (let i = newArr.length - 1; i > 0; i--) {
			const rand = Math.floor(Math.random() * (i + 1));
			[newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
		}
		return newArr;
	};

	// const style = {
	// 	height: "1000px",
	// };
	return (
		<div className="res-div pt-4">
			<h1 className="text-center p-4">RESULTS TABLE</h1>
			<table className="container table table-success">
				<thead className="font-weight-bold result-thead">
					<td>ID</td>
					<td>Name of Energiser</td>
					<td>Tags</td>
					<td>Time Limit</td>
					<td>URLs</td>
					{/* <td>Upvotes</td>
            <td>Downvotes</td> */}
				</thead>
				{shuffle(data).map((item) => (
					<tbody className="result-tbody" key={item.id}>
						<tr>
							<td>{item.id}</td>
							<td>
								<Link
									to={{
										pathname: `/description/${item.id}`,
										name: item.name,
                                        id: item.id,
                                        description: item.description,
                                        time: item.time	}}
								>
									{item.name}
								</Link>
							</td>
							<td>Test</td>
							<td>{item.time}</td>
							<td>http//:</td>
							{/* <td>150</td>
            <td>30</td> */}
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ResultsTable;
