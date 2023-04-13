import { Container, Typography, Card, CardContent, TextField, Grid, Button, CircularProgress, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Account({ BASE_URL, studentDetails, setStudentDetails,setShowAlert={setShowAlert} }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const name = studentDetails.name;
  const email = studentDetails.email;
  const [course, setCourse] = useState(studentDetails.course);
  const [department, setDepartment] = useState(studentDetails.department);
  const [year, setYear] = useState(studentDetails.year);
  const [cgpa, setCgpa] = useState(studentDetails.cgpa);
  const [resumeLink, setResumeLink] = useState(studentDetails.resumeLink);
  const [linkedIn, setLinkedIn] = useState(studentDetails.linkedIn);
  const updateOrSave = (studentDetails.resumeLink === "" || studentDetails.resumeLink === undefined) ? "Save" : "Update";

  const updateStudentAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowAlert(false);
    const formData = {
      course: course,
      department: department,
      year: year,
      cgpa: cgpa,
      resumeLink: resumeLink,
      linkedIn: linkedIn
    }
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
    const url = `${BASE_URL}/api/student/register/${studentDetails._id}`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setStudentDetails(data.studentDetails);
            setLoading(false);
            // swal({
            //   title: `Account details ${updateOrSave+"d"} successfull`,
            //   text: "We are redirecting you to portal",
            //   icon: "success",
            //   timer: timer
            // }).then(() => {
            //   navigate('../internship', { state: { type: 'Internship' } });
            // });
            console.log("trying to set show alert to true")
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
    <Container sx={{ py: 2, mt: 9 }}>
      <Typography variant="h5">Account Details</Typography>
      <form onSubmit={updateStudentAccount}>
        <Card sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>Basic Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField variant="standard" label="Name" fullWidth value={name} InputProps={{ disableUnderline: true, readOnly: true }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField variant="standard" label="Email" fullWidth value={email} InputProps={{ disableUnderline: true, readOnly: true }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>More Info</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField variant="standard"
                  fullWidth
                  required
                  select
                  label="Course"
                  value={course}
                  onChange={(e) => { setCourse(e.target.value) }}
                >
                  <MenuItem value={"BTech"}>BTech</MenuItem>
                  <MenuItem value={"MTech"}>MTech</MenuItem>
                  <MenuItem value={"PhD"}>PhD</MenuItem>
                  <MenuItem value={"MBA"}>MBA</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField variant="standard"
                  fullWidth
                  required
                  select
                  label="Year"
                  value={year}
                  onChange={(e) => { setYear(e.target.value) }}
                >
                  <MenuItem value={"1st"}>1st</MenuItem>
                  <MenuItem value={"2nd"}>2nd</MenuItem>
                  <MenuItem value={"3rd"}>3rd</MenuItem>
                  <MenuItem value={"4th"}>4th</MenuItem>
                  <MenuItem value={"5th"}>5th</MenuItem>
                  <MenuItem value={"6th"}>6th</MenuItem>
                  <MenuItem value={"6th+"}>6th+</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField variant="standard"
                  fullWidth
                  required
                  select
                  label="Deparment"
                  value={department}
                  onChange={(e) => { setDepartment(e.target.value) }}
                >
                  <MenuItem value={"Applied Mechanics"}>Applied Mechanics</MenuItem>
                  <MenuItem value={"Biochemical Engineering and Biotechnology"}>Biochemical Engineering and Biotechnology</MenuItem>
                  <MenuItem value={"Chemical Engineering"}>Chemical Engineering</MenuItem>
                  <MenuItem value={"Chemistry"}>Chemistry</MenuItem>
                  <MenuItem value={"Civil Engineering"}>Civil Engineering</MenuItem>
                  <MenuItem value={"Computer Science and Engineering"}>Computer Science and Engineering</MenuItem>
                  <MenuItem value={"Design"}>Design</MenuItem>
                  <MenuItem value={"Electrical Engineering"}>Electrical Engineering</MenuItem>
                  <MenuItem value={"Energy Science and Engineering"}>Energy Science and Engineering</MenuItem>
                  <MenuItem value={"Humanities and Social Sciences"}>Humanities and Social Sciences</MenuItem>
                  <MenuItem value={"Management Studies"}>Management Studies</MenuItem>
                  <MenuItem value={"Materials Science and Engineering"}>Materials Science and Engineering</MenuItem>
                  <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
                  <MenuItem value={"Mechanical Engineering"}>Mechanical Engineering</MenuItem>
                  <MenuItem value={"Physics"}>Physics</MenuItem>
                  <MenuItem value={"Textile and Fibre Engineering"}>Textile and Fibre Engineering</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField variant="standard"
                  fullWidth
                  required
                  select
                  label="CGPA"
                  value={cgpa}
                  onChange={(e) => { setCgpa(e.target.value) }}
                >
                  <MenuItem value={"4.0+"}>4.0+</MenuItem>
                  <MenuItem value={"4.5+"}>5.0+</MenuItem>
                  <MenuItem value={"5.0+"}>5.0+</MenuItem>
                  <MenuItem value={"5.5+"}>5.5+</MenuItem>
                  <MenuItem value={"6.0+"}>6.0+</MenuItem>
                  <MenuItem value={"6.5+"}>6.5+</MenuItem>
                  <MenuItem value={"7.0+"}>7.0+</MenuItem>
                  <MenuItem value={"7.5+"}>7.5+</MenuItem>
                  <MenuItem value={"8.0+"}>8.0+</MenuItem>
                  <MenuItem value={"8.5+"}>8.5+</MenuItem>
                  <MenuItem value={"9.0+"}>9.0+</MenuItem>
                  <MenuItem value={"9.5+"}>9.5+</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField variant="standard" label="LinkedIn" placeholder='https://www.linkedin.com/in/xyz/' fullWidth value={linkedIn} onChange={(e) => { setLinkedIn(e.target.value) }} />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="standard" label="Link to resume" placeholder='Provide public access to link' fullWidth value={resumeLink} onChange={(e) => { setResumeLink(e.target.value) }} required />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>{updateOrSave} Account</Typography>
            <Button variant="contained" type="submit" sx={{ width: 120, height: 40 }}>
              {
                loading ? <CircularProgress sx={{ color: "white" }} size={25} /> : <Typography>{updateOrSave}</Typography>
              }
            </Button>
          </CardContent>
        </Card>
      </form>
    </Container >
  )
}
