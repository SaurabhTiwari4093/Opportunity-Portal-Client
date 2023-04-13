import { Card, CardContent, CardHeader, Container, Typography, TextField, CardActions, Button, CircularProgress } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import useCountDown from 'react-countdown-hook';

export default function OTPVerify({ BASE_URL, setStartUpDetails, setStudentDetails,setShowAlert,setAlertMessage, setAlertSeverity }) {
  const { user, signInOrSignUp, email, name } = useLocation().state;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialTime = 99 * 1000;
  const interval = 1000;

  const [timeLeft, { start }] = useCountDown(initialTime, interval);

  useEffect(() => {
    start();
  }, []);

  const restart = useCallback(() => {
    const newTime = 99 * 1000;
    start(newTime);
  }, []);

  const resendOTP = () => {
    restart();
    if (user === "Student") {
      if (signInOrSignUp === "SignIn") {
        resendOTPLoginStudent();
      }
      else {
        resendOTPregisterStudent();
      }
    }
    else {
      if (signInOrSignUp === "SignIn") {
        resendOTPLoginStartUp()
      }
      else {
        resendOTPregisterStartUp();
      }
    }
  }

  const verifyStartUpSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email: email,
      otp: otp
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
    const url = `${BASE_URL}/api/startUp/login/otp/verify`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem('localStorageStartUpId', data.startUpDetails._id);
            setStartUpDetails(data.startUpDetails);
            setLoading(false);
            // swal({
            //   title: "Sign in successfull",
            //   text: "We are redirecting you to portal",
            //   icon: "success",
            //   timer: timer,
            // }).then(() => {
            //   navigate('../startUp/internship', { state: { type: 'Internship' } });
            // });
            setShowAlert(true);
          }
          else if (data.status === 401) {
            setLoading(false);
            // swal({
            //   title: "Wrong OTP",
            //   text: "Please enter correct OTP",
            //   icon: "info",
            //   timer: timer,
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

  const verifyStartUpSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email: email,
      otp: otp
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
    const url = `${BASE_URL}/api/startUp/login/otp/verify`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem('localStorageStartUpId', data.startUpDetails._id);
            setStartUpDetails(data.startUpDetails);
            setLoading(false);
            // swal({
            //   title: "Sign Up successfull",
            //   text: "We are redirecting you to portal",
            //   icon: "success",
            //   timer: timer,
            // }).then(() => {
            //   navigate('../startUp/account');
            // });
            setShowAlert(true);
          }
          else if (data.status === 401) {
            setLoading(false);
            // swal({
            //   title: "Wrong OTP",
            //   text: "Please enter correct OTP",
            //   icon: "info",
            //   timer: timer,
            // });
            setShowAlert(true);
          }
          else {
            console.log(data)
          }
        })
    }
    catch (error) {
      console.log(error);
    }
  }

  const verifyStudentSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email: email,
      otp: otp
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
    const url = `${BASE_URL}/api/student/login/otp/verify`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem('localStorageStudentId', data.studentDetails._id);
            setStudentDetails(data.studentDetails);
            setLoading(false);
            // swal({
            //   title: "Sign in successfull",
            //   text: "We are redirecting you to portal",
            //   icon: "success",
            //   timer: timer,
            // }).then(() => {
            //   navigate('../student/internship', { state: { type: 'Internship' } });
            // });
            setShowAlert(true);
          }
          else if (data.status === 401) {
            setLoading(false);
            // swal({
            //   title: "Wrong OTP",
            //   text: "Please enter correct OTP",
            //   icon: "info",
            //   timer: timer,
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

  const verifyStudentSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email: email,
      otp: otp
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
    const url = `${BASE_URL}/api/student/login/otp/verify`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem('localStorageStudentId', data.studentDetails._id);
            setStudentDetails(data.studentDetails);
            setLoading(false);
            // swal({
            //   title: "Sign up successfull",
            //   text: "We are redirecting you to portal",
            //   icon: "success",
            //   timer: timer,
            // }).then(() => {
            //   navigate('../student/account');
            // });
            setShowAlert(true);
          }
          else if (data.status === 401) {
            setLoading(false);
            // swal({
            //   title: data.message,
            //   text: "Please enter correct details",
            //   icon: "info",
            //   timer: timer,
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

  const resendOTPLoginStudent = async () => {
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
      await fetch(url, requestOptions);
    }
    catch (error) {
      console.log(error)
    }
  }

  const resendOTPLoginStartUp = async (e) => {
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
      await fetch(url, requestOptions);
    }
    catch (error) {
      console.log(error)
    }
  }

  const resendOTPregisterStudent = async () => {
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
      await fetch(url, requestOptions);
    }
    catch (error) {
      console.log(error);
    }
  }

  const resendOTPregisterStartUp = async () => {
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
      await fetch(url, requestOptions);
    }
    catch (error) {
      console.log(error);
    }
  }


  const submitOTP = (e) => {
    if (user === "Student") {
      if (signInOrSignUp === "SignIn") {
        verifyStudentSignIn(e)
      }
      else {
        verifyStudentSignUp(e)
      }
    }
    else {
      if (signInOrSignUp === "SignIn") {
        verifyStartUpSignIn(e)
      }
      else {
        verifyStartUpSignUp(e)
      }
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 2, mt: 9 }}>
      <form onSubmit={submitOTP}>
        <Card>
          <CardHeader title={"Email Verification"} subheader="Please enter the 6-digit OTP that was sent to the email" />
          <CardContent>
            <TextField type="email" label={user === "Student" ? "IITD Email" : "Email"} variant="outlined" value={email} fullWidth required sx={{ mb: 2 }} InputProps={{ readOnly: true }} disabled={true} />
            <TextField type="text" label="OTP" variant="outlined" value={otp} onChange={(e) => setOtp(e.target.value)} fullWidth required />
          </CardContent>
          <CardActions sx={{ ml: 1 }}>
            <Button type="submit" variant="contained" sx={{ width: 120, height: 40 }}>
              {
                loading ? <CircularProgress sx={{ color: "white" }} size={25} /> : <Typography>Verify</Typography>
              }
            </Button>
          </CardActions>
          <CardActions sx={{ ml: 1, mb: 1 }}>
            <Typography>
              Didn't receive the OTP?{" "}
              {
                timeLeft === 0 ? <Typography color="primary" display="inline" sx={{ cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 }} onClick={resendOTP}>Resend</Typography> :
                  <Typography display="inline" color="primary">0:{timeLeft / 1000} Sec</Typography>
              }
            </Typography>
          </CardActions>
        </Card>
      </form>
    </Container>
  )
}