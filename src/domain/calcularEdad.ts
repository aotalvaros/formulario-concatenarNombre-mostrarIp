import { IEdad } from "../interface/IEdad";

export const calcularEdad = (fechaNacimiento: Date): IEdad => {
   const anioActual: number = new Date().getFullYear(); 
   let resultadoEdad: IEdad = { edad: 0, error: '' };
    
   if (fechaNacimiento.getFullYear() > anioActual) {
      resultadoEdad.error = 'Debes ingresar una fecha de nacimiento valida';
   } else {
      resultadoEdad.edad = anioActual - fechaNacimiento.getFullYear();
   };
    
   return resultadoEdad;
};