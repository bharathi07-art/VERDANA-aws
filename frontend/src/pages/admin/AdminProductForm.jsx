import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  Tabs,
  Tab,
  Rating,
  Chip
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import {addProduct,updateProduct,getProductById} from '../../api/productApi.js'

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [activeTab, setActiveTab] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");


  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "Skin Care",
    subCategory: "Cleanser",
    price: 25.00,
    Ratings: 5.0,
    image: "/cos1.jpg",
    discription: "",
    amazonAffiliateUrl: "https://www.amazon.in/dp/B0EXAMPLE?tag=verdana-21",
    prosText: "Cruelty-free formula, Lightweight texture, 10-hour stay",
    consText: "Limited shade range",
    bestForText: "Sensitive Skin, Daily Wear",
    ingredients: "Aqua, Niacinamide, Squalane, Hyaluronic Acid, Vitamin E."
  });

  useEffect(() => {
    if (isEdit) {
      const existing = getProductById(id);
      if (existing) {
        setFormData({
          ...existing,
          price: existing.price || 25.00,
          prosText: existing.pros ? existing.pros.join(", ") : "",
          consText: existing.cons ? existing.cons.join(", ") : "",
          bestForText: existing.bestFor ? existing.bestFor.join(", ") : ""
        });
      }
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const pros = formData.prosText.split(",").map((s) => s.trim()).filter(Boolean);
    const cons = formData.consText.split(",").map((s) => s.trim()).filter(Boolean);
    const bestFor = formData.bestForText.split(",").map((s) => s.trim()).filter(Boolean);

    const productPayload = {
      ...formData,
      price: Number(formData.price),
      Ratings: Number(formData.Ratings),
      pros,
      cons,
      bestFor
    };
  
   try{
     if (isEdit) {
      updateProduct(id, productPayload);
      setSuccessMsg("Product updated successfully!");
    } else {
      await addProduct(productPayload);
      setSuccessMsg("New product created and published to live catalog!");
      navigate("/admin/productList");
    }
    
   }catch(err){
    setSuccessMsg("")
    alert(err.message);
    
   }
  }

  return (
    <Box maxWidth={1000} mx="auto">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} sx={{display:"flex",flexDirection:"column" ,justifyContent:"center", mb:3}}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/admin/productList")} color="inherit">
          Back to Products List 
        </Button>
        <Typography variant="h4" fontWeight={900} fontFamily="Libertinus, serif" color="primary">
          {isEdit ? "Edit Beauty Product" : "Add New Cosmetic Product"}
        </Typography>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, val) => setActiveTab(val)}>
          <Tab label="Edit Details" fontWeight={700} />
          <Tab label="Live Product Preview" fontWeight={700} />
        </Tabs>
      </Box>

      {successMsg && <Alert severity="success" sx={{ mb: 3 }}>{successMsg}</Alert>}

      {/* Tab 0: Form Editor */}
      {activeTab === 0 && (
        <Paper elevation={0} sx={{ p: 4, bgcolor: "white", borderRadius: 3, border: "1px solid #E5E7EB" }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Product Name"
                  name="name"
                  required
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Brand Name"
                  name="brand"
                  fullWidth
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. FACES CANADA"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select name="category" value={formData.category} label="Category" onChange={handleChange}>
                    <MenuItem value="Skin Care">Skin Care</MenuItem>
                    <MenuItem value="Hair Care">Hair Care</MenuItem>
                    <MenuItem value="Makeup">Makeup</MenuItem>
                    <MenuItem value="Nail and cuticle products">Nail and Cuticle</MenuItem>
                    <MenuItem value=" Oral hygiene products">Oral Hygiene</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Sub-Category"
                  name="subCategory"
                  fullWidth
                  value={formData.subCategory}
                  onChange={handleChange}
                  placeholder="e.g. Serum, Cleanser, Lipstick"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Price ($)"
                  name="price"
                  type="number"
                  required
                  fullWidth
                  value={formData.price}
                  onChange={handleChange}
                  inputProps={{ step: "0.01" }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Rating (1.0 to 5.0)"
                  name="Ratings"
                  type="number"
                  required
                  fullWidth
                  value={formData.Ratings}
                  onChange={handleChange}
                  inputProps={{ step: "0.1", min: "1", max: "5" }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Image URL"
                  name="image"
                  required
                  fullWidth
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/cos1.jpg"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Amazon Affiliate URL"
                  name="amazonAffiliateUrl"
                  required
                  fullWidth
                  value={formData.amazonAffiliateUrl}
                  onChange={handleChange}
                  placeholder="https://www.amazon.in/dp/...tag=yourstore-21"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Detailed Product Description"
                  name="discription"
                  required
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.discription}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Pros (comma separated)"
                  name="prosText"
                  fullWidth
                  value={formData.prosText}
                  onChange={handleChange}
                  placeholder="Lightweight stay, Hydrating botanical extract, Cruelty-free"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Cons (comma separated)"
                  name="consText"
                  fullWidth
                  value={formData.consText}
                  onChange={handleChange}
                  placeholder="Limited shade range, Earthy fragrance"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Best For Tags (comma separated)"
                  name="bestForText"
                  fullWidth
                  value={formData.bestForText}
                  onChange={handleChange}
                  placeholder="Dry Skin, Sensitive Skin, Anti-Aging"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Ingredients Breakdown"
                  name="ingredients"
                  multiline
                  rows={2}
                  fullWidth
                  value={formData.ingredients}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
              <Button onClick={() => navigate("/admin/products")} color="inherit">
                Cancel
              </Button>
              <Button type="submit"  variant="contained" color="secondary" startIcon={<SaveIcon />} size="large">
                Save & Publish
              </Button>
            </Stack>
          </Box>
        </Paper>
      )}

      {/* Tab 1: Live Preview */}
      {activeTab === 1 && (
        <Paper elevation={0} sx={{ p: 4, bgcolor: "#FAF8F5", borderRadius: 3, border: "1px solid #E5E7EB" }}>
          <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" mb={2}>
            PREVIEW MODE:
          </Typography>

          <Grid container spacing={4} sx={{ bgcolor: "white", p: 4, borderRadius: 3, border: "1px solid #E5E7EB" }}>
            <Grid item xs={12} md={5}>
              <Box component="img" src={formData.image || "/cos1.jpg"} alt={formData.name} sx={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 2 }} />
            </Grid>

            <Grid item xs={12} md={7}>
              <Chip label={formData.category} color="secondary" size="small" sx={{ mb: 1 }} />
              <Typography variant="h4" fontWeight={900} fontFamily="Libertinus, serif" color="primary" mb={1}>
                {formData.name || "Product Name Placeholder"}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Rating value={Number(formData.Ratings) || 5} precision={0.1} readOnly size="small" />
                <Typography variant="body2" fontWeight={700}>{formData.Ratings} / 5.0</Typography>
              </Stack>
              <Typography variant="body1" paragraph>{formData.discription || "Description preview..."}</Typography>
              <Typography variant="h5" fontWeight={900} color="primary.main" mb={2}>${Number(formData.price).toFixed(2)}</Typography>
              <Button variant="contained" color="secondary" endIcon={<OpenInNewIcon />}>Check Price on Amazon</Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
}

