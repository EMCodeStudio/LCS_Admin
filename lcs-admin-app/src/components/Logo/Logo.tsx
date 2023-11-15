import React from "react";
import './Style.scss'
const Logo: React.FC = () => {
    return (
        <div className="icon">
            <img src="/public/assets/Images/Logo.png" alt="Logo" />

            <div className="name">
                <div className="shadow"></div>
                <h1 className="name__first">L</h1>
                <h1 className="name__second">C</h1>
                <h1 className="name__third">SOLUCIONES</h1>
            </div>
        </div>
    );
};

export default Logo;
