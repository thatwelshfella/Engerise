import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyModal from "./MyModal";
import { Button, TextInput, Select, SelectItem } from "carbon-components-react";

const Signup = () => {

	const [userName, setUserName] = useState("");
	const [className, setClassName] = useState("London Class 7");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [matchPassword, setMatchPassword] = useState("");
	const [modalBody, setModalBody] = useState("");
	const [modalShow, setModalShow] = React.useState(false);
	const [missingModalShow, setMissingModalShow] = React.useState(false);
	const [matchedModal, setMatchedModal] = React.useState(false);
	const [repeatModalShow, setRepeatModalShow] = React.useState(false);

	function handleChange(event) {
		if (event.target.name === "userName") {
			setUserName(event.target.value);
			setModalBody(
				"The New user " + event.target.value + " has been created successfully"
			);
		} else if (event.target.name === "email") {
			setEmail(event.target.value);
		} else if (event.target.name === "className") {
			setClassName(event.target.value);
		} else if (event.target.name === "password") {
			setPassword(event.target.value);
		} else if (event.target.name === "repeatPassword") {
			setRepeatPassword(event.target.value);
			if (password === event.target.value) {
				setMatchPassword("The password is match");
			} else {
				setMatchPassword("The password is not match");
			}
		}
	}

	function addNewUser() {
		if (password !== repeatPassword) {
			setMatchedModal(true);
		} else {
			if (
				userName == "" ||
				email == "" ||
				password == "" ||
				repeatPassword == ""
			) {
				setMissingModalShow(true);
			} else {
				let newUser = {
					name: userName,
					class: className,
					email: email,
					password: password,
				};

				console.log("client", newUser);

				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newUser),
				};
				fetch("../api/signup/", requestOptions)
					.then((response) => response.json())
					.then((res) => {
						console.log(res);
						if (res) {
							setModalShow(true);
							setUserName("");
							setPassword("");
							setRepeatPassword("");
							setEmail("");
						}
					})
					.catch(() => setRepeatModalShow(true));
			}
		}
	}
	return (
		<div className="d-flex flex-column align-items-center justify-content-center font">
			<div>
				<TextInput
					// helperText="Can Accept any characters, Letter and special characters"
					type="text"
					name="userName"
					value={userName}
					onChange={handleChange}
					invalidText="A valid value is required"
					labelText="Your Name: "
					placeholder="The new user Name"
					style={{
						border: "0",
						borderRadius: "10px",
						textDecoration: "none",
						fontSize: "1.3em",
						width: "30em",
						textAlign: "left",
					}}
				/>
			</div>
			<hr></hr>
			<div>
				<Select
					name="className"
					labelText="Your Class Name: "
					value={className}
					onChange={handleChange}
					invalidText="A valid value is required"
					style={{
						border: "0",
						borderRadius: "10px",
						textDecoration: "none",
						fontSize: "1.3em",
						width: "30em",
						textAlign: "left",
					}}
				>
					<SelectItem text="London Class 7" value="London Class 7" />
					<SelectItem text="Birmingham Class 7" value="Birmingham Class 7" />
					<SelectItem text="Glasgow Class 7" value="Glasgow Class 7" />
					<SelectItem text="Cape Town Class 7" value="Cape Town Class 7" />
					<SelectItem text="Gaza Class 7" value="Gaza Class 7" />
				</Select>
			</div>
			<hr></hr>
			<div>
				<TextInput
					type="text"
					name="email"
					value={email}
					onChange={handleChange}
					invalidText="A valid value is required"
					labelText="Your Email Address: "
					placeholder="The new Email Address"
					style={{
						border: "0",
						borderRadius: "10px",
						textDecoration: "none",
						fontSize: "1.3em",
						width: "30em",
						textAlign: "left",
					}}
				/>
			</div>
			<hr></hr>
			<div>
				<TextInput
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					invalidText="A valid value is required"
					labelText="Your Password: "
					placeholder="The new Password"
					style={{
						border: "0",
						borderRadius: "10px",
						textDecoration: "none",
						fontSize: "1.3em",
						width: "30em",
						textAlign: "left",
					}}
				/>
			</div>
			<hr></hr>
			<div>
				<TextInput
					type="password"
					name="repeatPassword"
					value={repeatPassword}
					onChange={handleChange}
					invalidText="A valid value is required"
					labelText="Repeat Your Password: "
					helperText={matchPassword}
					placeholder="Repeat the Password"
					style={{
						border: "0",
						borderRadius: "10px",
						textDecoration: "none",
						fontSize: "1.3em",
						width: "30em",
						textAlign: "left",
					}}
				/>
			</div>
			<hr></hr>
			<div className="mt-3 d-flex justify-content-center detail-div text-center">
				<Link
					to={{
						pathname: "/",
						searchCriteria: null,
					}}
					style={{ textDecoration: "none" }}
				>
					<Button
						className="generate_btn"
						style={{
							border: "0",
							borderRadius: "10px",
							fontSize: "1.3em",
							background: "#ED4343",
							marginRight: "1.3em",
							textAlign: "center",
						}}
					>
						Back
					</Button>
				</Link>
				<Button
					className="generate_btn"
					style={{
						border: "0",
						borderRadius: "10px",
						textDecoration: "none",
						fontSize: "1.3em",
						background: "#ED4343",
						textAlign: "center",
					}}
					onClick={addNewUser}
				>
					Sign up
				</Button>
			</div>
			<MyModal
				body={modalBody}
				header="Sign up a new User"
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
			<MyModal
				body="Some Data is missing, Please fill the fields!"
				header="Missing Data"
				show={missingModalShow}
				onHide={() => setMissingModalShow(false)}
			/>
			<MyModal
				body="The Password is not matched with the Repeated Password!"
				header="Wrong Password"
				show={matchedModal}
				onHide={() => setMatchedModal(false)}
			/>
			<MyModal
				body="This email address is already used, Kindly review the entered data!"
				header="Repeated Data"
				show={repeatModalShow}
				onHide={() => setRepeatModalShow(false)}
			/>
		</div>
	);
};

export default Signup;
