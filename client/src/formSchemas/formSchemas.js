export const authFormSchema = [
    {
        name: 'login',
        label: 'Login',
        type: 'text',
        isRequired: true,
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        isRequired: true,
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        isRequired: true,
    }
];

export const workerFormSchema = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        isRequired: true,
    },
    {
        name: 'secondName',
        label: 'Second Name',
        type: 'text',
        isRequired: false,
    },
    {
        name: 'surName',
        label: 'Surname',
        type: 'text',
        isRequired: true,
    },
    {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        isRequired: true,
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'text',
        isRequired: true,
    },
    {
        name: 'date',
        label: 'Birthday date',
        type: 'text',
        isRequired: true,
    },
    {
        name: 'salary',
        label: 'Salary',
        type: 'select',
        isRequired: true,
    },
    {
        name: 'position',
        label: 'Position',
        type: 'select',
        isRequired: true,
    },

];

