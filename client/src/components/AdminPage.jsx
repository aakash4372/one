// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const AdminPage = () => {
//   const [quotes, setQuotes] = useState({ informational: [], ecommerce: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuotes = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quotes/all`);
//         setQuotes(res.data);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching quotes:', err);
//         setError('Failed to fetch quotes. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuotes();
//   }, []);

//   const handleDelete = async (id, type) => {
//     if (window.confirm('Are you sure you want to delete this quote?')) {
//       try {
//         await axios.delete(`${process.env.REACT_APP_API_URL}/api/quotes/${type}/${id}`);
//         setQuotes(prev => ({
//           ...prev,
//           [type]: prev[type].filter(quote => quote._id !== id)
//         }));
//       } catch (err) {
//         console.error('Error deleting quote:', err);
//         alert('Failed to delete quote. Please try again.');
//       }
//     }
//   };

//   if (loading) return <div className="loading">Loading quotes...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="admin-container">
//       <h1>Admin - Quotation List</h1>
//       <Link to="/" className="back-link">← Back to Home</Link>
      
//       <h2>Informational Quotes</h2>
//       {quotes.informational.length === 0 ? (
//         <p>No informational quotes found.</p>
//       ) : (
//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Website Name</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>WhatsApp</th>
//               <th>Total Cost</th>
//               <th>Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {quotes.informational.map(quote => (
//               <tr key={quote._id}>
//                 <td>{quote.websiteName}</td>
//                 <td>{quote.fullName}</td>
//                 <td>{quote.email}</td>
//                 <td>{quote.whatsappNo}</td>
//                 <td>₹{quote.totalCost?.toFixed(2)}</td>
//                 <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <button 
//                     onClick={() => handleDelete(quote._id, 'informational')}
//                     className="delete-btn"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <h2>E-commerce Quotes</h2>
//       {quotes.ecommerce.length === 0 ? (
//         <p>No e-commerce quotes found.</p>
//       ) : (
//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Website Name</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>WhatsApp</th>
//               <th>Total Cost</th>
//               <th>Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {quotes.ecommerce.map(quote => (
//               <tr key={quote._id}>
//                 <td>{quote.websiteName}</td>
//                 <td>{quote.fullName}</td>
//                 <td>{quote.email}</td>
//                 <td>{quote.whatsappNo}</td>
//                 <td>₹{quote.totalCost?.toFixed(2)}</td>
//                 <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <button 
//                     onClick={() => handleDelete(quote._id, 'ecommerce')}
//                     className="delete-btn"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminPage;