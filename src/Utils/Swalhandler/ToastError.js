import Swal from 'sweetalert2';

export const showToast = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    iconColor: 'white',
    customClass: {
      popup: 'color-toast',
    },
    timerProgressBar: true,
    showConfirmButton: false,
    timer: 3000,
  });
  return Toast.fire({
    icon: 'warning',
    title: message,
    color: 'white',
  });
};
