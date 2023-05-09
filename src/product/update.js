const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.updateProduct = async (event) => {
  const { queryStringParameters } = event;

  try {
    if (!queryStringParameters) throw Error("Invalid request");

    const { productId, familyId, ...others } = queryStringParameters;

    const attributeValues = {};
    const attributeNames = {};
    const updateExpression = [];

    for (const [key, value] of Object.entries(others)) {
      attributeValues[":" + key] = marshall(value);
      attributeNames["#" + key] = key;
      updateExpression.push(`#${key} = :${key}`);
    }

    const res = await db.updateItem({
      TableName: "productTable",
      Key: marshall({ productId, familyId }),
      UpdateExpression: "set " + updateExpression.join(", "),
      ExpressionAttributeValues: attributeValues,
      ExpressionAttributeNames: attributeNames,
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
