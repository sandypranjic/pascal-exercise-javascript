import React from 'react';

// Images
import logo from '../assets/logo.svg';

function HomepageLogo() {
    return (
        <React.Fragment>
            <img src={logo} className='logo' alt='' />
            <h1><span>image</span> search</h1>
        </React.Fragment>
    );
}

export default HomepageLogo;