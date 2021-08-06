import React from "react";
import cyf_brand from "./cyf_brand.png";
import energise from "./energise.png";

function Heading() {
  return (
		<header className="App-header">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 d-flex justify-content-between align-items-center">
						<img className="logo" src={cyf_brand} alt="CYF Logo" />{" "}
						<a href="https://energisers.herokuapp.com">
							<img className="elogo" src={energise} alt="Energise Logo" />
						</a>
					</div>
					<hr></hr>
				</div>
			</div>
		</header>
	);
}
export default Heading;
