import axios from "axios";
import { ROUTES } from "./api.routes";

export const CreateInteract = async (data) => {
    try {
      const response = await axios.post(ROUTES.CREATEINTERACT, data);
      return {
        error: false ,
        data: response.data
      };
    } catch (error) {
  
      return {
        error: true ,
        data: error.response
      }
    }
};
export const ReadInteract = async () => {
  try {
    const {data} = await axios.get(ROUTES.READINTERACT);
    return{
      error:false,
      data: data
    }
  } catch (error) {
    return{
      error:true,
      data: error.response
    }
  }
}
export const ReadInteractId = async (id) => {
  try {
    const {data} = await axios.get(ROUTES.READINTERACTID(id));
    console.log(data)
    return{
      error:false,
      data: data
    }
  } catch (error) {
    return{
      error:true,
      data: error.response
    }
  }
}
export const DeleteInteract = async (id) => {
  try {
    const response = await axios.delete(ROUTES.DELETEINTERACT(id));
    // Retornamos un objeto consistente
    return {
      error: false,
      data: response.data, // En caso de éxito, retornamos los datos de la respuesta
    };
  } catch (error) {
    // Manejo de error
    return {
      error: true,
      data: error.response ? error.response.data : "Unexpected error",
      status: error.response ? error.response.status : 500,
    };
  }
}