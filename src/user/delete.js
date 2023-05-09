const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.deleteUser = async (event) => {
  try {
    const res = await db.deleteItem({
      TableName: "usersTable",
      Key: marshall({
        userId: event.queryStringParameters.userId,
      }),
    });

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
