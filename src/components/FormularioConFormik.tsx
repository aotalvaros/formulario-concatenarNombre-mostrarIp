import { Field, Formik, Form, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import Swal, { SweetAlertResult } from "sweetalert2";
import { INombre } from "../interface/INombre";
import { concatenarNombre } from "../domain/concatenarNombre";
import { calcularEdad } from "../domain/calcularEdad";
import { IEdad } from "../interface/IEdad";
import "react-datepicker/dist/react-datepicker.css";  
import { FormDatePicker } from "./utils/custom-formik/FormikDatePicker";
import { obtenerIp } from "../domain/obtenerIp";

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
            .nullable()
            .required("Por favor ingrese una fecha."),
          inputTelefono: Yup.string()
          .required("Por favor un ingrese numero de telefono."),
        })
        }
      >
        {(formik: any, props: any) => (
          <Form>
            <Field 
              name="inputPrimerNombre"
              type="text"
              placeholder="Primer Nombre"
            />
            <ErrorMessage data-testid="errorPrimerNombre" name='inputPrimerNombre' component='span'/>
            
            <Field
              name="inputSegundoNombre"
              type="text"
              placeholder="Segundo Nombre"
            />
            <Field
              name="inputPrimerApellido"
              type="text"
              placeholder="Primer Apellido"
            />
            <ErrorMessage data-testid="errorPrimerApellido" name='inputPrimerApellido' component='span'/>
            
            <Field
              name="inputSegundoApellido"
              type="text"
              placeholder="Segundo Apellido"
            />
            <FormDatePicker
              showYearDropdown
              dateFormatCalendar="MMMM"
              yearDropdownItemNumber={50}
              scrollableYearDropdown
              maxDate={new Date()}
            />
            <ErrorMessage data-testid="errorFecha" name='inputFechaNacimiento' component='span'/>

            <Field 
              name="inputCorreo" 
              type="text" 
              placeholder="Correo" 
            />
            <ErrorMessage data-testid="errorCorreo" name='inputCorreo' component='span'/>

            <Field 
              name="inputTelefono" 
              type="text" 
              placeholder="Telefono" 
            />
            <ErrorMessage data-testid="errorTelefono" name='inputTelefono' component='span'/>
            
            <button type="submit">Registrar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
