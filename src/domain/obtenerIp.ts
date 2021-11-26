
export const obtenerIp = (): Promise<any> => {

    return fetch("https://api.ipify.org/?format=json")
        .then((respuesta: Response) => respuesta.json().then(datos => datos.ip))
        .catch(error => resolverError(error));                                
};

const resolverError = (error: any): string => { 
    return 'Error de conexion';
};