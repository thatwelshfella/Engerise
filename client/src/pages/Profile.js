import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyModal from "./MyModal";
import { Button, TextInput, Select, SelectItem } from "carbon-components-react";

const Profile = (props) => {
    const [userName, setUserName] = useState("");
    const [className, setClassName] = useState("London Class 7");
    const [userProfile, setUserProfile] = useState([]);
    const [password, setPassword] = useState([]);
    const [modalBody, setModalBody] = useState("");
    const [modalShow, setModalShow] = React.useState(false);
    const [missingModalShow, setMissingModalShow] = React.useState(false);
    const [matchedModal, setMatchedModal] = React.useState(false);
    const [repeatModalShow, setRepeatModalShow] = React.useState(false);

    function handleChange(event) {
        if (event.target.name === "userName") {
          setUserName(event.target.value);
          setModalBody("The New user " + event.target.value + " has been created successfully");
        }
      }

      useEffect(() => {
          console.log(props.location.userid);
		fetch(`/api/profile/${props.location.userid}`)
			.then((res) => res.json())
			.then((data) => {
                console.log("data: ", data);
					setUserProfile(data);
			});
	}, []);

    function addNewUser(){
        console.log("Hi");
    }

	return (
		<div className="d-flex flex-column align-items-center justify-content-center font">
            <div>
                <TextInput
                    // helperText="Can Accept any characters, Letter and special characters"
                    type="text"
                    name="userName"
                    value={userProfile.user_name}
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
                    value={userProfile.email}
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
                    value={userProfile.class}
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
                    value={userProfile.password}
                    onChange={handleChange}
                    invalidText="A valid value is required"
                    labelText="Your Password: "
                    // helperText={matchPassword}
                    placeholder="The Password"
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
						}} onClick={addNewUser}>Update
                </Button>
            </div>
            <MyModal body = {modalBody} header = "Sign up a new User" show={modalShow}
                onHide={() => setModalShow(false)} />
            <MyModal body = "Some Data is missing, Please fill the fields!" header = "Missing Data" show={missingModalShow}
                onHide={() => setMissingModalShow(false)} />
            <MyModal body = "The Password is not matched with the Repeated Password!" header = "Wrong Password" show={matchedModal}
                onHide={() => setMatchedModal(false)} />
            <MyModal body = "This email address is already used, Kindly review the entered data!" header = "Repeated Data" show={repeatModalShow}
                onHide={() => setRepeatModalShow(false)} />
        </div>
	);
};

export default Profile;
