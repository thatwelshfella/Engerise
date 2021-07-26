import React, { useState } from "react";
import { Search } from "carbon-components-react";

import { Link } from "react-router-dom";


const SearchBar = (props) => {
	const [searchInput, setSearchInput] = useState("");
	function handleSearchInput(event) {
		setSearchInput(event.target.value);
		props.search(event.target.value);
	}

	return (
		<Search
			type="text"
			value={searchInput}
			id="energiserTitle"
			className="form-control"
			onChange={handleSearchInput}
			placeHolderText="Search For An Energiser"
		/>
	);
};

export default SearchBar;
