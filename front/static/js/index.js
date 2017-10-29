import React from "react";
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from "react-router"

// main app
import App from './components/main_elements/app'

// pages
import Home from './components/pages/home'
import Login from './components/pages/login'
import NotFound from './components/pages/not_found'


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>

            <IndexRoute component={Home} />

            <Route path="login" component={Login} />
            <Route path='*' component={NotFound} />

        </Route>
    </Router>,
    document.getElementById("body")
);