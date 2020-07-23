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
import {
    Save as SaveIcon,
    Block as BlockIcon,
} from '@material-ui/icons';
import {useQuery, useMutation} from "@apollo/client";

import WorkerValidationSchema from "../validationSchemas/WorkerValidationSchema";
import {allGenders, allSalaries, allPositions} from "../queries&mutations/queries";
import {addNewWorker, editWorker} from "../queries&mutations/mutations";
import {workerFormSchema} from "../formSchemas/formSchemas";

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
        minWidth: 520,
    },
    title: {
        paddingBottom: 0,
        textAlign: 'center',
    },
    textField: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    formControlSelect: {
        marginTop: theme.spacing(2),
        width: '100%',
    },
    wrapper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        minWidth: 150,
        minHeight: 40,
        marginLeft: theme.spacing(3),
    },
}));

const WorkerForm = ({ selectedWorker, handleClose, resetSelectWorker , refetchWokers }) => {
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
            ...selectedWorker,
            genderId: selectedWorker.gender.id,
            salaryId: selectedWorker.salary.id,
            positionId: selectedWorker.position.id,
        },
        validationSchema: WorkerValidationSchema,
        onSubmit: values => {
            values.id
                ? updateWorker({ variables: { ...values } })
                : addWorker({ variables: { ...values } });
            refetchWokers();
            resetSelectWorker();
            handleClose();
        },
    });

    const isSelect = item => (item.type === 'select');

    const handleCancel = () => {
        resetSelectWorker();
        handleClose();
    };

    return (
        <Dialog
            open={true}
            aria-labelledby="simple-dialog-title"
        >
            <DialogTitle
                className={classes.title}
                id="simple-dialog-title"
            >
                { formik.values.id ? 'Worker information:' : 'New Worker information:' }
            </DialogTitle>
            <form
                className={classes.container}
                onSubmit={formik.handleSubmit}
            >
                {
                    workerFormSchema.map((item, index) => (
                        isSelect(item) ? (
                                <div key={index} >
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
                <div className={classes.wrapper}>
                    <Button
                        variant="contained"
                        color='default'
                        className={classes.button}
                        onClick={handleCancel}
                    >
                        <BlockIcon />
                        Cancel
                    </Button>
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