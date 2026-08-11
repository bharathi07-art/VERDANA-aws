import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
  Divider,
  Container
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import AdminDashboard from "./admin/AdminDashboard";
import AdminProductList from "./admin/AdminProductList";
import AdminProductForm from "./admin/AdminProductForm";
import AdminLogin from "./admin/AdminLogin";

const drawerWidth = 240;

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("verdana_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("verdana_admin_auth");
    setIsAuthenticated(false);
    navigate("/");
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { label: "All Products", icon: <Inventory2Icon />, path: "/admin/products" },
    { label: "Add New Product", icon: <AddBoxIcon />, path: "/admin/products/new" }
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#FAF8F5" }}>
      {/* Top Admin AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#2B2D26",
          borderBottom: "1px solid #3E4137"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box component="img" src="/VERDANA.png" alt="Verdana" sx={{ width: 32, height: 32, borderRadius: "50%" }} />
            <Typography variant="h6" fontWeight={900} fontFamily="Libertinus, serif" letterSpacing={1} color="#FAF8F5">
              VERDANA ADMIN PORTAL
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              sx={{ color: "#D1D5DB", textTransform: "none", "&:hover": { color: "white" } }}
            >
              Back to Website Store
            </Button>
            <Button
              onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
              color="error"
              variant="outlined"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Log Out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#FFFFFF",
            borderRight: "1px solid #E5E7EB"
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", p: 2 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" mb={1} px={1}>
            MANAGEMENT MENU
          </Typography>
          <List disablePadding>
            {menuItems.map((item) => {
              const isSelected =
                item.path === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname.startsWith(item.path);
              return (
                <ListItemButton
                  key={item.label}
                  component={Link}
                  to={item.path}
                  selected={isSelected}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    "&.Mui-selected": {
                      bgcolor: "#798262",
                      color: "white",
                      "& .MuiListItemIcon-root": { color: "white" },
                      "&:hover": { bgcolor: "#798262" }
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: isSelected ? "white" : "primary.main", minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                </ListItemButton>
              );
            })}
          </List>

          <Divider sx={{ my: 3 }} />

          <Box px={1}>
            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
              QUICK TIP:
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4, display: "block" }}>
              Changes made in this admin portal immediately persist locally and reflect on the live Home and Product Detail pages.
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, width: `calc(100% - ${drawerWidth}px)` }}>
        <Toolbar />
        <Container maxWidth="xl" sx={{ disableGutters: true }}>
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductList />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/edit/:id" element={<AdminProductForm />} />
            <Route path="login" element={<AdminLogin onLogin={() => setIsAuthenticated(true)} />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}