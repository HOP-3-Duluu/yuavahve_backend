const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");
const { v4: uuidv4 } = require("uuid");

module.exports.createFamily = async (event) => {
  const id = uuidv4();

  try {
    const res = await db.putItem({
      TableName: "productTable",
      Item: marshall(
        {
          id: id,
          familyId: event.queryStringParameters?.familyId,
          name: event.queryStringParameters?.name,
        },
        { removeUndefinedValues: true }
      ),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: JSON.stringify(res),
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
