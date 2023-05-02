const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.joinFamily = async (event) => {
  try {
    const res = await db.updateItem({
      TableName: "familyTable",
      key: { id: event.queryStringParameters?.id },
      UpdateExpression:
        "set #members = list_append(if_not_exists(#members, :empty_list), :userId)",
      ExpressionAttributeNames: {
        "#members": "members",
      },
      ExpressionAttributeValues: {
        ":userId": [event.queryStringParameters?.userId],
        ":empty_list": [],
      },
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
