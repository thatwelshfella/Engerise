import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function Description(props) {

	const [upvote, setUpvote] = useState(props.location.upvote);
	const [downvote, setDownvote] = useState(props.location.downvote);
	const [clickedInc, setClickedInc] = useState(false);
	const [clickedDec, setClickedDec] = useState(false);
	const userId = "user" + props.location.id;
	const userDecId = "userdec" + props.location.id;
	let currentUser;
	let currentDecUser;

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
		<div className="container-fluid">
			<div className="col">
				<div className="h3 p-3 desc-div text-center">
					Energiser Name : {props.location.name}
				</div>
				<div>
					<hr></hr>
				</div>
				<div className="mt-1 detail-div text-center">
					Time per person : {props.location.time}
				</div>
				<div>
					<hr></hr>
				</div>
				<div className="mt-1 detail-div text-center">
					Description : {props.location.description}
				</div>
				<div>
					<hr></hr>
				</div>
				<div className="d-flex align-items-center">
					<FaThumbsUp onClick={incrementCounter}></FaThumbsUp>
					<p className="m-2">{upvote}</p>
				</div>
				<div className="d-flex align-items-center">
					<FaThumbsDown onClick={decrementCounter}></FaThumbsDown>
					<p className="m-2">{downvote}</p>
				</div>
				<div className="mt-3 detail-div text-center">
					<Link to={{
						pathname: "/results",
						api: "/api/wholelist",
						searchCriteria: null,
					}}>
						<button className="generate_btn btnClass" onClick={backButtonClicked}>BACK</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Description;
