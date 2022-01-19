import React, { useState } from "react";
import "./App.scss";
import { Field, Form, Formik } from "formik";
import { PrimaryButton, TextField, Depths, ITextStyles, Label } from "@fluentui/react";
// import axios, { AxiosResponse } from "axios";
// import { weather } from "./models/weather.model";
import Webcam from "react-webcam";
import { createWorker } from "tesseract.js";

function App() {
  const myStyleTextField: ITextStyles = {
    root: {
      margin: 10,
    },
  };

  const myTextFiedName = ({ ...props }) => {
    return (
      <TextField
        label="Nombre:"
        {...props.field}
        {...props}
        styles={myStyleTextField}
      />
    );
  };

  // useEffect(() => {
  //   axios
  //     .get("http://iot-rudy.softpak.com.mx/api/Temperatura")
  //     .then((respuesta: AxiosResponse<weather[]>) => {
  //       console.log(respuesta.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error en get");
  //     });
  // }, []);

  const videoConstraints = {
    width: 800,
    height: 500,
    aspectRatio: 1.62,
    facingMode: "environment",
  };

  const [image, setImage] = useState("");
  const [valCard1, setValCard1] = useState("Valor Original");
  const webcamRef: any = React.useRef(null);

  function capture() {
    let imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    //console.log(imageSrc);

    (async () => {
      await worker.load();
      await worker.loadLanguage("spa");
      await worker.initialize("spa");
      const values = [];
      imageSrc = "./images/CE.jpg"
      for (let i = 0; i < rectangles.length; i++) {
        const {
          data: { text },
        } = await worker.recognize(imageSrc, {
          rectangle: rectangles[i],
        });
        values.push(text);
      }
      setValCard1(values[0]);
      console.log(values);
      await worker.terminate();
    })();
  }

  const worker = createWorker();
  // 677 412
  // const rectangles = [
  //   { left: 1138, top: 533, width: 677, height: 412 },
  //   { left: 1138, top: 533 + 413, width: 840, height: 430 },
  //   { left: 1138, top: 533 + 413 + 435, width: 1576, height: 159 },
  //   { left: 1138, top: 533 + 413 + 435 + 158, width: 1236, height: 159 },
  //   { left: 1138, top: 533 + 413 + 435 + 160 + 170, width: 457, height: 160 },
  //   {
  //     left: 1138 + 750,
  //     top: 533 + 413 + 435 + 160 + 170,
  //     width: 590,
  //     height: 160,
  //   },
  //   {
  //     left: 1138 + 800 + 580,
  //     top: 533 + 413 + 435 + 160 + 170,
  //     width: 600,
  //     height: 160,
  //   },
  // ];

  // Factor Width 0.32128740824393
  // Factor Height 0.243490178163545
  const rectangles = [
    {
      left: 1115,
      top: 530,
      width: 1230,
      height: 460,
    },
    {
      left: 1115,
      top: 900,
      width: 1230,
      height: 460,
    },
    {
      left: 1115,
      top: 1400,
      width: 1565,
      height: 130,
    },
    {
      left: 1115,
      top: 1540,
      width: 1240,
      height: 130,
    },
    {
      left: 1115,
      top: 1710,
      width: 1950,
      height: 300,
    },
    // {
    //   left: 1115,
    //   top: 1711,
    //   width: 550,
    //   height: 156,
    // },
    // {
    //   left: 1865,
    //   top: 1711,
    //   width: 520,
    //   height: 156,
    // },
    // {
    //   left: 2495,
    //   top: 1711,
    //   width: 560,
    //   height: 156,
    // },
    // {
    //   left: 1115,
    //   top: 1871,
    //   width: 655,
    //   height: 156,
    // },
    // {
    //   left: 1770,
    //   top: 1871,
    //   width: 650,
    //   height: 156,
    // },
    // {
    //   left: 2465,
    //   top: 1871,
    //   width: 570,
    //   height: 156,
    // },
  ];

  return (
    <div className="App">
      <Label>{valCard1}</Label>
      <div className="webcam-img">
        {image === "" ? (
          <Webcam
            audio={false}
            height={500}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={800}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img id="card" src={image} alt="Card" />
        )}
      </div>
      <div>
        {image !== "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage("");
            }}
            className="webcam-btn"
          >
            Retake Image
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn"
          >
            Capture
          </button>
        )}
      </div>
      <Formik
        initialValues={{
          nombre: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <div style={{ boxShadow: Depths.depth8, margin: 10 }}>
            <Form>
              <Field name="nombre" component={myTextFiedName} />
              <PrimaryButton
                text="Grabar"
                type="submit"
                style={{ marginBottom: 10 }}
              />
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );

  function resizeImage(base64Str: any, maxWidth: number, maxHeight: number) {

    const img = new Image();
    img.src = base64Str;
    const canvas = document.createElement('canvas');
   
    let width = img.width;
    let height = img.height;
    
    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }
    canvas.width = width;
    canvas.height = height;
    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL();
  }
}

export default App;
