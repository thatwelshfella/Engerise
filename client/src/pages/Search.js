import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = props => {
  const [searchInput, setSearchInput] = useState("");
  function handleSearchInput(event) {
    setSearchInput(event.target.value);
    props.search(event.target.value);

  }

  return (
    <div className="search">
      <div className="row search-wrapper">
        <div className="col">
          <form className="form-group search-box" >
            <div className="search-row">
              <input
                type="text"
                value={searchInput}
                id="energiserTitle"
                className="form-control"
                onChange={handleSearchInput}
                placeholder="Enter the Energiser Title you are looking for"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
