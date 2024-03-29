const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");
const { v4: uuidv4 } = require("uuid");

module.exports.createProduct = async (event) => {
  const id = uuidv4();
  const date = new Date();

  try {
    const res = await db.putItem({
      TableName: "productTable",
      Item: marshall(
        {
          productId: id,
          familyId: event.queryStringParameters?.familyId,
          productName: event.queryStringParameters?.productName,
          createdAt: date.toISOString(),
          category: event.queryStringParameters?.category,
          creatorName: event.queryStringParameters?.creatorName,
          buyerId: event.queryStringParameters?.buyerId,
          price: event.queryStringParameters?.price,
          amount: event.queryStringParameters?.amount,
          amountType: event.queryStringParameters?.amountType,
          message: event.queryStringParameters?.message,
          isBought: false,
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
