import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { concatenarNombre } from '../domain/concatenarNombre';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Formulario = () => {

    const [obtenerNombre, setObtenerNombre] = useState({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: ''
    });   
    const [validated, setValidated] = useState<boolean>(false); 
    
    const handleSubmitForm = (event:any) => {                        
        const form = event.currentTarget;        
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();                  
            };             
            setValidated(true);                          
        };
        
    function actualizarNombre(evento:any) {
        setObtenerNombre({...obtenerNombre,[evento.target.name]: evento.target.value});         
    };

    const saludar = (): void => {  
        if (obtenerNombre.primerNombre !== '' && obtenerNombre.primerApellido !== '') {          
            const nombreConcatenado = concatenarNombre(obtenerNombre);
            Swal.fire(`Hola ${nombreConcatenado}, su registro fue exitoso, nos vemos en su cumpleaños. ! Felices 33 años ¡`);                      
        }      
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
                    onChange={actualizarNombre}                    
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
                    onChange={actualizarNombre}                
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
                    onChange={actualizarNombre} 
                />
             </Form.Group>
             <Form.Group as={Col} md="4" >
                <Form.Control
                    id="FormControlSegundoApellido"
                    name="segundoApellido"
                    type="text"
                    placeholder="Segundo apellido"
                    onChange={actualizarNombre}
                />
             </Form.Group>
             <Form.Group as={Col} md="4" >
                <Form.Control
                    required
                    id="FormControlFechaNacimiento"
                    name="FechaNacimiento"
                    type="text"
                    placeholder="Fecha Nacimiento"
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
                onClick={saludar}>
                Saludo
            </Button>
        </Form>
     </>        
    );
}
