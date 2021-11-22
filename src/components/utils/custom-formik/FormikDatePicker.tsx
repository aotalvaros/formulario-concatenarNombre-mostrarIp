import { Field } from "formik";
import DatePicker from "react-datepicker";

export const FormDatePicker = (props: any) => {
  return (
    <Field name="inputFechaNacimiento">
      {({ field, meta, form: { setFieldValue } }: any) => {
        return (
          <DatePicker
            {...props}
            {...field}
            selected={field.value || null}
            onChange={(val) => {
              setFieldValue(field.name, val);
            }}
          />
        );
      }}
    </Field>
  );
};