import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import AuthPage from '../pages/authPage';
import HomePage from '../pages/homePage';

export const useRoutes = (role) => {
    return (
        <Switch>
            {!role ?
                <Route
                    path="/auth"
                    exact
                    component={AuthPage}
                />
                :
                <Route
                    path="/home"
                    exact
                    component={HomePage}
                />
            }
            <Redirect to={!role ? "/auth" : "/home"}/>
        </Switch>
    );
};