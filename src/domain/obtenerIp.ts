
export const obtenerIp = (): Promise<any> => {
    const axios = require('axios').default;

    return axios.get("https://api.ipify.org/?format=json")
        .then(({data}: any) => data.ip)
        .catch((error: any) => resolverError(error));                                
};

const resolverError = (error: any): string => { 
    return 'Error de conexion';
};

