const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.getProduct = async (event) => {
  try {
    const res = await db
      .query({
        TableName: "productTable",
        KeyConditionExpression: "#fi = :familyId",
        ExpressionAttributeNames: {
          "#fi": "familyId",
        },
        ExpressionAttributeValues: marshall({
          ":familyId": event.pathParameters.id,
        }),
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(res),
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
