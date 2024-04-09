import { useState } from "react";
export const QrCode = () => {
    const [img, setImg] = useState("")
    const [qrData, setQrData] = useState("https://www.linkedin.com/in/jerwin-titus-71b083189/")
    const [qrSize, setQrSize] = useState("150");
    async function generateQR(){
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
            setImg(url);
        }catch(error){
            console.error("Error generating QR code", error);
        }
    }
    function downloadQR(){
        fetch(img).then((Response) => Response.blob()).then((blob) => {
            const link = document.createElement("a");
            link.href= URL.createObjectURL(blob);
            link.download = "qrcode.png"
            document.body.appendChild(link);
            link.click()
            document.body.removeChild(link);
        })
    }
    return (
        <div className="app-container">
            <h1>QR CODE GENERATOR</h1>
            {img && <img src={img} className="qr-code-image"/>}
            <div>
            <label htmlFor="dataInput" className="inputLabel">Data for QR code</label>
            <input value={qrData} placeholder="Enter data for QR" onChange={(e) => setQrData(e.target.value)} type="text" id="dataInput"/>
            <label htmlFor="sizeInput" className="inputLabel">Image size</label>
            <input placeholder="Enter the size of the image" onChange={(e) => setQrSize(e.target.value)} type="text" value={qrSize} id="sizeInput"/>
            <button className="GenerateButton" onClick={generateQR}>Generate QR code</button>
            <button className="DownloadButton" onClick={downloadQR}>Download QR code</button>
            </div>
            <p className="footer">Designed by <a href="#">Jerwin Titus D</a></p>
        </div>
    );
};