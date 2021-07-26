import React from "react";
import { Tag } from "carbon-components-react";
import { Link } from "react-router-dom";

function Tags(props) {
	return (
		<div>
			{"Tags:  "}
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/easy",
					}}
				>
					Easy
				</Link>
			</Tag>{" "}
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/medium",
					}}
				>
					Medium
				</Link>
			</Tag>{" "}
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/difficult",
					}}
				>
					Difficult
				</Link>
			</Tag>{" "}
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/external",
					}}
				>
					External Link
				</Link>
			</Tag>{" "}
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/internal",
					}}
				>
					Not External
				</Link>
			</Tag>{" "}
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/5minutes",
					}}
				>
					5 Minutes
				</Link>
			</Tag>{" "}
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/10minutes",
					}}
				>
					10 Minutes
				</Link>
			</Tag>{" "}
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/15minutes",
					}}
				>
					15 Minutes
				</Link>
			</Tag>{" "}
		</div>
	);
}

export default Tags;
