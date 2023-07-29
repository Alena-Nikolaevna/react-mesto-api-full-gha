import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
//import headerLogo from "../images/headerlogo.svg";

function Header({ userEmail, onLogout }) {
  return (
    <header className="header">
      <div className="header__logo"></div>

      <Routes>
        <Route path='/sign-in' element={<Link to='/sign-up' className='header__link'>Регистрация</Link>} />
        <Route path='/sign-up' element={<Link to='/sign-in' className='header__link'>Войти</Link>} />

        <Route path="/" element={<nav className="header__nav">
          <span className="header__email">{userEmail}</span>
          <Link className="header__button-link" to="/sign-in" onClick={onLogout}>Выйти</Link></nav>} />
      </Routes>

    </header>
  );
}

export default Header;