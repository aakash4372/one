const mongoose = require('mongoose');

const informationalQuoteSchema = new mongoose.Schema({
  websiteName: { type: String, required: true },
  fullName: { type: String, required: true },
  whatsappNo: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
  wordpressDesign: { type: Boolean, default: false },
  homepageDesign: { type: Boolean, default: false },
  language: { type: String, required: true },
  pages: { type: Number, min: 1, required: true },
  websiteType: { type: String, required: true },
  pageCost: { type: Number, min: 0, required: true },
  banners: { type: Number, min: 0, default: 0 },
  contentWriter: { type: String, default: 'no' },
  logoDesign: { type: Boolean, default: false },
  imageGallery: { type: Boolean, default: false },
  blogFunction: { type: Boolean, default: false },
  socialMedia: { type: Boolean, default: false },
  contactForm: { type: Boolean, default: false },
  sslCertificate: { type: Boolean, default: false },
  domainHosting: { type: Boolean, default: true }, // Changed to true
  analytics: { type: Boolean, default: false },
  maintenance: { type: Boolean, default: false },
  professionalEmails: { type: Number, min: 0, default: 0 },
  message: { type: String, default: '' },
  totalCost: { type: Number, min: 0 }
}, {
  timestamps: true,
});

informationalQuoteSchema.pre('save', function(next) {
  // Validate pageCost
  let expectedPageCost = 0;
  const baseCost = this.language === 'html' ? 3000 : 5000;
  const staticPerPageCost = this.language === 'html' ? 1000 : 1500;
  const dynamicPerPageCost = this.language === 'html' ? 1500 : 2000;

  if (this.websiteType === 'single_static') {
    expectedPageCost = baseCost;
    this.pages = 1;
  } else if (this.websiteType === 'multi_static') {
    expectedPageCost = baseCost + (staticPerPageCost * (this.pages - 1));
  } else if (this.websiteType === 'single_dynamic') {
    expectedPageCost = this.language === 'html' ? 3000 : 5000;
    this.pages = 1;
  } else if (this.websiteType === 'multi_dynamic') {
    expectedPageCost = baseCost + (dynamicPerPageCost * (this.pages - 1));
  }

  if (this.pageCost !== expectedPageCost) {
    return next(new Error(`Invalid pageCost. Expected: ${expectedPageCost}, Received: ${this.pageCost}`));
  }

  // Calculate totalCost
  this.totalCost = 
    (this.wordpressDesign ? 3000 : 0) +
    (this.homepageDesign ? 1000 : 0) +
    (this.pageCost || 0) +
    (this.banners * 500) +
    (this.logoDesign ? 1000 : 0) +
    (this.imageGallery ? 500 : 0) +
    (this.blogFunction ? 500 : 0) +
    (this.domainHosting ? 2500 : 0) +
    (this.analytics ? 2000 : 0) +
    (this.professionalEmails > 5 ? (this.professionalEmails - 5) * 300 : 0);

  next();
});

module.exports = mongoose.model('InformationalQuote', informationalQuoteSchema);