// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage'; // Adjust if AdminPage is in `pages/`
import InformationalForm from './components/InformationalForm';
import EcommerceForm from './components/EcommerceForm';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [activeForm, setActiveForm] = useState('informational');

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <HomePage />
              <h1>Website Quotation Calculator</h1>
              <div className="button-group">
                <button
                  className={activeForm === 'informational' ? 'active' : ''}
                  onClick={() => setActiveForm('informational')}
                >
                  Informational Website
                </button>
                <button
                  className={activeForm === 'ecommerce' ? 'active' : ''}
                  onClick={() => setActiveForm('ecommerce')}
                >
                  E-commerce Website
                </button>
              </div>
              {activeForm === 'informational' ? <InformationalForm /> : <EcommerceForm />}
              <div className="admin-link">
                <a href="/admin">Admin Panel</a>
              </div>
            </div>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
