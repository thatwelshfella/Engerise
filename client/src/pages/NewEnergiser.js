import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyModal from "./MyModal";
import { Add16 } from "@carbon/icons-react";
import { Button, TextArea, TextInput, Select, SelectItem } from "carbon-components-react";

const NewEnergiser = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("5 Minutes");
    const [difficulty, setDifficulty] = useState("Easy");
    const [url, setUrl] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalShow, setModalShow] = React.useState(false);
    const [missingModalShow, setMissingModalShow] = React.useState(false);
    const [repeatModalShow, setRepeatModalShow] = React.useState(false);
    // const [oneEnergiser, setOneEnergiser] = useState([]);
    // const [linkClass, setLinkClass] = useState("linkClass");

    function handleChange(event) {
        if (event.target.name === "title") {
          setTitle(event.target.value);
          setModalBody("The New Energiser " + title + " has been created successfully");
        } else if (event.target.name === "description") {
          setDescription(event.target.value);
        } else if (event.target.name === "time") {
          setTime(event.target.value);
        } else if (event.target.name === "difficulty") {
          setDifficulty(event.target.value);
        } else if (event.target.name === "url") {
          setUrl(event.target.value);
        }
      }

    function AddNewEnergiser(){
        if (title == "" || description == ""){
            setMissingModalShow(true);
        }else{
               let energiser={
                    name: title,
                    time: time,
                    urls: url,
                    description: description,
                    difficulty: difficulty,
                };
                    // fetch(`../api/name/${title}`)
                    //     .then((res) => res.json())
                    //     .then((data) => {
                    //         console.log("data", data);
                    //         setOneEnergiser(data);
                    //     });

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(energiser),
                };
                fetch("../api/new/", requestOptions)
                    .then((response) => response.json())
                    .then((res) => {
                        console.log(res);
                        if(res){
                            setModalShow(true);
                            setDescription("");
                            setTitle("");
                        }
                    })
                    .catch(() => setRepeatModalShow(true));
            }
    }
	return (
		<div className="d-flex flex-column align-items-center justify-content-center font">
            <div>
                {/* <label className="energiserLabel">Name Of Energiser: </label> */}
                {/* <input
                className="newEnergiserInput"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                /> */}
                <TextInput
                    helperText="Can Accept any characters, Letter and special characters"
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    invalidText="A valid value is required"
                    labelText="Name Of Energiser: "
                    placeholder="The new Energiser Name"
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
                {/* <label className="energiserLabel">Energiser Time: </label>
                <select className="newEnergiserInput" name="time" onChange={handleChange}>
                    <option>5 Minutes</option>
                    <option>10 Minutes</option>
                    <option>15 Minutes</option>
                </select> */}
                <Select
                    defaultValue="placeholder-item"
                    helperText="The Expected time of the new Energiser"
                    id="select-1"
                    name= "time"
                    onChange={handleChange}
                    labelText="Energiser Time: "
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
                            text="5 Minutes"
                            value="5 Minutes"
                        />
                        <SelectItem
                        text="10 Minutes"
                        value="10 Minutes"
                        />
                        <SelectItem
                        text="15 Minutes"
                        value="15 Minutes"
                        />
                    </Select>
            </div>
            <hr></hr>
            <div>
                {/* <label className="energiserLabel">Difficulty: </label>
                <select className="newEnergiserInput" name="difficulty" onChange={handleChange}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Difficult</option>
                </select> */}
                <Select
                    defaultValue="placeholder-item"
                    helperText="The difficulty level of the new Energiser"
                    id="select-1"
                    name= "difficulty"
                    onChange={handleChange}
                    labelText="Difficulty: "
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
                            text="Easy"
                            value="Easy"
                        />
                        <SelectItem
                        text="Medium"
                        value="Medium"
                        />
                        <SelectItem
                        text="Difficult"
                        value="Difficult"
                        />
                    </Select>
            </div>
            <hr></hr>
            <div>
                {/* <p className="formfield">
                    <label className="energiserLabel">Description: </label>
                    <textarea
                    className="energiseTextarea"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    />
                </p> */}
                <TextArea
                    helperText="Can Accept any characters, Letter and special characters"
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    invalidText="A valid value is required"
                    labelText="Description: "
                    placeholder="The new Energiser Description"
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
            {/* <div>
                <label className="energiserLabel">The URL: </label>
                <input
                className="my-input"
                type="text"
                name="url"
                value={url}
                onChange={handleChange}
                />
            </div> */}
            <hr></hr>
            <div className="mt-3 d-flex justify-content-center detail-div text-center">
                <Link to={{
                    pathname: "/results",
                    api: "/api/wholelist",
                    userid: props.location.userid,
                    username: props.location.username,
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
                <Button renderIcon={Add16} className="generate_btn" style={{
							border: "0",
							borderRadius: "10px",
							textDecoration: "none",
							fontSize: "1.3em",
							background: "#ED4343",
							textAlign: "center",
						}} onClick={AddNewEnergiser}>Add
                </Button>
            </div>
            <MyModal body = {modalBody} header = "Creating an Energiser" show={modalShow}
                onHide={() => setModalShow(false)} />
            <MyModal body = "Some Data is missing, Please enter all fields of the new energiser" header = "Missing Data" show={missingModalShow}
                onHide={() => setMissingModalShow(false)} />
            <MyModal body = "An Energiser with the same name is already exists!" header = "Repeated Data" show={repeatModalShow}
                onHide={() => setRepeatModalShow(false)} />
        </div>
	);
};

export default NewEnergiser;
