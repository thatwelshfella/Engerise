import GenerateDiv from "./GenerateDiv";
import React from "react";
import Tags from "./Tags";
import TopEnergisers from "./TopEnergisers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

export function Home() {
	return (
		<main role="main">
			<div className="container-fluid">
				<div className="row">
					<h1 className="text-left p-4">Energisers random generator</h1>
				</div>
				<div className="row">
					<GenerateDiv />
					<Tags />
					<br />
					<div className="col-12 col-md-6"></div>
					<div className="col-12 col-md-6">
						<TopEnergisers />
					</div>
				</div>
			</div>
		</main>
	);
}

export default Home;
