import GenerateDiv from "./GenerateDiv";
import React from "react";
import TopEnergisers from "./TopEnergisers";
import WhatIsAnEnergiser from "./WhatIsAnEnergiser";
import "./Home.scss";


export function Home() {
	return (
		<main role="main">
			<div className="container-fluid">
				<div className="row">
					<div className="col-0 col-md-1 col-lg-2 col-xl-3 p-4"></div>
					<div className="col-12 col-md-10 col-lg-8 col-xl-6">
						<GenerateDiv />
					</div>
					<div className="col-0 col-md-1 col-lg-2 col-xl-3 p-4"></div>
				</div>{" "}
				<br /> <br /> <br /> <br />
				<div className="row">
					<div className="col-0 col-lg-1 p-4"></div>
					<div className="col-12 col-lg-6 p-4">
						<WhatIsAnEnergiser />
					</div>
					<div className="col-0 col-lg-1 p-4"></div>
					<div className="col-12 col-lg-3 p-4">
						<TopEnergisers />
					</div>
					<div className="col-0 col-lg-1 p-4"></div>
				</div>
			</div>
		</main>
	);
}

export default Home;
