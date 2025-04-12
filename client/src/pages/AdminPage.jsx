// src/pages/AdminPage.jsx
import { useState, useEffect } from 'react'
import { Box, Typography, Button, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminPage = () => {
  const [tabValue, setTabValue] = useState(0)
  const [informationalQuotes, setInformationalQuotes] = useState([])
  const [ecommerceQuotes, setEcommerceQuotes] = useState([])

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quotes/all')
      setInformationalQuotes(response.data.informational)
      setEcommerceQuotes(response.data.ecommerce)
    } catch (error) {
      toast.error('Error fetching quotes')
      console.error(error)
    }
  }

  const handleDelete = async (type, id) => {
    try {
      await axios.delete(`http://localhost:5000/api/quotes/${type}/${id}`)
      toast.success('Quote deleted successfully')
      fetchQuotes()
    } catch (error) {
      toast.error('Error deleting quote')
      console.error(error)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="Informational Quotes" />
        <Tab label="E-commerce Quotes" />
      </Tabs>

      {tabValue === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Website Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {informationalQuotes.map((quote) => (
                <TableRow key={quote._id}>
                  <TableCell>{quote.websiteName}</TableCell>
                  <TableCell>
                    {quote.fullName}<br />
                    {quote.email}<br />
                    {quote.whatsappNo}
                  </TableCell>
                  <TableCell>₹{quote.totalCost?.toLocaleString()}</TableCell>
                  <TableCell>{new Date(quote.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete('informational', quote._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Website Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ecommerceQuotes.map((quote) => (
                <TableRow key={quote._id}>
                  <TableCell>{quote.websiteName}</TableCell>
                  <TableCell>
                    {quote.fullName}<br />
                    {quote.email}<br />
                    {quote.whatsappNo}
                  </TableCell>
                  <TableCell>₹{quote.totalCost?.toLocaleString()}</TableCell>
                  <TableCell>{new Date(quote.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete('ecommerce', quote._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default AdminPage