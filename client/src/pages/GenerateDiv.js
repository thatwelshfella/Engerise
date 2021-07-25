import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
// import data from "../data/energiser.json";

function GenerateDiv() {
//   const [searchData, setSearchData] = useState(data);

const [searchRes, setSearchRes] = useState("");
const search = (searchVal) => {
  setSearchRes(searchVal);
};

  return (
		<div>
			<div className="col-9">
				<br></br>
				<br></br>
        <Search search={search} />
				<br></br>
			</div>
			<div>
				<Link
					className="btn btn-secondary btn-sm"
					to={{
						pathname: "/results",
						api: "/api/easy",
					}}
				>
					Easy
				</Link>{" "}
				<Link
					className="btn btn-secondary btn-sm"
					to={{
						pathname: "/results",
						api: "/api/medium",
					}}
				>
					Medium
				</Link>{" "}
				<Link
					className="btn btn-secondary btn-sm"
					to={{
						pathname: "/results",
						api: "/api/difficult",
					}}
				>
					Difficult
				</Link>{" "}
				<Link
					className="btn btn-secondary btn-sm"
					to={{
						pathname: "/results",
						api: "/api/external",
					}}
				>
					External Link
				</Link>{" "}
				<Link
					className="btn btn-secondary btn-sm"
					to={{
						pathname: "/results",
						api: "/api/internal",
					}}
				>
					Not External
				</Link>{" "}
				<Link
					className="btn btn-secondary btn-sm"
					to={{
						pathname: "/results",
						api: "/api/5minutes",
					}}
				>
					5 Minutes
				</Link>{" "}
				<Link
					className="btn btn-secondary btn-sm"
					to={{
						pathname: "/results",
						api: "/api/10minutes",
					}}
				>
					10 Minutes
				</Link>{" "}
				<Link
					className="btn btn-secondary btn-sm"
					to={{
						pathname: "/results",
						api: "/api/15minutes",
					}}
				>
					15 Minutes
				</Link>{" "}
				<br></br>
				<br></br>
        <Link
					className="btn btn-primary generate_btn"
					to={{
						pathname: "/results",
						api: "/api/wholelist",
            searchCriteria: searchRes,
					}}
				>Generate Energiser</Link>

			</div>
		</div>
	);
}
export default GenerateDiv;