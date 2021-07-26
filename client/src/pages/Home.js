import GenerateDiv from "./GenerateDiv";
import React from "react";
import TopEnergisers from "./TopEnergisers";
import WhatIsAnEnergiser from "./WhatIsAnEnergiser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.scss";

export function Home() {
	return (
		<main role="main">
			<div className="container-fluid">
				<div className="row">
					<h1 className="text-left p-4">Energisers random generator</h1>
				</div>
				<div className="row">
					<GenerateDiv />
					<br /> <div className="col-0 col-md-1 p-4"></div>
					<div className="col-12 col-md-6 p-4">
						<WhatIsAnEnergiser />
					</div>
					<div className="col-0 col-md-1 p-4"></div>
					<div className="col-12 col-md-3 p-4">
						<TopEnergisers />
					</div>
					<div className="col-0 col-md-1 p-4"></div>
				</div>
			</div>
		</main>
	);
}

export default Home;
