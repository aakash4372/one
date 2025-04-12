const express = require('express');
const router = express.Router();
const InformationalQuote = require('../models/InformationalQuote');
const EcommerceQuote = require('../models/EcommerceQuote');

// Submit Informational Quote
router.post('/informational', async (req, res) => {
  try {
    const quote = new InformationalQuote(req.body);
    await quote.save();
    res.status(201).json({ message: 'Quote saved successfully', quote });
  } catch (error) {
    console.error('Error saving informational quote:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Submit E-commerce Quote
router.post('/ecommerce', async (req, res) => {
  try {
    const quote = new EcommerceQuote(req.body);
    await quote.save();
    res.status(201).json({ message: 'Quote saved successfully', quote });
  } catch (error) {
    console.error('Error saving ecommerce quote:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get All Quotes for Admin
router.get('/all', async (req, res) => {
  try {
    const [informational, ecommerce] = await Promise.all([
      InformationalQuote.find().sort({ createdAt: -1 }),
      EcommerceQuote.find().sort({ createdAt: -1 })
    ]);
    res.json({ informational, ecommerce });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Delete Informational Quote
router.delete('/informational/:id', async (req, res) => {
  try {
    const quote = await InformationalQuote.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Error deleting informational quote:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Delete E-commerce Quote
router.delete('/ecommerce/:id', async (req, res) => {
  try {
    const quote = await EcommerceQuote.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Error deleting ecommerce quote:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;