import { Container, Typography, Card, CardContent, TextField, Grid, Button, CircularProgress, Box, MenuItem, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { useNavigate } from 'react-router-dom';

export default function Account({ BASE_URL, startUpDetails, setStartUpDetails, setShowAlert, setAlertMessage, setAlertSeverity }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [linkedIn, setLinkedIn] = useState(startUpDetails.linkedIn);
    const [location, setLocation] = useState(startUpDetails.location);
    const [sector, setSector] = useState(startUpDetails.sector);
    const [noOfEmployees, setNoOfEmployees] = useState(startUpDetails.noOfEmployees);
    const companyName = startUpDetails.companyName;
    const companyEmail = startUpDetails.email;
    const [companyVision, setCompanyVision] = useState(startUpDetails.companyVision);
    const [founder, setFounder] = useState(startUpDetails.founder);
    const updateOrSave = (startUpDetails.location === "" || startUpDetails.location === undefined) ? "Save" : "Update";

    const updateAccountDetails = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            location: location,
            linkedIn: linkedIn,
            sector: sector,
            noOfEmployees: noOfEmployees,
            companyVision: companyVision,
            founder: founder,
        }
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        const url = `${BASE_URL}/api/startUp/register/${startUpDetails._id}`;
        try {
            await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        setStartUpDetails(data.startUpDetails);
                        setLoading(false);
                        setAlertMessage(`Account details ${updateOrSave + "d"} successfully.`);
                        setAlertSeverity("success")
                        setShowAlert(true);
                        navigate('../internship', { state: { type: 'Internship' } });
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

    const addFounder = () => {
        setFounder(current => [...current, { id: current.length + 1, name: "", bio: "" }]);
    }

    const removeFounder = () => {
        setFounder(founder.slice(0, -1))
    }

    const updateFounderName = (value, id) => {
        const newState = founder.map(obj => {
            if (obj.id === id) {
                return { ...obj, name: value };
            }
            else {
                return obj;
            }
        });
        setFounder(newState);
    }

    const updateFounderBio = (value, id) => {
        const newState = founder.map(obj => {
            if (obj.id === id) {
                return { ...obj, bio: value };
            }
            else {
                return obj;
            }
        });
        setFounder(newState);
    }

    useEffect(() => {
        if (founder.length === 0) {
            addFounder();
        }
    }, [])

    return (
        <Container sx={{ py: 2, mt: 9 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Account Details</Typography>
            <form onSubmit={updateAccountDetails}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 2 }}>Company Overview</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField variant="standard" label="Company Name" placeholder='XYZ' fullWidth value={companyName} InputProps={{ disableUnderline: true, readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField variant="standard" label="Email" placeholder='xyz@gmail.com' fullWidth value={companyEmail} InputProps={{ disableUnderline: true, readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField variant="standard" label="LinkedIn" placeholder='https://www.linkedin.com/in/xyz/' fullWidth value={linkedIn} onChange={(e) => { setLinkedIn(e.target.value) }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField variant="standard"
                                    fullWidth
                                    required
                                    select
                                    label="Sector"
                                    value={sector}
                                    onChange={(e) => { setSector(e.target.value) }}
                                >
                                    <MenuItem value={"SAAS"}>SAAS</MenuItem>
                                    <MenuItem value={"Fin-Tech"}>Fin-Tech</MenuItem>
                                    <MenuItem value={"Ed-Tech"}>Ed-Tech</MenuItem>
                                    <MenuItem value={"Health-Tech"}>Health-Tech</MenuItem>
                                    <MenuItem value={"E-Commerce"}>E-Commerce</MenuItem>
                                    <MenuItem value={"Logistics"}>Logistics</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField variant="standard" label="Location" placeholder='Delhi' fullWidth value={location} onChange={(e) => { setLocation(e.target.value) }} required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField variant="standard" label="No Of Employees" placeholder='10' fullWidth value={noOfEmployees} onChange={(e) => { setNoOfEmployees(e.target.value) }} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="standard" label="Company Vision" multiline minRows={2} fullWidth value={companyVision} placeholder="Explain company vision and what it aim to solve." onChange={(e) => { setCompanyVision(e.target.value) }} required />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card sx={{ my: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="h5" >Founder</Typography>
                            <Box sx={{ gap: 2 }}>
                                <IconButton size="small" onClick={addFounder} color="success">
                                    <AddIcon />
                                </IconButton>
                                <IconButton size="small" onClick={removeFounder} color="error" disabled={founder.length === 1}>
                                    <RemoveRoundedIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        {
                            founder.map((value, key) => {
                                return (
                                    <Card variant="outlined" sx={{ mt: 2 }}>
                                        <CardContent sx={{ display: { xs: 'block', md: 'flex' }, gap: 2, alignItems: "end" }}>
                                            <TextField variant="standard" label="Founder Name" placeholder="Steve Jobs" sx={{ mb: { xs: 2, md: 0 } }} fullWidth value={value.name} onChange={(e) => { updateFounderName(e.target.value, value.id) }} required />
                                            <TextField variant="standard" label="Founder Bio" placeholder="Explain founder's professional and educational background." fullWidth multiline value={value.bio} onChange={(e) => { updateFounderBio(e.target.value, value.id) }} required />
                                        </CardContent>
                                    </Card>
                                )
                            }
                            )
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 2 }}>{updateOrSave} Account</Typography>
                        <Button type="submit" variant="contained" sx={{ width: 120, height: 40 }}>
                            {
                                loading ? <CircularProgress sx={{ color: "white" }} size={25} /> : <Typography>{updateOrSave}</Typography>
                            }
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Container>
    )
}
