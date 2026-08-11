import React from "react";
import { Dialog, DialogContent, Box, Typography, Button, Rating, Stack, Chip, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";

export default function QuickViewModal({ product, open, onClose }) {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: 0, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 12, top: 12, zIndex: 10, bgcolor: "rgba(255,255,255,0.8)", "&:hover": { bgcolor: "white" } }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{ width: "100%", height: { xs: 260, md: 450 }, objectFit: "cover" }}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ p: 4, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Chip label={product.category} color="secondary" size="small" sx={{ mb: 1.5, fontWeight: 700 }} />
              <Typography variant="h5" fontWeight={800} fontFamily="Libertinus, serif" mb={1}>
                {product.name}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Rating value={product.Ratings} precision={0.5} readOnly size="small" />
                <Typography variant="body2" fontWeight={700} color="primary">
                  {product.Ratings} ({product.reviewCount || 42} reviews)
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.6 }}>
                {product.discription}
              </Typography>

              {product.bestFor && product.bestFor.length > 0 && (
                <Box mb={2}>
                  <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={0.5}>
                    BEST FOR:
                  </Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                    {product.bestFor.map((tag, idx) => (
                      <Chip key={idx} label={tag} variant="outlined" size="small" sx={{ fontSize: "0.75rem" }} />
                    ))}
                  </Stack>
                </Box>
              )}

              {product.pros && product.pros.length > 0 && (
                <Box mb={2}>
                  <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={0.5}>
                    KEY HIGHLIGHTS:
                  </Typography>
                  <Stack spacing={0.5}>
                    {product.pros.slice(0, 3).map((pro, idx) => (
                      <Stack key={idx} direction="row" spacing={1} alignItems="center">
                        <CheckCircleIcon color="secondary" sx={{ fontSize: 16 }} />
                        <Typography variant="caption" color="text.primary">
                          {pro}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>

            <Stack direction="row" spacing={2} mt={3}>
              <Button
                component={Link}
                to={`/product/${product.id}`}
                variant="outlined"
                color="primary"
                fullWidth
                onClick={onClose}
              >
                Full Review
              </Button>

              <Button
                component="a"
                href={product.amazonAffiliateUrl || "#"}
                target="_blank"
                rel="nofollow sponsored noopener"
                variant="contained"
                color="secondary"
                fullWidth
                endIcon={<OpenInNewIcon fontSize="small" />}
              >
                Check Amazon
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

// Ensure Grid import works cleanly
import { Grid } from "@mui/material";
