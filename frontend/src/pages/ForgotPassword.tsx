import { Box, Typography, Container, Alert } from '@mui/material';

export default function ForgotPassword() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <Alert severity="info" sx={{ width: '100%', mb: 2 }}>
          Please contact your administrator to reset your password.
        </Alert>
      </Box>
    </Container>
  );
}
