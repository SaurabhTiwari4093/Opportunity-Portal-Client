import { React } from 'react';
import { Button } from '@mui/material';
import swal from 'sweetalert';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function BasicPopover({ jobId, status, studentDetails, deadline }) {
    const jobStatus = status;
    const navigate = useNavigate();

    const handleClick = () => {
        if (studentDetails.resumeLink === undefined || studentDetails.resumeLink === "") {
            swal({
                title: "Incomplete account details",
                text: "Please complete your account details before applying",
                icon: "info",
            })
        }
        else if (jobStatus === "Not Applied") {
            navigate('../apply', { state: { jobId: jobId } });
        }
    };

    return (
        <Button variant="outlined" size="small" sx={{ width: 100 }} onClick={handleClick} disabled={deadline < moment().format('YYYY-MM-DDThh:mm') ? true : (jobStatus === "Not Applied" ? false : true)}>
            {jobStatus === "Not Applied" ? "Apply" : "Applied"}
        </Button>
    );
}
