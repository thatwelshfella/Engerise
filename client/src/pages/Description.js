import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Breadcrumb, BreadcrumbItem } from "carbon-components-react";

function Description(props) {
    const [upvote, setUpvote] = useState(0);
	const [downvote, setDownvote] = useState(0);

	// These next 5 lines capture from the URL the ID of the energiser that we want to render
	const search = props.location.search; // returns the URL query String
	const params = new URLSearchParams(search);
	const StringId = params.get("id");
    const NumId = parseInt(StringId);
	const [Id, setId] = useState(NumId);

	// describeMe will be the energiser that we want to render
	const [describeMe, setDescribeMe] = useState({});	

	

    useEffect(() => {
		fetch(`/api/id/${Id}`)
			.then((res) => res.json())
			.then((data) => {
				setDescribeMe(data[0]);
                setUpvote(data[0].upvote);
                setDownvote(data[0].downvote);
			});
	}, [Id]);


   
        


		const [clickedInc, setClickedInc] = useState(false);
		const [clickedDec, setClickedDec] = useState(false);
		const userId = "user" + describeMe.id;
		const userDecId = "userdec" + describeMe.id;
		let currentUser;
		let currentDecUser;

		function clickedIncrement() {
			if (typeof Storage !== "undefined") {
				// let currentInc = localStorage.getItem(iconId);
				localStorage.setItem(userId, "clicked"+describeMe.id);
			} else {
				document.getElementById("result").innerHTML =
					"Sorry, your browser does not support web storage...";
			}
		}

		function clickedDecrement() {
			if (typeof Storage !== "undefined") {
				localStorage.setItem(userDecId, "clickedDec"+describeMe.id);
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
					fetch(`../api/upvote/${describeMe.id}`, requestOptions)
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
					fetch(`../api/downvote/${describeMe.id}`, requestOptions)
						.then((response) => response.json())
						.then((err) => console.log(err));
				}
			}
		};


				return (

	
		<div className="font">
		 <p className="m-2 crumb">
			<Breadcrumb>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>{" "}
				<BreadcrumbItem href="/results/">Results</BreadcrumbItem>
			</Breadcrumb>
			</p>

			<div className=" bg-light p-5">
				<div className="container col d-flex flex-column align-items-start">
					<div className="h3 undeline">
						Energiser Name : {describeMe.name}
					</div>
					<hr />
					<div className="h5 mt-1">Time per person : {describeMe.time}</div>
					<hr></hr>

<div className="h5 mt-1">
		Description : {describeMe.description}
</div>

    					<hr></hr>
				</div>
			</div>
		<div className="col d-flex flex-row justify-content-center p-4">
			<div className="d-flex align-items-center m-4">
				<FaThumbsUp
						onClick={incrementCounter}
						size={25}
						onMouseOver={({ target }) => (target.style.color = "green")}
						onMouseOut={({ target }) => (target.style.color = "black")}
					></FaThumbsUp>
					<p className="m-2">{upvote}</p>
				</div>
				<div className="d-flex align-items-center m-4">
					<FaThumbsDown
						onClick={decrementCounter}
						size={25}
						onMouseOver={({ target }) => (target.style.color = "red")}
						onMouseOut={({ target }) => (target.style.color = "black")}
					></FaThumbsDown>
					<p className="m-2">{downvote}</p>
				</div>
			</div> 
		</div>
				);
			} 


export default Description;
