import React from 'react';
import './navbar.css';
import logo from "./images/logo-horizontal-no-background 400.png";

export default function NavBar() {
    return (
    <nav className="container">
        <img src={logo} className="logo" />
        <ul className="navigation-items">
            <li><a href="https://mattbuse.github.io/Portfolio_Page/index.html">HOME</a></li>
            <li><a href="https://mattbuse.github.io/Portfolio_Page/JS-Projects/projects.html">PROJECTS</a></li>
        </ul>
    </nav>
    )
};
