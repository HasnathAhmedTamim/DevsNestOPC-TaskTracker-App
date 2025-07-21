import Swal from 'sweetalert2';

/**
 * Sweet Alert utility functions for consistent UI across the app
 */

export const confirmDelete = async (itemName = 'item') => {
  const result = await Swal.fire({
    title: 'Delete Item?',
    text: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title',
      content: 'swal-content',
      confirmButton: 'swal-confirm-btn',
      cancelButton: 'swal-cancel-btn'
    }
  });
  
  return result.isConfirmed;
};

export const showSuccess = async (title = 'Success!', message = 'Operation completed successfully.', timer = 2000) => {
  return await Swal.fire({
    title,
    text: message,
    icon: 'success',
    timer,
    showConfirmButton: false,
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title'
    }
  });
};

export const showError = async (title = 'Error!', message = 'Something went wrong.') => {
  return await Swal.fire({
    title,
    text: message,
    icon: 'error',
    confirmButtonColor: '#dc2626',
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title',
      confirmButton: 'swal-confirm-btn'
    }
  });
};

export const showInfo = async (title = 'Info', message = 'Information message.') => {
  return await Swal.fire({
    title,
    text: message,
    icon: 'info',
    confirmButtonColor: '#3b82f6',
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title',
      confirmButton: 'swal-confirm-btn'
    }
  });
};

export const confirmAction = async (title = 'Confirm Action', message = 'Are you sure you want to proceed?', confirmText = 'Yes, proceed!') => {
  const result = await Swal.fire({
    title,
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#6b7280',
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title',
      content: 'swal-content',
      confirmButton: 'swal-confirm-btn',
      cancelButton: 'swal-cancel-btn'
    }
  });
  
  return result.isConfirmed;
};
