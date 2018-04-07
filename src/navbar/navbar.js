import React from 'react';
import {
  NavLink
} from 'react-router-dom';
import './navbar.css';

function Navbar(props) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <NavLink id="brand" className="navbar-brand" to="/">Gomoku</NavLink>
      <div id="navbar-items" className="navbar-nav-scroll">
        <ul className="navbar-nav flex-row">
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/authors">Authors</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/upload">Upload</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;