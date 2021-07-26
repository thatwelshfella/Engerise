import React from "react";
import cyf_brand from "./cyf_brand.png";

function Heading() {
  return (
		<header className="App-header">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 d-flex justify-content-between p-1">
						<img className="logo" src={cyf_brand} alt="CYF Logo" />{" "}
						<h1>Energise!</h1>
					</div>
					<hr></hr>
				</div>
			</div>
		</header>
	);
}
export default Heading;
