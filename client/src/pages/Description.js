import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Button } from "carbon-components-react";

function Description(props) {

	const [upvote, setUpvote] = useState(props.location.upvote);
	const [downvote, setDownvote] = useState(props.location.downvote);
	const [clickedInc, setClickedInc] = useState(false);
	const [clickedDec, setClickedDec] = useState(false);
	const userId = "user" + props.location.id;
	const userDecId = "userdec" + props.location.id;
	let currentUser;
	let currentDecUser;

	console.log(props);

	function clickedIncrement() {
		if (typeof Storage !== "undefined") {
			// let currentInc = localStorage.getItem(iconId);
			localStorage.setItem(userId, "clicked"+props.location.id);
		} else {
			document.getElementById("result").innerHTML =
				"Sorry, your browser does not support web storage...";
		}
	}

	function clickedDecrement() {
		if (typeof Storage !== "undefined") {
			localStorage.setItem(userDecId, "clickedDec"+props.location.id);
		} else {
			document.getElementById("result").innerHTML =
				"Sorry, your browser does not support web storage...";
		}
	}
	// increment upvote function
	const incrementCounter = () => {
		if (!clickedInc) {
			currentUser = localStorage.getItem(userId);
			if (currentUser == null){
				clickedIncrement();
				setClickedInc(true);
				setUpvote(upvote + 1);
				const requestOptions = {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						title: "React Hooks PUT Request Example",
						upvote: upvote,
					}),
				};
				fetch(`../api/upvote/${props.location.id}`, requestOptions)
					.then((response) => response.json())
					.then((err) => console.log(err));
			}
		}
	};
	// decrement downvote function
	const decrementCounter = () => {
		if (!clickedDec) {
			currentDecUser = localStorage.getItem(userDecId);
			if (currentDecUser == null){
				clickedDecrement();
				setClickedDec(true);
				setDownvote(downvote - 1);
				const requestOptions = {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						title: "React Hooks PUT Request Example",
						downvote: downvote,
					}),
				};
				fetch(`../api/downvote/${props.location.id}`, requestOptions)
					.then((response) => response.json())
					.then((err) => console.log(err));
			}
		}
	};

    // function for back button to be added
function backButtonClicked(){
    console.log("Back Button Clicked");
}


	return (
		<div className="font">
			<div className=" bg-light p-5">
				<div className="container col d-flex flex-column align-items-start">
					<div className="h3 undeline">
					Energiser Name : {props.location.name}
					</div>
						<hr />
					<div className="h5 mt-1">
						Time per person : {props.location.time}
					</div>
						<hr></hr>
					<div className="h5 mt-1">
						Description : {props.location.description}
					</div>
						<hr></hr>
				</div>
			</div>
			<div className="col d-flex flex-row justify-content-center p-4">
				<div className="d-flex align-items-center m-4">
					<FaThumbsUp onClick={incrementCounter} size={25}
					onMouseOver={({ target })=>target.style.color="green"}
					onMouseOut={({ target })=>target.style.color="black"}>
					</FaThumbsUp>
					<p className="m-2">{upvote}</p>
				</div>
				<div className="d-flex align-items-center m-4">
					<FaThumbsDown onClick={decrementCounter} size={25}
					onMouseOver={({ target })=>target.style.color="red"}
					onMouseOut={({ target })=>target.style.color="black"}></FaThumbsDown>
					<p className="m-2">{downvote}</p>
				</div>
			</div>
				<div className="mt-3 detail-div text-center">
					<Link to={{
						pathname: "/results",
						api: "/api/wholelist",
						userid: props.location.userid,
						username: props.location.username,
						searchCriteria: null,
					}} style={{ textDecoration: "none" }}>
						<Button className="generate_btn btnClass" onClick={backButtonClicked} style={{
							border:"0",
							borderRadius: "10px",
							fontSize: "1.3em",
							background: "#ED4343",
							textAlign: "center",
							margin: "0.5em" }} kind="secondary">BACK</Button>
					</Link>
				</div>
		</div>
	);
}

export default Description;
