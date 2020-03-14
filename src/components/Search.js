import React from 'react';
import { apiCall } from '../apiCall.js';
import { NavLink, withRouter } from 'react-router-dom';
import { useStore } from "../store.js";


function Search(props) {
    const {state, dispatch} = useStore();

    const listenForChange = (event) => {
        if (event.target.localName === "input") {
            dispatch({type: "updateSearchQuery", searchQuery: event.target.value});
        }
        if (event.target.localName === "select") {
            dispatch({type: "updatedSelectedCollection", selectedCollection: event.target.value});
        }
    }

    const searchDatabase = () => {
        const dataFromApi = apiCall(state.searchQuery, state.selectedCollection);
        dataFromApi.then( (result) => {
            dispatch({type: "updatedImagesData", imagesData: result});
        })
    }

    const delayRedirect = (event) => {
        event.preventDefault();
        if (state.searchQuery !== null && state.selectedCollection !== null) {
            searchDatabase();
            const { history: { push } } = props;
            setTimeout( () => {
                push("/gallery");
            }, 1000)
        }
        else if (state.searchQuery === null || state.selectedCollection === null) {
            dispatch({type: "showErrorMessage", error: true});
        }
    }  

    return (

        
        <React.Fragment>
                <form>
                    <input type='text' name='query' id='query' placeholder='Query' onChange={listenForChange} />
                    <div className="selectContainer">
                        <select className='collections' id='collections' onChange={listenForChange}>
                            <option value='Collections'>Collections</option>
                            <option value='featured'>Featured</option>
                            <option value='wallpaper'>Wallpapers</option>
                            <option value='nature'>Nature</option>
                            <option value='texture patterns'>Texture + Patterns</option>
                            <option value='architecture'>Architecture</option>
                        </select>
                    </div>
                    <NavLink to={{pathname: `/gallery`, hash: `#hash`,}} onClick={delayRedirect} tabIndex="0"><button type='submit'>Search</button></NavLink>
                </form>
        </React.Fragment>
    );
}

export default withRouter(Search);