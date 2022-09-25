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

export function readTicketCall({ IMAGE }) {
  const foo = {
    image: IMAGE,
  };
  return axios({
    method: "POST",
    url: `${API_URL}/readTicket`,
    headers: {
      "Content-Type": "application/json",
    },
    data: foo, // object describing the foo
    body: JSON.stringify(foo), // aws4 looks for body; axios for data
  });
}
