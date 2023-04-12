import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/responsiveAppBar';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from "@mui/material";

export default function Index({ mode, setMode, startUpDetails, studentDetails }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentDetails !== null) {
      navigate('../student/internship', { state: { type: 'Internship' } })
    }
    else if (startUpDetails !== null) {
      navigate('../startUp/internship', { state: { type: 'Internship' } })
    }
    else {
      setLoading(false);
    }
  }, [])

  return (
    <>
      <ResponsiveAppBar mode={mode} setMode={setMode} />
      <div style={{ overflowY: "auto", position: 'absolute', width: "100%", height: "100%" }}>
        {
          loading ? <Box sx={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box> :
            <Outlet />
        }
      </div>
    </>
  )
}