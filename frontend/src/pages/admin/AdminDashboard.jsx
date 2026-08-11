import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StarIcon from "@mui/icons-material/Star";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";


export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  

  const totalProducts = products.length;
  const affiliateLinksCount = products.filter((p) => Boolean(p.amazonAffiliateUrl)).length;
  const avgRating = totalProducts
    ? (products.reduce((acc, p) => acc + p.Ratings, 0) / totalProducts).toFixed(1)
    : 5.0;

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const stats = [
    { title: "Total Products", value: totalProducts, icon: <Inventory2Icon color="primary" fontSize="large" />, bg: "#F4F7F2" },
    { title: "Active Affiliate Links", value: affiliateLinksCount, icon: <ShoppingBagIcon color="secondary" fontSize="large" />, bg: "#FBF5EB" },
    { title: "Average Score", value: `${avgRating} ★`, icon: <StarIcon sx={{ color: "#C5A059" }} fontSize="large" />, bg: "#FAF8F5" },
    { title: "Active Categories", value: categories.length, icon: <CategoryIcon color="primary" fontSize="large" />, bg: "#F4F7F2" }
  ];

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} mb={4} gap={2} sx={{mb:4,gap:2}}>
        <Box>
          <Typography variant="h4" fontWeight={900} fontFamily="Libertinus, serif" color="primary">
            Admin Overview & Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage cosmetic catalog, affiliate links, and reader review metrics.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/" target="_blank" variant="outlined" color="primary" endIcon={<OpenInNewIcon />}>
            View Live Site
          </Button>
          <Button component={Link} to="/admin/addProduct" variant="contained" color="secondary" startIcon={<AddIcon />}>
            Add New Product
          </Button>
        </Stack>
      </Stack>

      {/* Metrics Cards */}
      <Grid container spacing={3} mb={4}>
        {stats.map((st, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={3} sx={{mb:3}}>
            <Paper elevation={0} sx={{ p: 3, bgcolor: st.bg, borderRadius: 3, border: "1px solid #E5E7EB" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" mb={0.5}>
                    {st.title.toUpperCase()}
                  </Typography>
                  <Typography variant="h4" fontWeight={900} color="primary">
                    {st.value}
                  </Typography>
                </Box>
                {st.icon}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity Data Table */}
      <Paper elevation={0} sx={{ p: 3, bgcolor: "white", borderRadius: 3, border: "1px solid #E5E7EB" }}>
        <Typography variant="h6" fontWeight={800} mb={2}>
          Recent Catalog Additions
        </Typography>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "#FAF8F5" }}>
              <TableRow>
                <TableCell fontWeight={700}>Product</TableCell>
                <TableCell fontWeight={700}>Category</TableCell>
                <TableCell fontWeight={700}>Rating</TableCell>
                <TableCell fontWeight={700}>Price</TableCell>
                <TableCell fontWeight={700}>Amazon Link</TableCell>
                <TableCell fontWeight={700} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(0, 5).map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box component="img" src={p.image} alt={p.name} sx={{ width: 40, height: 40, borderRadius: 1, objectFit: "cover" }} />
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>{p.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{p.brand || "Verdana"}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip label={p.category} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700}>{p.Ratings} ★</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700}>${p.price?.toFixed(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    {p.amazonAffiliateUrl ? (
                      <Chip label="Configured" color="success" size="small" />
                    ) : (
                      <Chip label="Missing" color="warning" size="small" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Button component={Link} to={`/admin/products/edit/${p.id}`} size="small" color="primary">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
