const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const rek = new AWS.Rekognition();

exports.handler = async (event) => {
  const params = {
    TableName: "despensa",
  };
  const data = await documentClient.scan(params).promise();
  const itemsList = data.Items;
  const bucket = "custom-labels-console-us-east-1-83b15cf0e1";
  const photo = "carlos.jpeg";

  const relParams = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: photo,
      },
    },
  };

  let arrData = [];

  try {
    for (let item of itemsList) {
      const newItem = {
        id: item.id,
        Articulo: item.Articulo,
        Categoria: item.Categoria,
        FechaCompra: item.FechaCompra,
        FechaRegistro: item.FechaRegistro,
        FechaExpiracion: item.FechaExpiracion,
        PorcionesRest: item.PorcionesRest,
      };
      arrData.push(newItem);
      break;
    }
  } catch (error) {
    console.error(error);
  }

  console.log(arrData);

  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };

  return response;
};
