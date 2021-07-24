import React from "react";
import { Link } from "react-router-dom";

function GenerateDiv() {
  return (
		<div>
			<div className="col-9">
				<br></br>
				<br></br>
				<br></br>
			</div>
			<div>


{" "}
				<Link
					className="btn btn-primary generate_btn"
					to={{
						pathname: "/results",
						api: "/api/wholelist",
					}}
				>
					Generate Energiser
				</Link>
			</div>
		</div>
	);
}
export default GenerateDiv;