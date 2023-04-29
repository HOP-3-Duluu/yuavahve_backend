const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.joinFamily = async (event) => {
  try {
    const { Item: item } = await db.getItem({
      TableName: "familyTable",
      Key: marshall(
        { id: event.pathParameters.id },
        { removeUndefinedValues: true }
      ),
    });

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "unsupported",
      }),
    };
  }
};
