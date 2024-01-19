
import img1 from '../assets/up.svg'
import React from 'react';

const ArrowNavigation = () => {
    return (
        <div className="fixed bottom-12 right-10 w-5 h-5 text-white z-20 animate-bounce">
            <a href='#header'>
                <img src={img1} alt="Image" />
            </a>
        </div>
    );
};

export default ArrowNavigation;

