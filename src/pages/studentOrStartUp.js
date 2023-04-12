import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Grid, Typography, Button, Box, CircularProgress } from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StartUpImage from '../assets/startUpImage.svg';
import StudentImage from '../assets/studentImage.svg';
import OpportunityTable from '../components/table';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function StudentOrStartUp({ BASE_URL,timer }) {
  const [loading, setLoading] = useState(true);
  const [opportunityTableRow, setOpportunityTableRow] = useState([]);
  const navigate = useNavigate();

  const convertToTableRows = (jsonData) => {
    const jsonDataArray = []
    for (let i = 0; i < jsonData.length; i++) {
      const oneJsonData = jsonData[i];
      const convertedJsonData = {
        id: i + 1,
        company: oneJsonData.companyName,
        designation: oneJsonData.designation,
        type: oneJsonData.type,
        stipend: oneJsonData.stipend,
        deadline: oneJsonData.deadline,
        details: oneJsonData._id,
        apply: { jobId: oneJsonData._id, deadline: oneJsonData.deadline }
      }
      jsonDataArray.push(convertedJsonData);
    }
    setOpportunityTableRow(jsonDataArray);
  }

  const getJobs = async () => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    const url = `${BASE_URL}/api/student/jobs`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            convertToTableRows(data.jobs);
            setLoading(false);
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

  const opportunityTableColumn = [
    {
      field: "company",
      headerName: "Company",
      flex: 1
    },
    {
      field: 'designation',
      headerName: 'Designation',
      flex: 1
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1
    },
    {
      field: 'stipend',
      headerName: 'Stipend',
      flex: 1
    },
    {
      field: 'deadline',
      headerName: 'Deadline',
      flex: 1,
      renderCell: ({ value }) => {
        return (value < moment().format('YYYY-MM-DDThh:mm') ? "Deadline passed" : moment(value).format('MMMM Do, h:mm a'))
      }
    },
    {
      field: 'details',
      headerName: 'Details',
      flex: 1,
      renderCell: ({ value }) => {
        return <Button size="small" variant="outlined" onClick={() => { navigate('details', { state: { jobId: value } }) }}><VisibilityRoundedIcon /></Button>
      }
    },
    {
      field: 'apply',
      headerName: 'Apply',
      flex: 1,
      renderCell: ({ value }) => {
        return <Button size="small" variant="outlined" disabled={value.deadline < moment().format('YYYY-MM-DDThh:mm') ? true : false} onClick={() => {
          swal({
            title: "Please sign up to apply",
            text: "If already have an account please signin",
            icon: "info",
            timer: timer
          })
        }}>Apply</Button>
      }
    },
  ];

  useEffect(() => {
    getJobs();
  }, [])

  return (
    <Container sx={{ py: 2, mt: 9 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Welcome to the <Typography display="inline" variant="h5" color="primary">Opportunity Portal</Typography> of eDC IITD</Typography>
      <Card>
        <CardContent>
          <Typography sx={{ mb: 2 }} variant="h5">Select user type</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ height: "100%", cursor: "pointer", '&:hover': { border: 1, borderColor: "primary.main" } }} onClick={() => { navigate('signUp', { state: { user: 'Startup' } }) }}>
                <CardContent align="center">
                  <Typography variant="h5">Start Up</Typography>
                  <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", my: 2 }} >
                    <img src={StartUpImage} alt="StartUp" loading="lazy" width={120} height={120} />
                  </Box>
                  <Typography>Are you a founder or a HR looking for Interns or Employee for your startup.</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ height: "100%", cursor: "pointer", '&:hover': { border: 1, borderColor: "primary.main" } }} onClick={() => { navigate('signUp', { state: { user: 'Student' } }) }}>
                <CardContent align="center">
                  <Typography variant="h5">Student</Typography>
                  <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", my: 2 }}>
                    <img src={StudentImage} alt="Student" loading="lazy" width={120} height={120} />
                  </Box>
                  <Typography>Are you a Student who wants to work in an early stage startup.</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Box sx={{ mb: 2, display: { xs: 'block', md: 'flex' }, alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h5" >Opportunities</Typography>
            <Button variant="contained" sx={{ width: 120, height: 40, mt: { xs: 2, md: 0 } }} onClick={() => {
              swal({
                title: "Please sign up to post opportunity",
                text: "If already have an account please signin",
                icon: "info",
                timer: timer
              })
            }}>
              <AddRoundedIcon />
            </Button>
          </Box>
          {
            loading ? <Box sx={{ height: 370.5, display: 'flex', justifyContent: 'center', alignItems: "center" }}><CircularProgress /></Box> : <OpportunityTable column={opportunityTableColumn} row={opportunityTableRow} />
          }
        </CardContent>
      </Card>

    </Container>
  )
}