import console from "console";
import { Api } from "../../index";


const service = new Api({
  baseUrl: `${import.meta.env.VITE_API_URL}`,
});

export default service;
