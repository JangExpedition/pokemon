import React, { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import firebase from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";

const _Header = () => {
  const auth = getAuth(firebase);
  const provider = new GoogleAuthProvider();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
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

  return (
    <header className="Header">
      <img
        className="logo"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        onClick={() => {
          window.location.href = "/";
        }}
      ></img>
      <button className="button" onClick={handleAuth}>
        로그인
      </button>
    </header>
  );
};

export default _Header;
