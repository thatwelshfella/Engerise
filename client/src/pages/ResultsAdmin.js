import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
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
	Breadcrumb,
	BreadcrumbItem,
	Pagination,
} from "carbon-components-react";
import MyModal from "./MyModal";

const ResultsAdmin = () => {
	const [energiser, setEnergiser] = useState([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const handleChangePage = (event) => {
		setPage(event.page);
		setPageSize(event.pageSize);
	};

	const [msgModalShow, setMsgModalShow] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);

	useEffect(() => {
		fetch("/api/enrgiserNames")
			.then((res) => res.json())
			.then((data) => {
				setEnergiser(data);
			});
	}, []);

	//headers code

	const headers = [
		{
			key: "name",
			header: "Name",
		},
		{
			key: "id",
			header: "Delete",
		},
	];

    function deleteEnergiser(event){
        let energiserAdmin = {
            id: event.target.id,
        };

        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(energiserAdmin),
        };
        fetch("../api/delEnergiser/", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    fetch("/api/enrgiserNames")
                    .then((res) => res.json())
                    .then((data) => {
                        setEnergiser(data);
                    });
                }
            })
            .catch(() => console.log(true));
    }

	return (
		<div className="resultsAdminRoot">
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
				</BreadcrumbItem>{" "}
				<BreadcrumbItem href="/profile/">Profile</BreadcrumbItem>
			</Breadcrumb>

			<DataTable rows={energiser} headers={headers}>
				{({
					rows,
					headers,
					getHeaderProps,
					getTableContainerProps,
					onInputChange,
                    getTableProps,
				}) => (
					<TableContainer {...getTableContainerProps()}>
						<TableToolbar>
							<TableToolbarContent>
								<TableToolbarSearch
									persistent="true"
									onChange={onInputChange}
									/>
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
														<TiDelete
                                                            onClick={deleteEnergiser}
                                                            id= {row.id}
                                                            size={25}
                                                            onMouseOver={({ target }) => (target.style.color = "green")}
                                                            onMouseOut={({ target }) => (target.style.color = "black")}
                                                        ></TiDelete>
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

export default ResultsAdmin;
