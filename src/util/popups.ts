import Swal from 'sweetalert2';


export function infoPopup (title:string){
    Swal.fire({
        position: "center",
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            icon: 'iconStyle',
            title: 'titleStyle' // Apply custom class to the title
        }
      })
} 

export function errorPopup (title:string){
    Swal.fire({
        icon: "error",
        title: "Incorrect User name or password",
        customClass: {
            icon: 'iconStyle',
            title: 'titleStyle' // Apply custom class to the title
        }
      });
}