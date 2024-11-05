import axios from "axios";
import { ROUTES } from "./api.routes";


export const ReadMapId = async (id) => {
    try {
      const response = await axios.get(ROUTES.READMAPID(id));
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