import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import "./app.scss";
import { Tag } from "carbon-components-react";

// import data from "../data/energiser.json";

function GenerateDiv() {
//   const [searchData, setSearchData] = useState(data);

const [searchRes, setSearchRes] = useState("");
const search = (searchVal) => {
  setSearchRes(searchVal);
};

  return (
		<div>
			<Tag>Tag</Tag>
			<div className="col-9">
				<br></br>
				<br></br>
				<Search search={search} />
				<br></br>
			</div>
			<div>
				{" "}
				<Link
					className="btn btn-primary generate_btn"
					to={{
						pathname: "/results",
						api: "/api/wholelist",
						searchCriteria: searchRes,
					}}
				>
					Generate Energiser
				</Link>
			</div>
		</div>
	);
}
export default GenerateDiv;