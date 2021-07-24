import GenerateDiv from "./GenerateDiv";
import React from "react";
import Tags from "./Tags";
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
					<Tags />
					<GenerateDiv />
				</div>
			</div>
		</main>
	);
}

export default Home;
