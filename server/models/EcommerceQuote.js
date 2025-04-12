// models/EcommerceQuote.js
const mongoose = require('mongoose');

const ecommerceQuoteSchema = new mongoose.Schema({
  websiteName: String,
  fullName: String,
  whatsappNo: String,
  email: String,
  cmsSetup: Number,
  customDesign: Number,
  banners: Number,
  bannerCost: Number,
  productPhotos: Number,
  photoCost: Number,
  contentWriter: String,
  categoriesProducts: Number,
  categoryProductCost: Number,
  paymentGateway: Number,
  discountsCoupons: Number,
  shippingIntegration: Number,
  taxCalculation: Number,
  sslCertificate: Number,
  contactForm: Number,
  socialMedia: Number,
  maintenance: Number,
  responsiveDesign: Number,
  emailIds: Number,
  emailCost: Number,
  totalCost: Number,
}, {
  timestamps: true,
});

// Calculate total before saving
ecommerceQuoteSchema.pre('save', function(next) {
  this.totalCost = 
    (this.cmsSetup || 0) +
    (this.customDesign || 0) +
    (this.banners * this.bannerCost || 0) +
    (this.productPhotos * this.photoCost || 0) +
    (this.categoriesProducts * this.categoryProductCost || 0) +
    (this.paymentGateway || 0) +
    (this.discountsCoupons || 0) +
    (this.shippingIntegration || 0) +
    (this.taxCalculation || 0) +
    (this.sslCertificate || 0) +
    (this.contactForm || 0) +
    (this.socialMedia || 0) +
    (this.maintenance || 0) +
    (this.responsiveDesign || 0) +
    (this.emailIds * this.emailCost || 0);
  next();
});

module.exports = mongoose.model('EcommerceQuote', ecommerceQuoteSchema);