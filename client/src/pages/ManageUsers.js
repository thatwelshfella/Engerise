import React, { useState, useEffect } from "react";
import UserRow from "./UserRow";
import { Breadcrumb, BreadcrumbItem } from "carbon-components-react";

const ManageUsers = () => {
	const [users, setUseres] = useState([]);

	useEffect(() => {
		fetch("/api/allUsers")
			.then((res) => res.json())
			.then((data) => {
				setUseres(data);
			});
	}, []);

    function deleteRow(){
        fetch("/api/allUsers")
            .then((res) => res.json())
            .then((data) => {
                setUseres(data);
            });
    }

	return (
		<div>
            <Breadcrumb>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>{" "}
				<BreadcrumbItem href="/profile/">Profile</BreadcrumbItem>
			</Breadcrumb>
            <br></br>
            <div className="pt-2 border border-dark">
                <h1
                    className="text-center WhatIsAnEnergiser"
                >
                    All Users
                </h1>
                <br></br>
                <table className="container table table-hover">
                    <thead className="result-thead">
                        <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">Class Name</th>
                            <th scope="col">Email Address</th>
                            <th scope="col">Is Admin</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    {users.map((item) => (
                        <tbody key={item.id}>
                            <UserRow user = {item} delRow={deleteRow} />
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
	);
};

export default ManageUsers;
