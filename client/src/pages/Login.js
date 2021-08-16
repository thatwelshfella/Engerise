import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyModal from "./MyModal";
import {
	Button,
	TextInput,
	Breadcrumb,
	BreadcrumbItem,
    } from "carbon-components-react";
    import { Login24 } from "@carbon/icons-react";

const Login = () => {
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ modalShow, setModalShow] = React.useState(false);
    const [ missingModalShow, setMissingModalShow] = React.useState(false);
    const [ errDataModal, setErrDataModal] = React.useState(false);
    const [ userid, setUserid] = useState(0);
    const [ userName, setUserName] = useState("");
    const [ msgBody, setMsgBody ] = useState("");
    // const [linkClass, setLinkClass] = useState("linkClass");

    function handleChange(event) {
        if (event.target.name === "email") {
          setEmail(event.target.value);
        } else if (event.target.name === "password") {
          setPassword(event.target.value);
        }
      }

      function setUserLogin(userid, username) {
		if (typeof Storage !== "undefined") {
			localStorage.setItem("loginUserid", userid);
            localStorage.setItem("loginUsername", username);

		} else {
			document.getElementById("result").innerHTML =
				"Sorry, your browser does not support web storage...";
		}
	}
    // currentFav = localStorage.getItem(iconId);
    function userLogin(){
        if (email == "" || password == ""){
            setMissingModalShow(true);
        }else{
            fetch(`../api/user?email=${email}&pass=${password}`)
                .then((res) => res.json())
                .then((data) => {

                    let newUserId = data[0].id;
                    let newUserName = data[0].user_name;
                    setUserid(newUserId);
                    setUserName(newUserName);
                    let loginuser={
                            user_id: newUserId,
                        };

                        const requestOptions = {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(loginuser),
                            };
                            fetch("../api/userlogin/", requestOptions)
                                .then((response) => response.json())
                                .then((res) => {
                                    if(res){
                                        setMsgBody(`You have logged in successfully ${ newUserName } :)`);
                                        setUserLogin(newUserId, newUserName);
                                        setModalShow(true);
                                        setEmail("");
                                        setPassword("");
                                    }
                                })
                                .catch(() => setMissingModalShow(true));
                })
                .catch(() => setErrDataModal(true));
            }

    }
	return (
		<div className="container-fluid">
			<Breadcrumb>
				<BreadcrumbItem
					className="crumb"
					style={{ color: "red", paddingLeft: "0.5rem" }}
					href="/"
				>
					Home
				</BreadcrumbItem>
			</Breadcrumb>
			<div className="d-flex flex-column align-items-center justify-content-center font">
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
				<div className="mt-3 d-flex justify-content-center detail-div text-center">
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
						renderIcon={Login24}
						onClick={userLogin}
					>
						Login
					</Button>
				</div>
				<MyModal
					userid={userid}
					username={userName}
					body={msgBody}
					header="Login's succeeded"
					show={modalShow}
					onHide={() => setModalShow(false)}
				/>
				<MyModal
					body="Some Data is missing, Please enter all fields of the new energiser"
					header="Missing Data"
					show={missingModalShow}
					onHide={() => setMissingModalShow(false)}
				/>
				<MyModal
					body="We can't find the user which match the data you entered!"
					header="Wrong Data"
					show={errDataModal}
					onHide={() => setErrDataModal(false)}
				/>
			</div>
		</div>
	);
};

export default Login;
