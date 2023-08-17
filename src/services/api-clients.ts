import axios, { CanceledError, AxiosError } from "axios";

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  // contoh penggunaan header
  // headers: {
  //     'api-key': '...'
  // }
});

// export tidak default, dan export sebagai name object
export { CanceledError };
export { AxiosError };
