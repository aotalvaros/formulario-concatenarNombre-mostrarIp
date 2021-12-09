import axios, { AxiosError, AxiosResponse } from 'axios';
import { IResponseIP } from '../interface/IResponseIP';

export const obtenerIp = (): Promise<string> => {

    return axios.get("https://api.ipify.org/?format=json")
        .then((response: AxiosResponse<IResponseIP>) => response.data ? response.data.ip : "")
        .catch(resolverError);                                
};

const resolverError = (error: AxiosError): Promise<string> => {
    console.log('Error consumiendo el servicio de obtener IP por => ', error);  
    return Promise.reject('Error de conexion');   
};

