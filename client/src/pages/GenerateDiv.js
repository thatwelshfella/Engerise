import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Tags from "./Tags";
import { Button } from "carbon-components-react";

function GenerateDiv(props) {
	const [searchRes, setSearchRes] = useState("");
	const search = (searchVal) => {
		setSearchRes(searchVal);
	};

	return (
		<div className="container-fluid justify-content-between">
			<div className="row justify-content-evenly">
				<div className="col-0 col-sm-1 col-md-2"></div>{" "}
				<div className="col-8 col-sm-7 col-md-6">
					<SearchBar search={search} />{" "}
				</div>
				<div className="col-2 homepageButtons">
					<Button
						style={{
							border: "0",
							borderRadius: "10px",
							textDecoration: "none",
							fontSize: "1.3em",
							background: "#ED4343",
							textAlign: "center",
						}}
						kind="secondary"
					>
						<Link
							to={{
								pathname: "/results",
								api: "/api/wholelist",
								searchCriteria: searchRes,
							}}
						>
							Search
						</Link>
					</Button>{" "}
				</div>
				<div className="col-1 col-sm-2"></div>{" "}
			</div>
			<br />
			<div className="row justify-content-center">
				<Tags username= {props.username} userid={props.userid} />
			</div>
			<br />
			<div className="d-flex justify-content-center">
				<p className="randomListText">
					Don't know where to start? Try a{" "}
					<Link
						to={{
							pathname: "/results",
							api: "/api/wholelist",
						}}
					>
						Random List
					</Link>
				</p>
			</div>
		</div>
	);
}
export default GenerateDiv;
