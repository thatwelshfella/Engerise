import React from "react";
import { Link } from "react-router-dom";

function Description(props) {


    //function for back button to be added
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
