import React, { useState, useEffect } from "react";
import cyf_brand from "./cyf_brand.png";

import energise from "./energise.png";

import { Link } from "react-router-dom";
import { FaRegUser, FaSignOutAlt, FaSignInAlt, FaCreativeCommonsBy } from "react-icons/fa";


function Heading() {

	const [userid, setUserid] = useState(0);
	const [username, setUsername] = useState("Guest");

	useEffect(() => {
		setUsername(localStorage.getItem("loginUsername"));
		setUserid(localStorage.getItem("loginUserid"));
	}, [userid, username]);

	function logoutUser(){
		let logoutuser={
			user_id: userid,
		};
		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(logoutuser),
		};
		fetch("../api/userlogout/", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if(res){
					console.log("You have logged out successfully");
				}
			});

		localStorage.removeItem("loginUserid");
		localStorage.removeItem("loginUsername");
	}

  return (
		<header className="App-header">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 d-flex justify-content-between align-items-center">
						<div>
						<Link to={{
									pathname: "/",
									userid: userid,
									username: username,
								}}>
							<img className="logo" src={cyf_brand} alt="CYF Logo" />{" "}
						</Link>
						</div>
						{/* <h2>{username}</h2> */}
						<div className="d-flex justify-content-end">
						<h6 style={{
									marginTop: "2em",
									marginRight: "3em",
								}}>Welcome {username}</h6>
						{userid ? (<div><Link to={{
									pathname: "/",
									forload: 1,
									searchCriteria: null,
								}} style={{ textDecoration: "none" }}>
											<FaSignOutAlt onClick={logoutUser} title="Log Out" size={25} style={{
												marginTop: "2em",
												marginRight: "3em",
												cursor: "pointer",
											}}
												onMouseOver={({ target })=>target.style.color="red"}
												onMouseOut={({ target })=>target.style.color="black"}>
											</FaSignOutAlt>
										</Link><Link to={{
											pathname: "/profile",
											searchCriteria: null,
										}} style={{ textDecoration: "none" }}>
												<FaRegUser title= {username+" Profile"} size={25} style={{
											marginTop: "2em",
											marginRight: "3em",
											cursor: "pointer",
										}}
												onMouseOver={({ target })=>target.style.color="red"}
												onMouseOut={({ target })=>target.style.color="black"}></FaRegUser>
											</Link>
											{/* </div> */}
										</div>
										) : (<div><Link to={{
									pathname: "/login",
									searchCriteria: null,
								}} style={{ textDecoration: "none" }}>
										<FaSignInAlt title="Login" size={25} style={{
												marginTop: "2em",
												marginRight: "3em",
												cursor: "pointer",
											}}
												onMouseOver={({ target })=>target.style.color="red"}
												onMouseOut={({ target })=>target.style.color="black"}>
											</FaSignInAlt>
								</Link><Link to={{
									pathname: "/signup",
									searchCriteria: null,
								}} style={{ textDecoration: "none" }}>
										<FaCreativeCommonsBy title="Sign up" size={25} style={{
												marginTop: "2em",
												marginRight: "3em",
												cursor: "pointer",
											}}
												onMouseOver={({ target })=>target.style.color="red"}
												onMouseOut={({ target })=>target.style.color="black"}>
											</FaCreativeCommonsBy>
								</Link></div>
						)}
						{/* <a href="/">
							<img className="elogo" src={energise} alt="Energise Logo" />
						</a> */}
						<Link to={{
									pathname: "/",
									userid: userid,
									username: username,
								}}>
							<img className="elogo" src={energise} alt="Energise Logo" />{" "}
						</Link>
						</div>
					</div>
					<hr></hr>
				</div>
			</div>
		</header>
	);
}
export default Heading;
