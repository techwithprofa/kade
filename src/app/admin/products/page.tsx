'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Paper,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Product, ProductFormData } from '@/shared/types/product';
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
} from '@/shared/services/productService';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    min_stock: 0,
    size: '',
    type: '',
    compatible_models: [],
    repair_time: 0,
    repair_cost: 0,
    description: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
  };

  const handleSearch = () => {
    const results = searchProducts(searchQuery);
    setProducts(results);
  };

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        min_stock: 0,
        size: '',
        type: '',
        compatible_models: [],
        repair_time: 0,
        repair_cost: 0,
        description: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  const handleOpenViewDialog = (product: Product) => {
    setSelectedProduct(product);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'compatible_models') {
      setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()) });
    } else if (['price', 'stock', 'min_stock', 'repair_time', 'repair_cost'].includes(name)) {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      createProduct(formData);
    }
    loadProducts();
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Products Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Product
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                    {product.id.split('/').map((part, index) => (
                      <Chip
                        key={index}
                        label={part}
                        size="small"
                        color={index === 2 ? "primary" : "default"}
                        variant={index === 1 ? "outlined" : "filled"}
                        sx={{ 
                          fontSize: '0.75rem',
                          height: '24px',
                          ...(index === 0 && { backgroundColor: 'grey.300' })
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                <Typography variant="h6" gutterBottom>{product.name}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                  <Typography color="textSecondary">Category: {product.category}</Typography>
                  <Typography>Price: ${product.price.toFixed(2)}</Typography>
                  <Typography>Stock: {product.stock}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleOpenViewDialog(product)}
                    variant="outlined"
                    size="small"
                  >
                    View Details
                  </Button>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => handleOpenDialog(product)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product.id)} color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View Details Dialog */}
      <Dialog 
        open={openViewDialog} 
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle>
              <Typography variant="h5" component="div" gutterBottom>
                Product Details
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 2 }}>
                {/* Basic Information */}
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Basic Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h5">{selectedProduct.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography><strong>ID:</strong> {selectedProduct.id}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography><strong>Category:</strong> {selectedProduct.category}</Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Specifications */}
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Specifications
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography><strong>Size:</strong> {selectedProduct.size}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography><strong>Type:</strong> {selectedProduct.type}</Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Inventory & Pricing */}
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Inventory & Pricing
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography><strong>Stock:</strong></Typography>
                        <Chip 
                          label={selectedProduct.stock}
                          color={selectedProduct.stock <= selectedProduct.min_stock ? "error" : "success"}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography><strong>Minimum Stock:</strong> {selectedProduct.min_stock}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" color="primary">
                        ${selectedProduct.price.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Repair Information */}
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Repair Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography><strong>Repair Time:</strong> {selectedProduct.repair_time} minutes</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography><strong>Repair Cost:</strong> ${selectedProduct.repair_cost.toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Compatibility */}
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Compatible Models
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedProduct.compatible_models.map((model, index) => (
                      <Chip key={index} label={model} variant="outlined" />
                    ))}
                  </Box>
                </Paper>

                {/* Description */}
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Description
                  </Typography>
                  <Typography>{selectedProduct.description}</Typography>
                </Paper>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseViewDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Edit/Create Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Minimum Stock"
                name="min_stock"
                type="number"
                value={formData.min_stock}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Compatible Models (comma-separated)"
                name="compatible_models"
                value={formData.compatible_models.join(', ')}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Repair Time (minutes)"
                name="repair_time"
                type="number"
                value={formData.repair_time}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Repair Cost"
                name="repair_cost"
                type="number"
                value={formData.repair_cost}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingProduct ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProductsPage;
