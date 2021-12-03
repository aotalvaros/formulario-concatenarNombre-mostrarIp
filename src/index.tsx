import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import { FormularioConFormik } from './components/FormularioConFormik';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormularioConFormik />
    </MuiPickersUtilsProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));