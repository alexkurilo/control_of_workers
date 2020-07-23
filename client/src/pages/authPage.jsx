import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { useFormik } from 'formik';
import { useLazyQuery } from '@apollo/client';
import { useHistory } from "react-router-dom";

import {Container, TextField, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LogInValidationSchema from '../validationSchemas/LogInValidationSchema';
import { getUserRole } from '../queries&mutations/queries';
import {authFormSchema} from "../formSchemas/formSchemas";

const useStyles = makeStyles(theme => ({
    form: {
        textAlign: "center",
    },
    inputStyles: {
        marginTop: theme.spacing(2),
        '& input': {
            fontSize: '20px',
            color: '#8B795E'
        }
    },
    buttonStyles: {
        marginTop: theme.spacing(3),
        background: 'linear-gradient(45deg, #8B8B8B 30%, #FFFFFF 90%)',
    }
}));

const AuthPage = ({saveRole, role}) => {
    const classes = useStyles();
    const [getRole, { data = {} }] = useLazyQuery(getUserRole);
    const history = useHistory();

    useEffect(() => {
        data.compareUserData && saveRole(data.compareUserData.role.name);
        role && history.push( "/home" );
    }, [
        data,
        saveRole,
        role,
        history,
    ]);

    const formik = useFormik({
        initialValues: {
            login: '',
            email: '',
            password: '',
        },
        validationSchema: LogInValidationSchema,
        onSubmit: values => {
            getRole({
                variables: {
                    email: values.email,
                    password: values.password,
                }
            });
        },
    });

    return (
        <div className={`auth_popup ${classes.form}`}>
            <Container maxWidth="sm" className="form-container">
                <form onSubmit={formik.handleSubmit} className='form'>
                    {
                        authFormSchema.map((item, index) => (
                            <div key={index} style={{width: '100%'}}>
                                <TextField
                                    required={item.isRequired}
                                    fullWidth
                                    label={item.label}
                                    name={item.name}
                                    type={item.type}
                                    onChange={formik.handleChange}
                                    value={formik.values[item.name] || ""}
                                    className={classes.inputStyles}
                                />
                                {(formik.touched[item.name] && formik.errors[item.name]) && <div className="alert">{formik.errors[item.name]}</div>}

                            </div>
                        ))
                    }
                    <Button
                        variant="outlined"
                        type="submit"
                        className={classes.buttonStyles}
                    >
                        Submit
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default connect(
    state => ({
        role: state.user.role,
    }),
    dispatch => ({
        saveRole: role => {
            dispatch ({type: 'USER_ROLE_SAVE', payload: role});
        },
    })
)(AuthPage);