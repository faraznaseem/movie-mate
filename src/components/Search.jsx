import { useState } from "react";

const Search = ({ searchTerm, setSearchTerm, setPageNumber }) => {
  const handleOnChange = (e) => {
    setPageNumber(1);
    setSearchTerm(e.target.value);
  };
  return (
    <div className="search">
      <div>
        <img className="cursor-pointer" src="search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};
export default Search;
