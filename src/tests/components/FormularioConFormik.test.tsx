import '@testing-library/jest-dom';
import { calcularEdad } from '../../domain/calcularEdad';
import { concatenarNombre } from '../../domain/concatenarNombre';
import { FormularioConFormik } from '../../components/FormularioConFormik';
import { IEdad } from '../../interface/IEdad';
import { mockFunction } from '../../helpers/JestHelpers';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { INombre } from '../../interface/INombre';
import { obtenerIp } from '../../domain/obtenerIp';
import { mount, ReactWrapper } from 'enzyme';
import { Component } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

jest.mock('../../domain/concatenarNombre');
jest.mock('../../domain/calcularEdad');
jest.mock('sweetalert2');
jest.mock('../../domain/obtenerIp');

describe('Debe mostrar un formulario', () => {

    let inputPrimerNombre: any;
    let inputPrimerApellido: any;
    let inputSegundoNombre: any;
    let inputSegundoApellido: any;
    let inputFechaNacimiento: any;
    let inputCorreo: any;
    let inputTelefono: any;
    let mensajeSaludarNombreUno: {};
    let mensajeSaludarNombreDos: {};
    let mensajeSaludarNombreTres: {};
    let concatenarNombreMock: jest.MockedFunction<(nombre: INombre) => string>;
    let calcularEdadMock: jest.MockedFunction<(fechaNacimiento: Date) => IEdad>;
    let sweetAlertMock: any;
    let mensajeIp: SweetAlertOptions;
    let obtenerIpMock: any;
    let wrapper: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>
    let renderFormularioConFormik: any;

    const fechaDeNacimientoUno: Date = new Date('12/01/2000');
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
        // renderFormularioConFormik = render(<FormularioConFormik />);
        wrapper = mount(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <FormularioConFormik />
            </MuiPickersUtilsProvider>
        );
        
        inputPrimerNombre = wrapper.find('input[name="inputPrimerNombre"]');
        inputSegundoNombre = wrapper.find('input[name="inputSegundoNombre"]');
        inputPrimerApellido = wrapper.find('input[name="inputPrimerApellido"]');
        inputSegundoApellido = wrapper.find('input[name="inputSegundoApellido"]');
        inputCorreo = wrapper.find('input[name="inputCorreo"]');
        inputTelefono = wrapper.find('input[name="inputTelefono"]');
        inputFechaNacimiento = wrapper.find('input[name="inputFechaNacimiento"]');
        
        mensajeSaludarNombreUno = {"allowEnterKey": false, "allowEscapeKey": false, "allowOutsideClick": false,
            "title": "Hola Andres Dario Otalvaro Sanchez, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 32 años !"};
        mensajeSaludarNombreDos={"allowEnterKey": false, "allowEscapeKey": false, "allowOutsideClick": false,
        "title": "Hola Carlos Mario Quintero Pereira, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 20 años !"};
        mensajeSaludarNombreTres={"allowEnterKey": false, "allowEscapeKey": false, "allowOutsideClick": false,
        "title": "Hola Maria Palito Aquiles Bailo, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices 40 años !"};
        concatenarNombreMock = mockFunction(concatenarNombre);
        calcularEdadMock = mockFunction(calcularEdad);
        sweetAlertMock = mockFunction(Swal.fire);

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
            inputPrimerNombre.simulate('change',{ persist: () => {}, target: { name: 'inputPrimerNombre', value: nombreUno.primerNombre }});
            inputSegundoNombre.simulate('change',{ persist: () => {}, target: { name: 'inputSegundoNombre', value: nombreUno.segundoNombre }});
            inputPrimerApellido.simulate('change',{ persist: () => {}, target: { name: 'inputPrimerApellido', value: nombreUno.primerApellido }});
            inputSegundoApellido.simulate('change',{persist: () => {}, target: { name: 'inputSegundoApellido', value: nombreUno.segundoApellido }});
            inputCorreo.simulate('change',{ persist: () => {}, target: { name: 'inputCorreo', value: 'andres@correo.com' }});
            inputTelefono.simulate('change',{ persist: () => {}, target: { name: 'inputTelefono', value: '1234567', }});           
            inputFechaNacimiento.simulate('change',{ persist: () => {}, target: { name: 'inputFechaNacimiento', value: fechaDeNacimientoUno }});
        }); 
         
        wrapper.find("Form").simulate("submit");
        
        await waitFor(() => {
            // expect(inputFechaNacimiento.html()).toMatch('12/01/2000');
            expect(concatenarNombreMock).toHaveBeenCalledWith(nombreUno);
            expect(calcularEdadMock).toHaveBeenCalled();
            expect(sweetAlertMock).toHaveBeenCalledWith(mensajeSaludarNombreUno);         
        });
    });

    test('debe tener un boton de registro y si el registro fue exitoso mostrar un mensaje de saludo,(segunda prueba)', async() => {
        
        const resultadoCalcularEdad: IEdad = { edad: 20, error: ''};       
        concatenarNombreMock.mockReturnValue('Carlos Mario Quintero Pereira');
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        await waitFor(()=>{
            inputPrimerNombre.simulate('change',{ persist: () => {}, target: { name: 'inputPrimerNombre', value: nombreDos.primerNombre }});
            inputSegundoNombre.simulate('change',{ persist: () => {}, target: { name: 'inputSegundoNombre', value: nombreDos.segundoNombre }});
            inputPrimerApellido.simulate('change',{ persist: () => {}, target: { name: 'inputPrimerApellido', value: nombreDos.primerApellido }});
            inputSegundoApellido.simulate('change',{persist: () => {}, target: { name: 'inputSegundoApellido', value: nombreDos.segundoApellido }});
            inputCorreo.simulate('change',{ persist: () => {}, target: { name: 'inputCorreo', value: 'Carlos@correo.com' }});
            inputTelefono.simulate('change',{ persist: () => {}, target: { name: 'inputTelefono', value: '98765' }});           
            inputFechaNacimiento.simulate('change',{ persist: () => {}, target: { name: 'inputFechaNacimiento', value: fechaDeNacimientoDos }});
        }); 

        wrapper.find("Form").simulate("submit");                   

        await waitFor(() => {
            expect(concatenarNombreMock).toHaveBeenCalledWith(nombreDos);
            expect(calcularEdadMock).toHaveBeenCalled();
            expect(sweetAlertMock).toHaveBeenCalledWith(mensajeSaludarNombreDos);         
        });
    });

    test('debe tener un boton de registro y si el registro fue exitoso mostrar un mensaje de saludo,(tercera prueba)', async() => {
        
        const resultadoCalcularEdad: IEdad = { edad: 40, error: ''};       
        concatenarNombreMock.mockReturnValue('Maria Palito Aquiles Bailo');
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        await waitFor(()=>{
            inputPrimerNombre.simulate('change',{ persist: () => {}, target: { name: 'inputPrimerNombre', value: nombreTres.primerNombre }});
            inputSegundoNombre.simulate('change',{ persist: () => {}, target: { name: 'inputSegundoNombre', value: nombreTres.segundoNombre }});
            inputPrimerApellido.simulate('change',{ persist: () => {}, target: { name: 'inputPrimerApellido', value: nombreTres.primerApellido }});
            inputSegundoApellido.simulate('change',{persist: () => {}, target: { name: 'inputSegundoApellido', value: nombreTres.segundoApellido }});
            inputCorreo.simulate('change',{ persist: () => {}, target: { name: 'inputCorreo',  value: 'maria@hotmail.com' }});
            inputTelefono.simulate('change',{ persist: () => {}, target: { name: 'inputTelefono',  value: '222222' }});           
            inputFechaNacimiento.simulate('change',{ persist: () => {}, target: { name: 'inputFechaNacimiento', value: fechaDeNacimientoTres }});
        }); 

        wrapper.find("Form").simulate("submit");                   

        await waitFor(() => {
            expect(concatenarNombreMock).toHaveBeenCalledWith(nombreTres);
            expect(calcularEdadMock).toHaveBeenCalled();
            expect(sweetAlertMock).toHaveBeenCalledWith(mensajeSaludarNombreTres);         
        });
    });

    test("debe sacar otra alerta, con un mensaje que contenga la ip del cliente, cuando de click en el boton Aceptar del mensaje de saludo", async () => {
        const resultadoCalcularEdad: IEdad = { edad: 40, error: ''};       
        concatenarNombreMock.mockReturnValue('Maria Palito Aquiles Bailo');
        calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
        await waitFor(()=>{
            inputPrimerNombre.simulate('change',{ persist: () => {}, target: { name: 'inputPrimerNombre',value: 'Maria' }});
            inputSegundoNombre.simulate('change',{ persist: () => {}, target: { name: 'inputSegundoNombre', value: 'Palito' }});
            inputPrimerApellido.simulate('change',{ persist: () => {}, target: { name: 'inputPrimerApellido', value: 'Aquiles' }});
            inputSegundoApellido.simulate('change',{persist: () => {}, target: { name: 'inputSegundoApellido', value: 'Bailo' }});
            inputCorreo.simulate('change',{ persist: () => {}, target: { name: 'inputCorreo', value: 'maria@hotmail.com' }});
            inputTelefono.simulate('change',{ persist: () => {}, target: { name: 'inputTelefono', value: '222222' }});           
            inputFechaNacimiento.simulate('change',{ persist: () => {}, target: { name: 'inputFechaNacimiento', value: fechaDeNacimientoTres }});
        }); 
        sweetAlertMock.mockResolvedValue({
            isConfirmed: true,
        });
    
        obtenerIpMock.mockResolvedValue('10.0.0.0');

        wrapper.find("Form").simulate("submit"); 

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
            inputPrimerNombre.simulate('change',{ persist: () => {}, target: { name: 'inputPrimerNombre', value: 'Maria' }});
            inputSegundoNombre.simulate('change',{ persist: () => {}, target: { name: 'inputSegundoNombre', value: 'Palito' }});
            inputPrimerApellido.simulate('change',{ persist: () => {}, target: { name: 'inputPrimerApellido', value: 'Aquiles' }});
            inputSegundoApellido.simulate('change',{persist: () => {}, target: { name: 'inputSegundoApellido', value: 'Bailo' }});
            inputCorreo.simulate('change',{ persist: () => {}, target: { name: 'inputCorreo', value: 'maria@hotmail.com' }});
            inputTelefono.simulate('change',{ persist: () => {}, target: { name: 'inputTelefono', value: '222222' }});           
            inputFechaNacimiento.simulate('change',{ persist: () => {}, target: { name: 'inputFechaNacimiento', value: fechaDeNacimientoTres }});
        }); 
        sweetAlertMock.mockResolvedValue({
            isConfirmed: false,
        });
    
        wrapper.find("Form").simulate("submit"); 

        await waitFor(() => {
            expect(sweetAlertMock).toBeCalledTimes(1);
            expect(sweetAlertMock).toHaveBeenCalledWith(mensajeSaludarNombreTres); 
            expect(obtenerIpMock).not.toHaveBeenCalled();
        });
    });

    // test('debe el formulario tener validaciones de los campos que no sean vacios', async() => {
    //     const { getByTestId } = renderFormularioConFormik;
    //     fireEvent.blur(inputPrimerNombre);
    //     fireEvent.blur(inputPrimerApellido);
    //     fireEvent.blur(inputCorreo);
    //     fireEvent.blur(inputFechaNacimiento);
    //     fireEvent.blur(inputTelefono); 
        
    //     await waitFor(() => {         
    //         expect(getByTestId("errorPrimerNombre")).not.toBe(null);
    //         expect(getByTestId("errorPrimerNombre")).toHaveTextContent("Por favor ingrese el nombre.");
    //         expect(getByTestId("errorPrimerApellido")).not.toBe(null);
    //         expect(getByTestId("errorPrimerApellido")).toHaveTextContent("Por favor ingrese el apellido.");
    //         expect(getByTestId("errorFecha")).not.toBe(null);
    //         expect(getByTestId("errorFecha")).toHaveTextContent("Por favor ingrese una fecha.");
    //         expect(getByTestId("errorCorreo")).not.toBe(null);
    //         expect(getByTestId("errorCorreo")).toHaveTextContent("Por favor ingrese el correo.");
    //         expect(getByTestId("errorTelefono")).not.toBe(null);
    //         expect(getByTestId("errorTelefono")).toHaveTextContent("Por favor un ingrese numero de telefono.");
    //     });
    // });

    // test('si los campos estan llenos no debe sacar errores de campos vacios', async () => {
    //     const resultadoCalcularEdad: IEdad = { edad: 32, error: ''};
    //     calcularEdadMock.mockReturnValue(resultadoCalcularEdad);
    //     const { queryByTestId } = renderFormularioConFormik;
        
    //     await waitFor(() => {
    //         fireEvent.change(inputPrimerNombre,{ target: { value: nombreUno.primerNombre }});
    //         fireEvent.change(inputPrimerApellido,{ target: { value: nombreUno.primerApellido }});
    //         fireEvent.change(inputCorreo,{ target: { value: 'andres@correo.com' }});
    //         fireEvent.change(inputTelefono,{ target: { value: '1234567' }});           
    //         fireEvent.change(inputFechaNacimiento,{ target: { value: fechaDeNacimientoUno }});
    //     }); 
    //     fireEvent.click(btnRegistrarse);
    
    //     await waitFor(() => {
    //         expect(queryByTestId("errorPrimerNombre")).toBe(null);
    //         expect(queryByTestId("errorPrimerApellido")).toBe(null);
    //         expect(queryByTestId("errorFecha")).toBe(null);
    //         expect(queryByTestId("errorCorreo")).toBe(null);
    //         expect(queryByTestId("errorTelefono")).toBe(null);
    //     });
    // });

    // test('debe validar que el correo tenga un formato valido', async () => {
    //     const { queryByTestId } = renderFormularioConFormik;
    //     await waitFor(() => {
    //         fireEvent.change(inputCorreo,{ target: { value: 'andres@correo.com' }});
    //     }); 
    //     fireEvent.click(btnRegistrarse);

    //     await waitFor(() => {
    //         expect(queryByTestId("errorCorreo")).toBe(null);
    //     });
    // });

    // test('si el correo ingresado no tiene un campo valido, debe mostrar un mensaje de error', async() => {
    //     const { getByTestId } = renderFormularioConFormik;
    //     fireEvent.blur(inputCorreo);
    //     await waitFor(() => {
    //         fireEvent.change(inputCorreo,{ target: { value: 'anhotmail.com' }});
    //     }); 
    //     fireEvent.click(btnRegistrarse);

    //     await waitFor(() => {
    //         expect(getByTestId("errorCorreo")).not.toBe(null);
    //         expect(getByTestId("errorCorreo")).toHaveTextContent("El correo no tiene un formato valido.");
    //     });
    // });

    // test('si el correo ingresado no tiene un campo valido, debe mostrar un mensaje de error, segunda prueba', async() => {
    //     const { getByTestId } = renderFormularioConFormik;
    //     fireEvent.blur(inputCorreo);
    //     await waitFor(() => {
    //         fireEvent.change(inputCorreo,{ target: { value: 'luis.com' }});
    //     }); 
    //     fireEvent.click(btnRegistrarse);

    //     await waitFor(() => {
    //         expect(getByTestId("errorCorreo")).not.toBe(null);
    //         expect(getByTestId("errorCorreo")).toHaveTextContent("El correo no tiene un formato valido.");
    //     });
    // });

    // test('si el correo ingresado no tiene un campo valido, debe mostrar un mensaje de error, tercera prueba', async() => {
    //     const { getByTestId } = renderFormularioConFormik;
    //     fireEvent.blur(inputCorreo);
    //     await waitFor(() => {
    //         fireEvent.change(inputCorreo,{ target: { value: 'luis@.com.co' }});
    //     }); 
    //     fireEvent.click(btnRegistrarse);

    //     await waitFor(() => {
    //         expect(getByTestId("errorCorreo")).not.toBe(null);
    //         expect(getByTestId("errorCorreo")).toHaveTextContent("El correo no tiene un formato valido.");
    //     });
    // });
    
    // test('si el correo ingresado no tiene un campo valido, debe mostrar un mensaje de error, cuarta prueba', async() => {
    //     const { getByTestId } = renderFormularioConFormik;
    //     fireEvent.blur(inputCorreo);
    //     await waitFor(() => {
    //         fireEvent.change(inputCorreo,{ target: { value: '@hotm.com' }});
    //     }); 
    //     fireEvent.click(btnRegistrarse);

    //     await waitFor(() => {
    //         expect(getByTestId("errorCorreo")).not.toBe(null);
    //         expect(getByTestId("errorCorreo")).toHaveTextContent("El correo no tiene un formato valido.");
    //     });
    // });  
});
