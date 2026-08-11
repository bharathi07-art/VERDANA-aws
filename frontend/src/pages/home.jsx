import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "@fontsource/roboto/700.css";
import {
  Box,
  Typography,
  Button,
  Stack,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  TextField,
  InputAdornment,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Grid,
  CardActionArea,
  IconButton,
  Chip,
  Paper,
  Slider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Tooltip,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchIcon from "@mui/icons-material/Search";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import VerifiedIcon from "@mui/icons-material/Verified";
import QuickViewModal from "../components/QuickViewModal";
import Footer from "../components/Footer";

import {fetchProducts,getProductById} from "../api/productApi.js";

export default function Home() {
  // Hero Carousel State
  const homeImgs = [
    {
      path: "/cos1.jpg",
      title: "Luminous Botanical Skincare",
      sub: "Rigorously tested clean formulas for maximum radiance",
    },
    {
      path: "/cos2.jpg",
      title: "French Green Clay Detox",
      sub: "Pore purifying essentials backed by dermatologist testing",
    },
    {
      path: "/cos3.jpg",
      title: "Triple-Weight Hyaluronic Moisture",
      sub: "Deep sub-dermal hydration without sticky residue",
    },
    {
      path: "/cos4.jpg",
      title: "Organic Cold-Pressed Hair Care",
      sub: "Seals hair cuticles & protects against heat damage",
    },
  ];
  const [currentImg, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % homeImgs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [homeImgs.length]);

  // Products Data & Filtering State
  const [products, setProducts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [sortBy, setSortBy] = useState("rating");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [quickViewProduct, setQuickViewProduct] = useState(null);


  const handleToggleBookmark = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarks((prev)=>
      prev.includes(id) ? prev.filter((bId)=>bId !== id) : [...prev, id]
    )
  };

  const categories = [
    {
      name: "Skin Care",
      subCategories: [
        "Cleanser",
        "Moisturizer",
        "Serum",
        "Sunscreen",
        "Perfumes",
      ],
    },
    {
      name: "Hair Care",
      subCategories: ["Shampoo", "Conditioner", "Hair Oil", "Hair Mask"],
    },
    {
      name: "Makeup",
      subCategories: ["Foundation", "Lipstick", "Mascara", "Blush"],
    },
    {
      name: "Nail and cuticle products",
      subCategories: [
        "Nail care / nail hardener products",
        "Nail varnish and remover products",
        "Other nail and cuticle products",
      ],
    },
    {
      name: " Oral hygiene products",
      subCategories: [
        "Tooth care products",
        " Mouth wash / breath spray",
        "Tooth whiteners",
      ],
    },
  ];

  // Filter Logic
  const filteredProducts = products
    .filter((item) => {
      // Category match
      if (selectedCategory !== null) {
        const catName = categories[selectedCategory].name.trim().toLowerCase();
        if (item.category.trim().toLowerCase() !== catName) return false;
      }
      // Subcategory match
      if (selectedSubCategory) {
        if (
          item.subCategory?.trim().toLowerCase() !==
          selectedSubCategory.trim().toLowerCase()
        )
          return false;
      }
      // Search match
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchDesc = item.discription.toLowerCase().includes(q);
        const matchBrand =
          item.brand ? item.brand.toLowerCase().includes(q) : false;
        if (!matchName && !matchCategory && !matchDesc && !matchBrand)
          return false;
      }
      // Rating match
      if (item.Ratings < minRating) return false;
      // Price match
      if (item.price && item.price > maxPrice) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.Ratings - a.Ratings;
      if (sortBy === "reviews")
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
      return 0;
    });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSearch("");
    setMinRating(0);
    setMaxPrice(50);
    setSortBy("rating");
  };

  // Scroll logic for Testimonials
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  },[]);

  const testimonials = [
    {
      name: "Priya S.",
      title: "Skincare Enthusiast",
      rating: 5,
      dis: "The French Green Clay Mask review saved my skin. Exact ingredient breakdowns with zero bias!",
    },
    {
      name: "Anjali R.",
      title: "Verified Buyer",
      rating: 5,
      dis: "Honest reviews with direct Amazon links. Bought 3 products based on their clean beauty rating.",
    },
    {
      name: "Meera K.",
      title: "First-time Visitor",
      rating: 5,
      dis: "Loved how detailed the pros and cons section was for every single lipstick shade.",
    },
    {
      name: "Divya T.",
      title: "Regular Reader",
      rating: 4.5,
      dis: "The mineral sunscreen recommendation has zero white cast. Exactly as reviewed!",
    },
    {
      name: "Kavya N.",
      title: "Clean Beauty Blogger",
      rating: 5,
      dis: "Verdana is my go-to prior to making cosmetic purchases. Exceptional research!",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#FAF8F5", width: "100%", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: 500, md: 620 },
          bgcolor: "#FAF8F5",
          display: "flex",
          alignItems: "center",
          px: { xs: 2, md: 8 },
          py: 4,
        }}
      >
        <Grid
          container
          spacing={4}
          alignItems="center"
          sx={{ maxWidth: 1400, mx: "auto" }}
        >
          {/* Hero Left Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              icon={
                <VerifiedIcon
                  sx={{ fontSize: "16px !important", color: "#798262" }}
                />
              }
              label="Independent Clean Cosmetic Testing"
              variant="outlined"
              color="secondary"
              sx={{ mb: 2, fontWeight: 700, bgcolor: "#FFFFFF" }}
            />
            <Typography
              variant="h2"
              fontWeight={900}
              fontFamily="Libertinus, serif"
              color="primary"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.75rem" },
                lineHeight: 1.15,
                mb: 2,
              }}
            >
              Honest beauty reviews before you buy.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.1rem", mb: 4, lineHeight: 1.7, maxWidth: 540 }}
            >
              Discover the truth behind top skincare, cosmetics, and beauty
              formulations. We independently test clean beauty essentials for
              ingredient safety, performance, and long-term efficacy.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4}>
              <Button
                component="a"
                href="#products"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Browse Product Reviews
              </Button>
              <Button
                component={Link}
                to="/about"
                variant="outlined"
                color="primary"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Our Testing Methodology
              </Button>
            </Stack>

            {/* Affiliate Disclosure Badge */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mt: 2,
              }}
            >
              <NotificationsActiveIcon sx={{ color: "secondary.main" }} />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ lineHeight: 1.4 }}
              >
                <strong>Reader Supported:</strong> Verdana earns an affiliate
                commission on qualifying purchases made through Amazon links on
                our site, at no extra cost to you.
              </Typography>
            </Paper>
          </Grid>

          {/* Hero Right Banner Carousel */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 320, md: 440 },
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              }}
            >
              <Box
                component="img"
                src={homeImgs[currentImg].path}
                alt={homeImgs[currentImg].title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "all 0.8s ease-in-out",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  p: 4,
                  color: "white",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={800}
                  fontFamily="Libertinus, serif"
                  mb={0.5}
                >
                  {homeImgs[currentImg].title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {homeImgs[currentImg].sub}
                </Typography>

                {/* Carousel Indicators */}
                <Stack direction="row" spacing={1} mt={2}>
                  {homeImgs.map((_, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      sx={{
                        width: idx === currentImg ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        bgcolor:
                          idx === currentImg ? "#798262" : (
                            "rgba(255,255,255,0.5)"
                          ),
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Main Catalog & Filter Section */}
      <Box id="products" sx={{ width: "100%", px: { xs: 2, md: 8 }, py: 6 }}>
        <Box sx={{ maxWidth: 1400, mx: "auto" }}>
          {/* Header */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "flex-end" }}
            mb={4}
            gap={2}
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight={900}
                fontFamily="Libertinus, serif"
                color="primary"
              >
                Explore Clean Beauty Reviews
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredProducts.length} verified products
                independently scored for purity & performance.
              </Typography>
            </Box>

            {/* Sorting control */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              flexWrap="wrap"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              <FormControl
                size="small"
                sx={{ minWidth: 180, bgcolor: "white" }}
              >
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="reviews">Most Reviewed</MenuItem>
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                </Select>
              </FormControl>

              {(selectedCategory !== null ||
                selectedSubCategory ||
                search ||
                minRating > 0) && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={clearFilters}
                  startIcon={<ClearIcon />}
                  sx={{ height: 40 }} // matches Select's small size height
                >
                  Clear Filters
                </Button>
              )}
            </Stack>
          </Stack>

          {/* Search Bar */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 4,
              bgcolor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              placeholder="Search by product name, ingredient, brand, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearch("")}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Paper>

          {/* Sidebar Filters + Products Grid */}
          <Grid container spacing={4}>
            {/* Sidebar Filters */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: 3,
                  sticky: "top",
                  top: 100,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <FilterListIcon color="primary" />
                  <Typography variant="h6" fontWeight={700}>
                    Categories
                  </Typography>
                </Stack>

                <List disablePadding>
                  <ListItemButton
                    selected={
                      selectedCategory === null && selectedSubCategory === null
                    }
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedSubCategory(null);
                    }}
                    sx={{ borderRadius: 1, mb: 0.5 }}
                  >
                    <ListItemText
                      primary="All Categories"
                      primaryTypographyProps={{
                        fontWeight: selectedCategory === null ? 700 : 500,
                      }}
                    />
                  </ListItemButton>

                  {categories.map((category, index) => {
                    const isOpen = selectedCategory === index;
                    return (
                      <div key={index}>
                        <ListItemButton
                          selected={
                            selectedCategory === index &&
                            selectedSubCategory === null
                          }
                          onClick={() => {
                            if (selectedCategory === index) {
                              setSelectedCategory(null);
                              setSelectedSubCategory(null);
                            } else {
                              setSelectedCategory(index);
                              setSelectedSubCategory(null);
                            }
                          }}
                          sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                          <ListItemText
                            primary={category.name}
                            primaryTypographyProps={{
                              fontWeight:
                                selectedCategory === index ? 700 : 500,
                            }}
                          />
                          {isOpen ?
                            <ExpandLessIcon fontSize="small" />
                          : <ExpandMoreIcon fontSize="small" />}
                        </ListItemButton>

                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding sx={{ pl: 2 }}>
                            {category.subCategories.map((sub, i) => (
                              <ListItemButton
                                key={i}
                                selected={selectedSubCategory === sub}
                                onClick={() =>
                                  setSelectedSubCategory(
                                    selectedSubCategory === sub ? null : sub,
                                  )
                                }
                                sx={{ py: 0.5, borderRadius: 1, mb: 0.5 }}
                              >
                                <ListItemText
                                  primary={sub}
                                  primaryTypographyProps={{
                                    fontSize: "0.85rem",
                                    color:
                                      selectedSubCategory === sub ?
                                        "primary.main"
                                      : "text.secondary",
                                  }}
                                />
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      </div>
                    );
                  })}
                </List>

                {/* Rating Filter */}
                <Box mt={4}>
                  <Typography variant="subtitle2" fontWeight={700} mb={1}>
                    Minimum Rating
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {[0, 4.0, 4.5, 4.8].map((r) => (
                      <Chip
                        key={r}
                        label={r === 0 ? "All" : `${r}★+`}
                        clickable
                        color={minRating === r ? "secondary" : "default"}
                        onClick={() => setMinRating(r)}
                        size="small"
                      />
                    ))}
                  </Stack>
                </Box>

                {/* Price Slider */}
                <Box mt={4}>
                  <Typography variant="subtitle2" fontWeight={700} mb={1}>
                    Max Price (${maxPrice})
                  </Typography>
                  <Slider
                    value={maxPrice}
                    onChange={(_, val) => setMaxPrice(val)}
                    min={10}
                    max={60}
                    step={5}
                    valueLabelDisplay="auto"
                    color="secondary"
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Products Grid */}
            <Grid size={{ xs: 12, md: 9 }}>
              {filteredProducts.length === 0 ?
                <Paper
                  elevation={0}
                  sx={{
                    p: 8,
                    textAlign: "center",
                    bgcolor: "white",
                    borderRadius: 3,
                    border: "1px dashed #D1D5DB",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    align="center"
                    mb={1}
                  >
                    No beauty products match your filters.
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    mb={3}
                  >
                    Try clearing search query or category filters to view more
                    items.
                  </Typography>
                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={clearFilters}
                    >
                      Reset All Filters
                    </Button>
                  </Box>
                </Paper>
              : <Grid container spacing={3}>
                  {filteredProducts.map((item) => {
                    const isBookmarked = bookmarks.includes(item.id);
                    return (
                      <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                        <Card
                          elevation={0}
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            bgcolor: "white",
                            border: "1px solid #E5E7EB",
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            position: "relative",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                              borderColor: "#798262",
                            },
                          }}
                        >
                          {/* Card Media Header */}
                          <Box sx={{ position: "relative" }}>
                            <CardActionArea
                              component={Link}
                              to={`/product/${item.id}`}
                              onClick={getProductById(`${item.id}`)}
                            >
                              <CardMedia
                                component="img"
                                height="220"
                                image={item.image}
                                alt={item.name}
                                sx={{ objectFit: "cover" }}
                              />
                            </CardActionArea>

                            {/* Bookmark Button */}
                            <Tooltip
                              title={
                                isBookmarked ? "Remove from saved" : (
                                  "Save product"
                                )
                              }
                            >
                              <IconButton
                                onClick={(e) =>
                                  handleToggleBookmark(e, item.id)
                                }
                                sx={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  bgcolor: "rgba(255,255,255,0.9)",
                                  color:
                                    isBookmarked ? "secondary.main" : (
                                      "text.secondary"
                                    ),
                                  "&:hover": { bgcolor: "white" },
                                }}
                              >
                                {isBookmarked ?
                                  <BookmarkIcon />
                                : <BookmarkBorderIcon />}
                              </IconButton>
                            </Tooltip>

                            {/* Category Chip */}
                            <Chip
                              label={item.category}
                              size="small"
                              sx={{
                                position: "absolute",
                                bottom: 8,
                                left: 8,
                                bgcolor: "rgba(43,45,38,0.85)",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.7rem",
                              }}
                            />
                          </Box>

                          {/* Content */}
                          <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
                            <Typography
                              variant="caption"
                              color="secondary.main"
                              fontWeight={700}
                              display="block"
                              mb={0.5}
                            >
                              {item.brand || "VERDANA CHOICE"}
                            </Typography>

                            <Typography
                              variant="h6"
                              fontWeight={800}
                              component={Link}
                              to={`/product/${item.id}`}
                              sx={{
                                textDecoration: "none",
                                color: "text.primary",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                lineHeight: 1.3,
                                mb: 1,
                                "&:hover": { color: "primary.main" },
                              }}
                            >
                              {item.name}
                            </Typography>

                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              mb={1.5}
                            >
                              <Rating
                                value={item.Ratings}
                                precision={0.1}
                                readOnly
                                size="small"
                              />
                              <Typography
                                variant="body2"
                                fontWeight={700}
                                color="primary"
                              >
                                {item.Ratings} ({item.reviewCount || 40})
                              </Typography>
                            </Stack>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                lineHeight: 1.5,
                                fontSize: "0.85rem",
                                mb: 2,
                              }}
                            >
                              {item.discription}
                            </Typography>

                            {/* Price intentionally NOT rendered here - see note below the code */}
                          </CardContent>

                          {/* Actions */}
                          <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => setQuickViewProduct(item)}
                              sx={{
                                border: "1px solid #D1D5DB",
                                borderRadius: 1.5,
                              }}
                              title="Quick View"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>

                            <Button
                              component="a"
                              href={item.amazonAffiliateUrl || "#"}
                              target="_blank"
                              rel="nofollow sponsored noopener"
                              variant="contained"
                              color="secondary"
                              fullWidth
                              size="small"
                              endIcon={<OpenInNewIcon fontSize="small" />}
                              sx={{ textTransform: "none", fontWeight: 700 }}
                            >
                              Check on Amazon
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              }
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Reader Testimonials Slider */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#FFFFFF",
          py: 8,
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 8 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={900}
                fontFamily="Libertinus, serif"
                color="primary"
              >
                What Readers Say About Verdana
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Verified reviews from readers who trust our independent cosmetic
                evaluations.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => scroll("left")}
                sx={{ border: "1px solid #E5E7EB" }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => scroll("right")}
                sx={{ border: "1px solid #E5E7EB" }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              py: 1,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {testimonials.map((item, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  minWidth: 320,
                  maxWidth: 320,
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  border: "1px solid #E5E7EB",
                  borderRadius: 3,
                  bgcolor: "#FAF8F5",
                  p: 1,
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography variant="subtitle1" fontWeight={800}>
                      {item.name}
                    </Typography>
                    <Chip
                      label={item.title}
                      size="small"
                      color="secondary"
                      variant="outlined"
                      sx={{ fontSize: "0.65rem" }}
                    />
                  </Stack>
                  <Rating
                    value={item.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{ mb: 1.5 }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: "italic", lineHeight: 1.6 }}
                  >
                    "{item.dis}"
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Footer */}
      <Footer />
    </Box>
  );
}
