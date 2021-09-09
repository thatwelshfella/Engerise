import React, { useState, useEffect } from "react";
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
	Pagination,
} from "carbon-components-react";
import { Add24 } from "@carbon/icons-react";

import MyModal from "./MyModal";

const ResultsTable = (props) => {
	const [energiser, setEnergiser] = useState([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const handleChangePage = (event) => {
		setPage(event.page);
		setPageSize(event.pageSize);
	};

	const [msgModalShow, setMsgModalShow] = useState(false);
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

	function disabledFeature(){
		setMsgModalShow(true);
	}

	return (
		<div className="resultsTableRoot">
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

					selectedRows,
					getBatchActionProps,
					// getRowProps,

					getTableProps,
				}) => (
					<TableContainer {...getTableContainerProps()}>
						<TableToolbar>
							<TableToolbarContent>
								<TableToolbarSearch
									persistent="true"
									onChange={onInputChange}
									/>
								{userid ? (<Link to="/new" style={{ textDecoration: "none" }}>
									<Button
										style={{
											background: "#ED4343",
										}}
										kind="primary"
										renderIcon={Add24}
										>
										Create
									</Button>
								</Link>):(
									<Button onClick = {disabledFeature}
									style={{
										background: "#ED4343",
									}}
									kind="primary"
									renderIcon={Add24}
									>Create
									</Button>
								)}
							</TableToolbarContent>
						</TableToolbar>
						<Table {...getTableProps()}>
							<TableHead>
								<TableRow>
									{headers.map((header, index) => (
										<TableHeader key={index}
										{...getHeaderProps({ header, isSortable: true })}
										>
											{header.header}
										</TableHeader>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.slice(page * pageSize - pageSize, page * pageSize).map((row) => (
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
			<Pagination
				backwardText="Previous page"
				forwardText="Next page"
				itemsPerPageText="Items per page:"
				page={page}
				pageNumberText="Page Number"
				pageSize={pageSize}
				pageSizes={[
				10,
				20,
				50,
				]}
				totalItems={energiser.length}
				onChange={handleChangePage}
			/>

	<MyModal body = "You need to login to create a new Energiser!" show={msgModalShow}
                onHide={() => setMsgModalShow(false)} />
</div>);

};

export default ResultsTable;
