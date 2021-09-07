import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyModal from "./MyModal";
import { Breadcrumb, BreadcrumbItem } from "carbon-components-react";
import { Button, TextInput, Select, SelectItem } from "carbon-components-react";

const Profile = (props) => {
    const [userName, setUserName] = useState("");
    const [className, setClassName] = useState("London Class 7");
    const [email, setEmail] = useState("");
    // const [userProfile, setUserProfile] = useState([]);
    const [password, setPassword] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [missingModalShow, setMissingModalShow] = useState(false);
    const [matchedModal, setMatchedModal] = useState(false);
    const [errorModalShow, setErrorModalShow] = useState(false);
    const [nameUpdated, setNameUpdated] = useState(false);
    const [oldUserName, setOldUserName] = useState("");
    const [userid, setUserid] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

	if (props.location.forload == 1){
		window.location.reload(false);
	}

	function handleChange(event) {
        if (event.target.name === "userName") {
            setUserName(event.target.value);
          } else if (event.target.name === "email") {
              setEmail(event.target.value);
          } else if (event.target.name === "className") {
              setClassName(event.target.value);
          } else if (event.target.name === "password") {
              setPassword(event.target.value);
          }
      }

      useEffect(() => {
        const currentUser = localStorage.getItem("loginUserid");
        setUserid(currentUser);
        fetch(`/api/profile/${currentUser}`)
			.then((res) => res.json())
			.then((data) => {
            //    setUserProfile(data);
               setUserName(data[0].user_name);
               setEmail(data[0].email);
               setClassName(data[0].class);
               setPassword(data[0].password);
               setOldUserName(data[0].user_name);
               setIsAdmin(data[0].is_admin);
			});
        }, []);


    function updateUser(){
        let UserInfo={
            user_id: userid,
            name: userName,
            class: className,
            email: email,
            password: password,
        };

        if (oldUserName != userName){
            setNameUpdated(true);
        }

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(UserInfo),
        };
        fetch("../api/updateuser/", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if(res){
                    if (typeof Storage !== "undefined") {
                        localStorage.setItem("loginUsername", userName);
                    } else {
                        document.getElementById("result").innerHTML =
                            "Sorry, your browser does not support web storage...";
                    }
                    setModalShow(true);
                }
            })
            .catch(() => setErrorModalShow(true));
    }
	return (
        <div>
            <Breadcrumb>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>
			</Breadcrumb>
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
                    <TextInput
                        // helperText="Can Accept any characters, Letter and special characters"
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        invalidText="A valid value is required"
                        labelText="Your Email: "
                        placeholder="The new Email"
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
                            <SelectItem
                                text="London Class 7"
                                value="London Class 7"
                            />
                            <SelectItem
                            text="Birmingham Class 7"
                            value="Birmingham Class 7"
                            />
                            <SelectItem
                            text="Glasgow Class 7"
                            value="Glasgow Class 7"
                            />
                            <SelectItem
                            text="Cape Town Class 7"
                            value="Cape Town Class 7"
                            />
                            <SelectItem
                            text="Gaza Class 7"
                            value="Gaza Class 7"
                            />
                        </Select>
                </div>
                <hr></hr>
                <hr></hr>
            <div>
                <TextInput
                    type="password"
                    name="password"
                    onChange={handleChange}
                    invalidText="A valid value is required"
                    labelText="Your Password: "
                    // helperText={matchPassword}
                    placeholder="New Password"
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
                    <Link to={{
                        pathname: "/",
                        searchCriteria: null,
                    }} style={{ textDecoration: "none" }}>
                        <Button className="generate_btn" style={{
                                border: "0",
                                borderRadius: "10px",
                                fontSize: "1.3em",
                                background: "#ED4343",
                                marginRight: "1.3em",
                                textAlign: "center",
                            }}>Back</Button>
                    </Link>
		
                    <Button className="generate_btn" style={{
                                border: "0",
                                borderRadius: "10px",
                                textDecoration: "none",
                                fontSize: "1.3em",
                                background: "#ED4343",
                                textAlign: "center",
                            }} onClick={updateUser}>Update
                    </Button>
                </div>
                {isAdmin ? (
                    <div>
                    <hr></hr>
                    <br></br>
                        <Link to={{
                        pathname: "/manageUsers",
                        searchCriteria: null,
                    }} style={{ textDecoration: "none" }}>
                        <Button className="generate_btn" style={{
                                border: "0",
                                borderRadius: "10px",
                                fontSize: "1.3em",
                                background: "#ED4343",
                                marginRight: "1.3em",
                                textAlign: "center",
                            }}>Manage Users</Button>
                    </Link>
                    <Link to={{
                        pathname: "/resultsAdmin",
                        searchCriteria: null,
                    }} style={{ textDecoration: "none" }}>
                        <Button className="generate_btn" style={{
                                border: "0",
                                borderRadius: "10px",
                                fontSize: "1.3em",
                                background: "#ED4343",
                                marginRight: "1.3em",
                                textAlign: "center",
                            }}>Manage Energisers</Button>
                    </Link>
                    </div>
                ): (
                    <div></div>
                )}
                <MyModal body = "Your Information has been updated successfully" nameupdated = {nameUpdated} header = "Update User Information" show={modalShow}
                    onHide={() => setModalShow(false)} />
                <MyModal body = "Some Data is missing, Please fill the fields!" header = "Missing Data" show={missingModalShow}
                    onHide={() => setMissingModalShow(false)} />
                <MyModal body = "The Password is not matched with the Repeated Password!" header = "Wrong Password" show={matchedModal}
                    onHide={() => setMatchedModal(false)} />
                <MyModal body = "There is an error in the provided information." header = "Error Data" show={errorModalShow}
                    onHide={() => setErrorModalShow(false)} />
            </div>
        </div>
	);
};

export default Profile;
