import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import {composeWithDevTools} from "redux-devtools-extension";

import App from './components/App';
import rootSaga from './store/sagas/indexSaga';
import reducer from './store/reducers/indexReducer';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore( reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);