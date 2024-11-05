import Diagram from "./mermaid.component";

// eslint-disable-next-line react/prop-types
const Mermaid = ({id}) => {
  console.log("mapa: ",id)
    const chartDefinition = `
    graph TD;
      A[Concepto Principal] --> B[Subconcepto 1];
      A --> C[Subconcepto 2];
      B --> D[Detalles de Subconcepto 1];
      C --> E[Detalles de Subconcepto 2];
  `;

  return (
    <div>
      <h1>Mapa Conceptual con Mermaid</h1>
      <Diagram chart={chartDefinition} />
    </div>
  );
}

export default Mermaid