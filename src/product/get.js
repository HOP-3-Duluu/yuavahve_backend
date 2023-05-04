const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.getProduct = async (event) => {
  try {
    const { Items: items } = await db.query({
      TableName: "productTable",
      IndexName: "productTableIndex",
      KeyConditionExpression: "familyId = :familyId",
      ExpressionAttributeValues: marshall({
        ":familyId": event.pathParameters.familyId,
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: JSON.stringify(e),
      }),
    };
  }
};
