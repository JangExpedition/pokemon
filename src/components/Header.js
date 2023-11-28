import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import firebase from "../core/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Header = () => {
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};
  const [userData, setUserData] = useState(initialUserData);
  const auth = getAuth(firebase);
  const provider = new GoogleAuthProvider();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else if (user && pathname === "/login") {
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [pathname]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userData");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="Header">
      <img
        className="logo"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        onClick={() => {
          window.location.href = "/";
        }}
      ></img>
      {pathname === "/login" ? (
        <button className="button" onClick={handleAuth}>
          로그인
        </button>
      ) : (
        <div className="profile-wrapper">
          <div className="profile-image">
            <img src={userData?.photoURL} alt={userData?.displayName} />
          </div>
          <div className="sign-out" onClick={handleSignOut}>
            Sign Out
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

{
  /* <PokemonSearchForm searchHandler={searchHandler} pokemonsNameList={pokemonsNameList} /> */
}
