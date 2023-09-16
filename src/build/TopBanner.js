import React, {useState} from 'react'


function TopBanner() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className="top-banner">
            <button className="settings-button" onClick={toggleMenu}>
                <i className="material-icons">settings</i>
            </button>
            {isMenuOpen && (
                <div className="menu" style={{ position: 'fixed', top: '50px', right: '20px' }}>
                    {/* Menu content goes here */}
                    <ul>
                        <li><a href="https://www.wikihow.com/Play-Wordle">How to play</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default TopBanner;