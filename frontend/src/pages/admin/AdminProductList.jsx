import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Alert
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, fetchProducts } from "../../api/productApi.js";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setPageLoading(true);
      setError("");
      try {
        const data = await fetchProducts();
        setProducts(data || []);
      } catch (err) {
        setError(err.message || "Failed to load product list");
      } finally {
        setPageLoading(false);
      }
    })();
  }, []);

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      setDeleting(true);
      setDeleteError("");
      try {
        await deleteProduct(deleteTarget.id || deleteTarget);
        navigate("/admin/Dashboard");
      } catch (err) {
        setDeleteError(err.message || "Failed to delete product");
        setDeleting(false);
      }
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} mb={4} gap={2} sx={{ mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={900} fontFamily="Libertinus, serif" color="primary">
            Product Catalog Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View, edit, create, or remove cosmetic products from the live website store.
          </Typography>
        </Box>

        <Button component={Link} to="/admin/addProduct" variant="contained" color="secondary" startIcon={<AddIcon />}>
          Add New Product
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={0} sx={{ p: 3, bgcolor: "white", borderRadius: 3, border: "1px solid #E5E7EB" }}>
        {/* Search */}
        <Box mb={3}>
          <TextField
            placeholder="Search products by name or category..."
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={pageLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>

        {pageLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "#FAF8F5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Thumbnail</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Amazon Link</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Box component="img" src={item.image} alt={item.name} sx={{ width: 44, height: 44, borderRadius: 1.5, objectFit: "cover" }} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {item.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        ${Number(item.price || 0).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        {item.Ratings} ★
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        component="a"
                        href={item.amazonAffiliateUrl || "#"}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        size="small"
                        color="secondary"
                        disabled={!item.amazonAffiliateUrl}
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton component={Link} to={`/admin/products/edit/${item.id}`} size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => { setDeleteError(""); setDeleteTarget(item); }} size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Delete Confirmation Modal */}
      <Dialog open={Boolean(deleteTarget)} onClose={() => !deleting && setDeleteTarget(null)}>
        <DialogTitle sx={{ fontWeight: 800 }}>Delete Product Confirmation</DialogTitle>
        <DialogContent>
          {deleteError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {deleteError}
            </Alert>
          )}
          <DialogContentText>
            Are you sure you want to delete <strong>{deleteTarget?.name}</strong> from the catalog? This action will remove it from the live website.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={18} color="inherit" /> : null}
          >
            {deleting ? "Deleting..." : "Delete Product"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}