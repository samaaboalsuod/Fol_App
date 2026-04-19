import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavIcons } from './NavIcons';
import './Nav.css';

const Nav = () => {
    const location = useLocation();

    return ( 
        <section className="bottom-nav">
            {NavIcons.map((item) => {
                // We use RegExp to check if the current path matches our allowed patterns
                const isActive = item.activePaths.some(pathPattern => {
                    const regex = new RegExp(pathPattern);
                    return regex.test(location.pathname);
                });

                return (
                    <NavLink 
                        key={item.path} 
                        to={item.path} 
                        className={isActive ? "nav-item active" : "nav-item"}
                    >
                        <item.icon 
                            size={26} 
                            weight={isActive ? "fill" : "regular"} 
                            color="#F5F5DC" 
                        />
                    </NavLink>
                );
            })}
        </section>
    );
}

export default Nav;