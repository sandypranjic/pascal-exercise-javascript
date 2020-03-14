import React from 'react';

// Components
import HomepageLogo from './HomepageLogo.js';
import Search from './Search.js';

function Homepage() {

    return (
        <React.Fragment>
            <section className='homepage'>
                <HomepageLogo />
                <section className="homepageSearch">
                    <Search />
                </section>
            </section>
        </React.Fragment>
    );
}

export default Homepage;