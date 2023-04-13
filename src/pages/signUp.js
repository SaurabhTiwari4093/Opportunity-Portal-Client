import { Card, CardContent, CardHeader, Container, Typography, TextField, CardActions, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SignUp({ BASE_URL,setShowAlert }) {
  const { user } = useLocation().state;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerStudent = async (e) => {
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
    else {
      const formData = {
        name: name,
        email: email
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      }
      const url = `${BASE_URL}/api/student/register`;
      try {
        await fetch(url, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 200) {
              setLoading(false);
              navigate('../otpVerify', { state: { user: "Student", signInOrSignUp: "SignUp", email: data.studentDetails.email, name:data.studentDetails.name } });
            }
            else if (data.status === 401) {
              setLoading(false);
              // swal({
              //   title: "Account already exist",
              //   text: "Please sign in to your account",
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
        console.log(error);
      }
    }
  }

  const registerStartUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      companyName: name,
      email: email,
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
    const url = `${BASE_URL}/api/startUp/register`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            navigate('../otpVerify', { state: { user: "Startup", signInOrSignUp: "SignUp", email: data.startUpDetails.email, name:data.startUpDetails.companyName } });
          }
          else if (data.status === 401) {
            setLoading(false);
            // swal({
            //   title: "Account already exist",
            //   text: "Please sign in to your account",
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
      console.log(error);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 2, mt: 9 }}>
      <form onSubmit={user === "Student" ? registerStudent : registerStartUp}>
        <Card>
          <CardHeader title={user + " Sign Up"} subheader="Enter your details to create account" />
          <CardContent>
            <TextField type="text" label={user === "Student" ? "Name" : "Company Name"} variant="outlined" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
            <TextField type="email" label={user === "Student" ? "IITD Email" : "Email"} variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mt: 2 }} required />
          </CardContent>
          <CardActions sx={{ ml: 1 }}>
            <Button type="submit" variant="contained" sx={{ width: 120, height: 40 }}>
              {
                loading ? <CircularProgress sx={{ color: "white" }} size={25} /> : <Typography>Sign Up</Typography>
              }
            </Button>
          </CardActions>
          <CardActions sx={{ ml: 1, mb: 1 }}>
            <Typography>Already have an Account?{" "}
              <Typography color="primary" display="inline" sx={{ cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 }} onClick={() => { navigate('../signIn', { state: { user: user } }) }}>Sign In</Typography>
            </Typography>
          </CardActions>
        </Card>
      </form>
    </Container>
  )
}



