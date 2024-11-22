import React from "react";
import { Link } from "react-router-dom";

const links = [
    {
        name: 'organization',
        href: '/organization'
    },
    {
        name: 'task',
        href: '/tasklist'
    }
];

const NavBar = () => {
    return (
        <div>
            <h1>aaaaaaa</h1>
            {links.map((x) => (<Link to={x.href}>{x.name}</Link>))}
        </div>
    );
};

export default NavBar;