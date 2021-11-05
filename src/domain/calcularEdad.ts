import { IEdad } from "../interface/IEdad";

export const calcularEdad = (fechaNacimiento: Date): IEdad => {
    const fechaActual = new Date();
    const anioActual: number = fechaActual.getFullYear();
    let resultadoEdad: IEdad = {edad: 0, error: ''};
    
    if ( fechaNacimiento.getFullYear() > anioActual) {
       resultadoEdad.error = 'Año invalido';
    } else {
       resultadoEdad.edad = anioActual - fechaNacimiento.getFullYear();
    };
    
    return resultadoEdad;
};