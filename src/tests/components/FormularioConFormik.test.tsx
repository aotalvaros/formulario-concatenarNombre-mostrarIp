import '@testing-library/jest-dom';
import { calcularEdad } from '../../domain/calcularEdad';
import { concatenarNombre } from '../../domain/concatenarNombre';
import { FormularioConFormik } from '../../components/FormularioConFormik';
import { IEdad } from '../../interface/IEdad';
import { mockFunction } from '../../helpers/JestHelpers';
import {fireEvent, render, waitFor } from '@testing-library/react';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { INombre } from '../../interface/INombre';
import { obtenerIp } from '../../domain/obtenerIp';

jest.mock('../../domain/concatenarNombre');
jest.mock('../../domain/calcularEdad');
jest.mock('sweetalert2');
jest.mock('../../domain/obtenerIp');

describe('Debe mostrar un formulario', () => {
    const onSubmit = jest.fn(e => e.preventDefault());
    let inputPrimerNombre: any ;
    let inputPrimerApellido: any;
    let inputSegundoNombre: any;
    let inputSegundoApellido: any;
    let inputFechaNacimiento: any;
    let inputCorreo: any;
    let inputTelefono: any;
    let btnRegistrarse: any;
    let mensajeSaludarNombreUno: {};
    let mensajeSaludarNombreDos: {};
    let mensajeSaludarNombreTres: {};
    let concatenarNombreMock: jest.MockedFunction<(nombre: INombre) => string>;
    let calcularEdadMock: jest.MockedFunction<(fechaNacimiento: Date) => IEdad>;
    let sweetAlertMock: any;
    let mensajeIp: SweetAlertOptions;
    let obtenerIpMock: any;
    let renderFormularioConFormik: any 
    
    const fechaDeNacimientoUno: Date = new Date('1988-01-01');
    const fechaDeNacimientoDos: Date = new Date('2002-01-01');
    const fechaDeNacimientoTres: Date = new Date('1982-01-01');

    const nombreUno: INombre = {
        primerNombre: 'Andres',
        segundoNombre: 'Dario', 
        primerApellido: 'Otalvaro',
        segundoApellido: 'Sanchez'
    };

    const nombreDos: INombre = {
        primerNombre: 'Carlos',
        segundoNombre: 'Mario', 
        primerApellido: 'Quintero',
        segundoApellido: 'Pereira'
    };

    const nombreTres: INombre = {
        primerNombre: 'Maria',
        segundoNombre: 'Palito', 
        primerApellido: 'Aquiles',
        segundoApellido: 'Bailo'
    };
    
    
    beforeEach(() => {
        renderFormularioConFormik = render(<FormularioConFormik />);
        const { container } = renderFormularioConFormik;
        inputPrimerNombre = container.querySelector('input[name="inputPrimerNombre"]');
        inputSegundoNombre = container.querySelector('input[name="inputSegundoNombre"]');
        inputPrimerApellido = container.querySelector('input[name="inputPrimerApellido"]');
        inputSegundoApellido = container.querySelector('input[name="inputSegundoApellido"]');
        inputFechaNacimiento = container.querySelector('input[name="inputFechaNacimiento"]');
        inputCorreo = container.querySelector('input[name="inputCorreo"]');
        inputTelefono = container.querySelector('input[name="inputTelefono"]');
        btnRegistrarse = container.querySelector('button[type="submit"]');
        
        mensajeSaludarNombreUno = {"allowEnterKey": false, "allowEscapeKey": false, "allowOutsideClick": false,
            "title": "Hola Andres Dario Otalvaro Sanchez, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 32 años !"};
        mensajeSaludarNombreDos={"allowEnterKey": false, "allowEscapeKey": false, "allowOutsideClick": false,
        "title": "Hola Carlos Mario Quintero Pereira, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 20 años !"};
        mensajeSaludarNombreTres={"allowEnterKey": false, "allowEscapeKey": false, "allowOutsideClick": false,
        "title": "Hola Maria Palito Aquiles Bailo, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 40 años !"};
        concatenarNombreMock = mockFunction(concatenarNombre);
        calcularEdadMock = mockFunction(calcularEdad);
        sweetAlertMock = mockFunction(Swal.fire);
        
        onSubmit.mockImplementation(event => {
            event.preventDefault();
        });

        mensajeIp = {"allowEnterKey": false, "allowEscapeKey": false, "allowOutsideClick": false, "icon": "success", "title": `Tu direccion ip es : 10.0.0.0`};
    });
    
    beforeAll(() => {
        obtenerIpMock = mockFunction(obtenerIp);
    })

    test('debe tener un boton de registro y si el registro fue exitoso mostrar un mensaje de saludo', async() => {
       
        const resultadoCalcularEdad: IEdad = { edad: 32, error: ''};       
        concatenarNombreMock.mockReturnValue('Andres Dario Otalvaro Sanchez');
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        await waitFor(()=>{
            fireEvent.change(inputPrimerNombre,{ target: { value: nombreUno.primerNombre }});
            fireEvent.change(inputSegundoNombre,{ target: { value: nombreUno.segundoNombre }});
            fireEvent.change(inputPrimerApellido,{ target: { value: nombreUno.primerApellido }});
            fireEvent.change(inputSegundoApellido,{ target: { value: nombreUno.segundoApellido }});
            fireEvent.change(inputCorreo,{ target: { value: 'andres@correo.com' }});
            fireEvent.change(inputTelefono,{ target: { value: '1234567' }});           
            fireEvent.change(inputFechaNacimiento,{ target: { value: fechaDeNacimientoUno }});
        }); 
                     
        fireEvent.click(btnRegistrarse);            

        await waitFor(() => {
            expect(concatenarNombreMock).toHaveBeenCalledWith(nombreUno);
            expect(calcularEdadMock).toHaveBeenCalledWith(fechaDeNacimientoUno);
            expect(sweetAlertMock).toHaveBeenCalledWith(mensajeSaludarNombreUno);         
        });
    });

    test('debe tener un boton de registro y si el registro fue exitoso mostrar un mensaje de saludo,(segunda prueba)', async() => {
        
        const resultadoCalcularEdad: IEdad = { edad: 20, error: ''};       
        concatenarNombreMock.mockReturnValue('Carlos Mario Quintero Pereira');
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        await waitFor(()=>{
            fireEvent.change(inputPrimerNombre,{ target: { value: nombreDos.primerNombre }});
            fireEvent.change(inputSegundoNombre,{ target: { value: nombreDos.segundoNombre }});
            fireEvent.change(inputPrimerApellido,{ target: { value: nombreDos.primerApellido }});
            fireEvent.change(inputSegundoApellido,{ target: { value: nombreDos.segundoApellido }});
            fireEvent.change(inputCorreo,{ target: { value: 'Carlos@correo.com' }});
            fireEvent.change(inputTelefono,{ target: { value: '98765' }});           
            fireEvent.change(inputFechaNacimiento,{ target: { value: fechaDeNacimientoDos }});
        }); 

        fireEvent.click(btnRegistrarse);                    

        await waitFor(() => {
            expect(concatenarNombreMock).toHaveBeenCalledWith(nombreDos);
            expect(calcularEdadMock).toHaveBeenCalledWith(fechaDeNacimientoDos);
            expect(sweetAlertMock).toHaveBeenCalledWith(mensajeSaludarNombreDos);         
        });
    });

    test('debe tener un boton de registro y si el registro fue exitoso mostrar un mensaje de saludo,(tercera prueba)', async() => {
        
        const resultadoCalcularEdad: IEdad = { edad: 40, error: ''};       
        concatenarNombreMock.mockReturnValue('Maria Palito Aquiles Bailo');
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        await waitFor(()=>{
            fireEvent.change(inputPrimerNombre,{ target: { value: nombreTres.primerNombre }});
            fireEvent.change(inputSegundoNombre,{ target: { value: nombreTres.segundoNombre }});
            fireEvent.change(inputPrimerApellido,{ target: { value: nombreTres.primerApellido }});
            fireEvent.change(inputSegundoApellido,{ target: { value: nombreTres.segundoApellido }});
            fireEvent.change(inputCorreo,{ target: { value: 'maria@hotmail.com' }});
            fireEvent.change(inputTelefono,{ target: { value: '222222' }});           
            fireEvent.change(inputFechaNacimiento,{ target: { value: fechaDeNacimientoTres }});
        }); 

        fireEvent.click(btnRegistrarse);                    

        await waitFor(() => {
            expect(concatenarNombreMock).toHaveBeenCalledWith(nombreTres);
            expect(calcularEdadMock).toHaveBeenCalledWith(fechaDeNacimientoTres);
            expect(sweetAlertMock).toHaveBeenCalledWith(mensajeSaludarNombreTres);         
        });
    });

    test("debe sacar otra alerta, con un mensaje que contenga la ip del cliente, cuando de click en el boton Aceptar del mensaje de saludo", async () => {
        const resultadoCalcularEdad: IEdad = { edad: 40, error: ''};       
        concatenarNombreMock.mockReturnValue('Maria Palito Aquiles Bailo');
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        await waitFor(()=>{
            fireEvent.change(inputPrimerNombre,{ target: { value: 'Maria' }});
            fireEvent.change(inputSegundoNombre,{ target: { value: 'Palito' }});
            fireEvent.change(inputPrimerApellido,{ target: { value: 'Aquiles' }});
            fireEvent.change(inputSegundoApellido,{ target: { value: 'Bailo' }});
            fireEvent.change(inputCorreo,{ target: { value: 'maria@hotmail.com' }});
            fireEvent.change(inputTelefono,{ target: { value: '222222' }});           
            fireEvent.change(inputFechaNacimiento,{ target: { value: fechaDeNacimientoTres }});
        }); 
        sweetAlertMock.mockResolvedValue({
            isConfirmed: true,
        });
    
        obtenerIpMock.mockResolvedValue('10.0.0.0');

        fireEvent.click(btnRegistrarse);

        await waitFor(() => {
            expect(sweetAlertMock).toBeCalledTimes(2);
            expect(sweetAlertMock).toHaveBeenNthCalledWith(1, mensajeSaludarNombreTres); 
            expect(obtenerIpMock).toHaveBeenCalled();
            expect(sweetAlertMock).toHaveBeenNthCalledWith(2, mensajeIp);
        });
    });

    test("cuando no de click en el boton Aceptar del mensaje de saludo, no debe sacar la alerta, con la ip del cliente", async () => {
        const resultadoCalcularEdad: IEdad = { edad: 40, error: ''};       
        concatenarNombreMock.mockReturnValue('Maria Palito Aquiles Bailo');
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        await waitFor(()=>{
            fireEvent.change(inputPrimerNombre,{ target: { value: 'Maria' }});
            fireEvent.change(inputSegundoNombre,{ target: { value: 'Palito' }});
            fireEvent.change(inputPrimerApellido,{ target: { value: 'Aquiles' }});
            fireEvent.change(inputSegundoApellido,{ target: { value: 'Bailo' }});
            fireEvent.change(inputCorreo,{ target: { value: 'maria@hotmail.com' }});
            fireEvent.change(inputTelefono,{ target: { value: '222222' }});           
            fireEvent.change(inputFechaNacimiento,{ target: { value: fechaDeNacimientoTres }});
        }); 
        sweetAlertMock.mockResolvedValue({
            isConfirmed: false,
        });
    
        fireEvent.click(btnRegistrarse);

        await waitFor(() => {
            expect(sweetAlertMock).toBeCalledTimes(1);
            expect(sweetAlertMock).toHaveBeenCalledWith(mensajeSaludarNombreTres); 
            expect(obtenerIpMock).not.toHaveBeenCalled();
        });
    });

    test('debe el formulario tener validaciones de los campos que no sean vacios', async() => {
        const { getByTestId } = renderFormularioConFormik;
        fireEvent.blur(inputPrimerNombre);
        fireEvent.blur(inputPrimerApellido);
        fireEvent.blur(inputCorreo);
        fireEvent.blur(inputFechaNacimiento);
        fireEvent.blur(inputTelefono);
        fireEvent.click(btnRegistrarse);

        await waitFor(() => {
            expect(getByTestId("errorPrimerNombre")).not.toBe(null);
            expect(getByTestId("errorPrimerNombre")).toHaveTextContent("Por favor ingrese el nombre.");
            expect(getByTestId("errorPrimerApellido")).not.toBe(null);
            expect(getByTestId("errorPrimerApellido")).toHaveTextContent("Por favor ingrese el apellido.");
            expect(getByTestId("errorFecha")).not.toBe(null);
            expect(getByTestId("errorFecha")).toHaveTextContent("Por favor ingrese una fecha.");
            expect(getByTestId("errorCorreo")).not.toBe(null);
            expect(getByTestId("errorCorreo")).toHaveTextContent("Por favor ingrese el correo.");
            expect(getByTestId("errorTelefono")).not.toBe(null);
            expect(getByTestId("errorTelefono")).toHaveTextContent("Por favor un ingrese numero de telefono.");
        });
    });

    test('si los campos estan llenos no debe sacar errores de campos vacios', async () => {
        const resultadoCalcularEdad: IEdad = { edad: 32, error: ''};
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        const { queryByTestId } = renderFormularioConFormik;
        
        await waitFor(() => {
            fireEvent.change(inputPrimerNombre,{ target: { value: nombreUno.primerNombre }});
            fireEvent.change(inputPrimerApellido,{ target: { value: nombreUno.primerApellido }});
            fireEvent.change(inputCorreo,{ target: { value: 'andres@correo.com' }});
            fireEvent.change(inputTelefono,{ target: { value: '1234567' }});           
            fireEvent.change(inputFechaNacimiento,{ target: { value: fechaDeNacimientoUno }});
        }); 
        fireEvent.click(btnRegistrarse);
    
        await waitFor(() => {
            expect(queryByTestId("errorPrimerNombre")).toBe(null);
            expect(queryByTestId("errorPrimerApellido")).toBe(null);
            expect(queryByTestId("errorFecha")).toBe(null);
            expect(queryByTestId("errorCorreo")).toBe(null);
            expect(queryByTestId("errorTelefono")).toBe(null);
        });
    });
    
    test('la fecha de nacimiento no debe ser mayor a la actual', () => {
        
    });
});
