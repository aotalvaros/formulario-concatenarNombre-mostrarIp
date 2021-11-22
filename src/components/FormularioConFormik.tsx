import { Field, Formik, Form } from "formik";
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
        // validationSchema={ Yup.object({
        //   inputPrimerNombre: Yup.string()
        //     .max(15, "Debe tener 15 caracteres o menos.")
        //     .required("Requerido"),
        //   inputPrimerApellido: Yup.string()
        //     .max(15, "Debe tener 15 caracteres o menos.")
        //     .require("Requerido"),
        //   inputCorreo: Yup.string()
        //     .email("El correo no tiene un formato valido.")
        //     .required("Requerido"),

        // })
        // }
      >
        {(formik: any, props: any) => (
          <Form>
            <Field 
              name="inputPrimerNombre"
              type="text"
              placeholder="Primer Nombre"
            />
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
            <Field name="inputCorreo" type="text" placeholder="Correo" />
            <Field name="inputTelefono" type="text" placeholder="Telefono" />
            <button type="submit">Registrar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
