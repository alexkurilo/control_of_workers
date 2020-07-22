import React from 'react';
import {connect} from "react-redux";
import { useFormik } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    DialogTitle,
    Dialog,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import WorkerFormSchema from "../validationSchemas/WorkerFormSchema";
import {useQuery, useMutation} from "@apollo/client";

import {allGenders, allSalaries, allPositions} from "../queries&mutations/queries";
import {addNewWorker, editWorker} from "../queries&mutations/mutations";

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
    },
    title: {
        paddingBottom: 0,
    },
    textField: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(),
        minWidth: 120,
    },
    formControlSelect: {
        marginTop: theme.spacing(2),
        width: '100%',
    },
    wrapper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        minWidth: 100,
        minHeight: 48,
    },
}));

const FormSchema = [
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

const WorkerForm = ({ selectedWorker, handleClose, resetSelectWorker , refetchWokers}) => {
    const classes = useStyles();
    const { data: dataGenders = {} } = useQuery(allGenders);
    const { data: dataSalaries = {} } = useQuery(allSalaries);
    const { data: dataPositions = {} } = useQuery(allPositions);
    const selectsFormData = {
        gender: dataGenders.genders || [],
        salary: dataSalaries.salaries || [],
        position: dataPositions.positions || [],
    };

    const [addWorker] = useMutation(addNewWorker);
    const [updateWorker] = useMutation(editWorker);

    const formik = useFormik({
        initialValues: {
            id: selectedWorker.id,
            firstName: selectedWorker.firstName,
            secondName: selectedWorker.secondName,
            surName: selectedWorker.surName,
            genderId: selectedWorker.gender.id,
            phone: selectedWorker.phone,
            date: selectedWorker.date,
            salaryId: selectedWorker.salary.id,
            positionId: selectedWorker.position.id,
        },
        validationSchema: WorkerFormSchema,
        onSubmit: values => {
            values.id ?
                updateWorker({ variables: { ...values } }) :
                addWorker({ variables: { ...values } });
            refetchWokers();
            resetSelectWorker();
            handleClose();
        },
    });

    const isSelect = item => (item.type === 'select');

    return (
        <Dialog
            open={true}
            aria-labelledby="simple-dialog-title"
        >
            <DialogTitle
                className={classes.title}
                id="simple-dialog-title"
            >
                Worker information
            </DialogTitle>
            <form
                className={classes.container}
                onSubmit={formik.handleSubmit}
            >
                {
                    FormSchema.map((item, index) => (
                        isSelect(item) ? (
                                <div key={index} style={{width: '100%'}}>
                                    <FormControl
                                        variant="outlined"
                                        className={classes.formControlSelect}>
                                        <InputLabel
                                            htmlFor="outlined-age-simple"
                                            required={item.isRequired}
                                        >
                                            {item.label}
                                        </InputLabel>
                                        <Select
                                            onChange={formik.handleChange}
                                            value={formik.values[`${item.name}Id`] || ""}
                                            input={
                                                <OutlinedInput
                                                    name={`${item.name}Id`}
                                                    id={`outlined-${item.name}`}
                                                    labelWidth={57}
                                                />
                                            }
                                        >
                                            {selectsFormData[item.name].map( selectData => (
                                                <MenuItem
                                                    key={selectData.id}
                                                    value={selectData.id}
                                                >
                                                    {selectData.name || selectData.size}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {(formik.touched[`${item.name}Id`] && formik.errors[`${item.name}Id`]) && (
                                        <div className="alert">{formik.errors[`${item.name}Id`]}</div>
                                    )}
                                </div>
                            ) : (
                                <div key={index} style={{width: '100%'}}>
                                    <TextField
                                        required={item.isRequired}
                                        fullWidth
                                        label={item.label}
                                        name={item.name}
                                        type={item.type}
                                        onChange={formik.handleChange}
                                        value={formik.values[item.name] || ""}
                                        className={classes.textField}
                                        variant="outlined"
                                    />
                                    {(formik.touched[item.name] && formik.errors[item.name]) && (
                                        <div className="alert">{formik.errors[item.name]}</div>
                                    )}
                                </div>
                            )
                        )
                    )
                }
                <div
                    className={classes.wrapper}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type="submit"
                    >
                        <SaveIcon />
                        Save
                    </Button>
                </div>
            </form>
        </Dialog>
    );
};

export default connect(
    (state) => ({
        selectedWorker: state.worker,
    }),
    dispatch => ({
        resetSelectWorker: worker => {
            dispatch ({type: 'RESET_SELECT_WORKER', payload: worker});
        },
    })
)(WorkerForm);