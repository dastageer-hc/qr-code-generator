import { useState } from 'react';
import './App.css';
import placeholder from './assets/images/qr-placeholder.jpg';
import QRCode from "react-qr-code";
import { Input } from "@material-tailwind/react";

// utilit methods
function onImageDownload() {
  const svg = document.getElementById("QRCode");
  console.log(svg, 'svg')
  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = "QRCode";
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
};

function App() {
  const [inputValue, setQRValue] = useState('');

  const handleInputChange = (event) => {
    setQRValue(event.target.value);
  };

  return (
    <div className="app">
      <div className="qr-card-container">
        <div className="qr-container">
          {!inputValue ? <img src={placeholder} alt="test"></img> : <span>
            <QRCode id={'QRCode'} value={inputValue} size={300} />
          </span>
          }
        </div>
        <section>
          <h4>
            Generate QR Code
          </h4>
          <p>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />

          </p>
          <div>
            {inputValue ? <button onClick={onImageDownload}>Download QR</button> : null}
            <p>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
