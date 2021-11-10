import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { concatenarNombre } from '../domain/concatenarNombre';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";    
import { INombre } from '../interface/INombre';
import DatePicker from "react-datepicker";
import { calcularEdad } from '../domain/calcularEdad';
import sombreroCumpleaños from '../image/sombreroCumpleaños.png'
import { IEdad } from '../interface/IEdad';

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
        event.preventDefault();
        event.stopPropagation();                  
        setValidated(true);                                 
        const form = event.currentTarget; 
        if (form.checkValidity()) {
            saludar(formulario);           
        };
    };

    const handleOnChange = (event: any) =>{
        setFormulario({ ...formulario, [event.target.name]: event.target.value });            
    };

    const onChangeDatePicker = (date: any) => {
        setStartDate(date);     
    };

    const saludar = (nombre: INombre): void => {          
        const nombreConcatenado = concatenarNombre(nombre);
        const {edad,error}: IEdad = calcularEdad(startDate);
        if(error){
            handleReset(error)
        } else{
            Swal.fire({ 
                title: `Hola ${nombreConcatenado}, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices ${edad} años !`,
                confirmButtonText: 'Ok',
                imageUrl: sombreroCumpleaños,
                imageWidth: 300,
                imageHeight: 100,
                imageAlt: 'Custom image',
            }).then((result) => {
                if (result.isConfirmed) {
                Swal.fire('Tu dirrecion Ip es: !', '', 'success')
                }; 
            });  
        };                        
    };

    const handleReset = (error: string) => {   
        Swal.fire({
            icon: 'error',
            title: error,
          });
    };

    return (  
       <> 
        <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
            <Row className="mb-3">
             <Form.Group as={Col} md="4" >
                <Form.Control
                    required
                    id="FormControlPrimerNombre"
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
                    id='FormControlSegundoNombre'
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
                    id="FormControlPrimerApellido"
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
                    id="FormControlSegundoApellido"
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
                    placeholderText='Fecha cumpleaños'
                    selected={startDate}
                    onChange={onChangeDatePicker}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    isClearable={true}
                />            
             </Form.Group>
            </Row>

            <Row>
             <Form.Group as={Col} md="4" >
                <Form.Control
                    required
                    id="FormControlCorreo"
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
                    id="FormControlTelefono"
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
