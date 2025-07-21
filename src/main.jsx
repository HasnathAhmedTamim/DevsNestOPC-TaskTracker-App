import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from 'react-hot-toast';

// Test SweetAlert2 import
import Swal from 'sweetalert2';
console.log('SweetAlert2 imported successfully:', Swal);

// Add a global test function for easy testing
window.testSwal = () => {
  console.log('Testing SweetAlert2 from window.testSwal...');
  Swal.fire({
    title: 'Global Test',
    text: 'SweetAlert2 is working from global function!',
    icon: 'success'
  });
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-right" />
    </Provider>
  </StrictMode>,
)
