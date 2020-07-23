import React from 'react';
import {connect} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import {useRoutes} from '../router/routes';

const App = ({role}) => {

    return (
        <div className='app'>
            <BrowserRouter>
                {useRoutes(role)}
            </BrowserRouter>
        </div>
    );
};

export default connect(
    (state) => ({
        role: state.user.role,
    }),
    dispatch => ({
    })
)(App);