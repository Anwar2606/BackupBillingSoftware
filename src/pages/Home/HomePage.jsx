// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { collection, query, where, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore'; // Import Timestamp here
// import { db } from '../../pages/firebase'; // Adjust the path to your firebase.js
// import './HomePage.css'
// import GraphComponent from '../Chart/SalesComparisonChart';
// import SalesComparisonChart from '../Chart/SalesComparisonChart';
// import Grid from '../Grid/Grid';

// const HomePage = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [details, setDetails] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       setLoading(true);
//       const startOfDay = new Date(selectedDate);
//       startOfDay.setHours(0, 0, 0, 0);
//       const endOfDay = new Date(selectedDate);
//       endOfDay.setHours(23, 59, 59, 999);
      
//       const startTimestamp = Timestamp.fromDate(startOfDay);
//       const endTimestamp = Timestamp.fromDate(endOfDay);

//       const detailsQuery = query(
//         collection(db, 'billing'), // Change 'billing' to your collection name
//         where('date', '>=', startTimestamp),
//         where('date', '<=', endTimestamp)
//       );

//       try {
//         const querySnapshot = await getDocs(detailsQuery);
//         const detailsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setDetails(detailsData);
//       } catch (error) {
//         console.error('Error fetching details: ', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [selectedDate]);

//   const handleDelete = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'billing', id)); // Adjust 'billing' to your collection name
//       setDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
//       console.log('Document successfully deleted!');
//     } catch (error) {
//       console.error('Error deleting document: ', error);
//     }
//     window.location.reload();
//   };

//   return (
    
//     <div>
//         <Grid/>
//         <SalesComparisonChart/>
//       <h2>Details By Date</h2>
      

//       <DatePicker
//         selected={selectedDate}
//         onChange={(date) => setSelectedDate(date)}
//         dateFormat="dd/MM/yyyy"
//         className="custom-datepicker"
//       />
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="table-container">
//           {details.length === 0 ? (
//             <p>No details recorded on this date.</p>
//           ) : (
//             <table className="details-table">
//               <thead>
//                 <tr>
//                   <th>Customer Name</th>
//                   <th>Discount Amount</th>
//                   <th>CGST Amount</th>
//                   <th>SGST Amount</th>  
//                   <th>IGST Amount</th>
//                   <th>Total Amount</th>
//                   <th>Date</th>
//                   <th>Action</th> {/* Add a column for action buttons */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {details.map(detail => (
//                   <tr key={detail.id}>
//                     <td>{detail.customerName}</td>
//                     <td>₹{detail.discountedTotal ? detail.discountedTotal.toFixed(2) : 'N/A'}</td>
//                     <td>₹{detail.cgstAmount ? detail.cgstAmount.toFixed(2) : 'N/A'}</td>
//                     <td>₹{detail.sgstAmount ? detail.sgstAmount.toFixed(2) : 'N/A'}</td>
//                     <td>₹{detail.sigstAmount ? detail.igstAmount.toFixed(2) : 'N/A'}</td>
//                     <td>₹{detail.totalAmount}</td>
//                     <td>{new Date(detail.date.seconds * 1000).toLocaleString()}</td>
//                     <td>
//                       <button onClick={() => handleDelete(detail.id)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
            
//           )}
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default HomePage;
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { collection, query, where, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../../pages/firebase';
import './HomePage.css';
import GraphComponent from '../Chart/SalesComparisonChart';
import SalesComparisonChart from '../Chart/SalesComparisonChart';
import Grid from '../Grid/Grid';

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      const startTimestamp = Timestamp.fromDate(startOfDay);
      const endTimestamp = Timestamp.fromDate(endOfDay);

      const detailsQuery = query(
        collection(db, 'billing'),
        where('date', '>=', startTimestamp),
        where('date', '<=', endTimestamp)
      );

      try {
        const querySnapshot = await getDocs(detailsQuery);
        const detailsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDetails(detailsData);
      } catch (error) {
        console.error('Error fetching details: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [selectedDate]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'billing', id));
      setDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
    window.location.reload();
  };

  return (
    <div>
      <Grid />
      <SalesComparisonChart />
      <h2>Details By Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        className="custom-datepicker"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          {details.length === 0 ? (
            <p>No details recorded on this date.</p>
          ) : (
            <table className="details-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Discount Amount</th>
                  <th>CGST Amount</th>
                  <th>SGST Amount</th>
                  <th>IGST Amount</th>
                  <th>Total Amount</th>
                  {/* <th>Date</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {details.map(detail => (
                  <tr key={detail.id}>
                    <td>{detail.customerName}</td>
                    <td>₹{detail.discountedTotal ? detail.discountedTotal.toFixed(2) : 'N/A'}</td>
                    <td>₹{detail.cgstAmount ? detail.cgstAmount.toFixed(2) : 'N/A'}</td>
                    <td>₹{detail.sgstAmount ? detail.sgstAmount.toFixed(2) : 'N/A'}</td>
                    <td>₹{detail.sigstAmount ? detail.igstAmount.toFixed(2) : 'N/A'}</td>
                    <td>₹{detail.totalAmount}</td>
                    {/* <td>{new Date(detail.date.seconds * 1000).toLocaleString()}</td> */}
                    <td>
                      <button onClick={() => handleDelete(detail.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
