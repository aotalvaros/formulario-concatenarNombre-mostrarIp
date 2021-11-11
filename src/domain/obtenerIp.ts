
export const obtenerIp = (): Promise<Response> => {

    return fetch("https://api.ipify.or/?format=json")
        .then((respuesta: Response) => respuesta.json().then(datos => datos.ip))
        .catch(error => resolverError(error));                                
};

const resolverError = (error: any): string => { 
    return 'Error de conexion';
};