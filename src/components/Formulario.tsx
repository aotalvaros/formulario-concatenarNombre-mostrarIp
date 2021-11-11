import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { concatenarNombre } from '../domain/concatenarNombre';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";    
import { INombre } from '../interface/INombre';
import DatePicker from "react-datepicker";
import { calcularEdad } from '../domain/calcularEdad';
import { IEdad } from '../interface/IEdad';
import { obtenerIp } from '../domain/obtenerIp';

export const Formulario = () => {

    const [formulario, setFormulario] = useState<INombre>({
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",     
    });
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [validated, setValidated] = useState<boolean>(false);
    
    const handleSubmitForm = (event: any) => {                               
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();                  
        setValidated(true);
                                                
        if (form.checkValidity()) {                    
            saludar(formulario); 
        };
    };

    const handleOnChange = (event: any) =>{
        setFormulario({ ...formulario, [event.target.name]: event.target.value });
    };

    const onChangeDatePicker = (date: any) => {  
        if (date) {
         setStartDate(date);    
        };
    };

    const saludar = (nombre: INombre)  => {          
        const nombreConcatenado = concatenarNombre(nombre);
        const {edad,error}: IEdad = calcularEdad(startDate);        
        if(error){
            mostrarErrorDeFechaMayorActual(error);
        } else if(!error) {
            Swal.fire(`Hola ${nombreConcatenado}, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices ${edad} años !`)
            .then((result: SweetAlertResult) => {
                if (result.isConfirmed) {  
                    obtenerIp().then((ip) =>{ 
                        Swal.fire(`Tu direccion ip es : ${ip}`, '', 'success');
                    });                                           
                }; 
            }); 
        };                        
    };

    const mostrarErrorDeFechaMayorActual = (error: string) => {   
        Swal.fire({
            icon: 'error',
            title: error,
        });
    };

    return (  
       <> 
        <Form noValidate validated={validated} onSubmit={handleSubmitForm} id='formulario'>
            <Row className="mb-3">
             <Form.Group as={Col} md="4" >
                <Form.Control
                    required
                    id="formControlPrimerNombre"
                    name="primerNombre"
                    type="text"
                    placeholder="Primer Nombre"
                    onChange={handleOnChange}                  
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese el nombre.
                </Form.Control.Feedback>
             </Form.Group>
             <Form.Group as={Col} md="4">
                <Form.Control
                    id='formControlSegundoNombre'
                    name='segundoNombre'
                    type="text"
                    placeholder="Segundo Nombre" 
                    onChange={handleOnChange}                   
                />
             </Form.Group>
            </Row>

            <Row className="mb-3">
             <Form.Group as={Col} md="4" >
                <Form.Control
                    required
                    id="formControlPrimerApellido"
                    name="primerApellido"
                    type="text"
                    placeholder="Primer apellido"
                    onChange={handleOnChange} 
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese el apellido.
                </Form.Control.Feedback>
             </Form.Group>
             <Form.Group as={Col} md="4" >
                <Form.Control
                    id="formControlSegundoApellido"
                    name="segundoApellido"
                    type="text"
                    placeholder="Segundo apellido"
                    onChange={handleOnChange}
                />
             </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col} md="4" >
                <DatePicker 
                    id='datePickerFechaNacimiento'
                    placeholderText='Fecha cumpleaños'
                    selected={startDate}
                    onChange={onChangeDatePicker}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                />            
             </Form.Group>
            </Row>

            <Row>
             <Form.Group as={Col} md="4" >
                <Form.Control
                    required
                    id="formControlCorreo"
                    type="text"
                    placeholder="Correo"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese el correo.
                </Form.Control.Feedback>
             </Form.Group>
             <Form.Group as={Col} md="4" >
                <Form.Control
                    required
                    id="formControlTelefono"
                    type="text"
                    placeholder="Telefono"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese el telefono.
                </Form.Control.Feedback>
             </Form.Group>
            </Row>
            <Button 
                type='submit'
                id='buttonMostrarMensaje'
               >
                Saludo
            </Button>
        </Form>
     </>        
    );
}
