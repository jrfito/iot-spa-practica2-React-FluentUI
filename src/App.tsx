import { useRef, useState, useEffect } from "react";
import "./App.scss";
import { Field, Form, Formik } from "formik";
import {
  PrimaryButton,
  TextField,
  Depths,
  ITextStyles,
  Label,
} from "@fluentui/react";
// import axios, { AxiosResponse } from "axios";
// import { weather } from "./models/weather.model";
import Webcam from "react-webcam";
import { createWorker } from "tesseract.js";
import { GetArrayPositions } from "./enums/positionsIne";

function App() {
  const [image, setImage] = useState("");
  const [valCard1, setValCard1] = useState("Valor Original");
  const webcamRef: any = useRef(null);
  const canvasRef: any = useRef(null);

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

  useEffect(() => {
    // Get canvas context
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";
    ctx.rect(0, 23, 315, 200);
    ctx.stroke();
  }, []);

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
    width: 630,
    height: 400,
    aspectRatio: 1.58,
    facingMode: "environment",
  };

  function capture() {
    let imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    //console.log(imageSrc);

    (async () => {
      await worker.load();
      await worker.loadLanguage("spa");
      await worker.initialize("spa");
      const values = [];
      imageSrc = resizeImage(imageSrc,315,200); // "./images/CE.jpg"
      setImage(imageSrc);
      const rectangles = GetArrayPositions(315, 200);
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
  //const rectangles = GetArrayPositions(3542,2189);
  // const rectangles = GetArrayPositions(241,153);
  // Factor Width 0.32128740824393
  // Factor Height 0.243490178163545
  // const rectangles = [
  //   {
  //     left: 3542 * NombrePosition.left,
  //     top: 530,
  //     width: 1230,
  //     height: 460,
  //   },
  //   {
  //     left: 1115,
  //     top: 900,
  //     width: 1230,
  //     height: 460,
  //   },
  //   {
  //     left: 1115,
  //     top: 1400,
  //     width: 1565,
  //     height: 130,
  //   },
  //   {
  //     left: 1115,
  //     top: 1540,
  //     width: 1240,
  //     height: 130,
  //   },
  //   {
  //     left: 1115,
  //     top: 1710,
  //     width: 1950,
  //     height: 300,
  //   },
  // ];

  return (
    <div className="App">
      
      <Label>{valCard1}</Label>
      <div className="webcam-img">
        {image === "" ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={630}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img id="card" src={image} alt="Card" />
        )}
        <canvas
          width={630}
          height={400}
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        />
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
    const canvas = document.createElement("canvas");

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
    const ctx: any = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL();
  }
}

export default App;
