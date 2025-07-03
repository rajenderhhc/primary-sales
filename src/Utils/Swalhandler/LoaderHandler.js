import Swal from 'sweetalert2';

export const LoaderOpen = (
  message = 'Please Wait Loading ...',
  msgtitle = ''
) => {
  return Swal.fire({
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
    title: msgtitle,
    text: message,
  });
};

export const LoaderClose = () => {
  return Swal.close();
};
