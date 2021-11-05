import { INombre } from "../interface/INombre";

export const concatenarNombre = (nombre: INombre): string => {
    let resultado: string

    if (!(nombre.segundoApellido && nombre.segundoApellido)) {
        resultado = `${nombre.primerNombre.trim()} ${nombre.primerApellido.trim()}`;
    } else {
        resultado = `${nombre.primerNombre.trim()} ${nombre.segundoNombre?.trim()} ${nombre.primerApellido.trim()} ${nombre.segundoApellido.trim()}`;
    };
    return resultado
};
