import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RowTable from "./RowTable";

const ResultsTable = (props) => {

	const [energiser, setEnergiser] = useState([]);
	const [sorted, setSorted] = useState(0);

	props.location.api ? null : (props.location.api = "/api/wholelist");

	useEffect(() => {
		fetch(props.location.api)
			.then((res) => res.json())
			.then((data) => {
				if (props.location.api === "/api/wholelist" && props.location.searchCriteria == null ){
					setEnergiser(data);
				}
				else if (props.location.api === "/api/wholelist" && (props.location.searchCriteria !== "undefined" || props.location.searchCriteria !== ""))
				{
					let serachData = data.filter(
						sd =>
						sd.name.toLowerCase().includes(props.location.searchCriteria.toLowerCase())
					);
					setEnergiser(serachData);
				}
				else
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

	// const [dataTable, setDataTable] = useState(shuffle(energiser));

	function sortNum(event) {
		let sortedEn = shuffle(energiser);
		if (sorted % 2 === 0) {
			if (event.target.innerText === "Name of Energiser")
			setEnergiser(
				shuffle(sortedEn)
				.sort((a, b) => (a.name > b.name) - (a.name < b.name))
				.reverse()
			);
		else if (event.target.innerText === "Difficulty")
		setEnergiser(
			sortedEn
				.sort((a, b) => (a.tag > b.tag) - (a.tag < b.tag))
				.reverse()
			);
		else if (event.target.innerText === "Recommended Time")
		setEnergiser(sortedEn.sort((a, b) => (a.time > b.time) - (a.time < b.time)).reverse());
		else if (event.target.innerText === "Downvotes")
		setEnergiser(
			sortedEn
				.sort((a, b) => a.downvote - b.downvote)
				.reverse()
			);
			else if (event.target.innerText === "Upvotes")
			setEnergiser(
				sortedEn
					.sort((a, b) => a.upvote - b.upvote)
					.reverse()
				);
				// else if (event.target.innerText === "Favorite")
				// setEnergiser(
				// 	sortedEn
				// 		.sort((a, b) => (a.value > b.value) - (a.value < b.value))
				// 		.reverse()
				// 	);
		} else {
			if (event.target.innerText === "Name of Energiser")
			setEnergiser(
				sortedEn.sort((a, b) => (a.name > b.name) - (a.name < b.name))
			);
			else if (event.target.innerText === "Difficulty")
			setEnergiser(
				sortedEn.sort((a, b) => (a.tag > b.tag) - (a.tag < b.tag))
			);
			else if (event.target.innerText === "Recommended Time")
			setEnergiser(sortedEn.sort((a, b) => (a.time > b.time) - (a.time < b.time)));
			else if (event.target.innerText === "Downvotes")
			setEnergiser(
			sortedEn
				.sort((a, b) => a.downvote - b.downvote)
			);
			else if (event.target.innerText === "Upvotes")
			setEnergiser(
				sortedEn
					.sort((a, b) => a.upvote - b.upvote)
				);
				// else if (event.target.innerText === "Favorite")
				// setEnergiser(
				// 	sortedEn
				// 		.sort((a, b) => (a.value > b.value) - (a.value < b.value))
				// 	);
		}
		setSorted(sorted + 1);
	}
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
					<th className="set-pointer" scope="col" onClick={sortNum}>Name of Energiser</th>
					<th className="set-pointer" scope="col" onClick={sortNum}>Difficulty</th>
					<th className="set-pointer" scope="col" onClick={sortNum}>Recommended Time</th>
					<th>External Site</th>
					<th className="set-pointer" scope="col" onClick={sortNum}>Upvotes</th>
					<th className="set-pointer" scope="col" onClick={sortNum}>Downvotes</th>
					<th>Favorite</th>
				</thead>
				{energiser.map((item) => (
					<tbody className="result-tbody" key={item.id}>
						 <RowTable energiser={item} />
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ResultsTable;
