import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

const PokemonSearchForm = ({ searchHandler, pokemonsNameList, setLimit }) => {
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);

  const searchList = useRef();
  const searchData = useRef();

  useEffect(() => {
    setLimit(15);
    searchHandler(debounceValue);
  }, [debounceValue]);

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
            setSearchValue(e.target.value);
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
                  setSearchValue(text);
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
