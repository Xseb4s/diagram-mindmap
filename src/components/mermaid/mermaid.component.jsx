import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// eslint-disable-next-line react/prop-types
const Diagram = ({ chart }) => {
  const diagramRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  // Función para exportar el diagrama a PDF
  const exportToPDF = () => {
    const input = diagramRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("mapa-conceptual.pdf");
    });
  };

  return (
    <div>
      <div ref={diagramRef} className="mermaid">
        {chart}
      </div>
      <button onClick={exportToPDF}>Exportar a PDF</button>
    </div>
  );
};

export default Diagram;