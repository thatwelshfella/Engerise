import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Tags from "./Tags";

function GenerateDiv() {
	//   const [searchData, setSearchData] = useState(data);

	const [searchRes, setSearchRes] = useState("");
	const search = (searchVal) => {
		setSearchRes(searchVal);
	};

	return (
		<div>
			<div>
				<br></br>
				<br></br>
				<SearchBar search={search} />
				<br></br>
				<Tags />
				<br></br>
			</div>
			<div className="col-12 d-flex justify-content-around homepageButtons">
				<Link
					className="btn btn-primary generate_btn"
					to={{
						pathname: "/results",
						api: "/api/wholelist",
						searchCriteria: searchRes,
					}}
				>
					Search Energisers
				</Link>
				<Link
					className="btn btn-primary generate_btn"
					to={{
						pathname: "/results",
						api: "/api/wholelist",
					}}
				>
					Random List
				</Link>
			</div>
		</div>
	);
}
export default GenerateDiv;
