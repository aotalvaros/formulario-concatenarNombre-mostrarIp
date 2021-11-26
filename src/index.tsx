import React from 'react';
import ReactDOM from 'react-dom';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import './style/index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FormularioConFormik } from './components/FormularioConFormik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <FormularioConFormik />
    </LocalizationProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));