import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Container,
  Paper
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedIcon from "@mui/icons-material/Verified";
import SavedDrawer from "../components/SavedDrawer";
import { getBookmarks, getStoredProducts } from "../data/productStore";

export default function Nav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState(getBookmarks());
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // Refresh bookmarks count on route or event changes
    setBookmarks(getBookmarks());
  }, [location.pathname]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Reviews", path: "/#products" },
    { label: "Our Standards", path: "/about" },
    { label: "Admin Portal", path: "/admin/login" }
  ];

  const products = getStoredProducts();
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Top Banner */}
      <Box
        sx={{
          bgcolor: "#2B2D26",
          color: "#FAF8F5",
          py: 0.75,
          px: 2,
          textAlign: "center",
          fontSize: "0.8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1
        }}
      >
        <VerifiedIcon sx={{ fontSize: 14, color: "#798262" }} />
        <Typography variant="caption" sx={{ fontWeight: 500, letterSpacing: 0.2 }}>
          Verdana is reader-supported. Independent clean cosmetic reviews. We may earn an affiliate commission on Amazon links.
        </Typography>
      </Box>

      {/* Main Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#FAF8F5",
          borderBottom: "1px solid #E5E7EB",
          color: "#2B2D26",
          zIndex: (theme) => theme.zIndex.drawer - 1
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 1 }}>
            {/* Logo */}
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                component="img"
                src="/VERDANA.png"
                alt="Verdana"
                sx={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #4C2B12" }}
              />
              <Box>
                <Typography variant="h5" fontWeight={900} fontFamily="Libertinus, serif" letterSpacing={1} color="primary">
                  VERDANA
                </Typography>
                <Typography variant="caption" sx={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1.5, color: "secondary.main", display: "block" }}>
                  Clean Beauty Journal
                </Typography>
              </Box>
            </Stack>

            {/* Desktop Navigation Links */}
            <Stack direction="row" spacing={3} sx={{ display: { xs: "none", md: "flex" } }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive ? "primary.main" : "text.primary",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "0.95rem",
                      textTransform: "none",
                      position: "relative",
                      "&:after": isActive
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: 4,
                            left: "15%",
                            width: "70%",
                            height: 2,
                            bgcolor: "primary.main",
                            borderRadius: 1
                          }
                        : {}
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>

            {/* Actions: Search & Saved Cart */}
            <Stack direction="row" spacing={1} alignItems="center">
              {/* Quick Search Input */}
              <Box
                onClick={() => setSearchOpen(true)}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  bgcolor: "#FFFFFF",
                  border: "1px solid #D1D5DB",
                  borderRadius: 5,
                  px: 1.5,
                  py: 0.5,
                  cursor: "pointer",
                  width: { sm: 180, md: 240 },
                  transition: "all 0.2s",
                  "&:hover": { borderColor: "primary.main", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }
                }}
              >
                <SearchIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                <Typography variant="body2" color="text.secondary" noWrap>
                  Search cosmetics...
                </Typography>
              </Box>

              <IconButton
                onClick={() => setSearchOpen(true)}
                sx={{ display: { xs: "flex", sm: "none" }, color: "primary.main" }}
              >
                <SearchIcon />
              </IconButton>

              <IconButton
                onClick={() => setSavedOpen(true)}
                sx={{ color: "primary.main", ml: 1 }}
                aria-label="saved products"
              >
                <Badge badgeContent={bookmarks.length} color="secondary">
                  <ShoppingBagIcon />
                </Badge>
              </IconButton>

              {/* Mobile Hamburger Menu */}
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ display: { xs: "flex", md: "none" }, color: "primary.main" }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Search Modal */}
      <Drawer anchor="top" open={searchOpen} onClose={() => setSearchOpen(false)}>
        <Box sx={{ p: 3, maxWidth: 800, mx: "auto", width: "100%" }}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <SearchIcon color="primary" />
            <InputBase
              placeholder="Search products, brands (e.g. Cleanser, Serum, Facial)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              fullWidth
              sx={{ fontSize: "1.1rem", borderBottom: "2px solid #4C2B12", py: 0.5 }}
            />
            <IconButton onClick={() => setSearchOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          {searchQuery.trim() && (
            <Paper elevation={0} variant="outlined" sx={{ maxHeight: 350, overflowY: "auto", p: 1 }}>
              {searchResults.length === 0 ? (
                <Typography variant="body2" color="text.secondary" align="center" py={3}>
                  No products found for "{searchQuery}"
                </Typography>
              ) : (
                <List disablePadding>
                  {searchResults.map((prod) => (
                    <ListItem key={prod.id} disablePadding>
                      <ListItemButton
                        component={Link}
                        to={`/product/${prod.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <Box
                          component="img"
                          src={prod.image}
                          alt={prod.name}
                          sx={{ width: 45, height: 45, borderRadius: 1, objectFit: "cover", mr: 2 }}
                        />
                        <ListItemText
                          primary={prod.name}
                          secondary={`${prod.category} • ${prod.Ratings}⭐`}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          )}
        </Box>
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" fontWeight={700} fontFamily="Libertinus, serif" color="primary">
              VERDANA
            </Typography>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  selected={location.pathname === item.path}
                >
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Saved Drawer */}
      <SavedDrawer
        open={savedOpen}
        onClose={() => setSavedOpen(false)}
        bookmarkedIds={bookmarks}
        onUpdateBookmarks={(updated) => setBookmarks(updated)}
      />
    </>
  );
}