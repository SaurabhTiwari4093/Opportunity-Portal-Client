import { Card, CardContent, Container, Grid, Typography, TextField, Button, CircularProgress,Box } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function AddNew({ BASE_URL, setShowAlert,setAlertMessage, setAlertSeverity }) {
    const navigate = useNavigate();
    const { type, companyName, startUpId, jobId } = useLocation().state;
    const [designation, setDesignation] = useState('');
    const [duration, setDuration] = useState('');
    const [stipend, setStipend] = useState('');
    const [noOfOffers, setNoOfOffers] = useState('');
    const [skillsRequired, setSkillsRequired] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [assignment, setAssignment] = useState('');
    const [deadline, setDeadline] = useState(moment().format('YYYY-MM-DDThh:mm'));
    const [selectionProcess, setSelectionProcess] = useState('');
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(true);
    const updateOrAdd = (jobId !== "" && jobId !== undefined) ? "Update" : "Add";

    const addNewOpportunity = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            companyName: companyName,
            designation: designation,
            type: type,
            duration: duration,
            stipend: stipend,
            noOfOffers: noOfOffers,
            skillsRequired: skillsRequired,
            responsibilities: responsibilities,
            assignment: assignment,
            deadline: deadline,
            selectionProcess: selectionProcess,
            startUpId: startUpId,
            createdAt:moment().format('YYYY-MM'),
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        const url = `${BASE_URL}/api/startUp/jobs`;
        try {
            await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 201) {
                        setLoading(false);
                        // swal({
                        //     title: "Opportunity added Successfull",
                        //     text: "We are redirecting you to portal",
                        //     icon: "success",
                        //     timer: timer
                        // }).then(() => {
                        //     navigate(-1);
                        // });
                        setShowAlert(true);
                    }
                    else {
                        console.log(data);
                    }
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    const updateOpportunity = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            designation: designation,
            duration: duration,
            stipend: stipend,
            noOfOffers: noOfOffers,
            skillsRequired: skillsRequired,
            responsibilities: responsibilities,
            assignment: assignment,
            deadline: deadline,
            selectionProcess: selectionProcess,
            createdAt:moment().format('YYYY-MM'),
        }
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        const url = `${BASE_URL}/api/startUp/jobs/update/${jobId}`;
        try {
            await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        setLoading(false);
                        // swal({
                        //     title: "Opportunity updated Successfull",
                        //     text: "We are redirecting you to portal",
                        //     icon: "success",
                        //     timer: timer
                        // }).then(() => {
                        //     navigate(-1);
                        // });
                        setShowAlert(true);
                    }
                    else {
                        console.log(data)
                    }
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    const getJobDetails = async (jobId) => {
        setLoading2(true);
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        const url = `${BASE_URL}/api/startUp/jobs/${jobId}`;
        try {
            await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        setLoading2(false);
                        setDesignation(data.jobDetails.designation);
                        setAssignment(data.jobDetails.assignment);
                        setDeadline(data.jobDetails.deadline);
                        setDuration(data.jobDetails.duration);
                        setNoOfOffers(data.jobDetails.noOfOffers);
                        setResponsibilities(data.jobDetails.responsibilities);
                        setSelectionProcess(data.jobDetails.selectionProcess);
                        setSkillsRequired(data.jobDetails.skillsRequired);
                        setStipend(data.jobDetails.stipend);
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

    const addorUpdateOpportunity= async(e)=>{
        if (jobId !== "" && jobId !== undefined) {
            updateOpportunity(e);
        }
        else {
            addNewOpportunity(e);
        }
    }

    useEffect(() => {
        if (jobId !== "" && jobId !== undefined) {
            getJobDetails(jobId);
        }
        else {
            setLoading2(false);
        }
    }, [])

    return (
        <Container sx={{ py: 2, mt: 9 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>{updateOrAdd} {type} Opportunity</Typography>
            <form onSubmit={addorUpdateOpportunity}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 2 }}>Project Details</Typography>
                        {
                            (loading2) ? <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: "center" }}><CircularProgress /></Box> :
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField variant="standard" label="Designation" placeholder='SDE' fullWidth value={designation} onChange={(e) => { setDesignation(e.target.value) }} required />
                                    </Grid>
                                    {
                                        type === 'Internship' ?
                                            <Grid item xs={12} md={6}>
                                                <TextField variant="standard" label="Internship Duration" placeholder='2 Months (June-July)' fullWidth value={duration} onChange={(e) => { setDuration(e.target.value) }} required />
                                            </Grid> :
                                            <Grid item xs={12} md={6}>
                                                <TextField variant="standard" label="Type" fullWidth value={type} required InputProps={{ disableUnderline: true, readOnly: true }} />
                                            </Grid>
                                    }
                                    <Grid item xs={12} md={6}>
                                        <TextField variant="standard" label="Stipend" placeholder='Flexible' fullWidth value={stipend} onChange={(e) => { setStipend(e.target.value) }} required />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField variant="standard" label="No of Offers" placeholder='5' fullWidth value={noOfOffers} onChange={(e) => { setNoOfOffers(e.target.value) }} required />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField variant="standard" label="Skills Required" multiline fullWidth minRows={3} value={skillsRequired} placeholder="1. C++&#10;2. Python&#10;3. Communication Skills" onChange={(e) => { setSkillsRequired(e.target.value) }} required />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField variant="standard" label="Responsibilities" multiline fullWidth minRows={3} value={responsibilities} placeholder="1. Execute full software development life cycle (SDLC)&#10;2. Write well-designed, testable code&#10;3. Troubleshoot, debug and upgrade existing systems" onChange={(e) => { setResponsibilities(e.target.value) }} required />
                                    </Grid>
                                </Grid>
                        }
                    </CardContent>
                </Card>
                <Card sx={{ my: 2 }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 2 }}>Deadline and Selection Process</Typography>
                        {
                            (loading2) ? <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: "center" }}><CircularProgress /></Box> :
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                                        <TextField variant="standard" label="Assignment" fullWidth value={assignment} placeholder="Add assignment link ( Optional )" onChange={(e) => { setAssignment(e.target.value) }} />
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                                        <TextField type="datetime-local" variant="standard" label="Deadline" fullWidth value={deadline} onChange={(e) => { setDeadline(e.target.value) }} required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField variant="standard" label="Selection Process" multiline fullWidth minRows={3} value={selectionProcess} placeholder="1. Resume Shortlist&#10;2. Online Test&#10;3. Interview" onChange={(e) => { setSelectionProcess(e.target.value) }} required />
                                    </Grid>
                                </Grid>
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 2 }}>{updateOrAdd} Opportunity</Typography>
                        <Button type="submit" variant="contained" sx={{ width: 120, height: 40 }}>
                            {
                                loading ? <CircularProgress sx={{ color: "white" }} size={25} /> : <Typography>{updateOrAdd}</Typography>
                            }
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Container>
    )
}

