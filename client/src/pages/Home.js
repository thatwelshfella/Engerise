import GenerateDiv from "./GenerateDiv";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

export function Home() {
	return (
		<main role="main">
			<div className="row">
				<h1 className="text-left p-4">Energisers random generator</h1>
			</div>
			<div className="row">
				<GenerateDiv />
			</div>
		</main>
	);
}

export default Home;
