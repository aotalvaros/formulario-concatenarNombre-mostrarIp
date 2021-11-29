import { DatePicker } from "@material-ui/pickers";

export const FormDatePicker = (props: any) => {
  const {field, form} = props;
  
  return(      
    <DatePicker
      {...props}
      {...field}                                                 
      onChange={(val) => {                  
        form.setFieldValue(field.name, val);                                                                  
      }}      
    />            
  );
};