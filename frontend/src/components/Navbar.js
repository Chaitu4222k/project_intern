import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create this CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/intern" aria-label="Interns section">Interns</Link></li>
                <li><Link to="/feedback" aria-label="Feedback section">Feedback</Link></li>
                <li><Link to="/performance" aria-label="Performance section">Performance</Link></li>
                <li><Link to="/task" aria-label="Tasks section">Tasks</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
