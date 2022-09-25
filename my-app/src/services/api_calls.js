const axios = require("axios");
const API_URL = "https://jcixb6pvr9.execute-api.us-east-1.amazonaws.com/prod";

export function helloWorldCall() {
  return axios({
    method: "get",
    url: `${API_URL}/helloWorld`,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getDespensaCall() {
  return axios({
    method: "get",
    url: `${API_URL}/getDespensa`,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function readTicketCall(IMAGE) {
  return axios({
    method: "POST",
    url: `${API_URL}/readTicket`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
      "Content-Type": "application/json",
    },
    data: {
      image: IMAGE,
    }, // object describing the foo
  });
}

export function deleteItemCall(itemId) {
  return axios({
    method: "POST",
    url: `${API_URL}/deleteItem`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
      "Content-Type": "application/json",
    },
    data: {
      id: itemId,
    }, // object describing the foo
  });
}
