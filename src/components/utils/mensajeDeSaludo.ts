import Swal, { SweetAlertResult } from "sweetalert2";
import { calcularEdad } from "../../domain/calcularEdad";
import { concatenarNombre } from "../../domain/concatenarNombre";
import { obtenerIp } from "../../domain/obtenerIp";
import { IEdad } from "../../interface/IEdad";
import { INombre } from "../../interface/INombre";

export const saludar = (nombre: INombre, fechaNacimiento: Date, resetForm: any) => {
    
    const nombreConcatenado = concatenarNombre(nombre);
    const { edad, error }: IEdad = calcularEdad(fechaNacimiento);

    if (error) {
        Swal.fire({
            icon: "error",
            title: error,
          });
    } else {
      Swal.fire({
        title: `Hola ${nombreConcatenado}, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices ${edad} años !`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonText: 'OK',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return obtenerIp().then().catch(error => {})
        }
      }).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          obtenerIp().then((ip) => { 
            Swal.fire({ 
              title: `Tu direccion ip es : ${ip}`, 
              icon: "success", 
              allowOutsideClick: false, 
              allowEscapeKey: false, 
              allowEnterKey: false
            });
          }).catch((error) => {
            Swal.fire({ 
              title: error, 
              icon: "error", 
              allowOutsideClick: false, 
              allowEscapeKey: false, 
              allowEnterKey: false
            });
          }).finally(() => resetForm());         
        }
      });
    }
  };