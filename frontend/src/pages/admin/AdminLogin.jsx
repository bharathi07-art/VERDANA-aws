import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Alert, Stack } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useNavigate} from 'react-router-dom';
import {loginAdmin} from '../../api/authAPI.js';



export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoding(true);

    try{
      const {token} = await loginAdmin(username, password);
      localStorage.setItem("verdana_admin_token", token);
      navigate("/admin/Dashboard")
    }catch(err){
      setError(err.message);
    }finally{
      setLoding(false);
    }
   
  };

  const handleDemoBypass = () => {
    localStorage.setItem("verdana_admin_auth", "true");
    if (onLogin) onLogin();
  };

  return (
    <Box
      sx={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#FAF8F5",
        p: 2
      }}
    >
      <Paper elevation={0} sx={{ p: 4, maxWidth: 420, width: "100%", bgcolor: "white", borderRadius: 4, border: "1px solid #E5E7EB" }}>
        <Stack alignItems="center" spacing={1} mb={3}>
          <Box sx={{ p: 1.5, bgcolor: "#FAF8F5", borderRadius: "50%", color: "primary.main" }}>
            <LockOutlinedIcon fontSize="large" />
          </Box>
          <Typography variant="h5" fontWeight={900} fontFamily="Libertinus, serif" color="primary">
            Verdana Admin Login
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Authorized portal to manage cosmetic products & affiliate links
          </Typography>
        </Stack>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Username"
              required
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
            />
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ py: 1.5, fontWeight: 700 }}>
              Sign In
            </Button>
            <Button variant="outlined" color="secondary" fullWidth onClick={handleDemoBypass} sx={{ textTransform: "none" }}>
              Quick Demo Access (Skip Login)
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
