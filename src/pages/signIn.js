import { Card, CardContent, CardHeader, Container, Typography, TextField, CardActions, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function SignIn({ BASE_URL,setShowAlert,setAlertMessage, setAlertSeverity }) {
  const { user } = useLocation().state;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email.substring(email.length - 10, email.length) !== "iitd.ac.in") {
      // swal({
      //   title: "Not a IITD email ID",
      //   text: "Please enter IIT Delhi email ID",
      //   icon: "info",
      //   timer: timer
      // })
      setShowAlert(true);
      setLoading(false);
      return
    }
    const formData = {
      email: email,
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
    const url = `${BASE_URL}/api/student/login`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            navigate('../otpVerify', { state: { user: "Student", signInOrSignUp: "SignIn", email: data.studentDetails.email, name: data.studentDetails.name } });
          }
          else if (data.status === 401) {
            setLoading(false);
            // swal({
            //   title: "Account does not exist",
            //   text: "Please signup to create account",
            //   icon: "info",
            //   timer: timer
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

  const loginStartUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email: email,
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
    const url = `${BASE_URL}/api/startUp/login`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            navigate('../otpVerify', { state: { user: "Startup", signInOrSignUp: "SignIn", email: data.startUpDetails.email, name: data.startUpDetails.companyName } });
          }
          else if (data.status === 401) {
            setLoading(false);
            // swal({
            //   title: "Account does not exist",
            //   text: "Please signup to create account",
            //   icon: "info",
            //   timer: timer
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

  return (
    <Container maxWidth="sm" sx={{ py: 2, mt: 9 }}>
      <form onSubmit={user === "Student" ? loginStudent : loginStartUp}>
        <Card>
          <CardHeader title={user + " Sign In"} subheader="Enter your email ID to sign in" />
          <CardContent>
            <TextField type="email" label={user === "Student" ? "IITD Email" : "Email"} variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
          </CardContent>
          <CardActions sx={{ ml: 1 }}>
            <Button type="submit" variant="contained" sx={{ width: 120, height: 40 }}>
              {
                loading ? <CircularProgress sx={{ color: "white" }} size={25} /> : <Typography>Sign In</Typography>
              }
            </Button>
          </CardActions>
          <CardActions sx={{ ml: 1, mb: 1 }}>
            <Typography>
              Don't have an Account?{" "}
              <Typography color="primary" display="inline" sx={{ cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 }} onClick={() => { navigate('../signUp', { state: { user: user } }) }}>Sign Up</Typography>
            </Typography>
          </CardActions>
        </Card>
      </form>
    </Container>
  )
}