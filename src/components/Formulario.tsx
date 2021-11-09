import React, { ChangeEventHandler, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { concatenarNombre } from '../domain/concatenarNombre';
import 'bootstrap/dist/css/bootstrap.min.css';
import { INombre } from '../interface/INombre';

export const Formulario = () => {

    const [formulario, setFormulario] = useState<INombre>({
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",     
      });
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

    const saludar = (nombre: INombre): void => {          
        const nombreConcatenado = concatenarNombre(nombre);
        Swal.fire(`Hola ${nombreConcatenado}, su registro fue exitoso, nos vemos en su cumpleaños. ! Felices 33 años ¡`);                          
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
                    Porfavor ingrese el nombre.
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
             <Form.Group as={Col} md="4" >
                <Form.Control
                    required
                    id="FormControlFechaNacimiento"
                    name="FechaNacimiento"
                    type="text"
                    placeholder="Fecha Nacimiento"
                    onChange={handleOnChange}
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
             </Form.Group>
             <Form.Group as={Col} md="4" >
                <Form.Control
                    required
                    id="FormControlTelefono"
                    type="text"
                    placeholder="Telefono"
                />
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
