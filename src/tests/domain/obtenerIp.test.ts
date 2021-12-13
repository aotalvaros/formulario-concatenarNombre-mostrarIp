import { obtenerIp } from '../../domain/obtenerIp';
import  axios, { AxiosError, AxiosResponse, AxiosStatic } from 'axios'

jest.mock('axios');

describe('Obtener IP', () => {
    let mockedAxios: jest.Mocked<AxiosStatic>
    
    beforeEach(() => {
        mockedAxios = axios as jest.Mocked<typeof axios>;
        jest.resetAllMocks();     
    });
    
    test('debe devolver la direccion ip', (done) => {    
        const mockedResponse: AxiosResponse = {
            config: {},
            data: {
                ip: "10.0.0.0"
            },
            headers: {},
            status: 200,
            statusText: 'OK'
        }
        mockedAxios.get.mockResolvedValue(mockedResponse);
        
        obtenerIp().then(ip => {
            expect(ip).toEqual("10.0.0.0");
            expect(mockedAxios.get).toHaveBeenCalledWith('https://api.ipify.org/?format=json');
            done();
        });

    });

    test('debe devolver la direccion ip, segunda prueba', (done) => {    
        const mockedResponse: AxiosResponse = {
            config: {},
            data: {
                ip: "107.19.24.30"
            },
            headers: {},
            status: 200,
            statusText: 'OK'
        }
        mockedAxios.get.mockResolvedValue(mockedResponse);
        
        obtenerIp().then(ip => {
            expect(ip).toEqual("107.19.24.30");
            expect(mockedAxios.get).toHaveBeenCalledWith('https://api.ipify.org/?format=json');
            done();
        });

    });

    test('debe devolver la direccion ip, tercera prueba', (done) => {    
        const mockedResponse: AxiosResponse = {
            config: {},
            data: {
                ip: "200.10.20.20"
            },
            headers: {},
            status: 200,
            statusText: 'OK'
        }
        mockedAxios.get.mockResolvedValue(mockedResponse);
        
        obtenerIp().then(ip => {
            expect(ip).toEqual("200.10.20.20");
            expect(mockedAxios.get).toHaveBeenCalledWith('https://api.ipify.org/?format=json');
            done();
        });

    });

    test('debe devolver un error', (done) => {
        const responseError: AxiosError = {
            config: {},
            isAxiosError: false,
            name: "Error",
            message: "Network Error",
            toJSON: jest.fn()
        }
        mockedAxios.get.mockRejectedValue(responseError)
    
        obtenerIp().catch(error => {
            expect(error).toBe('Error de conexion');
            expect(mockedAxios.get).toHaveBeenCalledWith('https://api.ipify.org/?format=json');
            done();
        });
    });
   
});
