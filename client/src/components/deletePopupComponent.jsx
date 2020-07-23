import React from 'react';
import {connect} from "react-redux";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

import {
    DeleteForever as DeleteForeverIcon,
    Block as BlockIcon,
} from '@material-ui/icons';
import {useMutation} from "@apollo/client";
import {deleteWorker} from "../queries&mutations/mutations";

const DeletePopUp = ({selectedWorker, open, handleClose,resetSelectWorker, refetchWokers}) => {
    const [removeWorker] = useMutation(deleteWorker);

    const handleDelete = () => {
        removeWorker({ variables: { id: selectedWorker.id } });
        refetchWokers();
        resetSelectWorker();
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Are you sire that you want to delete element?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If you click 'Confirm' this element will be removed from data base.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="primary"
                >
                    <BlockIcon /> Cancel
                </Button>
                <Button
                    onClick={handleDelete}
                    color="primary"
                    autoFocus
                >
                    <DeleteForeverIcon /> Confirm
                </Button>
            </DialogActions>
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
)(DeletePopUp);