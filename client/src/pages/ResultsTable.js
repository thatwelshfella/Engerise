import React from "react";
import data from "../energiser.json";


const ResultsTable = () => {

    const shuffle = (arr) => {
        const newArr = arr.slice();
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
    };


    const style ={
        height: "1000px",
    };
    return (
        <div className= "bg-dark pt-4" style={style}>
            <h1 className="text-center text-white p-4">RESULTS TABLE</h1>
        <table className="container table table-success table-striped">
            <thead className="font-weight-bold">
            <td>ID</td>
            <td>Name of Energiser</td>
            <td>Tags</td>
            <td>Time Limit</td>
            <td>URLs</td>
            {/* <td>Upvotes</td>
            <td>Downvotes</td> */}
            </thead>
            {shuffle(data).map((item, index)=>
            <tbody key={index}>
            <tr>
            <td>1</td>
            <td>{item.name}</td>
            <td>Test</td>
            <td>{item.time}</td>
            <td>http//:</td>
            {/* <td>150</td>
            <td>30</td> */}
            </tr>
            </tbody>
        )}
        </table>
        </div>
    );
};

export default ResultsTable;
