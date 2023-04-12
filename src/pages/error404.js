import { Button, Container, Typography, Card, CardHeader, CardActions } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Card>
        <CardHeader title={<Typography variant="h4" color="error.light">Error 404</Typography>} subheader="Page not found" />
        <CardActions sx={{ ml: 1, mb: 1 }}>
          <Button variant="contained" onClick={() => { navigate('/') }}><Typography>Home</Typography></Button>
        </CardActions>
      </Card>
    </Container>
  )
}
