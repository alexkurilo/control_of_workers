import React from 'react';
import {connect} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import {useRoutes} from '../router/routes';

const App = ({}) => {

    return (
        <div>
            <BrowserRouter>
                {useRoutes()}
            </BrowserRouter>
            App Component
        </div>
    );
};

export default connect(
    (state) => ({
    }),
    dispatch => ({
    })
)(App);