import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const EcommerceForm = () => {
  const [formData, setFormData] = useState({
    websiteName: '',
    fullName: '',
    whatsappNo: '',
    email: '',
    cmsSetup: false,
    customDesign: false,
    banners: 0,
    productPhotos: 0,
    contentWriter: 'no',
    categoriesProducts: 0,
    paymentGateway: false,
    discountsCoupons: false,
    shippingIntegration: false,
    taxCalculation: false,
    sslCertificate: false,
    contactForm: false,
    socialMedia: false,
    maintenance: false,
    responsiveDesign: false,
    emailIds: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  // Fixed costs for services
  const serviceCosts = {
    cmsSetup: 1000,
    customDesign: 10000,
    bannerCost: 1000,
    photoCost: 300,
    categoryProductCost: 500,
    paymentGateway: 3000,
    discountsCoupons: 2000,
    shippingIntegration: 5000,
    taxCalculation: 2000,
    sslCertificate: 2000,
    responsiveDesign: 2000,
    emailCost: 1000,
    contentWriterBasic: 5000,
    contentWriterPremium: 10000,
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : Math.max(0, parseInt(value) || 0)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const dataToSubmit = {
        ...formData,
        totalCost: calculateTotal(),
        bannerCost: formData.banners * serviceCosts.bannerCost,
        photoCost: formData.productPhotos * serviceCosts.photoCost,
        categoryProductCost: formData.categoriesProducts * serviceCosts.categoryProductCost,
        emailCost: formData.emailIds * serviceCosts.emailCost,
        contentWriterCost: formData.contentWriter === 'basic' 
          ? serviceCosts.contentWriterBasic 
          : formData.contentWriter === 'premium' 
            ? serviceCosts.contentWriterPremium 
            : 0
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/quotes/ecommerce`, 
        dataToSubmit
      );
      
      toast.success('Quote submitted successfully!');
      
      // Reset form but keep checkbox states
      setFormData({
        ...formData,
        websiteName: '',
        fullName: '',
        whatsappNo: '',
        email: '',
        banners: 0,
        productPhotos: 0,
        categoriesProducts: 0,
        emailIds: 0,
        contentWriter: 'no'
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.error || 'Error submitting quote');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateTotal = () => {
    let total = 0;

    // Add fixed costs for checked services
    if (formData.cmsSetup) total += serviceCosts.cmsSetup;
    if (formData.customDesign) total += serviceCosts.customDesign;
    if (formData.paymentGateway) total += serviceCosts.paymentGateway;
    if (formData.discountsCoupons) total += serviceCosts.discountsCoupons;
    if (formData.shippingIntegration) total += serviceCosts.shippingIntegration;
    if (formData.taxCalculation) total += serviceCosts.taxCalculation;
    if (formData.sslCertificate) total += serviceCosts.sslCertificate;
    if (formData.responsiveDesign) total += serviceCosts.responsiveDesign;

    // Add content writer cost
    if (formData.contentWriter === 'basic') total += serviceCosts.contentWriterBasic;
    if (formData.contentWriter === 'premium') total += serviceCosts.contentWriterPremium;

    // Add variable costs
    total += formData.banners * serviceCosts.bannerCost;
    total += formData.productPhotos * serviceCosts.photoCost;
    total += formData.categoriesProducts * serviceCosts.categoryProductCost;
    total += formData.emailIds * serviceCosts.emailCost;

    return total;
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        E-commerce Website Quote Calculator
      </Typography>
      
      <Grid container spacing={3}>
        {/* Contact Information */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
            Contact Information
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Website Name"
            name="websiteName"
            value={formData.websiteName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Your Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="WhatsApp Number"
            name="whatsappNo"
            value={formData.whatsappNo}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Website Features */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1, mt: 2 }}>
            Website Features
          </Typography>
        </Grid>

        {/* Fixed Cost Services */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.cmsSetup} 
                onChange={handleChange} 
                name="cmsSetup" 
              />
            }
            label={
              <Box display="flex" justifyContent="space-between" width="100%">
                <span>CMS Setup</span>
                <span>₹{serviceCosts.cmsSetup.toLocaleString()}</span>
              </Box>
            }
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.customDesign} 
                onChange={handleChange} 
                name="customDesign" 
              />
            }
            label={
              <Box display="flex" justifyContent="space-between" width="100%">
                <span>Custom Design</span>
                <span>₹{serviceCosts.customDesign.toLocaleString()}</span>
              </Box>
            }
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.paymentGateway} 
                onChange={handleChange} 
                name="paymentGateway" 
              />
            }
            label={
              <Box display="flex" justifyContent="space-between" width="100%">
                <span>Payment Gateway</span>
                <span>₹{serviceCosts.paymentGateway.toLocaleString()}</span>
              </Box>
            }
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.discountsCoupons} 
                onChange={handleChange} 
                name="discountsCoupons" 
              />
            }
            label={
              <Box display="flex" justifyContent="space-between" width="100%">
                <span>Discounts & Coupons</span>
                <span>₹{serviceCosts.discountsCoupons.toLocaleString()}</span>
              </Box>
            }
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.shippingIntegration} 
                onChange={handleChange} 
                name="shippingIntegration" 
              />
            }
            label={
              <Box display="flex" justifyContent="space-between" width="100%">
                <span>Shipping Integration</span>
                <span>₹{serviceCosts.shippingIntegration.toLocaleString()}</span>
              </Box>
            }
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.taxCalculation} 
                onChange={handleChange} 
                name="taxCalculation" 
              />
            }
            label={
              <Box display="flex" justifyContent="space-between" width="100%">
                <span>Tax Calculation</span>
                <span>₹{serviceCosts.taxCalculation.toLocaleString()}</span>
              </Box>
            }
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.sslCertificate} 
                onChange={handleChange} 
                name="sslCertificate" 
              />
            }
            label={
              <Box display="flex" justifyContent="space-between" width="100%">
                <span>SSL Certificate</span>
                <span>₹{serviceCosts.sslCertificate.toLocaleString()}</span>
              </Box>
            }
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.responsiveDesign} 
                onChange={handleChange} 
                name="responsiveDesign" 
              />
            }
            label={
              <Box display="flex" justifyContent="space-between" width="100%">
                <span>Responsive Design</span>
                <span>₹{serviceCosts.responsiveDesign.toLocaleString()}</span>
              </Box>
            }
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.contactForm} 
                onChange={handleChange} 
                name="contactForm" 
              />
            }
            label="Contact Form (Free)"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.socialMedia} 
                onChange={handleChange} 
                name="socialMedia" 
              />
            }
            label="Social Media Integration (Free)"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.maintenance} 
                onChange={handleChange} 
                name="maintenance" 
              />
            }
            label="Maintenance (1 year, Free)"
            sx={{ width: '100%' }}
          />
        </Grid>

        {/* Variable Cost Services */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1, mt: 2 }}>
            Custom Services
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Number of Banners"
            name="banners"
            type="number"
            value={formData.banners}
            onChange={handleNumberChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">(₹{serviceCosts.bannerCost} each)</InputAdornment>,
              inputProps: { min: 0 }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Product Photos to Edit"
            name="productPhotos"
            type="number"
            value={formData.productPhotos}
            onChange={handleNumberChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">(₹{serviceCosts.photoCost} each)</InputAdornment>,
              inputProps: { min: 0 }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Categories/Products to Add"
            name="categoriesProducts"
            type="number"
            value={formData.categoriesProducts}
            onChange={handleNumberChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">(₹{serviceCosts.categoryProductCost} each)</InputAdornment>,
              inputProps: { min: 0 }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Email IDs Needed"
            name="emailIds"
            type="number"
            value={formData.emailIds}
            onChange={handleNumberChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">(₹{serviceCosts.emailCost} per 500MB)</InputAdornment>,
              inputProps: { min: 0 }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Content Writer Needed?</InputLabel>
            <Select
              name="contentWriter"
              value={formData.contentWriter}
              onChange={handleChange}
              label="Content Writer Needed?"
            >
              <MenuItem value="no">No, I will provide content</MenuItem>
              <MenuItem value="basic">Basic Content (₹{serviceCosts.contentWriterBasic.toLocaleString()})</MenuItem>
              <MenuItem value="premium">Premium Content (₹{serviceCosts.contentWriterPremium.toLocaleString()})</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Total and Submission */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Box sx={{ 
            p: 3, 
            backgroundColor: '#f5f5f5', 
            borderRadius: 1,
            borderLeft: '4px solid #3f51b5'
          }}>
            <Typography variant="h5" gutterBottom>
              Total Cost: ₹{calculateTotal().toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Note: All prices exclude GST 18%. Any paid theme, plugin, or third-party software must be provided by the client. 
              Domain and hosting require yearly renewal.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            disabled={submitting}
            sx={{ px: 6, py: 1.5 }}
          >
            {submitting ? 'Submitting...' : 'Get Your Quote Now'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EcommerceForm;