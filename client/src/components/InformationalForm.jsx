import React, { useState, useEffect } from 'react';
import { 
  Box, TextField, Button, Typography, Grid, FormControl, 
  InputLabel, Select, MenuItem, Radio, RadioGroup, 
  FormControlLabel 
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const InformationalForm = () => {
  const [formData, setFormData] = useState({
    websiteName: '',
    fullName: '',
    whatsappNo: '',
    phoneNo: '',
    email: '',
    wordpressDesign: false,
    homepageDesign: false,
    language: '',
    pages: 1,
    websiteType: '',
    pageCost: 0,
    banners: 0,
    contentWriter: 'no',
    logoDesign: false,
    imageGallery: false,
    blogFunction: false,
    socialMedia: true,
    contactForm: true,
    sslCertificate: true,
    domainHosting: true,
    analytics: false,
    maintenance: true,
    professionalEmails: 0,
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (formData.language && formData.websiteType) {
      let pageCost = 0;
      let pages = formData.pages;
      const baseCost = formData.language === 'html' ? 3000 : 5000;
      const staticPerPageCost = formData.language === 'html' ? 1000 : 1500;
      const dynamicPerPageCost = formData.language === 'html' ? 1500 : 2000;

      if (formData.websiteType === 'single_static') {
        pageCost = baseCost;
        pages = 1;
      } else if (formData.websiteType === 'multi_static') {
        pageCost = baseCost + (staticPerPageCost * (formData.pages - 1));
      } else if (formData.websiteType === 'single_dynamic') {
        pageCost = formData.language === 'html' ? 3000 : 5000;
        pages = 1;
      } else if (formData.websiteType === 'multi_dynamic') {
        pageCost = baseCost + (dynamicPerPageCost * (formData.pages - 1));
      }

      setFormData(prev => ({
        ...prev,
        pageCost,
        pages
      }));
    }
  }, [formData.language, formData.websiteType, formData.pages]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotalCost = () => {
    return (
      (formData.wordpressDesign ? 3000 : 0) +
      (formData.homepageDesign ? 1000 : 0) +
      (formData.pageCost || 0) +
      (formData.banners * 500) +
      (formData.contentWriter === 'yes' ? 2000 : 0) +
      (formData.logoDesign ? 1000 : 0) +
      (formData.imageGallery ? 500 : 0) +
      (formData.blogFunction ? 500 : 0) +
      (formData.domainHosting ? 2500 : 0) +
      (formData.analytics ? 2000 : 0) +
      (formData.professionalEmails > 5 ? (formData.professionalEmails - 5) * 300 : 0)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const submissionData = {
        ...formData,
        pageCost: formData.pageCost || 0,
        totalCost: calculateTotalCost()
      };

      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/quotes/informational`, submissionData);
      toast.success('Quote submitted successfully!');
      
      setFormData({
        websiteName: '',
        fullName: '',
        whatsappNo: '',
        phoneNo: '',
        email: '',
        wordpressDesign: false,
        homepageDesign: false,
        language: '',
        pages: 1,
        websiteType: '',
        pageCost: 0,
        banners: 0,
        contentWriter: 'no',
        logoDesign: false,
        imageGallery: false,
        blogFunction: false,
        socialMedia: true,
        contactForm: true,
        sslCertificate: true,
        domainHosting: true,
        analytics: false,
        maintenance: true,
        professionalEmails: 0,
        message: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(`Error submitting quote: ${error.response?.data?.error || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {/* Basic Information */}
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
            label="Phone Number"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
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

        {/* Design Options */}
        <Grid item xs={12}>
          <Typography>Custom Website Design Using WordPress Plus Elementor</Typography>
          <FormControlLabel
            control={
              <Radio
                checked={formData.wordpressDesign}
                onChange={() => setFormData(prev => ({...prev, wordpressDesign: !prev.wordpressDesign}))}
                name="wordpressDesign"
                color="primary"
              />
            }
            label="₹3000"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>Homepage Design</Typography>
          <FormControlLabel
            control={
              <Radio
                checked={formData.homepageDesign}
                onChange={() => setFormData(prev => ({...prev, homepageDesign: !prev.homepageDesign}))}
                name="homepageDesign"
                color="primary"
              />
            }
            label="₹1000"
          />
        </Grid>

        {/* Language and Pages */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Select Language</InputLabel>
            <Select
              name="language"
              value={formData.language}
              onChange={handleChange}
              label="Select Language"
              required
            >
              <MenuItem value="html">HTML/CSS/JS</MenuItem>
              <MenuItem value="mern">MERN Stack</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Type of Website</InputLabel>
            <Select
              name="websiteType"
              value={formData.websiteType}
              onChange={handleChange}
              label="Type of Website"
              disabled={!formData.language}
              required
            >
              <MenuItem value="single_static">Single Page Static</MenuItem>
              <MenuItem value="multi_static">Multiple Pages Static</MenuItem>
              <MenuItem value="single_dynamic">Single Page Dynamic</MenuItem>
              <MenuItem value="multi_dynamic">Multiple Pages Dynamic</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="How many pages do you need?"
            name="pages"
            type="number"
            value={formData.pages}
            onChange={handleChange}
            InputProps={{ inputProps: { 
              min: 1,
              max: formData.websiteType.includes('single') ? 1 : 100 
            }}}
            disabled={!formData.websiteType || formData.websiteType.includes('single')}
            required
          />
        </Grid>

        {/* Additional Features */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="How many banners do you need?"
            name="banners"
            type="number"
            value={formData.banners}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <Typography>Do you need the help of a content writer for your website content?</Typography>
            <RadioGroup
              name="contentWriter"
              value={formData.contentWriter}
              onChange={handleRadioChange}
              row
            >
              <FormControlLabel value="no" control={<Radio />} label="No, I will provide the content" />
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography>Logo Design</Typography>
          <FormControlLabel
            control={
              <Radio
                checked={formData.logoDesign}
                onChange={() => setFormData(prev => ({...prev, logoDesign: !prev.logoDesign}))}
                name="logoDesign"
                color="primary"
              />
            }
            label="₹1000"
          />
          <Typography variant="caption" display="block" gutterBottom>
            Basic logo with 2 revisions only
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <Typography>Do You Need Image Gallery?</Typography>
            <RadioGroup
              name="imageGallery"
              value={formData.imageGallery}
              onChange={() => setFormData(prev => ({...prev, imageGallery: !prev.imageGallery}))}
              row
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <Typography>Do you need blog posting function?</Typography>
            <RadioGroup
              name="blogFunction"
              value={formData.blogFunction}
              onChange={() => setFormData(prev => ({...prev, blogFunction: !prev.blogFunction}))}
              row
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes (₹500)" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography>Social Media Integration</Typography>
          <FormControlLabel
            control={
              <Radio
                checked={formData.socialMedia}
                onChange={() => setFormData(prev => ({...prev, socialMedia: !prev.socialMedia}))}
                name="socialMedia"
                color="primary"
              />
            }
            label="Free"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography>Contact Form</Typography>
          <FormControlLabel
            control={
              <Radio
                checked={formData.contactForm}
                onChange={() => setFormData(prev => ({...prev, contactForm: !prev.contactForm}))}
                name="contactForm"
                color="primary"
              />
            }
            label="Free"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography>SSL Certificate</Typography>
          <FormControlLabel
            control={
              <Radio
                checked={formData.sslCertificate}
                onChange={() => setFormData(prev => ({...prev, sslCertificate: !prev.sslCertificate}))}
                name="sslCertificate"
                color="primary"
              />
            }
            label="Free"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography>Domain & Hosting</Typography>
          <FormControlLabel
            control={
              <Radio
                checked={formData.domainHosting}
                onChange={() => setFormData(prev => ({...prev, domainHosting: !prev.domainHosting}))}
                name="domainHosting"
                color="primary"
              />
            }
            label="₹2500"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <Typography>Would you like to implement analytics integration?</Typography>
            <RadioGroup
              name="analytics"
              value={formData.analytics}
              onChange={() => setFormData(prev => ({...prev, analytics: !prev.analytics}))}
              row
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes (₹2000)" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography>Maintenance and Support</Typography>
          <FormControlLabel
            control={
              <Radio
                checked={formData.maintenance}
                onChange={() => setFormData(prev => ({...prev, maintenance: !prev.maintenance}))}
                name="maintenance"
                color="primary"
              />
            }
            label="6 months"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Professional E-Mail IDs"
            name="professionalEmails"
            type="number"
            value={formData.professionalEmails}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0 } }}
            helperText="First 5 email IDs free, additional ₹300 per ID"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Informational Website Cost Calculations: ₹{calculateTotalCost().toLocaleString()}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Note: All Prices are excluding GST 18%. Any paid theme, plugin and third party software will be provided by client. 
            Domain and hosting renewal will be done yearly.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            fullWidth
            disabled={submitting || !formData.websiteName || !formData.fullName || !formData.whatsappNo || !formData.phoneNo || !formData.email || !formData.language || !formData.websiteType}
          >
            {submitting ? 'Submitting...' : 'Submit Quote'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InformationalForm;