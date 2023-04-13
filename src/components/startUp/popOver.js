import { React, useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { Box, TextField, MenuItem, CircularProgress } from '@mui/material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const statusArray = [
    {
        value: 'Applied',
        label: 'Applied',
    },
    {
        value: 'Not shortlisted',
        label: 'Not shortlisted',
    },
    {
        value: 'Shortlisted',
        label: 'Shortlisted',
    },
    {
        value: 'Not selected',
        label: 'Not selected',
    },
    {
        value: 'Selected',
        label: 'Selected',
    },
];

export default function BasicPopover({ BASE_URL, status, studentId, jobId, setShowAlert,setAlertMessage, setAlertSeverity }) {
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [statusStudent, setStatusStudent] = useState(status);

    const handleChange = (event) => {
        setStatusStudent(event.target.value);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const submitStatus = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            studentId: studentId,
            status: statusStudent,
        }
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        const url = `${BASE_URL}/api/startUp/jobs/${jobId}`;
        try {
            await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        setLoading(false);
                        // swal({
                        //     title: "Good job!",
                        //     text:"Status updated successfull",
                        //     icon: "success",
                        //     timer:timer
                        // }).then(() => {
                        //     handleClose();
                        // });
                        setShowAlert(true);
                    }
                    else {
                        console.log(data);
                    }
                })
        }
        catch (error) {
            console.log(error);
        }
    }

    const statusButtonColor=(statusStudent)=>{
        if(statusStudent==="Selected" || statusStudent==="Shortlisted"){
            return "success"
        }
        else if(statusStudent==="Not shortlisted" || statusStudent==="Not selected"){
            return "error"
        }
        else if(statusStudent==="Applied"){
            return "primary"
        }
    }

    return (
        <div>
            <Button aria-describedby={id} sx={{ width: 160, pl:3 }} variant="outlined" size="small" onClick={handleClick} color={statusButtonColor(statusStudent)}>
                {statusStudent} <ArrowDropDownRoundedIcon/>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{ mr: { xs: 2, md: 0 } }}
            >
                <Box sx={{ p: 2 }}>
                    <form onSubmit={submitStatus}>
                        <Box>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select"
                                value={statusStudent}
                                onChange={handleChange}
                                helperText="Select one to update status"
                            >
                                {statusArray.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Button variant="contained" size="small" type="submit" sx={{ width: 80, height: 30, mt: 1 }}>
                            {
                                loading ? <CircularProgress sx={{ color: "white" }} size={15} /> : "Submit"
                            }
                        </Button>
                    </form>
                </Box>
            </Popover>
        </div>
    );
}
