import React from 'react';
import { Link } from "react-router-dom";

function Tags(props) {
    return (
			<div>
				<Link
					className=""
					to={{
						pathname: "/results",
						api: "/api/easy",
					}}
				>
					Easy
				</Link>{" "}
				<Link
					className=""
					to={{
						pathname: "/results",
						api: "/api/medium",
					}}
				>
					Medium
				</Link>{" "}
				<Link
					className=""
					to={{
						pathname: "/results",
						api: "/api/difficult",
					}}
				>
					Difficult
				</Link>{" "}
				<Link
					className=""
					to={{
						pathname: "/results",
						api: "/api/external",
					}}
				>
					External Link
				</Link>{" "}
				<Link
					className=""
					to={{
						pathname: "/results",
						api: "/api/internal",
					}}
				>
					Not External
				</Link>{" "}
				<Link
					className=""
					to={{
						pathname: "/results",
						api: "/api/5minutes",
					}}
				>
					5 Minutes
				</Link>{" "}
				<Link
					className=""
					to={{
						pathname: "/results",
						api: "/api/10minutes",
					}}
				>
					10 Minutes
				</Link>{" "}
				<Link
					className=""
					to={{
						pathname: "/results",
						api: "/api/15minutes",
					}}
				>
					15 Minutes
				</Link>{" "}
			</div>
		);
}

export default Tags;