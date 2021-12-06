
export const obtenerIp = (): Promise<any> => {
    const axios = require('axios').default;

    return axios.get("https://api.ipify.org/?format=json")
        .then((response: any) => response.data ? response.data.ip : "")
        .catch((error: any) => resolverError(error));                                
};

const resolverError = (error: any): Promise<any> => {
    console.error(error);  
    return Promise.reject('Error de conexion');   
};

