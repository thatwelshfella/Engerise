import React from "react";
import { Search } from "carbon-components-react";

const SearchBar = (props) => {
	// const [searchInput, setSearchInput] = useState("");
	function handleSearchInput(event) {
		// setSearchInput(event.target.value);
		props.search(event.target.value);
	}

	return (
		<Search
			type="text"
			// value={searchInput}
			style={{ borderRadius: "10px" }}
			onChange={handleSearchInput}
			placeHolderText="Search For An Energiser"
		/>
	);
};

export default SearchBar;
