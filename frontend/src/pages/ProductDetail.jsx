import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Rating,
  Stack,
  Grid,
  Paper,
  Chip,
  Breadcrumbs,
  Divider,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VerifiedIcon from "@mui/icons-material/Verified";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Footer from "../components/Footer";
import { getProductById, fetchProducts } from "../api/productApi.js";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("verdana_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ author: "", title: "", Ratings: 5, comment: "" });
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Fetch the product itself
  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setFetchError("");

    (async () => {
      try {
        const found = await getProductById(id);
        if (!found) {
          setNotFound(true);
        } else {
          setItem(found);
          setActiveImage(found.image);
        }
      } catch (err) {
        setFetchError(err.message || "Failed to load product details");
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Fetch related products once we know the current product's category
  useEffect(() => {
    if (!item) return;

    (async () => {
      try {
        const all = await fetchProducts();
        const related = all
          .filter((p) => p.category === item.category && p.id !== item.id)
          .slice(0, 3);
        setRelatedProducts(related);
      } catch (err) {
        console.error("Failed to load related products:", err.message);
      }
    })();
  }, [item]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (notFound || !item) {
    return (
      <Box sx={{ p: 8, textAlign: "center", minHeight: "60vh", bgcolor: "#FAF8F5" }}>
        {fetchError && (
          <Alert severity="error" sx={{ maxWidth: 500, mx: "auto", mb: 3 }}>
            {fetchError}
          </Alert>
        )}
        <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
          Product Review Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          The beauty product review you are looking for does not exist or has been removed.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/" startIcon={<ArrowBackIcon />}>
          Back to All Products
        </Button>
      </Box>
    );
  }

  const isBookmarked = bookmarks.includes(item.id);

  const handleBookmarkToggle = () => {
    setBookmarks((prev) => {
      const updated = prev.includes(item.id)
        ? prev.filter((bId) => bId !== item.id)
        : [...prev, item.id];
      localStorage.setItem("verdana_bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  // NOTE: local-only for now - no backend endpoint exists yet to persist reviews.
  // This updates the page's in-memory state so the UI works, but a refresh will
  // lose it. Flag if you want the real POST /api/products/:id/reviews endpoint built.
  const handleAddReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.comment.trim()) return;

    const newReview = {
      id: Date.now(),
      author: reviewForm.author,
      title: reviewForm.title,
      Ratings: reviewForm.Ratings,
      comment: reviewForm.comment,
      date: new Date().toLocaleDateString(),
      verified: false,
    };

    setItem((prev) => ({
      ...prev,
      userReviews: [...(prev.userReviews || []), newReview],
    }));

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setReviewDialogOpen(false);
      setReviewForm({ author: "", title: "", Ratings: 5, comment: "" });
    }, 1500);
  };

  const totalRevCount = item.reviewCount || item.userReviews?.length || 1;
  const breakdown = item.RatingssBreakdown || { 5: 80, 4: 15, 3: 3, 2: 1, 1: 1 };
  const sumVal = Object.values(breakdown).reduce((a, b) => a + b, 0) || 100;

  const RatingsBars = [5, 4, 3, 2, 1].map((star) => ({
    star,
    percent: Math.round(((breakdown[star] || 0) / sumVal) * 100),
  }));

  return (
    <Box sx={{ bgcolor: "#FAF8F5", minHeight: "100vh", pt: 4 }}>
      <Box sx={{ maxWidth: 1300, mx: "auto", px: { xs: 2, md: 6 } }}>
        {/* Breadcrumbs Navigation */}
        <Stack
          direction="row"
          sx={{justifyContent:"space-between", alignItems:"center", p:2}}
          mb={3}
        >
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Typography component={Link} to="/" sx={{ textDecoration: "none", color: "text.secondary", "&:hover": { color: "primary.main" } }}>
              Home
            </Typography>
            <Typography component={Link} to="/" sx={{ textDecoration: "none", color: "text.secondary", "&:hover": { color: "primary.main" } }}>
              {item.category}
            </Typography>
            <Typography color="text.primary" fontWeight={700}>
              {item.name}
            </Typography>
          </Breadcrumbs>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none", color: "primary.main" }}
          >
            Back
          </Button>
        </Stack>

        {/* Top Product Header Showcase Card */}
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, bgcolor: "white", borderRadius: 4, border: "1px solid #E5E7EB", mb: 6 }}>
          <Grid container spacing={5}>
            {/* Gallery Images Column */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex", gap: 5, flexDirection: "column" }}>
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src={activeImage || item.image}
                  alt={item.name}
                  sx={{
                    width: "100%",
                    height: 420,
                    objectFit: "cover",
                    borderRadius: 3,
                    border: "1px solid #E5E7EB",
                  }}
                />
                <IconButton
                  onClick={handleBookmarkToggle}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "rgba(255,255,255,0.9)",
                    color: isBookmarked ? "secondary.main" : "text.secondary",
                    "&:hover": { bgcolor: "white" },
                  }}
                >
                  {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
              </Box>

              {item.gallery && item.gallery.length > 1 && (
                <Stack direction="row" spacing={1.5} mt={2} justifyContent="center">
                  {item.gallery.map((imgUrl, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={imgUrl}
                      alt={`Thumbnail ${idx}`}
                      onClick={() => setActiveImage(imgUrl)}
                      sx={{
                        width: 64,
                        height: 64,
                        objectFit: "cover",
                        borderRadius: 2,
                        cursor: "pointer",
                        border: activeImage === imgUrl ? "2px solid #798262" : "1px solid #E5E7EB",
                        opacity: activeImage === imgUrl ? 1 : 0.7,
                        transition: "all 0.2s",
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Grid>

            {/* Product Meta & Verdict Summary */}
            <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Chip label={item.category} color="secondary" size="small" sx={{ fontWeight: 700 }} />
                  <Chip
                    icon={<VerifiedIcon sx={{ fontSize: "14px !important", color: "#798262" }} />}
                    label="Verdana Verified Pure"
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>

                <Typography variant="h3" fontWeight={900} fontFamily="Libertinus, serif" color="primary" mb={1.5}>
                  {item.name}
                </Typography>

                <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" mb={2}>
                  BY {item.brand ? item.brand.toUpperCase() : "VERDANA INDEPENDENT REVIEW"}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                  <Rating value={item.Ratings} precision={0.1} readOnly size="large" />
                  <Box sx={{ bgcolor: "#798262", color: "white", px: 1.5, py: 0.5, borderRadius: 1.5, fontWeight: 800 }}>
                    {item.Ratings} / 5.0
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Based on {totalRevCount} verified evaluations
                  </Typography>
                </Stack>

                <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.7, fontSize: "1.05rem", mb: 3 }}>
                  {item.discription}
                </Typography>

                {item.bestFor && item.bestFor.length > 0 && (
                  <Box mb={3}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1}>
                      RECOMMENDED FOR:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {item.bestFor.map((tag, i) => (
                        <Chip key={i} label={tag} variant="outlined" color="primary" sx={{ fontWeight: 600 }} />
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Price intentionally NOT rendered here - internal reference only,
                    per Amazon Associates compliance rules set at project start */}
              </Box>

              {/* Affiliate CTA Box */}
              <Paper elevation={0} sx={{ p: 2.5, bgcolor: "#FAF8F5", border: "1px solid #E5E7EB", borderRadius: 3 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3 }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>
                      Ready to order?
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Check live pricing and prime delivery availability directly on Amazon.
                    </Typography>
                  </Box>
                  <Button
                    component="a"
                    href={item.amazonAffiliateUrl || "#"}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<OpenInNewIcon />}
                    sx={{ px: 4, py: 1.5, fontWeight: 700, whiteSpace: "nowrap" }}
                  >
                    Check Price on Amazon
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Detailed Pros & Cons Section */}
        <Grid container spacing={4} mb={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ p: 4, bgcolor: "#F4F7F2", border: "1px solid #D2DEC9", borderRadius: 3, height: "100%" }}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
                <CheckCircleIcon sx={{ color: "#4A6B3A", fontSize: 28 }} />
                <Typography variant="h5" fontWeight={800} color="#2D4521">
                  The Pros (What We Loved)
                </Typography>
              </Stack>
              <Stack spacing={2}>
                {(item.pros && item.pros.length > 0
                  ? item.pros
                  : ["Formulated with pure botanical ingredients", "Dermatologically tested", "Noticeable results within 14 days"]
                ).map((pro, idx) => (
                  <Stack key={idx} direction="row" spacing={1.5} alignItems="flex-start">
                    <CheckCircleIcon sx={{ color: "#4A6B3A", fontSize: 18, mt: 0.3 }} />
                    <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.5 }}>
                      {pro}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ p: 4, bgcolor: "#FDF4F4", border: "1px solid #F3C6C6", borderRadius: 3, height: "100%" }}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
                <CancelIcon sx={{ color: "#9B3838", fontSize: 28 }} />
                <Typography variant="h5" fontWeight={800} color="#5C1C1C">
                  The Cons (Things to Consider)
                </Typography>
              </Stack>
              <Stack spacing={2}>
                {(item.cons && item.cons.length > 0
                  ? item.cons
                  : ["Requires consistent daily application", "Slightly higher premium price tag"]
                ).map((con, idx) => (
                  <Stack key={idx} direction="row" spacing={1.5} alignItems="flex-start">
                    <CancelIcon sx={{ color: "#9B3838", fontSize: 18, mt: 0.3 }} />
                    <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.5 }}>
                      {con}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Formula & Ingredients */}
        {item.ingredients && (
          <Paper elevation={0} sx={{ p: 4, bgcolor: "white", borderRadius: 3, border: "1px solid #E5E7EB", mb: 6 }}>
            <Typography variant="h5" fontWeight={800} fontFamily="Libertinus, serif" color="primary" mb={2}>
              Key Active Ingredients Breakdown
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
              {item.ingredients}
            </Typography>
          </Paper>
        )}

        {/* Ratingss Breakdown & User Reviews */}
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, bgcolor: "white", borderRadius: 4, border: "1px solid #E5E7EB", mb: 6 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            mb={4}
            gap={2}
          >
            <Box>
              <Typography variant="h4" fontWeight={900} fontFamily="Libertinus, serif" color="primary">
                Product Ratingss & Reviews
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Honest feedback submitted by verified Verdana readers.
              </Typography>
            </Box>

            <Button variant="contained" color="primary" startIcon={<RateReviewIcon />} onClick={() => setReviewDialogOpen(true)}>
              Write a Review
            </Button>
          </Stack>

          <Grid container spacing={4} alignItems="center" mb={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper elevation={0} sx={{ p: 4, textAlign: "center", bgcolor: "#FAF8F5", border: "1px solid #E5E7EB", borderRadius: 3 }}>
                <Typography variant="h2" fontWeight={900} fontFamily="Libertinus, serif" color="secondary.main">
                  {item.Ratings}
                </Typography>
                <Rating value={item.Ratings} precision={0.1} readOnly size="large" sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                  {totalRevCount} Reader Reviews
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={1.5}>
                {RatingsBars.map((bar) => (
                  <Stack key={bar.star} direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" fontWeight={700} width={40}>
                      {bar.star} ★
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={bar.percent}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          bgcolor: "#E5E7EB",
                          "& .MuiLinearProgress-bar": { bgcolor: "#798262", borderRadius: 5 },
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" width={40} textAlign="right">
                      {bar.percent}%
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" fontWeight={800} mb={3}>
            Reader Reviews ({item.userReviews?.length || 0})
          </Typography>

          {item.userReviews && item.userReviews.length > 0 ? (
            <Stack spacing={3}>
              {item.userReviews.map((rev) => (
                <Card key={rev.id} elevation={0} sx={{ p: 2, bgcolor: "#FAF8F5", border: "1px solid #E5E7EB", borderRadius: 2 }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle1" fontWeight={700}>
                          {rev.author}
                        </Typography>
                        {rev.verified && (
                          <Chip label="Verified Reader" size="small" color="secondary" variant="outlined" sx={{ fontSize: "0.65rem" }} />
                        )}
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {rev.date}
                      </Typography>
                    </Stack>
                    <Rating value={rev.Ratings} precision={0.5} readOnly size="small" sx={{ mb: 1 }} />
                    <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                      {rev.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {rev.comment}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary" align="center" py={4}>
              No user reviews yet. Be the first reader to submit your review!
            </Typography>
          )}
        </Paper>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <Box mb={8}>
            <Typography variant="h4" fontWeight={900} fontFamily="Libertinus, serif" color="primary" mb={3}>
              More in {item.category}
            </Typography>
            <Grid container spacing={3}>
              {relatedProducts.map((rel) => (
                <Grid key={rel.id} size={{ xs: 12, sm: 4 }}>
                  <Card elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 3, bgcolor: "white" }}>
                    <Box
                      component="img"
                      src={rel.image}
                      alt={rel.name}
                      sx={{ width: "100%", height: 180, objectFit: "cover" }}
                    />
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        noWrap
                        component={Link}
                        to={`/product/${rel.id}`}
                        sx={{ textDecoration: "none", color: "text.primary" }}
                      >
                        {rel.name}
                      </Typography>
                      <Rating value={rel.Ratings} readOnly size="small" sx={{ my: 0.5 }} />
                      <Button
                        component={Link}
                        to={`/product/${rel.id}`}
                        variant="outlined"
                        color="primary"
                        size="small"
                        fullWidth
                        sx={{ mt: 1 }}
                      >
                        Read Review
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      {/* Write a Review Dialog Modal */}
      <Dialog open={reviewDialogOpen} onClose={() => setReviewDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, fontFamily: "Libertinus, serif" }}>
          Write a Review for {item.name}
        </DialogTitle>
        <Box component="form" onSubmit={handleAddReviewSubmit}>
          <DialogContent sx={{ pt: 1 }}>
            {submittedSuccess ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                Thank you! Your review has been added to this page.
              </Alert>
            ) : (
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                    Your Overall Score
                  </Typography>
                  <Rating
                    value={reviewForm.Ratings}
                    onChange={(_, val) => setReviewForm({ ...reviewForm, Ratings: val })}
                    size="large"
                  />
                </Box>

                <TextField
                  label="Your Name or Nickname"
                  required
                  fullWidth
                  value={reviewForm.author}
                  onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                />

                <TextField
                  label="Review Title (e.g., Amazing hydration!)"
                  required
                  fullWidth
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                />

                <TextField
                  label="Your Detailed Review"
                  required
                  multiline
                  rows={4}
                  fullWidth
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Share your experience regarding texture, scent, performance, and results..."
                />
              </Stack>
            )}
          </DialogContent>

          {!submittedSuccess && (
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button onClick={() => setReviewDialogOpen(false)} color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="secondary">
                Submit Review
              </Button>
            </DialogActions>
          )}
        </Box>
      </Dialog>

      <Footer />
    </Box>
  );
}