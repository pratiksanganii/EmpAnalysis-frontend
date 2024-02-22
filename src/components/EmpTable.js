import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { deleteEmp } from '../store/employeeSlice';

export default function EmpTable({ setData, setVisible }) {
  const emp = useSelector((state) => state.emp);
  const [deleteId, setDeleteId] = useState(0);
  const rows = emp?.data;
  const dispatch = useDispatch();

  return (
    <>
      <TableContainer
        style={{ marginTop: 15, height: '60vh' }}
        component={Paper}
      >
        <div
          style={{
            width: '90vw',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography marginLeft={2} component={'h1'}>
            Employee details
          </Typography>
          <Button
            onClick={() => setVisible(true)}
            variant='contained'
            component='label'
          >
            Create
          </Button>
        </div>
        <Table
          sx={{
            minWidth: 650,
            width: '80vw',
          }}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee Status</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Address</TableCell>
              <TableCell width={200}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ height: '50vh', overflow: 'scroll' }}>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.employeeID}
                </TableCell>
                <TableCell align='center'>{row.employeeName}</TableCell>
                <TableCell align='center'>{row.employeeStatus}</TableCell>
                <TableCell align='center'>{row.designation}</TableCell>
                <TableCell align='center'>{row.joiningDate}</TableCell>
                <TableCell align='center'>{row.birthDate}</TableCell>
                <TableCell align='center'>{row.skills}</TableCell>
                <TableCell align='center'>{row.salary}</TableCell>
                <TableCell align='center'>{row.address}</TableCell>
                <TableCell align='center'>
                  <Grid container justifyContent='space-evenly'>
                    <Grid item>
                      <Button
                        onClick={() => {
                          setVisible(true);
                          setData(row);
                        }}
                        variant='outlined'
                        component='label'
                      >
                        Edit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={() => setDeleteId(row.id)}
                        variant='outlined'
                        color='error'
                        component='label'
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
            {!rows?.length ? (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell colSpan={12} style={{ textAlign: 'center' }}>
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              ''
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {deleteId ? (
        <Dialog
          sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: 435 } }}
          maxWidth='xs'
          open={deleteId}
        >
          <DialogTitle>Remove Employee</DialogTitle>
          <DialogContentText margin={3}>
            Are you sure,you want to remove this employee?
          </DialogContentText>
          <DialogActions>
            <Button autoFocus onClick={() => setDeleteId(0)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(deleteEmp({ id: deleteId }));
                setDeleteId(0);
              }}
              color='error'
              variant='contained'
            >
              Yes,Remove
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ''
      )}
    </>
  );
}
