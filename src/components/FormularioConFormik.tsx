import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";  
import { calcularEdad } from "../domain/calcularEdad";
import { concatenarNombre } from "../domain/concatenarNombre";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { FormDatePicker } from "./utils/custom-formik/FormikDatePicker";
import { IEdad } from "../interface/IEdad";
import { INombre } from "../interface/INombre";
import { obtenerIp } from "../domain/obtenerIp";
import * as Yup from "yup";
import React from "react";
import Swal, { SweetAlertResult } from "sweetalert2";
import logoGobanUnidos from '../image/LogoInsti.png'

export const FormularioConFormik = () => {


  const handleOnChange = (evento: any) => {
    const nombre: INombre = {
      primerNombre: evento.inputPrimerNombre,
      primerApellido: evento.inputPrimerApellido,
      segundoNombre: evento.inputSegundoNombre,
      segundoApellido: evento.inputSegundoApellido
    };    
    saludar(nombre, evento.inputFechaNacimiento);
  };
  
  const saludar = (nombre: INombre, fechaNacimiento: Date) => {
    const nombreConcatenado = concatenarNombre(nombre);
    const { edad, error }: IEdad = calcularEdad(fechaNacimiento);

    if (error) {
      mostrarErrorDeFechaMayorActual(error)
    } else {
      Swal.fire({
        title: `Hola ${nombreConcatenado}, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices ${edad} años !`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      }).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {  
          obtenerIp().then((ip) =>          
            Swal.fire({
              title:`Tu direccion ip es : ${ip}`,
              icon:'success',
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false
            })
          );                                        
        };
      });   
    }  
  };

  const mostrarErrorDeFechaMayorActual = (error: string) => {   
    Swal.fire({
      icon: 'error',
      title: error,
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          inputPrimerNombre: "",
          inputSegundoNombre: "",
          inputPrimerApellido: "",
          inputSegundoApellido: "",
          inputCorreo: "",
          inputTelefono: "",
          inputFechaNacimiento: "",
        }}
        onSubmit={(values: any) => {
          handleOnChange(values);
        }}
        validationSchema={ Yup.object({
          inputPrimerNombre: Yup.string()
            .required("Por favor ingrese el nombre."),
          inputPrimerApellido: Yup.string()
            .required("Por favor ingrese el apellido."),
          inputCorreo: Yup.string()
            .email("El correo no tiene un formato valido.")
            .required("Por favor ingrese el correo."),
          inputFechaNacimiento:Yup.date()
            .required("Por favor ingrese una fecha.")
            .max(new Date(), "Debes ingresar una fecha de nacimiento valida"),
          inputTelefono: Yup.string()
          .required("Por favor un ingrese numero de telefono."),
        })
        }
      >
        {(formik: any, props: any) => (
        <Container className='abs-center' fluid="md"> 
          <Form
            className='card card-container'
          >
            <img
                className="img-serponsive logo-img" alt=""
                src={logoGobanUnidos}
            />
            <Row className="mb-3">
              <Col xs="12" lg="6" >
                <Field 
                  name="inputPrimerNombre"
                  type="text"
                  placeholder="Primer Nombre"
                  />
              </Col>
              <Col xs="12" lg="6">
                <Field
                  name="inputSegundoNombre"
                  type="text"
                  placeholder="Segundo Nombre"
                  />
              </Col>
              <Col xs="12" lg="6">
                <ErrorMessage data-testid="errorPrimerNombre" name='inputPrimerNombre' component='span'/>               
              </Col>
            </Row> 

            <Row className="mb-3">
              <Col xs="12" lg="6">
                <Field
                  name="inputPrimerApellido"
                  type="text"
                  placeholder="Primer Apellido"
                />
              </Col>
              <Col xs="12" lg="6">
              <Field
                name="inputSegundoApellido"
                type="text"
                placeholder="Segundo Apellido"
                />
              </Col>
              <Col xs="12" lg="8">
              <ErrorMessage data-testid="errorPrimerApellido" name='inputPrimerApellido' component='span'/>              
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs="12" lg="6">
                <FormDatePicker
                  showYearDropdown
                  dateFormatCalendar="MMMM"
                  yearDropdownItemNumber={50}
                  scrollableYearDropdown
                  maxDate={new Date()}
                />
              </Col>
              <Col xs="12" lg="8">
              <ErrorMessage data-testid="errorFecha" name='inputFechaNacimiento' component='span'/>         
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs="12" lg="6">
                <Field 
                  name="inputCorreo" 
                  type="text" 
                  placeholder="Correo" 
                  />
              </Col>
              <Col xs="12" lg="6">
                <Field 
                  name="inputTelefono" 
                  type="text" 
                  placeholder="Telefono" 
                  />
              </Col>
              <Col xs="12" lg="6">
                <ErrorMessage data-testid="errorCorreo" name='inputCorreo' component='span'/>
              </Col>
              <Col xs="12" lg="6">
                <ErrorMessage data-testid="errorTelefono" name='inputTelefono' component='span'/>
              </Col>
            </Row>
            <Button 
              type="submit"
              className="text-center mb-2"
            >
              Registrar
            </Button>
          </Form>
        </Container>
        )}
      </Formik>
    </>
  );
};
