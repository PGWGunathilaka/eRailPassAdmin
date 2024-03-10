import Swal from 'sweetalert2';

const titleStyle = {
    fontsize: "14px" 
}

export function infoPopup (title:string){
    Swal.fire({
        position: "center",
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            title: 'titleStyle' // Apply custom class to the title
        }
      })
} 