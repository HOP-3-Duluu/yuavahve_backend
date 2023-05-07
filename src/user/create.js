const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");
const { v4: uuidv4 } = require("uuid");

module.exports.createUser = async (event) => {
  const id = uuidv4();
  const date = new Date();

  try {
    const res = await db.putItem({
      TableName: "usersTable",
      Item: marshall(
        {
          userId: id,
          username: event.queryStringParameters?.username,
          birthday: event.queryStringParameters?.birthday,
          createdAt: date.getTime(),
        },
        { removeUndefinedValues: true }
      ),
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
        message: `Error: ${e}`,
      }),
    };
  }
};
