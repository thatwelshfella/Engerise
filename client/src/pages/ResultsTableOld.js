import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RowTable from "./RowTable";
import {
	Table,
	TableBody,
	TableContainer,
	TableToolbar,
	TableToolbarContent,
	Button,
	Breadcrumb,
	BreadcrumbItem,
} from "carbon-components-react";
import { CaretSort16, Add24 } from "@carbon/icons-react";
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
		<div style={{}} className="pt-4 font">
			<MyModal
				body="Sorry! There is no match to your search criteria."
				header="Search an Energiser"
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>

			<Breadcrumb>
				<BreadcrumbItem className="crumb" style={{color: "red", paddingLeft:"0.5rem"}} href="/">Home</BreadcrumbItem>
			</Breadcrumb>

			<div className="d-flex justify-content-between mt-3 detail-div text-center hompageButtons">
				<div></div>
			</div>
			<div className="table-height container">
				<TableContainer>
					<TableToolbar>
						<TableToolbarContent>
							<Link to="/new" style={{ textDecoration: "none" }}>
								<Button
									style={{
										background: "#ED4343",
									}}
									kind="secondary"
									renderIcon={Add24}
								>
									Create new Energiser
								</Button>
							</Link>
						</TableToolbarContent>
					</TableToolbar>
					{/* <Table className="container table table-success"> */}

					<Table className="table">
						<thead className="result-thead">
							{/* <td>ID</td> */}
							<th className="set-pointer" scope="col" onClick={sortNum}>
								<div className="fs-6 text" style={{ padding: "16px" }}>
									Name of Energiser
									<CaretSort16 style={{ color: "#fa4d56", margin: "5px" }} />
								</div>
							</th>
							<th className="set-pointer" scope="col" onClick={sortNum}>
								<div className="fs-6 text" style={{ padding: "16px" }}>
									Difficulty
									<CaretSort16 style={{ color: "#fa4d56", margin: "5px" }} />
								</div>
							</th>
							<th className="set-pointer" scope="col" onClick={sortNum}>
								<div className="fs-6 text" style={{ padding: "16px" }}>
									Recommended Time
									<CaretSort16 style={{ color: "#fa4d56", margin: "5px" }} />
								</div>
							</th>
							<th>
								<div className="fs-6 text" style={{ padding: "16px" }}>
									External Site
								</div>
							</th>
							<th className="set-pointer" scope="col" onClick={sortNum}>
								<div className="fs-6 text" style={{ padding: "16px" }}>
									Upvotes
									<CaretSort16 style={{ color: "#fa4d56", margin: "5px" }} />
								</div>
							</th>
							<th className="set-pointer" scope="col" onClick={sortNum}>
								<div className="fs-6 text" style={{ padding: "16px" }}>
									Downvotes
									<CaretSort16 style={{ color: "#fa4d56", margin: "5px" }} />
								</div>
							</th>
							<th className="set-pointer" onClick={sortNum}>
								<div className="fs-6 text" style={{ padding: "16px" }}>
									Favorite
									<CaretSort16 style={{ color: "#fa4d56", margin: "5px" }} />
								</div>
							</th>
						</thead>
							{energiser.map((item) => (
								<TableBody className="result-tbody" key={item.id}>
									<RowTable energiser={item} />
								</TableBody>
							))}
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default ResultsTable;
