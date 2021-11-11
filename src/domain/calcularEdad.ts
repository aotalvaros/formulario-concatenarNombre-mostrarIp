import { IEdad } from "../interface/IEdad";

export const calcularEdad = (fechaNacimiento: Date): IEdad => {
   const anioActual: number = new Date().getFullYear(); 
   let resultadoEdad: IEdad = { edad: 0, error: '' };
    
   if (fechaNacimiento.getFullYear() > anioActual) {
      resultadoEdad.error = 'Ups! ingresa una fecha que no sea mayor a la actual';
   } else {
      resultadoEdad.edad = anioActual - fechaNacimiento.getFullYear();
   };
    
   return resultadoEdad;
};