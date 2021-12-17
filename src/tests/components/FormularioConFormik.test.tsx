import { calcularEdad } from '../../domain/calcularEdad';
import { concatenarNombre } from '../../domain/concatenarNombre';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormularioConFormik } from '../../components/FormularioConFormik';
import { IEdad } from '../../interface/IEdad';
import { INombre } from '../../interface/INombre';
import { mockFunction } from '../../helpers/JestHelpers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { obtenerIp } from '../../domain/obtenerIp';
import DateFnsUtils from '@date-io/date-fns';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import '@testing-library/jest-dom';

jest.mock('../../domain/concatenarNombre');
jest.mock('../../domain/calcularEdad');
jest.mock('sweetalert2');
jest.mock('../../domain/obtenerIp');

describe('Debe mostrar un formulario', () => {

    let calcularEdadMock: jest.MockedFunction<(fechaNacimiento: Date) => IEdad>;
    let concatenarNombreMock: jest.MockedFunction<(nombre: INombre) => string>;
    let mensajeIp: SweetAlertOptions;
    let mensajeSaludarNombreDos: {};
    let mensajeSaludarNombreTres: {};
    let mensajeSaludarNombreUno: {};
    let nombreDos: INombre;
    let nombreTres: INombre;
    let nombreUno: INombre;
    let obtenerIpMock: any;
    let sweetAlertMock: any;

    const fechaDeNacimientoUno: Date = new Date('01/20/1988');
    const fechaDeNacimientoDos: Date = new Date('01/01/2002');
    const fechaDeNacimientoTres: Date = new Date('01/01/1982');   
 
    beforeEach(() => {
        render(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <FormularioConFormik />
            </MuiPickersUtilsProvider> 
        );       
        concatenarNombreMock = mockFunction(concatenarNombre);
        calcularEdadMock = mockFunction(calcularEdad);
        sweetAlertMock = mockFunction(Swal.fire);

    });
      
    beforeAll(() => {
        nombreUno = {
            primerNombre: 'Andres',
            segundoNombre: 'Dario', 
            primerApellido: 'Otalvaro',
            segundoApellido: 'Sanchez'
        };
        nombreDos = {
            primerNombre: 'Carlos',
            segundoNombre: 'Mario', 
            primerApellido: 'Quintero',
            segundoApellido: 'Pereira'
        };
        nombreTres = {
            primerNombre: 'Maria',
            segundoNombre: 'Palito', 
            primerApellido: 'Aquiles',
            segundoApellido: 'Bailo'
        };

        obtenerIpMock = mockFunction(obtenerIp);
        
        mensajeSaludarNombreUno = {"allowEnterKey": false, "allowEscapeKey": false, "allowOutsideClick": false,
            "confirmButtonText": "OK", "preConfirm": () => {},"showLoaderOnConfirm": true,
            "title": "Hola Andres Dario Otalvaro Sanchez, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 32 años !"};
        mensajeSaludarNombreDos={"allowEnterKey": false, "allowEscapeKey": false, "allowOutsideClick": false,
            "confirmButtonText": "OK", "preConfirm": () => {},"showLoaderOnConfirm": true,
            "title": "Hola Carlos Mario Quintero Pereira, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 20 años !"};
        mensajeSaludarNombreTres={"allowEnterKey": false, "allowEscapeKey": false, "allowOutsideClick": false,
            "confirmButtonText": "OK", "preConfirm": () => {},"showLoaderOnConfirm": true,
            "title": "Hola Maria Palito Aquiles Bailo, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 40 años !"};     
        mensajeIp = {"allowEnterKey": false, "allowEscapeKey": false, "allowOutsideClick": false, "icon": "success", "title": `Tu direccion ip es : 10.0.0.0`};       
    });

    test('debe tener un boton de registro y si el registro fue exitoso mostrar un mensaje de saludo', async() => {                   
        concatenarNombreMock.mockReturnValue('Andres Dario Otalvaro Sanchez');
        calcularEdadMock.mockReturnValue(construirIEdadSinError(32));
        
        await waitFor(() => {
            simularEventosDeLosInputs(nombreUno, 'andres@correo.com', '345566', '01/20/1988');
        })
         
        fireEvent.click(screen.getByRole('button', {name: /registrar/i}));
       
        await waitFor(() => {      
            expect(concatenarNombreMock).toHaveBeenCalledWith(nombreUno);
            expect(calcularEdadMock).toHaveBeenCalledWith(fechaDeNacimientoUno);
            expect(sweetAlertMock).toHaveBeenCalled();         
        });
    });

    test('debe tener un boton de registro y si el registro fue exitoso mostrar un mensaje de saludo,(segunda prueba)', async() => {              
        concatenarNombreMock.mockReturnValue('Carlos Mario Quintero Pereira');
        calcularEdadMock.mockReturnValue(construirIEdadSinError(20));
        await waitFor(()=>{
            simularEventosDeLosInputs(nombreDos, 'Carlos@correo.com', '98765', '01/01/2002' )
        }); 

        fireEvent.click(screen.getByRole('button', {name: /registrar/i}));                   

        await waitFor(() => {
            expect(concatenarNombreMock).toHaveBeenCalledWith(nombreDos);
            expect(calcularEdadMock).toHaveBeenCalledWith(fechaDeNacimientoDos)
            expect(sweetAlertMock).toHaveBeenCalled();     
        });
    });

    test('debe tener un boton de registro y si el registro fue exitoso mostrar un mensaje de saludo,(tercera prueba)', async() => {            
        concatenarNombreMock.mockReturnValue('Maria Palito Aquiles Bailo');
        calcularEdadMock.mockReturnValue(construirIEdadSinError(40));
        await waitFor(()=>{
            simularEventosDeLosInputs(nombreTres, 'maria@hotmail.com', '222222', '01/01/1982' )
        }); 

        fireEvent.click(screen.getByRole('button', {name: /registrar/i}));                                      

        await waitFor(() => {
            expect(concatenarNombreMock).toHaveBeenCalledWith(nombreTres);
            expect(calcularEdadMock).toHaveBeenCalledWith(fechaDeNacimientoTres)
            expect(sweetAlertMock).toHaveBeenCalled();         
        });
    });

    test("debe sacar otra alerta, con un mensaje que contenga la ip del cliente, cuando de click en el boton Aceptar del mensaje de saludo", async () => {     
        concatenarNombreMock.mockReturnValue('Maria Palito Aquiles Bailo');
        calcularEdadMock.mockReturnValue(construirIEdadSinError(40));
        await waitFor(()=>{
            simularEventosDeLosInputs(nombreTres, 'maria@hotmail.com', '222222', '01/01/1982' )
        });

        sweetAlertMock.mockResolvedValue({
            isConfirmed: true,
        });
    
        obtenerIpMock.mockResolvedValue('10.0.0.0');

        fireEvent.click(screen.getByRole('button', {name: /registrar/i}));  

        await waitFor(() => {
            expect(sweetAlertMock).toBeCalledTimes(2);
            expect(sweetAlertMock).toHaveBeenCalledTimes(2); 
            expect(obtenerIpMock).toHaveBeenCalled();
            // expect(sweetAlertMock).toHaveBeenNthCalledWith(2, mensajeIp);
        });
    });

    test("cuando no de click en el boton Aceptar del mensaje de saludo, no debe sacar la alerta, con la ip del cliente", async () => {    
        concatenarNombreMock.mockReturnValue('Maria Palito Aquiles Bailo');
        calcularEdadMock.mockReturnValue(construirIEdadSinError(40));
        await waitFor(()=>{
            simularEventosDeLosInputs(nombreTres, 'maria@hotmail.com', '222222', '01/01/1982')
        });
        sweetAlertMock.mockResolvedValue({
            isConfirmed: false
        });
    
        fireEvent.click(screen.getByRole('button', {name: /registrar/i}));  

        await waitFor(() => {
            expect(sweetAlertMock).toBeCalledTimes(1);
            expect(sweetAlertMock).toHaveBeenCalled(); 
            expect(obtenerIpMock).not.toHaveBeenCalled();
        });
    });

    test('debe el formulario tener validaciones de los campos que no sean vacios', async() => {
        await waitFor(() => {
            fireEvent.blur(screen.getByLabelText(/primer nombre/i));
            fireEvent.blur(screen.getByLabelText(/primer apellido/i));
            fireEvent.blur(screen.getByLabelText(/correo/i));
            fireEvent.blur(screen.getByLabelText(/telefono/i)); 
        });

        await waitFor(() => {         
            expect(screen.getByTestId("errorPrimerNombre")).not.toBe(null);
            expect(screen.getByTestId("errorPrimerNombre")).toHaveTextContent("Por favor ingrese el nombre.");
            expect(screen.getByTestId("errorPrimerApellido")).not.toBe(null);
            expect(screen.getByTestId("errorPrimerApellido")).toHaveTextContent("Por favor ingrese el apellido.");
            expect(screen.getByTestId("errorCorreo")).not.toBe(null);
            expect(screen.getByTestId("errorCorreo")).toHaveTextContent("Por favor ingrese el correo.");
            expect(screen.getByTestId("errorTelefono")).not.toBe(null);
            expect(screen.getByTestId("errorTelefono")).toHaveTextContent("Por favor ingrese un numero de telefono.");
        });
    });

    test('si los campos estan llenos no debe sacar errores de campos vacios', async () => {
        const resultadoCalcularEdad: IEdad = { edad: 32, error: ''};
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        
        await waitFor(() => {
            simularEventosDeLosInputs(nombreDos, 'Carlos@correo.com', '98765', '01/01/2002')
        }); 
    
        await waitFor(() => {
            expect(screen.queryByTestId("errorPrimerNombre")).toBe(null);
            expect(screen.queryByTestId("errorPrimerApellido")).toBe(null);
            expect(screen.queryByTestId("errorFecha")).toBe(null);
            expect(screen.queryByTestId("errorCorreo")).toBe(null);
            expect(screen.queryByTestId("errorTelefono")).toBe(null);
        });
    });

    test('debe validar que el correo tenga un formato valido', async () => {
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText(/correo/i),{ target: { value: 'andres@correo.com' }});
        }); 
        fireEvent.click(screen.getByRole('button', {name: /registrar/i}));

        await waitFor(() => {
            expect(screen.queryByTestId("errorCorreo")).toBe(null);
        });
    });

    test('si el correo ingresado no tiene un campo valido, debe mostrar un mensaje de error', async() => {
        fireEvent.blur(screen.getByLabelText(/correo/i));
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText(/correo/i),{ target: { value: 'anhotmail.com' }});
        }); 
        fireEvent.click(screen.getByRole('button', {name: /registrar/i}));

        await waitFor(() => {
            expect(screen.getByTestId("errorCorreo")).not.toBe(null);
            expect(screen.getByTestId("errorCorreo")).toHaveTextContent("El correo no tiene un formato valido.");
        });
    });

    test('si el correo ingresado no tiene un campo valido, debe mostrar un mensaje de error, segunda prueba', async() => {
        fireEvent.blur(screen.getByLabelText(/correo/i));
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText(/correo/i),{ target: { value: 'luis.com' }});
        }); 
        fireEvent.click(screen.getByRole('button', {name: /registrar/i}));

        await waitFor(() => {
            expect(screen.getByTestId("errorCorreo")).not.toBe(null);
            expect(screen.getByTestId("errorCorreo")).toHaveTextContent("El correo no tiene un formato valido.");
        });
    });

    test('si el correo ingresado no tiene un campo valido, debe mostrar un mensaje de error, tercera prueba', async() => {
        fireEvent.blur(screen.getByLabelText(/correo/i));
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText(/correo/i),{ target: { value: 'luis@.com.co' }});
        }); 
        fireEvent.click(screen.getByRole('button', {name: /registrar/i}));

        await waitFor(() => {
            expect(screen.getByTestId("errorCorreo")).not.toBe(null);
            expect(screen.getByTestId("errorCorreo")).toHaveTextContent("El correo no tiene un formato valido.");
        });
    });
    
    test('si el correo ingresado no tiene un campo valido, debe mostrar un mensaje de error, cuarta prueba', async() => {
        fireEvent.blur(screen.getByLabelText(/correo/i));
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText(/correo/i),{ target: { value: '@hotm.com' }});
        }); 
        fireEvent.click(screen.getByRole('button', {name: /registrar/i}));

        await waitFor(() => {
            expect(screen.getByTestId("errorCorreo")).not.toBe(null);
            expect(screen.getByTestId("errorCorreo")).toHaveTextContent("El correo no tiene un formato valido.");
        });
    });  
});

const construirIEdadSinError = (edad: number): IEdad => ({ edad: edad, error: '' });

const simularEventosDeLosInputs = (nombre: INombre, correo: string, telefono:string, fechaNacimiento: string) => {
    return waitFor(()=>{
        fireEvent.change(screen.getByLabelText(/primer nombre/i), { target: { value: nombre.primerNombre }});
        fireEvent.change(screen.getByLabelText(/segundo nombre/i), { target: { value: nombre.segundoNombre }});
        fireEvent.change(screen.getByLabelText(/primer apellido/i), { target: { value: nombre.primerApellido }});
        fireEvent.change(screen.getByLabelText(/segundo apellido/i), { target: { value: nombre.segundoApellido }});
        fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: correo}});
        fireEvent.change(screen.getByLabelText(/telefono/i), { target: { value: telefono}});  
        fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { value: fechaNacimiento} });
    });
};
