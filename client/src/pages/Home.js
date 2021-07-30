import GenerateDiv from "./GenerateDiv";
import React from "react";
import TopEnergisers from "./TopEnergisers";
import WhatIsAnEnergiser from "./WhatIsAnEnergiser";
import "./Home.scss";


export function Home() {
	return (
		<main role="main">
			<div className="container-fluid min-vh-90 justify-space-between">
				<div className="row gy-3">
					<div className="col-0 col-md-1 col-lg-2 col-xl-3"></div>
						<GenerateDiv />
					<div className="col-0 col-md-1 col-lg-2 col-xl-3"></div>
				</div>{" "}
				<div className="row">
					<div className="col-0 col-lg-1"></div>
					<div className="col-12 col-lg-6 p-4">
						<WhatIsAnEnergiser />
						<br />
					</div>
					<div className="col-0 col-lg-1"></div>
					<div className="col-12 col-lg-3 p-4">
						<TopEnergisers />
						<br />
					</div>
					<div className="col-0 col-lg-1"></div>
				</div>
			</div>
		</main>
	);
}

export default Home;
