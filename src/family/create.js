const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");
const { v4: uuidv4 } = require("uuid");

module.exports.createFamily = async (event) => {
  const id = uuidv4();

  try {
    const res = await db.putItem({
      TableName: "familyTable",
      Item: marshall(
        {
          id: id,
          name: event.queryStringParameters?.name,
          members: [event.queryStringParameters?.userId],
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
