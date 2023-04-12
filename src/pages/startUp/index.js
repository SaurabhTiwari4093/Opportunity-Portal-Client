import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../../components/startUp/responsiveAppBar';
import { Box, CircularProgress } from "@mui/material";

export default function Index({ mode, setMode, startUpDetails, setStartUpDetails }) {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (startUpDetails === null) {
      navigate('/');
    }
    else {
      setCompanyName(startUpDetails.companyName)
      setLoading(false);
    }
  }, [])

  return (
    <>
      <ResponsiveAppBar companyName={companyName} mode={mode} setMode={setMode} setStartUpDetails={setStartUpDetails}/>
      <div style={{ overflowY: "auto", position: 'absolute', width: "100%", height: "100%" }}>
        {
          loading ? <Box sx={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box> :
            <Outlet />
        }
      </div>
    </>
  )
}
