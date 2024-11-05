import { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import plantumlEncoder from "plantuml-encoder";

// eslint-disable-next-line react/prop-types
const Diagram = ({ chart }) => {
  const diagramRef = useRef(null);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    // Generar la URL del diagrama en PlantUML para renderizarlo
    if (chart) {
      const encoded = plantumlEncoder.encode(chart);
      const url = `https://www.plantuml.com/plantuml/svg/${encoded}`;
      setImageURL(url);
    }
  }, [chart]);

  // Función para cargar el SVG como imagen y convertirlo en canvas
  const exportToPDF = async () => {
    if (!imageURL) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // Permite cargar SVG desde un dominio externo
    img.src = imageURL;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Convertimos el canvas en una imagen y la añadimos al PDF
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("mapa-conceptual.pdf");
    };
  };

  return (
    <div className="w-full text-center">
      <div ref={diagramRef} className="my-10">
        {imageURL ? (
          <img src={imageURL} alt="Diagram" />
        ) : (
          <p>Generando diagrama...</p>
        )}
      </div>
      <button
        className="border-0 p-2 rounded-lg text-white w-fit"
        style={{ background: "#004991" }}
        onClick={exportToPDF}
      >
        Exportar a PDF
      </button>
    </div>
  );
};

export default Diagram;
