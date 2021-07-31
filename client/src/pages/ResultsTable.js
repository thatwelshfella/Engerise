import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RowTable from "./RowTable";
import { DataTable, Table, TableHead, TableHeader, TableBody, Button } from "carbon-components-react";
import { CaretSort16 } from "@carbon/icons-react";
import MyModal from "./MyModal";

const ResultsTable = (props) => {
	const [energiser, setEnergiser] = useState([]);
	const [sorted, setSorted] = useState(0);
    const [modalShow, setModalShow] = React.useState(false);

	props.location.api ? null : (props.location.api = "/api/wholelist");

	useEffect(() => {
		fetch(props.location.api)
			.then((res) => res.json())
			.then((data) => {
				if (
					props.location.api === "/api/wholelist" &&
					props.location.searchCriteria == null
				) {
					setEnergiser(data);
				} else if (
					props.location.api === "/api/wholelist" &&
					(props.location.searchCriteria !== "undefined" ||
						props.location.searchCriteria !== "")
				) {
					let serachData = data.filter((sd) =>
						sd.name
							.toLowerCase()
							.includes(props.location.searchCriteria.toLowerCase())
					);
					if(serachData.length == 0){
						setModalShow(true);
					}else{
					setEnergiser(serachData);
					}
				} else {
					setEnergiser(data);
				}
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

	// const [dataTable, setDataTable] = useState(shuffle(energiser));

	function sortNum(event) {
		console.log("hello");
		let sortedEn = shuffle(energiser);
		if (sorted % 2 === 0) {
			if (event.target.innerText === "Name of Energiser") {
				setEnergiser(
					shuffle(sortedEn)
						.sort((a, b) => (a.name > b.name) - (a.name < b.name))
						.reverse()
				);
			} else if (event.target.innerText === "Difficulty") {
				setEnergiser(
					sortedEn.sort((a, b) => (a.tag > b.tag) - (a.tag < b.tag)).reverse()
				);
			} else if (event.target.innerText === "Recommended Time") {
				setEnergiser(
					sortedEn
						.sort((a, b) => (a.time > b.time) - (a.time < b.time))
						.reverse()
				);
			} else if (event.target.innerText === "Downvotes") {
				setEnergiser(
					sortedEn.sort((a, b) => a.downvote - b.downvote).reverse()
				);
			} else if (event.target.innerText === "Upvotes") {
				setEnergiser(sortedEn.sort((a, b) => a.upvote - b.upvote).reverse());
			} else if (event.target.innerText === "Favorite") {
				energiser.sort((a) => {
					if (localStorage.getItem(`favicon${a.id}`) === "red") {
						return -1;
					} else {
						return 1;
					}
				});
			}
			// setEnergiser(
			// 	sortedEn
			// 		.sort((a, b) => (a.value > b.value) - (a.value < b.value))
			// 		.reverse()
			// 	);
		} else {
			if (event.target.innerText === "Name of Energiser") {
				setEnergiser(
					sortedEn.sort((a, b) => (a.name > b.name) - (a.name < b.name))
				);
			} else if (event.target.innerText === "Difficulty") {
				setEnergiser(
					sortedEn.sort((a, b) => (a.tag > b.tag) - (a.tag < b.tag))
				);
			} else if (event.target.innerText === "Recommended Time") {
				setEnergiser(
					sortedEn.sort((a, b) => (a.time > b.time) - (a.time < b.time))
				);
			} else if (event.target.innerText === "Downvotes") {
				setEnergiser(sortedEn.sort((a, b) => a.downvote - b.downvote));
			} else if (event.target.innerText === "Upvotes") {
				setEnergiser(sortedEn.sort((a, b) => a.upvote - b.upvote));
			} else if (event.target.innerText === "Favorite") {
				energiser.sort((a) => {
					if (localStorage.getItem(`favicon${a.id}`) === "red") {
						return 1;
					} else {
						return -1;
					}
				});
			}
		}
		setSorted(sorted + 1);
	}
	return (
		<div className="res-div pt-4">
    <MyModal body = "Sorry! There is no match to your search criteria." header ="Search an Energiser" show={modalShow}
                onHide={() => setModalShow(false)} />
			<div className="mt-3 detail-div text-center hompageButtons">
				<Link to="/">
					<Button style={{
						border:"0",
						borderRadius: "10px",
						textDecoration:"none",
						fontSize: "1.3em",
						background: "#ED4343",
						textAlign: "center" }} kind="secondary">
							BACK
					</Button>
				</Link>
				<span  className="mt-6"></span>
				<Link className="mt-3 float-right" to="/new">
					<button className="generate_btn">Create new Energiser</button>
				</Link>
			</div>
			<h1 className="text-center p-4">RESULTS TABLE</h1>
			<div className="table-height ">
			<Table className="container table">
			{/* <Table className="container table table-success"> */}
				<TableHead className="result-thead">
					{/* <td>ID</td> */}
					<TableHeader className="set-pointer" scope="col" onClick={sortNum} >
						Name of Energiser
						<CaretSort16 />
					</TableHeader>
					<TableHeader className="set-pointer" scope="col" onClick={sortNum}>
						Difficulty
						<CaretSort16 />
					</TableHeader>
					<TableHeader className="set-pointer" scope="col" onClick={sortNum}>
						Recommended Time
						<CaretSort16 />
					</TableHeader>
					<TableHeader>External Site </TableHeader>
					<TableHeader className="set-pointer" scope="col" onClick={sortNum}>
						Upvotes
						<CaretSort16 />
					</TableHeader>
					<TableHeader className="set-pointer" scope="col" onClick={sortNum}>
						Downvotes
						<CaretSort16 />
					</TableHeader>
					<TableHeader className="set-pointer" onClick={sortNum}>
						Favorite
						<CaretSort16 />
					</TableHeader>
				</TableHead>
				{energiser.map((item) => (
					<TableBody className="result-tbody" key={item.id}>
						<RowTable energiser={item} />
					</TableBody>
				))}
			</Table>
			</div>
		</div>
	);
};

export default ResultsTable;
