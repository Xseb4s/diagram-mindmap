import axios from "axios";
import { ROUTES } from "./api.routes";

export const ReadLogin = async ({ password, email }) => {
  try {
    const response = await axios.post(ROUTES.LOGIN, {
      password,
      email,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
