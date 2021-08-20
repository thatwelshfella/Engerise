import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
// import { Button } from "carbon-components-react";
import Timer from "./Timer";
import LastUsed from "./LastUsed";
import { Breadcrumb, BreadcrumbItem } from "carbon-components-react";
import MyModal from "./MyModal";

function Description(props) {
    const [upvote, setUpvote] = useState(0);
	const [downvote, setDownvote] = useState(0);
	const [msgModalShow, setMsgModalShow] = useState(false);
	const [uPModalShow, setUPModalShow] = useState(false);
	const [downModalShow, setDownModalShow] = useState(false);
	const [userid, setUserid] = useState(0);

	useEffect(() => {
		setUserid(localStorage.getItem("loginUserid"));
	}, [ userid ]);

	// These next 5 lines capture from the URL the ID of the energiser that we want to render
	const search = props.location.search; // returns the URL query String
	const params = new URLSearchParams(search);
	const StringId = params.get("id");
    const NumId = parseInt(StringId);
	const [Id, setId] = useState(NumId);

	// describeMe will be the energiser that we want to render
	const [describeMe, setDescribeMe] = useState({});

	//fetches description data from API
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
			if (userid){
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
						}else{
						setUPModalShow(true);
						}
				}
			}else{
				setMsgModalShow(true);
			}
		};
		// decrement downvote function
		const decrementCounter = () => {
			if (userid){
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
					}else{
						setDownModalShow(true);
					}
				}
			}else{
				setMsgModalShow(true);
			}
		};


	return (
		<div className="font">
			<Breadcrumb>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>{" "}
				<BreadcrumbItem href="/results/">Results</BreadcrumbItem>
			</Breadcrumb>

			<div className="container-fluid align-items-center justify-content-center bg-light">
				<div className="row">
					<div className="col-12 col-md-6 col-lg-7 p-5">
						<div className="container col d-flex flex-column align-items-start">
							<div className="h3 undeline">
								Energiser Name : {describeMe.name}
							</div>
							<hr />
							<div className="h5 mt-1">
								Recommended Time : {describeMe.time}
							</div>
							<hr></hr>
							<div className="h5 mt-1">
								Description : {describeMe.description}
							</div>
							<hr></hr>
							<div className="h5 mt-1">
								Last Used : <LastUsed energiser={Id} />
							</div>
							<hr></hr>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-5 p-5 align-items-center">
						<Timer
							energiserTime={describeMe.time}
							energiser_id={Id}
							userid={userid}
						></Timer>
					</div>
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
			<MyModal
				body="You need to login to be able to vote!"
				show={msgModalShow}
				onHide={() => setMsgModalShow(false)}
			/>
			<MyModal
				body="You already voted up for this Energiser!"
				show={uPModalShow}
				onHide={() => setUPModalShow(false)}
			/>
			<MyModal
				body="You already voted down for this Energiser!"
				show={downModalShow}
				onHide={() => setDownModalShow(false)}
			/>
		</div>
	);
			}


export default Description;
