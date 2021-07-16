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
				<div className="h3 p-3 bg-success text-white text-center">
					Energiser Name : {props.location.name}
				</div>
				<div className="mt-1 text-center">
					Time per person : {props.location.time}
				</div>
				<div className="mt-1 text-center">
					Description : {props.location.description}
				</div>
				<div className="mt-3 text-center">
					<Link to="/results">
						<button onClick={backButtonClicked}>BACK</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Description;
