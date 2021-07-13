import React from "react";

function Description() {

    // energise variable to be replaced with props data pulled from table
	let energise = {
		name: "Favorite Animal",
		urls: "",
		time: "45 Seconds",
		id: 1,
		description:
			"Go round the group, everyone says there favorite animal and why. Once you have finished speaking, nominate the next person until everyone has had a turn.",
	};

    //function for back button to be added
function backButtonClicked(){
    console.log("Back Button Clicked");
}


	return (
		<div className="container-fluid">
			<div className="col">
				<div className="row mt-1">Energiser Name : {energise.name}</div>
				<div className="row mt-1">Time per person : {energise.time}</div>
				<div className="row mt-1">Description : {energise.description}</div>
				<div className="row mt-3">
					<button onClick={backButtonClicked}>BACK</button>
				</div>
			</div>
		</div>
	);
}

export default Description;
