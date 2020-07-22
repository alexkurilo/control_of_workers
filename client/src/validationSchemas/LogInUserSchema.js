import * as Yup from 'yup';

const LogInUserSchema = Yup.object({
    login: Yup.string()
        .label('Login')
        .min(6, 'Must be at least 6 characters')
        .max(15, 'First name must be 15 characters or less')
        .required('First name is required'),
    email: Yup.string()
        .label('Email')
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .label('Password')
        .min(6, 'Password must be at least 6 characters')
        .max(15, 'Password must be 20 characters or less')
        // .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Password must have at least one number, one lowercase and one uppercase letter.')
        .required('Password is required'),
});

export default LogInUserSchema;