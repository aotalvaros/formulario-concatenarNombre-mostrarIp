import { Button, Col, Container, Row } from "react-bootstrap";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { FormDatePicker } from "./utils/custom-formik/FormikDatePicker";
import { INombre } from "../interface/INombre";
import * as Yup from "yup";
import React from "react";
import logoGobanUnidos from "../image/LogoInsti.png";
import { TextField } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../style/components/FormularioConFormik.css";
import { saludar } from "./utils/mensajeDeSaludo";

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
            .typeError('Debes ingresar una fecha valida')
            .max(new Date(), "Debes ingresar una fecha de nacimiento valida"),
          inputTelefono: Yup.number()
            .required("Por favor ingrese un numero de telefono.")
            .positive("Numero de telefono invalido")
            .integer("Numero de telefono invalido")
        })}
      >
        {({ handleSubmit, errors, touched }: any) => (
          <Container className="container-form" fluid >
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="card card-container"
            >
              <img
                alt=""
                src={logoGobanUnidos}
              />
              <div className="inputs-container">
                <Row className="row col-12" sm="2" xs="1" >
                  <Col className="columna">
                    <Field name="inputPrimerNombre">
                      {({ field }: any) => (
                        <TextField
                          className="col-12 col-xs-12"                       
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

                  <Col className="columna">
                    <Field name="inputSegundoNombre">
                      {({ field }: any) => (
                        <TextField
                          className="col-12 col-xs-12" 
                          {...field}
                          type="text"
                          id="inputSegundoNombre"
                          label="Segundo Nombre"
                        />
                      )}
                    </Field>
                  </Col>
                </Row>

                <Row className="row col-12" sm="2" xs="1">
                  <Col className="columna">
                    <Field name="inputPrimerApellido">
                      {({ field }: any) => (
                        <TextField
                          className="col-12 col-xs-12"
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

                  <Col className="columna">
                    <Field name="inputSegundoApellido">
                      {({ field }: any) => (
                        <TextField
                          className="col-12 col-xs-12"
                          {...field}
                          type="text"
                          id="inputSegundoApellido"
                          label="Segundo Apellido"
                        />
                      )}
                    </Field>
                  </Col>
                </Row>

                <Row className="row col-12" sm="2" xs="1">
                  <Col className="columna">
                    <Field name="inputCorreo">
                      {({ field }: any) => (
                        <TextField
                          className="col-12 col-xs-12"
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

                  <Col className="columna">
                    <Field name="inputTelefono">
                      {({ field }: any) => (
                        <TextField
                          className="col-12 col-xs-12"
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
                
                <Row className="row col-12" sm="1" xs="1">
                  <Col className="columna"> 
                    <Field
                      className="col-12 col-xs-12"                   
                      name="inputFechaNacimiento"
                      id="inputFechaNacimiento"
                      component={ FormDatePicker }
                      label="Fecha de Nacimiento"
                      format="MM/dd/yyyy"
                      maxDate={ new Date() } 
                      invalidDateMessage={ false }
                      maxDateMessage={ false }                  
                    />                                                      
                    <ErrorMessage
                      className="error-message"
                      data-testid="errorFecha"
                      name="inputFechaNacimiento"
                      component="span"
                    />
                  </Col>               
                </Row>
              </div>
                              
              <Button type="submit" className="text-center  btn-saludar">
                Registrar
              </Button>
            </Form>
          </Container>
        )}
      </Formik>
    </div>
  );
};
