const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.deleteProduct = async (event) => {
  try {
    const res = await db.deleteItem({
      TableName: "productTable",
      Key: marshall({
        productId: event.queryStringParameters.productId,
        familyId: event.queryStringParameters.familyId,
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: JSON.stringify(e),
      }),
    };
  }
};
