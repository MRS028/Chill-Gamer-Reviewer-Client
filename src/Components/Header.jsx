import React from 'react';
import Navbar from './Home/Navbar';

const Header = () => {
    return (
        <div className='sticky top-0 z-10 shadow-lg bg-base-100'>
            <Navbar></Navbar>
            
        </div>
    );
};

export default Header;