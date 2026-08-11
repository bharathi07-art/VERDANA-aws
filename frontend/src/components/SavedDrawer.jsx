import React from "react";
import { Drawer, Box, Typography, IconButton, Stack, Button, Card, CardContent, CardMedia, Rating } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import { getStoredProducts, toggleBookmark } from "../data/productStore";

export default function SavedDrawer({ open, onClose, bookmarkedIds, onUpdateBookmarks }) {
  const allProducts = getStoredProducts();
  const savedProducts = allProducts.filter((p) => bookmarkedIds.includes(p.id));

  const handleRemove = (id) => {
    const updated = toggleBookmark(id);
    if (onUpdateBookmarks) onUpdateBookmarks(updated);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 300, sm: 400 }, p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <ShoppingBagIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Saved Products ({savedProducts.length})
            </Typography>
          </Stack>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>

        <Typography variant="caption" color="text.secondary" mb={3}>
          Keep track of beauty products you wish to purchase on Amazon later.
        </Typography>

        {/* Content */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {savedProducts.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="body1" color="text.secondary" mb={2}>
                Your saved list is currently empty.
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" mb={3 } >
                Click the bookmark icon on any product card to save it here for quick access.
              </Typography>
              <Button variant="outlined" color="primary" onClick={onClose}>
                Explore Products
              </Button>
            </Box>
          ) : (
            <Stack spacing={2}>
              {savedProducts.map((item) => (
                <Card key={item.id} variant="outlined" sx={{ display: "flex", p: 1, position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{ width: 80, height: 80, borderRadius: 1, objectFit: "cover" }}
                  />
                  <CardContent sx={{ p: 1, "&:last-child": { pb: 1 }, flex: 1,  }}>
                    <Box sx={{display:"flex",flexDirection:"column"}}>
                      <Typography variant="subtitle2" fontWeight={700} noWrap component={Link} to={`/product/${item.id}`} onClick={onClose} sx={{ textDecoration: "none", color: "text.primary", "&:hover": { color: "primary.main" } }}>
                        {item.id}
                      </Typography>
                      <Rating value={item.Ratings} precision={0.5} readOnly size="small" sx={{ my: 0.5 }} />
                    </Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1} sx={{display:"flex",justifyContent:"space-between", alignItems:"center",mt:1}}>
                      <Typography variant="body2" fontWeight={700} color="primary.main">
                        ${item.price?.toFixed(2)}
                      </Typography>
                      <Button
                        component="a"
                        href={item.amazonAffiliateUrl || "#"}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        size="small"
                        variant="contained"
                        color="secondary"
                        endIcon={<OpenInNewIcon fontSize="small" />}
                        sx={{ fontSize: "0.7rem", py: 0.25 }}
                      >
                        Buy
                      </Button>
                    </Stack>
                  </CardContent>
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(item.id)}
                    sx={{ position: "absolute", top: 4, right: 4, color: "text.disabled", "&:hover": { color: "error.main" } }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Card>
              ))}
            </Stack>
          )}
        </Box>

        {/* Footer */}
        {savedProducts.length > 0 && (
          <Box sx={{ pt: 2, borderTop: 1, borderColor: "divider", mt: 2 }}>
            <Typography variant="caption" color="text.secondary" align="center" display="block" mb={2}>
              Affiliate link disclaimer: Purchases made on Amazon earn Verdana a small commission.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={Link}
              to="/"
              onClick={onClose}
            >
              Continue Browsing
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
