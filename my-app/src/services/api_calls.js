const axios = require("axios");
const API_URL = "https://jcixb6pvr9.execute-api.us-east-1.amazonaws.com";

export function helloWorldCall() {
  return axios({
    method: "get",
    url: `${API_URL}/helloWorld`,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
