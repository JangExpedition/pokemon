import React, { useEffect, useRef } from "react";

const PokemonSearchForm = ({ searchHandler, pokemonsNameList }) => {
  const searchList = useRef();
  const searchData = useRef();

  const searchListDisplayHandler = (bool) => {
    if (bool) {
      searchList.current.style.display = "block";
      return;
    }
    searchList.current.style.display = "none";
  };

  return (
    <form className="PokemonSearchForm">
      <div className="search-data-wrapper">
        <input
          type="text"
          className="pokemon-search"
          onChange={(e) => {
            searchHandler(e.target.value);
            if (e.target.value) {
              searchListDisplayHandler(true);
            } else {
              searchListDisplayHandler(false);
            }
          }}
          placeholder="포켓몬 이름을 입력해주세요."
          ref={searchData}
        ></input>
        <ul ref={searchList}>
          {pokemonsNameList?.map((name) => {
            return (
              <li
                key={name}
                onClick={(e) => {
                  searchListDisplayHandler(false);
                  const text = e.target.innerText;
                  searchData.current.value = text;
                  searchHandler(text);
                }}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    </form>
  );
};

export default PokemonSearchForm;
