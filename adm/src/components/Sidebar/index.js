import React from "react";
import { Link } from "react-router-dom"

const Sidebar = ()=>(
    <nav className="sidebar">
        <ul className="list-unstyled">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/">Sair</Link></li>
        </ul>
    </nav>
)

export default Sidebar