'use client';

import toast from 'react-hot-toast';

const toastSuccess = (message, theme) => {
  return toast.success(message, {
    style: {
      color: `${theme === 'dark' ? 'white' : '#1f2937'}`,
      backgroundColor: `${theme === 'dark' ? '#1f2937' : 'white'}`,
      outline: `${theme === 'dark' ? '2px solid #ffffff' : 'none'}`,
      textAlign: 'center',
    },
  });
};

const toastError = (message, theme) => {
  return toast.error(message, {
    style: {
      color: `${theme === 'dark' ? 'white' : '#1f2937'}`,
      backgroundColor: `${theme === 'dark' ? '#1f2937' : 'white'}`,
      outline: `${theme === 'dark' ? '2px solid #ffffff' : 'none'}`,
      textAlign: 'center',
    },
  });
};

export { toastSuccess, toastError };
