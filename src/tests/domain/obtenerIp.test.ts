import { obtenerIp } from '../../domain/obtenerIp';
import { mockFunction } from '../../helpers/JestHelpers';

jest.mock('../../domain/obtenerIp');

describe('Obtener IP', () => {

    let respuesta: any;
    const obtenerIpMock: jest.MockedFunction<() => Promise<any>> = mockFunction(obtenerIp);

    test('debe devolver la direccion ip', async() => {     
        respuesta = '10.0.0.0'
        obtenerIpMock.mockResolvedValue(respuesta);

       await obtenerIp().then(data => expect(data).toEqual('10.0.0.0'));
    });

    test('debe devolver la direccion ip, segunda prueba', async() => {     
        respuesta = '170.0.80.10'
        obtenerIpMock.mockResolvedValue(respuesta);

       await obtenerIp().then(data => expect(data).toEqual('170.0.80.10'));
    });

    test('debe devolver la direccion ip, tercera prueba', async() => {     
        respuesta = '181.71.45.27'
        obtenerIpMock.mockResolvedValue(respuesta);

       await obtenerIp().then(data => expect(data).toEqual('181.71.45.27'));
    });
    
    test('debe devolver un error', async() => {
        respuesta = 'Error de conexion';
        obtenerIpMock.mockResolvedValue(respuesta);
    
       await obtenerIp().catch(error => {
            expect(error).toBe('Error de conexion');
        });
    });

});
