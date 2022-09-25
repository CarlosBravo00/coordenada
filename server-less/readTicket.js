const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const documentClient = new AWS.DynamoDB.DocumentClient();
const rek = new AWS.Rekognition();

async function uploadImageToS3(imageId, format, binaryImage) {
  var params = {
    Bucket: `custom-labels-console-us-east-1-83b15cf0e1`,
    Key: `${imageId}.${format}`,
    Body: binaryImage,
    CacheControl: "no-cache",
  };

  var s3Response;
  try {
    s3Response = await s3.upload(params).promise();
  } catch (error) {
    return error;
  }
  return s3Response;
}

exports.handler = async (event, context) => {
  const args = JSON.parse(event.body);
  const imgBase = args.image;

  const bucket = "custom-labels-console-us-east-1-83b15cf0e1";

  var format = imgBase.split("image/")[1];
  format = format.split(";")[0];
  var binaryImage = Buffer.from(
    imgBase.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  var imageId = context.awsRequestId;
  var s3Response = await uploadImageToS3(imageId, format, binaryImage);
  const photo = s3Response.Key;

  const relParams = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: photo,
      },
    },
  };
  const res = await rek.detectText(relParams).promise();

  const params = {
    TableName: "infoComida",
  };
  const data = await documentClient.scan(params).promise();
  const itemsList = data.Items;

  let arrData = [];

  let insertParams = {
    TableName: "despensa",
  };

  let promiseArr = [];
  res.TextDetections.forEach((textObject) => {
    if (textObject.Confidence > 90 && textObject.Type == "LINE") {
      let stringAux = textObject.DetectedText.toUpperCase();
      for (let item of itemsList) {
        if (stringAux.includes(item.Articulo.toUpperCase())) {
          const today = new Date();

          const newItem = {
            id: "PPA" + String(Math.random()).split(".")[1],
            Articulo: item.Articulo,
            Categoria: item.Categoria,
            FechaCompra: today.toISOString(),
            FechaRegistro: today.toISOString(),
            FechaExpiracion:
              item.VentanaExp != 0
                ? new Date(
                    today.setDate(today.getDate() + item.VentanaExp)
                  ).toISOString()
                : null,
            PorcionesRest: 0,
          };
          arrData.push(newItem);
          insertParams.Item = newItem;
          promiseArr.push(documentClient.put(insertParams).promise());
          break;
        }
      }
    }
  });

  const resProm = await Promise.all(promiseArr);

  const response = {
    statusCode: 200,
    body: JSON.stringify(arrData),
  };
  return response;
};
