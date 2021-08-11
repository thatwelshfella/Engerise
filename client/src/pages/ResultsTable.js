import React, { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import Favourite from "./Favourite";
import {
	DataTable,
	Table,
	TableHead,
	TableRow,
	TableHeader,
	TableBody,
	TableCell,
	TableContainer,
	TableToolbar,
	TableToolbarSearch,
	TableToolbarContent,
	Button,
	Breadcrumb,
	BreadcrumbItem,
} from "carbon-components-react";
import { Add24 } from "@carbon/icons-react";

import MyModal from "./MyModal";

const ResultsTable = (props) => {
	const [energiser, setEnergiser] = useState([]);

	const [modalShow, setModalShow] = React.useState(false);
	const [userid, setUserid] = useState(0);
	const [username, setUsername] = useState("");

	useEffect(() => {
		setUsername(localStorage.getItem("loginUsername"));
		setUserid(localStorage.getItem("loginUserid"));
	}, [userid, username]);

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
					if (serachData.length == 0) {
						setModalShow(true);
					} else {
						setEnergiser(serachData);
					}
				} else {
					setEnergiser(data);
				}
			});
	}, []);

	//headers code

	const headers = [
		{
			key: "name",
			header: "Name",
		},
		{
			key: "tag",
			header: "Difficulty",
		},
		{
			key: "time",
			header: "Recommended Time",
		},
		{
			key: "upvote",
			header: "Upvotes",
		},
		{
			key: "downvote",
			header: "Downvotes",
		},
		{
			key: "id",
			header: "Favourite",
		},
	];

	return (
		<div>
			<MyModal
				body="Sorry! There is no match to your search criteria."
				header="Search an Energiser"
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
			<Breadcrumb>
				<BreadcrumbItem
					className="crumb"
					style={{ color: "red", paddingLeft: "0.5rem" }}
					href="/"
				>
					Home
				</BreadcrumbItem>
			</Breadcrumb>

			<DataTable rows={energiser} headers={headers}>
				{({
					rows,
					headers,
					getHeaderProps,
					getTableContainerProps,
					onInputChange,
					getRowProps,
					getTableProps,
				}) => (
					<TableContainer {...getTableContainerProps()}>
						<TableToolbar>
							<TableToolbarContent>
								<TableToolbarSearch
									persistent="true"
									onChange={onInputChange}
								/>
								<Link to="/new" style={{ textDecoration: "none" }}>
									<Button
										style={{
											background: "#ED4343",
										}}
										kind="primary"
										renderIcon={Add24}
									>
										Create
									</Button>
								</Link>
							</TableToolbarContent>
						</TableToolbar>
						<Table {...getTableProps()}>
							<TableHead>
								<TableRow>
									{headers.map((header) => (
										<TableHeader
											{...getHeaderProps({ header, isSortable: true })}
										>
											{header.header}
										</TableHeader>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow key={row.id}>
										{row.cells.map((cell) => (
											<TableCell key={cell.id}>
												{cell.id === `${row.id}:name` ? (
													<a href={`/description?id=${row.id}`}>{cell.value}</a>
												) : cell.value === row.id ? (
													<Favourite id={row.id} />
												) : (
													cell.value
												)}
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</DataTable>
			{/*
// 		<div className="res-div pt-4 font">
//     <MyModal body = "Sorry! There is no match to your search criteria." header ="Search an Energiser" show={modalShow}
//                 onHide={() => setModalShow(false)} />
// 			<div className="mt-3 detail-div text-center hompageButtons">
// 				<Link to={{
// 							pathname: "/",
// 							userid: userid,
// 							username: username,
// 						}} style={{ textDecoration: "none" }}>
// 					<Button style={{
// 						border:"0",
// 						borderRadius: "10px",
// 						fontSize: "1.3em",
// 						background: "#ED4343",
// 						textAlign: "center",
// 						margin: "0.5em" }} kind="secondary">
// 							BACK
// 					</Button>
// 				</Link>
// 				{ userid ?
// 				(
// 					<Link className="mt-3 float-right" to={{
// 						pathname: "/new",
// 						userid: userid,
// 						username: username,
// 					}} style={{ textDecoration: "none" }}>
// 					<Button renderIcon={Add16} className="generate_btn" style={{
// 						border:"0",
// 						borderRadius: "10px",
// 						fontSize: "1.3em",
// 						background: "#ED4343",
// 						textAlign: "center",
// 						margin: "0.5em" }} kind="secondary">Create new Energiser</Button>
// 				</Link>
// 				):(<span  className="mt-6"></span>)}
// 			</div>
// 			<h1 className="text-center p-4">RESULTS TABLE</h1>
// 			<div className="table-height ">
// 			<Table className="container table ">
// 			 <Table className="container table table-success"> 
// 				<thead className="result-thead">
// 				 <td>ID</td> 
// 					<th className="set-pointer" scope="col" onClick={sortNum} >
// 						<div className="fs-6 text" style={{ padding: "16px" }}>
// 						Name of Energiser
// 						<CaretSort16 style={{ color: "#fa4d56", margin:"5px" }} />
// 						</div>
// 					</th>
// 					<th className="set-pointer" scope="col" onClick={sortNum}>
// 					<div className="fs-6 text" style={{ padding: "16px" }}>
// 						Difficulty
// 						<CaretSort16 style={{ color: "#fa4d56", margin:"5px" }} />
// 						</div>
// 					</th>
// 					<th className="set-pointer" scope="col" onClick={sortNum}>
// 					<div className="fs-6 text" style={{ padding: "16px" }}>
// 						Recommended Time
// 						<CaretSort16 style={{ color: "#fa4d56", margin:"5px" }} />
// 						</div>
// 					</th>
// 					<th>
// 					<div className="fs-6 text" style={{ padding: "16px" }}>
// 						External Site
// 						</div>
// 					</th>
// 					<th className="set-pointer" scope="col" onClick={sortNum}>
// 					<div className="fs-6 text" style={{ padding: "16px" }}>
// 						Upvotes
// 						<CaretSort16 style={{ color: "#fa4d56", margin:"5px" }} />
// 						</div>
// 					</th>
// 					<th className="set-pointer" scope="col" onClick={sortNum}>
// 					<div className="fs-6 text" style={{ padding: "16px" }}>
// 						Downvotes
// 						<CaretSort16 style={{ color: "#fa4d56", margin:"5px" }} />
// 						</div>
// 					</th>
// 					<th className="set-pointer" onClick={sortNum}>
// 					<div className="fs-6 text" style={{ padding: "16px" }}>
// 						Favorite
// 						<CaretSort16 style={{ color: "#fa4d56", margin:"5px" }} />
// 						</div>
// 					</th>
// 				</thead>
// 				{energiser.map((item) => (
// 					<TableBody className="result-tbody" key={item.id}>
// 						<RowTable username= {username} userid={userid} energiser={item} />
// 					</TableBody>
// 				))}
// 			</Table>
// 			</div> */}
		</div>
	);
};

export default ResultsTable;
