import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function Description(props) {

	const [upvote, setUpvote] = useState(props.location.upvote);
	const [downvote, setDownvote] = useState(props.location.downvote);

	// increment upvote function
	const incrementCounter = ()=>{
		setUpvote(upvote + 1);
	};

	// decrement downvote function
	const decrementCounter = ()=>{
		setDownvote(downvote - 1);
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
					<Link to="/results">
						<button className="generate_btn" onClick={backButtonClicked}>BACK</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Description;
