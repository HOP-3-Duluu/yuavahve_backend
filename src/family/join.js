const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.joinFamily = async (event) => {
  try {
    const res = await db.updateItem({
      TableName: "familyTable",
      Key: { familyId: event.pathParameters.id },
      UpdateExpression: "set #members = list_append(#members, :userId)",
      ExpressionAttributeNames: {
        "#members": "members",
      },
      ExpressionAttributeValues: marshall({
        ":userId": event.queryStringParameters?.userId,
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Item added ${JSON.stringify(res)}`,
      }),
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
