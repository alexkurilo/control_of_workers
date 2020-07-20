import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import HomePage from '../pages/homePage';

export const useRoutes = () => {
    return (
        <Switch>
            <Route
                path="/"
                exact
            >
                <HomePage />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};