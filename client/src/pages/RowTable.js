import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

function RowTable(props) {

  const myObject = useRef(props.energiser.id);
  let objetKey = "favicon"+ myObject.current;
  let currentFav = localStorage.getItem(objetKey);
  const [myFavorite, setMyFavorite] = useState(currentFav);

  function setFavorite(event){
      if(typeof(Storage) !== "undefined") {
          let currentFav = localStorage.getItem(event.target.id);
          if (currentFav != "red")
              localStorage.setItem(event.target.id, "red");
          else 
                localStorage.setItem(event.target.id, "black");
            currentFav = localStorage.getItem(event.target.id);
            setMyFavorite(currentFav);

          } else {
                document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
          }
  }

  return (
    // <tbody className="result-tbody" key={props.energiser.id}>
       <tr>
            {/* <td>{item.id}</td> */}
            <td>
                <Link
                    to={{
                        pathname: `/description/${props.energiser.id}`,
                        name: props.energiser.name,
                        id: props.energiser.id,
                        description: props.energiser.description,
                        time: props.energiser.time,
                        upvote: props.energiser.upvote,
                        downvote: props.energiser.downvote,	}}
                >
                    {props.energiser.name}
                </Link>
            </td>
             <td className="tag">{props.energiser.tag}</td>
            <td className="tag">{props.energiser.time}</td>
                {props.energiser.external ? <td>Yes</td> : <td>No</td>}
            <td>{props.energiser.upvote}</td>
            <td>{props.energiser.downvote}</td>
            <td><i id={"favicon"+props.energiser.id} className="fas fa-heart" style={{color: myFavorite}} onClick={setFavorite} ref={myObject}></i></td>
            {/* <td>150</td>
        <td>30</td> */}
        </tr>
    // </tbody>
  );
}
export default RowTable;


// // {shuffle(energiser).map((item) => (
//     <tbody className="result-tbody" key={item.id}>
//         <tr>
//             {/* <td>{item.id}</td> */}
//             <td>
//                 <Link
//                     to={{
//                         pathname: `/description/${item.id}`,
//                         name: item.name,
//                         id: item.id,
//                         description: item.description,
//                         time: item.time,
//                         upvote: item.upvote,
//                         downvote: item.downvote,
//                     }}
//                 >
//                     {item.name}
//                 </Link>
//             </td>
//             <td>
//                 <td className="tag">{item.tag}</td>
//             </td>
//             <td>
//                 <td className="tag">{item.time}</td>
//             </td>
//             <td>
//                 {item.external ? <td>Yes</td> : <td>No</td>}
//             </td>
//             <td>{item.upvote}</td>
//             <td>{item.downvote}</td>
//         </tr>
//     </tbody>
// // ))}