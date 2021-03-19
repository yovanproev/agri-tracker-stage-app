import axios from "axios";

const databaseURLDevelopment = "https://input-output-data.firebaseio.com";

const instance = axios.create ({
  baseURL: databaseURLDevelopment
});

export default instance;