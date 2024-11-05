// Importaciones necesarias
import { useParams } from "react-router-dom";
import Diagram from "./plantuml.component";
import { ReadMapId } from "@/services/map.routes";
import { useEffect, useState } from "react";

const PlantUMLMindmap = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [chartDefinition, setChartDefinition] = useState("");

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    
    useEffect(() => {
        if (data) {
            const generatePlantUMLDefinition = (data) => {
                let plantUMLDefinition = "@startmindmap\n skinparam wrapWidth 800 \n";
                plantUMLDefinition += "top to bottom direction \n";
                console.log(data);
              
                // Nodo raíz
                plantUMLDefinition += `* ${data[0].value} \n`;
              
                // Definición de opciones para los diferentes pasos
                const opciones = [
                    { id: '2', options: [{ value: 'Buscar información', label: 'Buscar información' }, { value: 'Información general', label: 'Información general' }, { value: 'Formación usuarios', label: 'Formación usuarios' }] },
                    { id: '2-a-select', options: [{ value: 'Sí lo conozco', label: 'Sí lo conozco' }, { value: 'No lo conozco', label: 'No lo conozco' }] },
                    { id: '2-a-select-4', options: [{ value: 1, label: 'Catálogo de libros Biblioteca Central UPN' }, { value: 2, label: 'Bases de datos' }, { value: 3, label: 'Repositorio institucional UPN' }] },
                    { id: '2-a-select-5', options: [{ value: 'Sí, gracias', label: 'Sí, gracias' }, { value: 'No, ayuda', label: 'No, ayuda' }] },
                    { id: '2-a-select-5b-2', options: [{ value: 'Sí lo conozco', label: 'Sí lo conozco' }, { value: 'No lo conozco', label: 'No lo conozco' }] },
                    { id: 'z-link-2', options: [{ value: 'Sí gracias', label: 'Sí gracias' }, { value: 'No ayuda', label: 'No ayuda' }] },
                    { id: '2-a-select-2a', options: [{ value: 'Sí, por favor', label: 'Sí, por favor' }, { value: 'Finalizar', label: 'Finalizar' }] },
                    { id: '2-b', options: [{ value: 'Biblioteca Central', label: 'Biblioteca Central' }, { value: 'Valmaría', label: 'Valmaría' }, { value: 'IPN', label: 'IPN' }] },
                    { id: '2-c-select', options: [{ value: 'Temáticas', label: 'Temáticas' }, { value: 'Sesiones formación', label: 'Sesiones formación' }] }
                ];
              
                // Procesamiento de cada paso en el flujo
                data.slice(1).forEach((step, index) => {
                    const optionSet = opciones.find(o => o.id === step.id);
                    let prefix = '*'.repeat(index+2);
            
                    if (optionSet) {
                        // Agregar el paso actual y luego sus opciones
                        optionSet.options.forEach(opt => {
                            if (opt.label !== step.value) {
                                plantUMLDefinition += `${prefix} ${opt.label} \n`;
                                // plantUMLDefinition += ""
                            }
                        });
                        plantUMLDefinition += `${prefix} ${step.value} \n`;

                    } else {
                        // Paso sin opciones adicionales, agregar solo el valor del paso
                        plantUMLDefinition += `${prefix} ${step.value} \n`;
                    }
                });
              
                plantUMLDefinition += "@endmindmap\n";
                return plantUMLDefinition;
            };
                       

            const definition = generatePlantUMLDefinition(data);
            setChartDefinition(definition);
        }
    }, [data]);

    return (
        <div className="text-center">
            {data ? (
                <>
                    <h1 className="text-xl font-semibold mt-4">Mapa Conceptual del mapa {id}</h1>
                    {chartDefinition.length > 0 && <Diagram chart={chartDefinition} id={id} />}
                </>
            ) : (
                <h1>cargando</h1>
            )}
        </div>

    );
};

export default PlantUMLMindmap;