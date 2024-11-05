// Importaciones necesarias
import { useParams } from "react-router-dom";
import Diagram from "./plantuml.component"; // Asume que Diagram ahora soporta PlantUML
import { ReadMapId } from "@/services/map.routes";
import { useEffect, useState } from "react";

// Función para generar el formato PlantUML Mindmap a partir de los datos
const generatePlantUMLDefinition = (steps) => {
    let plantUMLDefinition = "@startmindmap\n";

    steps.forEach((step) => {
        plantUMLDefinition += `  * ${step.value}\n`;
        // Se puede agregar más lógica aquí para sub-nodos si los datos lo permiten
    });

    plantUMLDefinition += "@endmindmap";
    return plantUMLDefinition;
};

const PlantUMLMindmap = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);

    // Obtener y parsear los datos de pasos
    const getMap = async () => {
        const { data, error } = await ReadMapId(id);
        
        if (error) {
            console.error(error);
        } else {
            const parsedData = JSON.parse(data.steps);
            setData(parsedData);
        }
    };

    useEffect(() => {
        getMap();
    }, [id]);

    // Generar la definición del diagrama PlantUML con los datos dinámicos
    const chartDefinition = generatePlantUMLDefinition(data);

    // Renderiza el diagrama sólo si `chartDefinition` tiene contenido
    return (
        <div className="text-center">
            <h1 className="text-xl font-semibold mt-4">Mapa Conceptual del mapa {id}</h1>
            {chartDefinition.length > 0 && <Diagram chart={chartDefinition} />}
        </div>
    );
};

export default PlantUMLMindmap;