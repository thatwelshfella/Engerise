import React from "react";
import { Link } from "react-router-dom";

function Description(props) {
console.log(props);
    // energise variable to be replaced with props data pulled from table
	let energise = {
		name: "Favorite Animal",
		urls: "",
		time: "45 Seconds",
		id: 1,
		description:
			"Go around the group, everyone says what their favorite animal is and why they like it so much. Once you have finished speaking, nominate the next person until everyone in the group has had a turn.",
	};

	

    //function for back button to be added
function backButtonClicked(){
    console.log("Back Button Clicked");
}


	return (
		<div className="container-fluid">
			<div className="col">
				<div className="h3 p-3 bg-success text-white text-center">
					Energiser Name : {energise.name}
				</div>
				<div className="mt-1 text-center">
					Time per person : {energise.time}
				</div>
				<div className="mt-1 text-center">
					Description : {energise.description}
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
