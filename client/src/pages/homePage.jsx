import React from 'react';
import {connect} from 'react-redux';

const HomePage = () => {
    return(
        <div>
            home Page
        </div>
    );
};

export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({

    })
)(HomePage);