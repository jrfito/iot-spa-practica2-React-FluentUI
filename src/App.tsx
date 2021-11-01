import React, { useEffect } from "react";
import "./App.scss";
import { Field, Form, Formik } from "formik";
import { PrimaryButton, TextField, Depths } from "@fluentui/react";
import axios, { AxiosResponse } from "axios";
import { weather } from './models/weather.model';


function App() {
  const myTextFiedName = ({ ...props }) => {
    return <TextField label="Nombre:" {...props.field} {...props} />;
  };

  useEffect(() => {
    axios.get('http://192.168.1.88:9000/api/Temperatura')
      .then((respuesta: AxiosResponse<weather[]>) => {
        console.log(respuesta.data);
      })
      .catch(error => {console.log('Error en get');})
  }, [])

  return (
    <div className="App">
      <Formik
        initialValues={{
          nombre: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <div style={{ boxShadow: Depths.depth8 }}>
            <Form>
              <Field name="nombre" component={myTextFiedName} />
              <PrimaryButton text="Grabar" type="submit" />
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default App;
