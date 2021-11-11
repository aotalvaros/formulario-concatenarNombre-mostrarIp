import { obtenerIp } from '../../domain/obtenerIp';
import { mockFunction } from '../../helpers/JestHelpers';

jest.mock('../../domain/obtenerIp');

describe('Obtener IP', () => {

    const obtenerIpMock = mockFunction(obtenerIp);

    test('debe devolver la direccion ip', async() => {     
        const respuesta = '10.0.0.0'
        obtenerIpMock.mockResolvedValue(respuesta);

       await obtenerIp().then(data => expect(data).toEqual('10.0.0.0'));
    });
    
    test('debe devolver un error', async() => {
        const respuesta = 'Error de conexion';
        obtenerIpMock.mockResolvedValue(respuesta);
    
       await obtenerIp().catch(error => {
            expect(error).toBe('Error de conexion');
        });
    });

});
