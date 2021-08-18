import React, { useState, useEffect } from "react";
import { Button } from "carbon-components-react";
import { PlayFilled16, PauseFilled16, Reset16 } from "@carbon/icons-react";
import { motion } from "framer-motion";
import MyModal from "./MyModal";

function Timer(props) {
	if (!props.energiserTime) {
		return null;
	}
	let count = props.energiserTime;
	if (props.energiserTime === "5 Minutes") {
		count = 300;
	} else if (props.energiserTime === "10 Minutes") {
		count = 600;
	} else {
		count = 900;
	}

	const [time, setTime] = useState(count);
	const [timerOn, setTimerOn] = useState(false);
	const [msgModalShow, setMsgModalShow] = useState(false);

	//log timer click function
	function logTimerStart(id) {
		let lastUsedApiData = {
			user_id: props.userid,
			energiser_id: props.energiser_id,
		};
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(lastUsedApiData),
		};

		fetch("../api/lastused/", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if (res) {
					console.log("logged last used");
				}
			})
			.catch((error) => console.log(error));
	}

	//time formater function
	const format = (time) => {
		let seconds = parseInt(time % 60, 10);
		let minutes = parseInt(time / 60, 10);
		seconds = seconds < 10 ? "0" + seconds : seconds;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		return minutes + ":" + seconds;
	};

	useEffect(() => {
		let interval = null;
		if (timerOn) {
			interval = setInterval(() => {
				setTime((count) => count - 1);
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [timerOn]);

	const resetHandler = () => {
		setTimerOn(false);
		setTime(count);
	};

	if (time < 0) {
		console.log("time is up");
		setTimerOn(false);
		setTime(0);
	}

	return (
		<div className="container">
			<div className="displayedTime">
				<motion.h1
					animate={{ scale: [0, 1.1, 1] }}
					transition={{ times: [0, 0.7, 1.3] }}
				>
					{format(time)}
				</motion.h1>
			</div>
			<div>
				{!timerOn &&
					time == count &&
					(props.userid ? (
						<Button
							className="generate_btn btnClass"
							label="start"
							onClick={() => {
								setTimerOn(true);
								logTimerStart(props.userid);
							}}
							style={{
								border: "0",
								borderRadius: "10px",
								fontSize: "1.3em",
								background: "#ED4343",
								textAlign: "center",
								width: "100%",
								margin: "0.5em",
							}}
							kind="secondary"
							renderIcon={PlayFilled16}
						>
							Start
						</Button>
					) : (
						<Button
							className="generate_btn btnClass"
							label="start"
							onClick={() => setMsgModalShow(true)}
							style={{
								border: "0",
								borderRadius: "10px",
								fontSize: "1.3em",
								background: "#ED4343",
								textAlign: "center",
								width: "100%",
								margin: "0.5em",
							}}
							kind="secondary"
							renderIcon={PlayFilled16}
						>
							Start
						</Button>
					))}
				{timerOn && (
					<Button
						className="generate_btn btnClass"
						label="stop"
						onClick={() => setTimerOn(false)}
						style={{
							border: "0",
							borderRadius: "10px",
							fontSize: "1.3em",
							background: "#ED4343",
							textAlign: "center",
							width: "100%",
							margin: "0.5em",
						}}
						kind="secondary"
						renderIcon={PauseFilled16}
					>
						Stop
					</Button>
				)}
				{!timerOn && time !== count && (
					<Button
						className="generate_btn btnClass"
						label="resume"
						onClick={() => setTimerOn(true)}
						style={{
							border: "0",
							borderRadius: "10px",
							fontSize: "1.3em",
							background: "#ED4343",
							textAlign: "center",
							margin: "0.5em",
						}}
						kind="secondary"
						renderIcon={PlayFilled16}
					>
						Resume
					</Button>
				)}
				{!timerOn && time < count && (
					<Button
						className="generate_btn btnClass"
						label="reset"
						onClick={resetHandler}
						style={{
							border: "0",
							borderRadius: "10px",
							fontSize: "1.3em",
							background: "#ED4343",
							textAlign: "center",
							margin: "0.5em",
						}}
						kind="secondary"
						renderIcon={Reset16}
					>
						Reset
					</Button>
				)}
			</div>
			<MyModal
				body="You need to login to be able to start the timer!"
				show={msgModalShow}
				onHide={() => setMsgModalShow(false)}
			/>
		</div>
	);
}

export default Timer;
