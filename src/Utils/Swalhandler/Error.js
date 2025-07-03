import Swal from 'sweetalert2';

export const handleApiError = (error) => {
  // if (error.response?.status === 401) {
  //   // Redirect to the login page
  //   window.location.href = '/login';
  //   return;
  // }

  return Swal.fire({
    icon: 'error',
    title: error.response ? error.response.status : error.message,
    text: error.response
      ? `${error.response.data.message ?? 'Oops Something went wrong !'}`
      : 'Oops Something went wrong !',
    showCloseButton: true,
    confirmButtonText: 'OK',
  });

  //  position: 'top',
};
