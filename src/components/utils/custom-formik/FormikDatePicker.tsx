import { KeyboardDatePicker } from "@material-ui/pickers";

export const FormDatePicker = (props: any) => {
  const { field, form } = props;
  
  return(      
    <KeyboardDatePicker
      {...props}
      {...field}                                                 
      onChange={(val) => {                  
        form.setFieldValue(field.name, val);                                                                  
      }}      
    />            
  );
};