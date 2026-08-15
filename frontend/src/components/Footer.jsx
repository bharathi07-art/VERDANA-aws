import React, { useState } from "react";
import { Box, Typography, Stack, Grid, TextField, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {newSub} from "../api/subAPI.js";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      newSub(email);
      setSubscribed(true);
    }
  };

  return (
    <Box sx={{ bgcolor: "#2B2D26", color: "#FAF8F5", pt: 8, pb: 4, px: { xs: 3, md: 8 }, mt: 8, width: "100%" }}>
      <Grid container spacing={4} sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Brand Column */}
        <Grid  xs={12} md={4}>
          <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
            <Box component="img" src="/VERDANA.png" alt="Verdana Logo" sx={{ width: 36, height: 36, borderRadius: "50%" }} />
            <Typography variant="h5" fontWeight={900} fontFamily="Libertinus, serif" letterSpacing={1}>
              VERDANA
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: "#D1D5DB", mb: 2, lineHeight: 1.6 }}>
            Verdana is your premier independent source for rigorous, honest, clean beauty product reviews. We lab-test skincare, haircare, and cosmetic formulations for maximum safety and performance.
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#798262" }}>
            <VerifiedUserIcon fontSize="small" />
            <Typography variant="caption" fontWeight={700}>
              100% Independent Editorial Standard
            </Typography>
          </Stack>
        </Grid>

        {/* Quick Links */}
        <Grid  xs={6} sm={3} md={2}>
          <Typography variant="subtitle1" fontWeight={700} mb={2} sx={{ color: "#ffffff" }}>
            Explore
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" component={Link} to="/" sx={{ color: "#9CA3AF", textDecoration: "none", "&:hover": { color: "#798262" } }}>
              All Products
            </Typography>
            <Typography variant="body2" component={Link} to="/about" sx={{ color: "#9CA3AF", textDecoration: "none", "&:hover": { color: "#798262" } }}>
              Our Process
            </Typography>
            <Typography variant="body2" component={Link} to="/about" sx={{ color: "#9CA3AF", textDecoration: "none", "&:hover": { color: "#798262" } }}>
              Affiliate Disclosure
            </Typography>
            <Typography variant="body2" component={Link} to="/admin" sx={{ color: "#9CA3AF", textDecoration: "none", "&:hover": { color: "#798262" } }}>
              Admin Portal
            </Typography>
          </Stack>
        </Grid>

        {/* Categories Index */}
        <Grid  xs={6} sm={3} md={2}>
          <Typography variant="subtitle1" fontWeight={700} mb={2} sx={{ color: "#ffffff" }}>
            Categories
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" sx={{ color: "#9CA3AF" }}>Skin Care</Typography>
            <Typography variant="body2" sx={{ color: "#9CA3AF" }}>Hair Care</Typography>
            <Typography variant="body2" sx={{ color: "#9CA3AF" }}>Clean Makeup</Typography>
            <Typography variant="body2" sx={{ color: "#9CA3AF" }}>Nail Care</Typography>
            <Typography variant="body2" sx={{ color: "#9CA3AF" }}>Oral Hygiene</Typography>
          </Stack>
        </Grid>

        {/* Newsletter Column */}
        <Grid  xs={12} md={4}>
          <Typography variant="subtitle1" fontWeight={700} mb={2} sx={{ color: "#ffffff" }}>
            Stay Informed
          </Typography>
          <Typography variant="body2" sx={{ color: "#D1D5DB", mb: 2 }}>
            Get unbiased weekly product reviews and clean cosmetic ingredient breakdowns straight to your inbox.
          </Typography>
          {subscribed ? (
            <Alert severity="success" sx={{ bgcolor: "#798262", color: "white" }}>
              Thank you for subscribing to Verdana Clean Beauty digest!
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubscribe} sx={{ display: "flex", gap: 1 }}>
              <TextField
                placeholder="Enter your email address"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  bgcolor: "#33352C",
                  borderRadius: 1,
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#4A4D40" },
                    "&:hover fieldset": { borderColor: "#798262" }
                  }
                }}
              />
              <Button  type="submit" variant="contained" color="secondary" sx={{ textTransform: "none", fontWeight: 700 }}>
                Join
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Bottom Bar */}
      <Box sx={{ borderTop: "1px solid #3E4137", mt: 6, pt: 3, maxWidth: 1200, mx: "auto", display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", gap: 2 }}>
        <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
          © {new Date().getFullYear()} VERDANA Media & Beauty Reviews. All rights reserved.
        </Typography>
        <Typography variant="caption" sx={{ color: "#9CA3AF", textAlign: { xs: "center", sm: "right" } }}>
          Verdana is reader-supported. As an Amazon Associate, we earn from qualifying purchases.
        </Typography>
      </Box>
    </Box>
  );
}
