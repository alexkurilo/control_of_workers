import React, { useState } from 'react';
import {connect} from 'react-redux';
import { useQuery } from '@apollo/client';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    MenuItem,
    Menu,
} from '@material-ui/core';
import {
    MoreVert as MoreIcon,
    Delete as DeleteIcon,
    Create as CreateIcon,
    Add as AddIcon,
} from '@material-ui/icons';

import { allWorkers } from '../queries&mutations/queries';
import DeletePopUp from "../components/deletePopupComponent";
import WorkerForm from "../components/workerFormComponent";

const HomePage = ({role, selectWorker, selectedWorker}) => {
    const { data: dataWorkers = {}, refetch: refetchWorkers } = useQuery(allWorkers);
    const [ anchorElement, setAnchorElement ] = useState(null);
    const [ openDeletePopUp, setOpenDeletePopUp ] = useState(false);
    const [ openWorkerForm, setOpenWorkerForm ] = useState(false);
    const { workers = [] } = dataWorkers;

    const isAdmin = () => (role === 'admin');

    const handleClick = (event, worker) => {
        setAnchorElement(event.currentTarget);
        selectWorker(worker);
    };

    const handleEdit = () => {
        handleClose();
        setOpenWorkerForm(true);
    };

    const handleDelete = () => setOpenDeletePopUp(true);

    const handleClose = () => {
        setAnchorElement(null);
        setOpenDeletePopUp(false);
    };

    const handleCloseForm = () => setOpenWorkerForm(false);

    return(
        <div>
            {openWorkerForm && <WorkerForm
                handleClose={handleCloseForm}
                refetchWokers={refetchWorkers}
            />}
            <DeletePopUp
                open={openDeletePopUp}
                handleClose={handleClose}
                refetchWokers={refetchWorkers}
                id={selectedWorker.id}
            />
            {
                !!workers.length && (
                    <Paper>
                        <div className='form_header'>
                            <div className='form_header_name'><h2>Workers</h2></div>
                            <div className='form_header_add'>
                            { isAdmin() && (
                                <IconButton
                                    color="inherit"
                                    onClick={handleEdit}
                                >
                                    <AddIcon />
                                </IconButton>
                            ) }
                            </div>
                        </div>
                        <Table>
                            <TableHead >
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Second Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell>Position</TableCell>
                                    { isAdmin() && <TableCell>Edit</TableCell> }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { workers.map(worker => {
                                    return (
                                        <TableRow key={worker.id}>
                                            <TableCell component="th" scope="row">{worker.firstName}</TableCell>
                                            <TableCell>{worker.secondName}</TableCell>
                                            <TableCell>{worker.surName}</TableCell>
                                            <TableCell>{worker.gender.name}</TableCell>
                                            <TableCell>{worker.phone}</TableCell>
                                            <TableCell>{worker.salary.size}</TableCell>
                                            <TableCell>{worker.position.name}</TableCell>
                                            {
                                                isAdmin() && (
                                                    <TableCell>
                                                        <IconButton
                                                            color="inherit"
                                                            onClick={(event) => handleClick(event, worker)}
                                                        >
                                                            <MoreIcon />
                                                        </IconButton>
                                                        <Menu
                                                            id="simple-menu"
                                                            anchorEl={anchorElement}
                                                            open={Boolean(anchorElement)}
                                                            onClose={handleClose}
                                                        >
                                                            <MenuItem
                                                                onClick={handleEdit}
                                                            ><CreateIcon /> Edit </MenuItem>
                                                            <MenuItem
                                                                onClick={handleDelete}
                                                            ><DeleteIcon /> Delete </MenuItem>
                                                        </Menu>
                                                    </TableCell>
                                                )
                                            }

                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                )
            }
        </div>
    );
};

export default connect(
    state => ({
        role: state.user.role,
        selectedWorker: state.worker,
    }),
    dispatch => ({
        selectWorker: worker => {
            dispatch ({type: 'SELECT_WORKER', payload: worker});
        },
    })
)(HomePage);