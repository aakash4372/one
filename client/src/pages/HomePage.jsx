// src/pages/HomePage.jsx
import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import InformationalForm from '../components/InformationalForm'
// import EcommerceForm from '../components/EcommerceForm'

const HomePage = () => {
  const [formType, setFormType] = useState(null)

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Get a Website Quote
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Button 
          variant={formType === 'informational' ? 'contained' : 'outlined'} 
          onClick={() => setFormType('informational')}
          sx={{ mr: 2 }}
        >
          Informational Website
        </Button>
        <Button 
          variant={formType === 'ecommerce' ? 'contained' : 'outlined'} 
          onClick={() => setFormType('ecommerce')}
        >
          E-commerce Website
        </Button>
      </Box>

      {formType === 'informational' && <InformationalForm />}
      {formType === 'ecommerce' && <></>}
    </Box>
  )
}

export default HomePage