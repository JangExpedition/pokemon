import React from "react";

const LoginPage = () => {
  return (
    <section className="LoginPage">
      <div className="welcome-section">
        <div className="welcome-text-container">
          <h1>Pokemon</h1>
          <p>포켓몬 사이트에</p>
          <p>오신 걸 환영합니다.</p>
          <p>로그인해주세요.</p>
        </div>
        <img
          className="login-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
        />
      </div>
    </section>
  );
};

export default LoginPage;
