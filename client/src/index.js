import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import {composeWithDevTools} from "redux-devtools-extension";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

import App from './components/App';
import rootSaga from './store/sagas/indexSaga';
import reducer from './store/reducers/indexReducer';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore( reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

const client = new ApolloClient({
    uri: 'http://localhost:3050',
    cache: new InMemoryCache(),
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);