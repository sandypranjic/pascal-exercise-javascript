import React from 'react';
import './App.scss';
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useStore } from "./store";

// Components
import Homepage from './components/Homepage.js';
import Gallery from './components/Gallery.js';

const routes = [
  {path: "/", name: "homepage", Component: Homepage},
  {path: "/gallery", name: "gallery", Component: Gallery},
];

function App() {
  const {state, dispatch} = useStore();

  console.log("hello");
  console.log(routes);
  return (
    <React.Fragment>

        {routes.map(({ path, name, Component }) => {
            return <Route key={name} exact path={path}>
  
              {({match}) => (
                <CSSTransition
                in={match != null}
                timeout={1200}
                classNames="page"
                unmountOnExit>
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
        })}

    </React.Fragment>
  );
}

export default App;
