import React from "react";
import { useLocation, Link } from "react-router-dom";

function Header(props) {
  const location = useLocation();

  const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";
  const LinkName = location.pathname === "/sign-in" ? "Регистрация" : "Войти";

  return (
    <header className="header">
      <div className="logo"></div>
      {props.loggedIn ? (
        <div className="header__menu">
          <p className="header__email">{props.email}</p>
          <Link className="header__link" to="/sign-in" onClick={props.onClick}>
            Выйти
          </Link>
        </div>
      ) : (
        <Link className="header__link" to={path}>
          {LinkName}
        </Link>
      )}
    </header>
  );
}

export default Header;
