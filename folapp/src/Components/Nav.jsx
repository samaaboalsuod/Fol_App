import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavIcons } from './NavIcons'; // Make sure the path to your file is correct
import './Nav.css';

const Nav = () => {
    return ( 
        <section className="bottom-nav">
            {NavIcons.map((item) => (
                <NavLink 
                    key={item.path} 
                    to={item.path} 
                    className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                    {({ isActive }) => (
                        <item.icon 
                            size={26} 
                            weight={isActive ? "fill" : "regular"} 
                            color="#F5F5DC" /* This matches your cream/beige icon color */
                        />
                    )}
                </NavLink>
            ))}
        </section>
    );
}

export default Nav;