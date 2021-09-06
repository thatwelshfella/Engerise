import { Row } from "carbon-components-react";
import React, { useState } from "react";
import { TiUserDelete } from "react-icons/ti";

function UserRow(props){
    const [userAdmin, setUserAdmin] = useState(props.user.is_admin);

    function changeAdmin(event){
        let newVal;
        if (event.target.value == "No")
            newVal = false;
        else
            newVal = true;
        let userAdmin = {
            val: newVal,
            id: props.user.id,
        };

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userAdmin),
        };
        fetch("../api/userAdmin/", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    setUserAdmin(newVal);
                }
            })
            .catch(() => console.log(true));
    }

    function deleteUser(){
        let userAdmin = {
            id: props.user.id,
        };

        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userAdmin),
        };
        fetch("../api/delUser/", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    props.delRow();
                }
            })
            .catch(() => console.log(true));
    }

    return(
        <tr>
            <td className="topEnergiserName">
                {props.user.user_name}
            </td>
            <td>{props.user.class}</td>
            <td>{props.user.email}</td>
            <td>
                <select name={props.user.id} value={userAdmin ? "Yes" : "No"} onChange={changeAdmin}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </td>
            <td>
            <TiUserDelete
                onClick={deleteUser}
                size={25}
                onMouseOver={({ target }) => (target.style.color = "green")}
                onMouseOut={({ target }) => (target.style.color = "black")}
            ></TiUserDelete>
            </td>
        </tr>
    );
}

export default UserRow;