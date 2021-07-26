import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
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
				<Search search={search} />

				<br></br>
				<Tags />
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
				>Generate Energiser
				</Link>
			</div>
		</div>
	);
}
export default GenerateDiv;