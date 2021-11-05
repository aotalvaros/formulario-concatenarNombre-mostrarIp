import { IEdad } from "../interface/IEdad";
import { IFechaValidacion } from "../interface/IFechaValidacion";

export const calcularEdad = (edad: IEdad): IFechaValidacion => {
    const fecha: Date = new Date();
    const añoActual: number = fecha.getFullYear();
    let resultadoEdad: IFechaValidacion ={
        añoActual: 0,
        error: ''
    };

    if (edad.fechaDeNacimiento > añoActual) {
        resultadoEdad.error = 'Año invalido';
    } else {
        resultadoEdad.añoActual = añoActual - edad.fechaDeNacimiento;
    };

    return resultadoEdad;
}