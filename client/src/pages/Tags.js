import React from "react";
import { Tag } from "carbon-components-react";
import { Link } from "react-router-dom";

function Tags(props) {
	return (
		<div
			style={{ textAlign: "center" }}
			className="d-flex justify-content-center align-items-center"
		>
			{"Tags:  "}
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/easy",
						userid: props.userid,
						username: props.username,
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
						userid: props.userid,
						username: props.username,
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
						userid: props.userid,
						username: props.username,
					}}
				>
					Difficult
				</Link>
			</Tag>{" "}
			{/* Below Tags are Hidden as Carbon Design Suggests Maximum of 6 Tags
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/external",
					}}
				>
					External
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
			</Tag>{" "} */}
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/5minutes",
						userid: props.userid,
						username: props.username,
					}}
				>
					Short
				</Link>
			</Tag>{" "}
			{/* Tag Hidden as too many tags per Carbon Design
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/10minutes",
					}}
				>
					10 Mins
				</Link>
			</Tag>{" "} */}
			<Tag type="gray" title="Clear Filter">
				<Link
					className="filterTag"
					to={{
						pathname: "/results",
						api: "/api/15minutes",
						userid: props.userid,
						username: props.username,
					}}
				>
					Long
				</Link>
			</Tag>{" "}
		</div>
	);
}

export default Tags;
