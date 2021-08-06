import React, { useState, useEffect } from "react";
import cyf_brand from "./cyf_brand.png";
import { Link } from "react-router-dom";
import { Button } from "carbon-components-react";
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
		window.location.reload(false);
	}

	function userProfile() {
		console.log("Hi ", username);
	}

  return (
		<header className="App-header">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 d-flex justify-content-between">
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
									searchCriteria: null,
								}} style={{ textDecoration: "none" }}>
									{/* <Button kind="danger--tertiary" className="generate_btn" onClick={logoutUser} style={{
											border: "0",
											borderRadius: "10px",
											fontSize: "1em",
											marginTop: "1em",
										}}>Logout {username}</Button> */}
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
											userid: userid,
											searchCriteria: null,
										}} style={{ textDecoration: "none" }}>
										{/* <div className="d-flex align-items-center m-4"> */}
												<FaRegUser onClick={userProfile} title= {username+" Profile"} size={25} style={{
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
									{/* <Button kind="danger--tertiary" className="generate_btn" style={{
											border: "0",
											borderRadius: "10px",
											fontSize: "1em",
											marginTop: "1em",
										}}>Login {username}</Button> */}
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
									{/* <Button kind="danger--tertiary" className="generate_btn" style={{
											border: "0",
											borderRadius: "10px",
											fontSize: "1em",
											marginTop: "1em",
										}}>Sign up </Button> */}
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
							<h1>Energise!</h1>
						</div>
					</div>
					<hr></hr>
				</div>
			</div>
		</header>
	);
}
export default Heading;
