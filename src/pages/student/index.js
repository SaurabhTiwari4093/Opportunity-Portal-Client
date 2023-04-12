import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../../components/student/responsiveAppBar';
import { Box, CircularProgress } from "@mui/material";

export default function Index({ mode, setMode, studentDetails,setStudentDetails }) {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentDetails === null) {
      navigate('/')
    }
    else {
      setStudentName(studentDetails.name)
      setLoading(false);
    }
  }, [])

  return (
    <>
      <ResponsiveAppBar studentName={studentName} mode={mode} setMode={setMode} setStudentDetails={setStudentDetails}/>
      <div style={{ overflowY: "auto", position: 'absolute', width: "100%", height: "100%" }}>
        {
          loading ? <Box sx={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box> :
            <Outlet />
        }
      </div>
    </>
  )
}
