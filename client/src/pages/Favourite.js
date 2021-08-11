import React, { useState, useRef }  from 'react';
import { BsHeart, BsHeartFill, BsFillHeartFill } from "react-icons/bs";

function Favourite({ id }) {

	const myObject = useRef(id);
	let objetKey = "favicon" + myObject.current;
	let currentFav = localStorage.getItem(objetKey);
	const [myFavorite, setMyFavorite] = useState(currentFav);
	const iconId = "favicon" + id;

    function setFavorite() {
				if (typeof Storage !== "undefined") {
					let currentFav = localStorage.getItem(iconId);
					if (currentFav !== "red") {
						localStorage.setItem(iconId, "red");
					} else {
						localStorage.setItem(iconId, "black");
					}
					currentFav = localStorage.getItem(iconId);
					setMyFavorite(currentFav);
				} else {
					document.getElementById("result").innerHTML =
						"Sorry, your browser does not support web storage...";
				}
			}

    return (
			<div>
				<BsFillHeartFill
					id={iconId}
					value={localStorage.getItem(objetKey)}
					style={{ color: myFavorite }}
					onClick={setFavorite}
					ref={myObject}
				/>
			</div>
		);
}

export default Favourite;