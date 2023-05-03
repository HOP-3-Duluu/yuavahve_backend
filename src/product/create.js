const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");
const { v4: uuidv4 } = require("uuid");

module.exports.createProduct = async (event) => {
  const id = uuidv4();

  try {
    const res = await db.putItem({
      TableName: "productTable",
      Item: marshall(
        {
          id: id,
          familyId: event.queryStringParameters?.familyId,
          productName: event.queryStringParameters?.productName,
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
