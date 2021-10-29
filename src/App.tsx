import React from "react";
import "./App.scss";
import { Field, Form, Formik } from "formik";
import { PrimaryButton, TextField, Depths } from "@fluentui/react";

function App() {
  const myTextFiedName = ({ ...props }) => {
    return <TextField label="Nombre:" {...props.field} {...props} />;
  };

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
