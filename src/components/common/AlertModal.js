'use client';
import Swal from 'sweetalert2';
export default function AlertModal({
  icon = 'success',
  title,
  text,
  buttonText = 'OK',
  infoButtonText = 'No Cancel',
}) {
  const buttonColor =
    icon === 'error' || icon === 'info'
      ? 'bg-[#ed1010] hover:bg-red-700'
      : icon === 'success'
        ? 'bg-black hover:bg-gray-800'
        : '';
  const checkInfo =
    icon === 'info'
      ? 'flex border-[#999999] bg-white text-black border-2'
      : 'hidden';
  Swal.fire({
    html: `
     <div class="swal-container">
                
                <h2 class="swal-title">${title}</h2>
                <p class="swal-text">${text}</p>
                <button id="main-btn" class="text-white py-2   sm:py-3  w-full rounded-md text-lg font-medium ${buttonColor}">${buttonText}</button>
                <button class="${checkInfo} text-black flex justify-center items-center py-2   sm:py-3 mt-3 sm:mt-6 w-full rounded-lg text-lg font-medium ">${infoButtonText}</button>

              </div>
    `,
    icon,
    didOpen: () => {
      const icon = document.querySelector('.swal2-icon.swal2-info'); // <-- Sirf 'info' icon target karega
      if (icon) {
        icon.innerHTML = (
          <div style="font-size:40px; font-weight:bold;color:#ed1010">!</div>
        );
      }
      const mainBtn = document.getElementById('main-btn');
      if (mainBtn) {
        mainBtn.addEventListener('click', () => {
          if (
            buttonText === 'Close' ||
            buttonText === 'No Cancel' ||
            buttonText === 'Ok'
          ) {
            Swal.close();
          }
          if (buttonText === 'Login') {
            window.location.href = '/login'; // ya Next.js router push bhi kar sakte ho
          }
        });
      }
    },
    background: '#fff',
    showConfirmButton: false,
    customClass: {
      popup: 'no-default-padding ',
    },
  });
}
