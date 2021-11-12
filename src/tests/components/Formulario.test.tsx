import '@testing-library/jest-dom';
import { shallow, ShallowWrapper } from 'enzyme';
import { Formulario } from '../../components/Formulario'
import { concatenarNombre } from '../../domain/concatenarNombre';
import { calcularEdad } from '../../domain/calcularEdad';
import { mockFunction } from '../../helpers/JestHelpers';
import Swal from 'sweetalert2';
import { IEdad } from '../../interface/IEdad';
import { obtenerIp } from '../../domain/obtenerIp';
import { INombre } from '../../interface/INombre';

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

    const primerNombre: string = "Andres";
    const segundoNombre: string = "Dario";
    const primerApellido: string = "Otalvaro";
    const segundoApellido: string =  "Sanchez";
    const anioNacimiento = '1988';
    const nombre: INombre = {
        primerNombre: primerNombre,
        segundoNombre: segundoNombre, 
        primerApellido: primerApellido,
        segundoApellido: segundoApellido
    };
    let mensaje: string;

    beforeAll(() => {
        wrapper = shallow(<Formulario/>);
        concatenarNombreMock = mockFunction(concatenarNombre);
        calcularEdadMock = mockFunction(calcularEdad);
        sweetAlertMock = mockFunction(Swal.fire);
        obtenerIpMock = mockFunction(obtenerIp);
    });

    beforeEach(() => {
        mensaje = 'Hola Andres Dario Otalvaro Sanchez, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 33 años !';
        wrapper.find("#formControlPrimerNombre").simulate('change', { target: { value: primerNombre, name: 'primerNombre' } });
        wrapper.find("#formControlSegundoNombre").simulate('change', { target: { value: segundoNombre, name: 'segundoNombre' } });
        wrapper.find("#formControlPrimerApellido").simulate('change', { target: { value: primerApellido, name: 'primerApellido' } });
        wrapper.find("#formControlSegundoApellido").simulate('change', { target: { value: segundoApellido, name: 'segundoApellido' } });
        wrapper.find("#formControlCorreo").simulate('change', { target: { value: 'andres@gmail.com'} });
        wrapper.find("#formControlTelefono").simulate('change', { target: { value: '123456' } });
        wrapper.find("#datePickerFechaNacimiento").simulate('change',anioNacimiento);
    })

    test('debe mostrar una alerta de saludo cuando se ingrese todos los campos', async() => {      
        const resultadoCalcularEdad: IEdad = { edad: 33, error: ''};
  
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
        
        expect(concatenarNombreMock).toHaveBeenCalledWith(nombre);
        expect(calcularEdadMock).toHaveBeenCalledWith(anioNacimiento);
        await expect(sweetAlertMock).toHaveBeenCalledWith(mensaje);
        await expect(obtenerIpMock).toHaveBeenCalled();
        expect(sweetAlertMock).toBeCalledTimes(2);
        expect(sweetAlertMock).toHaveBeenCalledWith(`Tu direccion ip es : ${resultadoCalcularEdad}`, '', 'success');
    });

    test('debe mostrar una alerta de saludo cuando se ingrese todos los campos, segunda prueba', async() => {      
        mensaje = 'Hola Pepito Pablo Perez Pulgada, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 20 años !';
        const resultadoCalcularEdad: IEdad = { edad: 20, error: ''};

        concatenarNombreMock.mockReturnValue('Pepito Pablo Perez Pulgada');
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
        
        expect(concatenarNombreMock).toHaveBeenCalledWith(nombre);
        expect(calcularEdadMock).toHaveBeenCalledWith(anioNacimiento);
        await expect(sweetAlertMock).toHaveBeenCalledWith(mensaje);
        await expect(obtenerIpMock).toHaveBeenCalled();
        expect(sweetAlertMock).toBeCalledTimes(2);
        expect(sweetAlertMock).toHaveBeenCalledWith(`Tu direccion ip es : ${resultadoCalcularEdad}`, '', 'success');
    });

    test('debe mostrar una alerta con la ip, luego de mostrar la alerta de saludo', async() => {
        const resultadoCalcularEdad: IEdad = { edad: 33, error: ''};

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

        expect(concatenarNombreMock).toHaveBeenCalledWith(nombre);
        expect(calcularEdadMock).toHaveBeenCalledWith(anioNacimiento);
        await expect(sweetAlertMock).toHaveBeenCalledWith(mensaje);
        await expect(obtenerIpMock).toHaveBeenCalled();
        expect(sweetAlertMock).toHaveBeenCalledWith(`Tu direccion ip es : ${resultadoCalcularEdad}`, '', 'success');
    });

    test('debe mostrar una alerta con la ip, luego de mostrar la alerta de saludo, segunda prueba', async() => {
        mensaje = 'Hola Luis Felipe Quintero Vergara, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 40 años !';
        const resultadoCalcularEdad: IEdad = { edad: 40, error: ''};
        const primerNombreDos: string = "Luis";
        const segundoNombreDos: string = "Felipe";
        const primerApellidoDos: string = "Quintero";
        const segundoApellidoDos: string =  "Vergara";
        const nombreDos: INombre = {
            primerNombre: primerNombreDos,
            segundoNombre: segundoNombreDos, 
            primerApellido: primerApellidoDos,
            segundoApellido: segundoApellidoDos
        };
        
        wrapper.find("#formControlPrimerNombre").simulate('change', { target: { value: primerNombreDos, name: 'primerNombre' } });
        wrapper.find("#formControlSegundoNombre").simulate('change', { target: { value: segundoNombreDos, name: 'segundoNombre' } });
        wrapper.find("#formControlPrimerApellido").simulate('change', { target: { value: primerApellidoDos, name: 'primerApellido' } });
        wrapper.find("#formControlSegundoApellido").simulate('change', { target: { value: segundoApellidoDos, name: 'segundoApellido' } });
        wrapper.find("#formControlCorreo").simulate('change', { target: { value: 'andres@gmail.com'} });
        wrapper.find("#formControlTelefono").simulate('change', { target: { value: '123456' } });
        wrapper.find("#datePickerFechaNacimiento").simulate('change',anioNacimiento);

        concatenarNombreMock.mockReturnValue('Luis Felipe Quintero Vergara');
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

        expect(concatenarNombreMock).toHaveBeenCalledWith(nombreDos);
        expect(calcularEdadMock).toHaveBeenCalledWith(anioNacimiento);
        await expect(sweetAlertMock).toHaveBeenCalledWith(mensaje);
        await expect(obtenerIpMock).toHaveBeenCalled();
        expect(sweetAlertMock).toHaveBeenCalledWith(`Tu direccion ip es : ${resultadoCalcularEdad}`, '', 'success');
    });

    test('debe mostrar una alerta de error cuando se ingresa una fecha mayor a la actual', () => {      
        const resultadoCalcularEdad: IEdad = { edad: 0, error: 'Ups! ingresa una fecha que no sea mayor a la actual'};
        const anioNacimiento = '2088';
        wrapper.find("#datePickerFechaNacimiento").simulate('change',anioNacimiento);

        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        sweetAlertMock.mockReturnValue();
        wrapper.find('#formulario').simulate('submit', {
            preventDefault: () => {},
            stopPropagation: () => {},
            currentTarget: {
                checkValidity: jest.fn().mockReturnValue(true)            
            }
        });  
        expect(calcularEdadMock).toHaveBeenCalledWith(anioNacimiento);
        expect(sweetAlertMock).toHaveBeenCalledWith({icon: 'error',
            title: 'Ups! ingresa una fecha que no sea mayor a la actual'});
    });
   
    test('debe tener el campo de la fecha lleno por defecto con la fecha actual', () => {
        const anioNacimiento = '01/01/2000';
        wrapper.find("#datePickerFechaNacimiento").simulate('change',anioNacimiento);
        expect(wrapper.find("#datePickerFechaNacimiento").prop('selected')).toBe(anioNacimiento)        
    });
    
    test('debe validar que campo de la fecha siempre este lleno con la fecha actual', () => {
        expect(wrapper.find("#datePickerFechaNacimiento").prop('selected')).toBe('1988') 
    });

    test('No debe mostrar la alerta cuando el formulario sea valido', () => {      
        wrapper.find('#formulario').simulate('submit', {
            preventDefault: () => {},
            stopPropagation: () => {},
            currentTarget: {
                checkValidity: jest.fn().mockReturnValue(false)            
            }
        });   
  
        expect(sweetAlertMock).not.toHaveBeenCalled();
    });
    
    test('No debe seguir validando el formulario cuando este en false', () => {
        wrapper.find('#formulario').simulate('submit', {
            preventDefault: () => {},
            stopPropagation: () => {},
            currentTarget: {
                checkValidity: jest.fn().mockReturnValue(false)            
            }
        });
        
        expect(wrapper.find('#formulario').prop('noValidate')).toBe(true);
    });
    
    test('No debe mostrar el segundo alert con la ip si el boton de ok no es valido', () => {
        const resultadoCalcularEdad: IEdad = { edad: 33, error: ''};
  
        concatenarNombreMock.mockReturnValue('Andres Dario Otalvaro Sanchez');
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        sweetAlertMock.mockResolvedValue({
            isConfirmed: false,
        }); 
        wrapper.find('#formulario').simulate('submit', {
            preventDefault: () => {},
            stopPropagation: () => {},
            currentTarget: {
                checkValidity: jest.fn().mockReturnValue(true)            
            }
        });
        expect(sweetAlertMock).toHaveBeenCalledWith(mensaje);
        expect(sweetAlertMock).toBeCalledTimes(1);
    });
    
    
});
