import React from "react";
import { Box, Typography, Container, Grid, Paper, Stack, Divider, Chip } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ScienceIcon from "@mui/icons-material/Science";
import SecurityIcon from "@mui/icons-material/Security";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Footer from "../components/Footer";

export default function About() {
  const pillars = [
    {
      icon: <ScienceIcon sx={{ fontSize: 36, color: "#798262" }} />,
      title: "Rigorously Tested",
      desc: "Every product featured on Verdana undergoes thorough ingredient screening and real-world multi-week testing across different skin types."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 36, color: "#798262" }} />,
      title: "100% Unbiased Integrity",
      desc: "We never accept paid reviews or sponsored ratings. Brands cannot purchase placement or alter our editorial conclusions."
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 36, color: "#798262" }} />,
      title: "Clean Ingredient Standards",
      desc: "We evaluate cosmetics against strict international safety standards, red-flagging harsh sulfates, parabens, phthalates, and microplastics."
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 36, color: "#798262" }} />,
      title: "Cruelty-Free Focus",
      desc: "We prioritize cruelty-free, ethically sourced, and eco-friendly cosmetic formulations that treat your skin and the planet with care."
    }
  ];

  return (
    <Box sx={{ bgcolor: "#FAF8F5", minHeight: "100vh", pt: 6 }}>
      <Container maxWidth="lg">
        {/* Header Hero */}
        <Box textAlign="center" mb={8}>
          <Chip label="EDITORIAL TRANSPARENCY" color="secondary" sx={{ fontWeight: 700, mb: 2 }} />
          <Typography variant="h2" fontWeight={900} fontFamily="Libertinus, serif" color="primary" mb={2}>
            Our Testing Methodology & Standard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: "auto", fontSize: "1.15rem", lineHeight: 1.7 }}>
            At VERDANA, we believe that cosmetics and skincare should be effective, clean, and transparently reviewed. Here is how we evaluate every beauty item on our site.
          </Typography>
        </Box>

        {/* Pillars Grid */}
        <Grid container spacing={4} mb={8}>
          {pillars.map((p, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={3}>
              <Paper elevation={0} sx={{ p: 4, height: "100%", bgcolor: "white", borderRadius: 3, border: "1px solid #E5E7EB", textCenter: "center" }}>
                <Box mb={2}>{p.icon}</Box>
                <Typography variant="h6" fontWeight={800} mb={1}>
                  {p.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {p.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Detailed Explanation */}
        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, bgcolor: "white", borderRadius: 4, border: "1px solid #E5E7EB", mb: 8 }}>
          <Typography variant="h4" fontWeight={900} fontFamily="Libertinus, serif" color="primary" mb={3}>
            How Verdana Reviews Cosmetic Products
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" fontWeight={800} color="secondary.main" mb={0.5}>
                1. Ingredient Safety & Screening
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Before testing begins, our team analyzes the ingredient list (INCI) for potential sensitizers, fragrance allergens, comedogenic pore-cloggers, or harmful preservatives.
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" fontWeight={800} color="secondary.main" mb={0.5}>
                2. Multi-Week Performance Evaluation
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Formulations are tested over 14 to 30 days. We assess texture, absorption rate, scent profile, packaging functionality, and long-term hydration/skin improvements.
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" fontWeight={800} color="secondary.main" mb={0.5}>
                3. Affiliate Commission Transparency
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Verdana participates in the Amazon Services LLC Associates Program. When you click our Amazon links and complete a purchase, we earn a small affiliate commission at zero additional cost to you. This funds our lab testing and independent editorial work.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}
