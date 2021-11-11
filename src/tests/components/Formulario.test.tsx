import '@testing-library/jest-dom';
import { shallow, ShallowWrapper } from 'enzyme';
import { Formulario } from '../../components/Formulario'
import { concatenarNombre } from '../../domain/concatenarNombre';
import { calcularEdad } from '../../domain/calcularEdad';
import { mockFunction } from '../../helpers/JestHelpers';
import Swal from 'sweetalert2';
import { IEdad } from '../../interface/IEdad';
import { obtenerIp } from '../../domain/obtenerIp';

jest.mock('../../domain/concatenarNombre');
jest.mock('../../domain/calcularEdad');
jest.mock('sweetalert2');
jest.mock('../../domain/obtenerIp');

describe('Debe crear el formulario de registro', () => {
    
    let wrapper: ShallowWrapper;
    let concatenarNombreMock: any;
    let calcularEdadMock: any;
    let sweetAlertMock: any;
    let obtenerIpMock: any;

    beforeAll(() => {
        wrapper = shallow(<Formulario/>);
        concatenarNombreMock = mockFunction(concatenarNombre);
        calcularEdadMock = mockFunction(calcularEdad);
        sweetAlertMock = mockFunction(Swal.fire);
        obtenerIpMock = mockFunction(obtenerIp);
    });

    test('debe mostrar un         expect(Swal.fire).toBeCalled();alerta de saludo cuando se ingrese todos los campos', () => {      
        const mensaje: string = 'Hola Andres Dario Otalvaro Sanchez, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 33 años !';
        const resultadoCalcularEdad: IEdad = { edad: 33, error: ''};
        wrapper.find("#formControlPrimerNombre").simulate('change', { target: { value: 'Andres' } });
        wrapper.find("#formControlSegundoNombre").simulate('change', { target: { value: 'Dario' } });
        wrapper.find("#formControlPrimerApellido").simulate('change', { target: { value: 'Otalvaro' } });
        wrapper.find("#formControlSegundoApellido").simulate('change', { target: { value: 'Sanchez' } });
        wrapper.find("#formControlCorreo").simulate('change', { target: { value: 'andres@gmail.com' } });
        wrapper.find("#formControlTelefono").simulate('change', { target: { value: '123456' } });
        wrapper.find("#datePickerFechaNacimiento").simulate('change',{ target: {value: '12/05/1988'}})

        concatenarNombreMock.mockReturnValue('Andres Dario Otalvaro Sanchez');
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        sweetAlertMock.mockResolvedValue({
            isConfirmed: true,
        });
        obtenerIpMock.mockResolvedValue({
            ip: '10.0.0.0'
        });
              
        wrapper.find('#formulario').simulate('submit', {
            preventDefault: () => {},
            stopPropagation: () => {},
            currentTarget: {
                checkValidity: jest.fn().mockReturnValue(true)            
            }
        });   
  
        expect(sweetAlertMock).toHaveBeenCalledWith(mensaje);
    });

    test('debe mostrar un alerta de error cuando se ingresa una fecha mayor a la actual', () => {      
        const resultadoCalcularEdad: IEdad = { edad: 0, error: 'Año invalido'};
        concatenarNombreMock.mockReturnValue('Andres Dario Otalvaro Sanchez');
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);

        sweetAlertMock.mockReturnValue(resultadoCalcularEdad.error)
        wrapper.find('#formulario').simulate('submit', {
            preventDefault: () => {},
            stopPropagation: () => {},
            currentTarget: {
                checkValidity: jest.fn().mockReturnValue(true)            
            }
        });   
        expect(sweetAlertMock).toHaveBeenCalledWith({icon: 'error',
            title: 'Año invalido',});
    });

    test('No debe mostrar la alerta cuando el formulario no sea valido', () => {      
        wrapper.find('#formulario').simulate('submit', {
            preventDefault: () => {},
            stopPropagation: () => {},
            currentTarget: {
                checkValidity: jest.fn().mockReturnValue(false)            
            }
        });   
  
        expect(sweetAlertMock).not.toHaveBeenCalled();
    });

});
