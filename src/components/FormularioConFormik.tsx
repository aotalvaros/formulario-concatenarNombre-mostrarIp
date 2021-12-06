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
import logoGobanUnidos from "../image/LogoInsti.png";
import { TextField } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../style/components/FormularioConFormik.css";

export const FormularioConFormik = () => {

  const handleOnChange = (evento: any, resetForm: any) => {
    const nombre: INombre = {
      primerNombre: evento.inputPrimerNombre,
      primerApellido: evento.inputPrimerApellido,
      segundoNombre: evento.inputSegundoNombre,
      segundoApellido: evento.inputSegundoApellido,
    };
    saludar(nombre, evento.inputFechaNacimiento, resetForm);
  };

  const saludar = (nombre: INombre, fechaNacimiento: Date, resetForm: any) => {
    
    const nombreConcatenado = concatenarNombre(nombre);
    const { edad, error }: IEdad = calcularEdad(fechaNacimiento);

    if (error) {
      mostrarErrorDeFechaMayorActual(error);
    } else {
      Swal.fire({
        title: `Hola ${nombreConcatenado}, su registro fue exitoso, nos vemos en su cumpleaños. ¡Felices ${edad} años !`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          obtenerIp().then((ip) => { 
            Swal.fire({ 
              title: `Tu direccion ip es : ${ip}`, 
              icon: "success", 
              allowOutsideClick: false, 
              allowEscapeKey: false, 
              allowEnterKey: false
            });
          }).catch((error) => {
            Swal.fire({ 
              title: error, 
              icon: "error", 
              allowOutsideClick: false, 
              allowEscapeKey: false, 
              allowEnterKey: false
            });
          }).finally(() => resetForm());         
        }
      });
    }
  };

  const mostrarErrorDeFechaMayorActual = (error: string) => {
    Swal.fire({
      icon: "error",
      title: error,
    });
  };

  return (
    <div>
      <Formik
        initialValues={{
          inputPrimerNombre: "",
          inputSegundoNombre: "",
          inputPrimerApellido: "",
          inputSegundoApellido: "",
          inputCorreo: "",
          inputTelefono: "",
          inputFechaNacimiento: new Date(),
        }}
        onSubmit={(values: any, {resetForm}) => {
          handleOnChange(values, resetForm);
        }}
        validationSchema={Yup.object({
          inputPrimerNombre: Yup.string()
            .required("Por favor ingrese el nombre."),
          inputPrimerApellido: Yup.string()
            .required("Por favor ingrese el apellido."),
          inputCorreo: Yup.string()
            .email("El correo no tiene un formato valido.")
            .required("Por favor ingrese el correo."),
          inputFechaNacimiento: Yup.date()
            .required("Por favor ingrese una fecha de nacimiento.")
            .nullable()
            .typeError('Fecha invalida')
            .max(new Date(), "Debes ingresar una fecha de nacimiento valida"),
          inputTelefono: Yup.number()
            .required("Por favor ingrese un numero de telefono.")
            .positive("Numero de telefono invalido")
            .integer("Numero de telefono invalido")
        })}
      >
        {({ handleSubmit, errors, touched }: any) => (
          <Container className="abs-center" fluid="sm">
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="card card-container"
            >
              <img
                className="img-serponsive logo-img"
                alt=""
                src={logoGobanUnidos}
              />
              <div className="inputs-container">
                <Row className="row col-12 col-sm-6  col-md-12">
                  <Col className="col" xs="12" lg="6" >
                    <Field name="inputPrimerNombre">
                      {({ field }: any) => (
                        <TextField
                          {...field}
                          type="text"
                          id="inputPrimerNombre"
                          label="Primer Nombre"
                          error={
                            !!errors.inputPrimerNombre &&
                            touched.inputPrimerNombre
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="error-message"
                      data-testid="errorPrimerNombre"
                      name="inputPrimerNombre"
                      component="span"
                    />
                  </Col>

                  <Col className="col" xs="12" lg="6">
                    <Field name="inputSegundoNombre">
                      {({ field }: any) => (
                        <TextField
                          {...field}
                          type="text"
                          id="inputSegundoNombre"
                          label="Segundo Nombre"
                        />
                      )}
                    </Field>
                  </Col>
                </Row>

                <Row className="row col-12 col-sm-6 col-md-12">
                  <Col className="col" xs="12" lg="6">
                    <Field name="inputPrimerApellido">
                      {({ field }: any) => (
                        <TextField
                          {...field}
                          type="text"
                          label="Primer Apellido"
                          id="inputPrimerApellido"
                          error={
                            !!errors.inputPrimerApellido &&
                            touched.inputPrimerApellido
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="error-message"
                      data-testid="errorPrimerApellido"
                      name="inputPrimerApellido"
                      component="span"
                    />
                  </Col>
                  <Col className="col" xs="12" lg="6">
                    <Field name="inputSegundoApellido">
                      {({ field }: any) => (
                        <TextField
                          {...field}
                          type="text"
                          id="inputSegundoApellido"
                          label="Segundo Apellido"
                        />
                      )}
                    </Field>
                  </Col>
                </Row>

                <Row className="col-12 col-sm-6 col-md-12">
                  <Col className="col" xs="12" lg="6" >
                    <Field name="inputCorreo">
                      {({ field }: any) => (
                        <TextField
                          {...field}
                          type="text"
                          label="Correo"
                          id="inputCorreo"
                          error={!!errors.inputCorreo && touched.inputCorreo}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="error-message"
                      data-testid="errorCorreo"
                      name="inputCorreo"
                      component="span"
                    />
                  </Col>

                  <Col className="col" xs="12" lg="6">
                    <Field name="inputTelefono">
                      {({ field }: any) => (
                        <TextField
                          {...field}
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          type="number"
                          label="Telefono"
                          id="inputTelefono"
                          error={!!errors.inputTelefono && touched.inputTelefono}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      className="error-message"
                      data-testid="errorTelefono"
                      name="inputTelefono"
                      component="span"
                    />
                  </Col>
                </Row>
                
                <Row className="date-picker col-12 col-sm-12 col-md-12">               
                    <Field                   
                      name="inputFechaNacimiento"
                      id="inputFechaNacimiento"
                      component={FormDatePicker}
                      label="Fecha de Nacimiento"
                      format="MM/dd/yyyy"
                      maxDate={new Date()}                  
                    />                                                      
                    <ErrorMessage
                      className="error-message"
                      data-testid="errorFecha"
                      name="inputFechaNacimiento"
                      component="span"
                    />
                </Row>
              </div>
                              
              <Button type="submit" className="text-center mb-2 btn-saludar">
                Registrar
              </Button>
            </Form>
          </Container>
        )}
      </Formik>
    </div>
  );
};
