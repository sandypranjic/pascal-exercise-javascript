import React, { useEffect } from 'react';
import { useStore } from '../store.js';
import preloader from '../assets/preloader.gif';
import download from '../assets/download.svg';
import map from '../assets/map.png';
import mapMarker from '../assets/mapMarker.svg';

function DisplayImages(props) {
    const {state, dispatch} = useStore();


    useEffect(() => {
        const displayImagesContainer = document.getElementById('displayImagesContainer');
        displayImagesContainer.innerHTML = "";
        const preloader = document.getElementById('preloader');
        dispatch({type: "showErrorMessage", error: false});
        preloader.classList.remove('hidePreloader');
        setTimeout( () => {
            if (state.imagesData) {
                if (state.imagesData.results) {
                    state.imagesData.results.forEach((image) => {
                        appendImagesToPage(image);
                        preloader.classList.add('hidePreloader');
                    })
                }
            }
        }, 3000)
    }, [state.imagesData, state.searchCollection])

    const clickedImage = (event) => {
        showMoreInfo(event.target.dataset);
    }

    const focusedImage = (event) => {
        let events = [];
        document.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                events.push(event.target.dataset);
            }
            showMoreInfo(events[0]);
        })
    }

    const showMoreInfo = (image) => {
        if (document.getElementById('clickedImage')) {
            const imageContainer = document.getElementById('imageContainer');
            imageContainer.removeChild(document.getElementById('clickedImage'));
        }

        const imageInfoContainer = document.getElementById('imageInfoContainer');
        const imageContainer = document.getElementById('imageContainer');
        const clickedImage = document.createElement('img');
        const name = document.getElementById('name');
        const username = document.getElementById('username');
        const profilePicture = document.getElementById('profilePicture');
        const download = document.getElementById('download');
        const location = document.getElementById('location');
        
        imageInfoContainer.style.display = 'flex';
        clickedImage.src = image.source;
        clickedImage.id = 'clickedImage';
        imageContainer.append(clickedImage);

        name.innerHTML = image.name;
        username.innerHTML = image.username;
        profilePicture.src = image.profilePicture;
        download.href = image.download;
        if (image.location === null || image.location === "null") {
            location.innerHTML = 'Unknown location';
        } else {
            location.innerHTML = image.location;
        }
    }

    const hideMoreInfo = (event) => {
        const imageInfoContainer = document.getElementById('imageInfoContainer');
        if (event.target.id === 'imageInfoContainer') {
            const clickedImage = document.getElementById('clickedImage');
            const imageContainer = document.getElementById('imageContainer');
            imageContainer.removeChild(clickedImage);
            imageInfoContainer.style.display = 'none';
        }
    }

    const appendImagesToPage = (image) => {
        const displayImagesContainer = document.getElementById('displayImagesContainer');
        const imageElement = document.createElement('img');
        imageElement.src = image.urls.small;
        imageElement.tabIndex = 0;
        displayImagesContainer.appendChild(imageElement);
        imageElement.dataset.name = `${image.user.first_name} ${image.user.last_name}`;
        imageElement.dataset.username = image.user.username;
        imageElement.dataset.profilePicture = image.user.profile_image.large;
        imageElement.dataset.location = image.user.location;
        imageElement.dataset.download = image.links.download;
        imageElement.dataset.source = image.urls.regular;
        imageElement.addEventListener('click', clickedImage);
        imageElement.addEventListener('focus', focusedImage);
    }

    const showErrorMessage = () => {
        const errorContainer = document.getElementById('error');
        if (state.searchQuery === null && state.selectedCollection === null) {
            errorContainer.innerHTML = '<p>Please enter a search query and a collection.</p>';
        } else if (state.searchQuery === null) {
            errorContainer.innerHTML = '<p>Please enter a search query.</p>'
        } else if (state.selectedCollection === null) {
            errorContainer.innerHTML = '<p>Please select a collection.</p>'
        }
        return errorContainer;
    }

    useEffect( () => {
        setTimeout ( () => {
            if (state.error === true) {
                const preloader = document.getElementById('preloader');
                preloader.classList.add('hidePreloader');
                setTimeout( () => {
                    showErrorMessage()
                }, 200)
            }
        }, 200)
    }, [state.error, state.searchQuery, state.selectedCollection])
    

    return (
        <React.Fragment>
            {
                state.error ? 
                <div id='error' className='error wrapper'></div>
                : null
            }

            <div className='preloaderContainer wrapper'>
                <img id='preloader' className='preloader' src={preloader} alt='Loading!' />
            </div>

            <div className='imageInfoContainer' id='imageInfoContainer' onClick={hideMoreInfo}>
                <div className='imageInfo' id='imageInfo'>
                    <div className='imageContainer' id='imageContainer'></div>
                    <div className='photographerInfo'>
                        <div className='profile'>
                            <img className='profilePicture' id='profilePicture' />
                            <div className='name'>
                                <h2 id='name'></h2>
                                <h3 id='username'></h3>
                            </div>
                        </div>
                        <div className='downloadButtonContainer'>
                            <a href='' id='download' target='blank' className='download'><img src={download} alt=""/> Download</a>
                        </div>
                    </div>
                    <div className='map'>
                        <img className='mapImage' src={map} alt='' />
                    </div>
                    <div className='locationInfo'>
                        {/* 
                        Location icon from www.fontawesome.com 
                        https://fontawesome.com/license
                        */}
                        <img src={mapMarker} className="mapMarker" alt='' />
                        <span id='location'></span>
                    </div>
                </div>
            </div>

            <div id="displayImagesContainer" className="displayImagesContainer wrapper">
            </div>
        </React.Fragment>
    );
}

export default DisplayImages;