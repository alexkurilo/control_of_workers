import * as Yup from 'yup';

const WorkerValidationSchema = Yup.object({
    firstName: Yup.string()
        .min(2, 'First Name must be at least 2 characters')
        .max(20, 'First Name must be 20 characters or less')
        .required('First Name is required')
        .label('First Name'),
    secondName: Yup.string()
        .label('Login'),
    surName: Yup.string()
        .min(2, 'Surname must be at least 2 characters')
        .max(20, 'Surname must be 20 characters or less')
        .required('Surname is required')
        .label('Second Name'),
    genderId: Yup.string()
        .required('Gender is required')
        .label('Gender'),
    phone: Yup.string()
        .min(9, 'Phone number must be at least 9 characters')
        .max(19, 'Phone number must be 19 characters or less')
        .matches(/(?=.*\d)/, 'Phone number must have numbers.')
        .required('Phone number is required')
        .label('Phone number'),
    date: Yup.string()
        .required('Birthday date is required')
        .label('Birthday date'),
    salaryId: Yup.string()
        .required('Salary is required')
        .label('Salary'),
    positionId: Yup.string()
        .required('Position is required')
        .label('Position'),
});

export default WorkerValidationSchema;