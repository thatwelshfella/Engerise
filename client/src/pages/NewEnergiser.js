import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyModal from "./MyModal";
import {
	Button,
	TextArea,
	TextInput,
	Select,
	SelectItem,
	Breadcrumb,
	BreadcrumbItem,
} from "carbon-components-react";
import { Add24 } from "@carbon/icons-react";


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
		<div className="container-fluid">
			{" "}
			<Breadcrumb>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>{" "}
				<BreadcrumbItem href="/results/">Results</BreadcrumbItem>
			</Breadcrumb>
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


					<Select
						defaultValue="placeholder-item"
						helperText="The Expected time of the new Energiser"
						id="select-1"
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
						<SelectItem text="5 Minutes" value="5 Minutes" />
						<SelectItem text="10 Minutes" value="10 Minutes" />
						<SelectItem text="15 Minutes" value="15 Minutes" />
					</Select>
				</div>
				<hr></hr>
				<div>


					<Select
						defaultValue="placeholder-item"
						helperText="The difficulty level of the new Energiser"
						id="select-1"
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
						<SelectItem text="Easy" value="Easy" />
						<SelectItem text="Medium" value="Medium" />
						<SelectItem text="Difficult" value="Difficult" />
					</Select>
				</div>
				<hr></hr>
				<div>
				
              
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
						onClick={AddNewEnergiser}
						renderIcon={Add24}
					>
						Add
					</Button>
				</div>
				<MyModal
					body={modalBody}
					header="Creating an Energiser"
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
					body="An Energiser with the same name is already exists!"
					header="Repeated Data"
					show={repeatModalShow}
					onHide={() => setRepeatModalShow(false)}
				/>
			</div>
            <br></br>
		</div>

	);
};

export default NewEnergiser;
