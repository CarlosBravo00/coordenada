const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const id = JSON.parse(event.body);

  const params = {
    TableName: "despensa",
    Key: id,
  };

  const data = await documentClient.delete(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify("Registro eliminado"),
  };
  return response;
};
