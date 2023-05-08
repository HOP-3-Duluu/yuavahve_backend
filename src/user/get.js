const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.getUser = async (event) => {
  try {
    const { Item: item } = await db.getItem({
      TableName: "usersTable",
      Key: marshall({ userId: event.pathParameters.id }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify(item),
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
