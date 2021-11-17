import React, { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { concatenarNombre } from '../domain/concatenarNombre';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";    
import { INombre } from '../interface/INombre';
import DatePicker from "react-datepicker";
import { calcularEdad } from '../domain/calcularEdad';
import { IEdad } from '../interface/IEdad';
import { obtenerIp } from '../domain/obtenerIp';
import logoGobanUnidos from '../image/LogoInsti.png'

export const Formulario = () => {

    const [formulario, setFormulario] = useState<INombre>({
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: ""   
    });
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [validated, setValidated] = useState<boolean>(false);
    const [isOnlyTheEmailValid, setIsOnlyTheEmailValid] = useState<boolean>(false);
    const [correo, setCorreo] = useState('');
    
    const handleSubmitForm = (event: any) => {                               
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();                  
        setValidated(true);
        setIsOnlyTheEmailValid(false);

        if(event.currentTarget.Correo.checkValidity() && !isValidEmail(correo)){
            setIsOnlyTheEmailValid(true);
            setValidated(false); //---
        } else if (form.checkValidity()) {                
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

    const handleOnChangeCorreo = (event: any) =>{
        setCorreo( event.target.value)
    };

    const isValidEmail = (mail: any) =>{
        return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
    };

    const saludar = (nombre: INombre)  => {          
        const nombreConcatenado = concatenarNombre(nombre);
        const {edad,error}: IEdad = calcularEdad(startDate);        
        if(error){
            mostrarErrorDeFechaMayorActual(error);
        } else if(!error) {
            Swal.fire({
                title:`Hola ${nombreConcatenado}, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices ${edad} años !`,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            })
            .then((result: SweetAlertResult) => {
                if (result.isConfirmed) {  
                    obtenerIp().then((ip) =>{ 
                        Swal.fire({
                            title:`Tu direccion ip es : ${ip}`,
                            icon:'success',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false
                        });
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
        <Container className='abs-center' fluid="md">  
            <Form 
                noValidate 
                validated={validated} 
                onSubmit={handleSubmitForm} 
                id='formulario'
                className='card card-container'
            >
            <img
                className="img-serponsive logo-img" alt=""
                src={logoGobanUnidos}
            />                     
            <Row className="mb-2">
                <Col xs="12" lg="6" className='mb-2' >
                    <Form.Group>
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
                </Col>
                <Col xs="12" lg="6" className='mb-2'>
                    <Form.Group >
                        <Form.Control
                            id='formControlSegundoNombre'
                            name='segundoNombre'
                            type="text"
                            placeholder="Segundo Nombre" 
                            onChange={handleOnChange}
                                          
                        />
                    </Form.Group> 
                </Col>          
                </Row>

                <Row className="mb-2">
                    <Col xs="12" lg="6" className='mb-2'>
                        <Form.Group>
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
                    </Col>
                    <Col xs="12" lg="6" className='mb-2'>
                        <Form.Group>    
                            <Form.Control
                                id="formControlSegundoApellido"
                                name="segundoApellido"
                                type="text"
                                placeholder="Segundo apellido"
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row >
                    <Col lg="4" className="mb-2">
                        <InputGroup>
                            <DatePicker  
                                required                         
                                id='datePickerFechaNacimiento'
                                placeholderText='Fecha cumpleaños'
                                selected={startDate}
                                onChange={onChangeDatePicker}
                                showYearDropdown
                                dateFormatCalendar="MMMM"
                                yearDropdownItemNumber={15}
                                scrollableYearDropdown
                                maxDate={new Date()}
                            />            
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <InputGroup >
                        <Form.Control   
                            required              
                            id="formControlCorreo"
                            type="text"
                            placeholder="Correo"
                            name='Correo'
                            onChange={handleOnChangeCorreo}
                            isInvalid={isOnlyTheEmailValid}                           
                        />  
                        {
                            !isOnlyTheEmailValid ? (
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese el correo.
                                </Form.Control.Feedback>
                            ) : (
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un correo valido como: 'nombre@correo.com'
                                </Form.Control.Feedback>                            
                            )
                        }
                    </InputGroup>                
                </Row>

                <Row>
                    <Col lg="12">
                        <Form.Group>
                            <Form.Control
                                required
                                id="formControlTelefono"
                                type="number"
                                placeholder="Telefono"
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingrese el telefono.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button 
                    type='submit'
                    id='buttonMostrarMensaje'
                    className="text-center mb-2"
                >
                    Saludo
                </Button>
            </Form>
        </Container> 
     </>        
    );
}
