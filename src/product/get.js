const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.getProduct = async (event) => {
  try {
    if (event.queryStringParameters !== undefined) {
      const { Items: items } = await db.query({
        TableName: "productTable",
        IndexName: "productTableIndex",
        KeyConditionExpression:
          "familyId = :familyId AND createdAt BETWEEN :from AND :to",
        ExpressionAttributeValues: marshall({
          ":familyId": event.pathParameters.id,
          ":from": event.queryStringParameters.from,
          ":to": event.queryStringParameters.to,
        }),
      });

      return {
        statusCode: 200,
        body: JSON.stringify(items),
      };
    } else {
      const { Items: items } = await db.query({
        TableName: "productTable",
        IndexName: "productTableIndex",
        KeyConditionExpression: "familyId = :familyId",
        ExpressionAttributeValues: marshall({
          ":familyId": event.pathParameters.id,
        }),
      });

      return {
        statusCode: 200,
        body: JSON.stringify(items),
      };
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: JSON.stringify(e),
      }),
    };
  }
};
