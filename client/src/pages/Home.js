import GenerateDiv from "./GenerateDiv";
import React, { useState, useEffect } from "react";
import TopEnergisers from "./TopEnergisers";
import WhatIsAnEnergiser from "./WhatIsAnEnergiser";
import "./Home.scss";


export function Home(props) {
	const [userid, setUserid] = useState(0);
	const [username, setUsername] = useState("");

	if (props.location.forload == 1){
		window.location.reload(false);
	}

	useEffect(() => {
		setUsername(localStorage.getItem("loginUsername"));
		setUserid(localStorage.getItem("loginUserid"));
	}, [userid, username]);
	return (
		<main role="main">
			<div className="container-fluid min-vh-90 justify-space-between font">
				<div className="row gy-3">
					<div className="col-0 col-md-1 col-lg-2 col-xl-3"></div>
						<GenerateDiv username= {username} userid={userid} />
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
						<TopEnergisers username= {username} userid={userid} />
						<br />
					</div>
					<div className="col-0 col-lg-1"></div>
				</div>
			</div>
		</main>
	);
}

export default Home;
