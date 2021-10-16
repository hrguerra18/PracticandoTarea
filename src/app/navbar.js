import React from "react";

export default function Navbar(){
    const titulo = "MERN Stack"

    const colorFont = {
        color: "white"
    }
    return(
        <nav className="navbar navbar-light bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" style={colorFont} href="#">
                {titulo}
            </a>
        </div>
    </nav>
    );
}