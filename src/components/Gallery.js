import React from 'react';

// Components
import Header from './Header.js';
import DisplayImages from './DisplayImages.js';

function Gallery(props) {

    return (
        <React.Fragment>
            <Header {...props} />
            <main>
                <DisplayImages {...props} />
            </main>
        </React.Fragment>
    );
}

export default Gallery;