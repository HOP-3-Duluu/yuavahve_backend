const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");
const { v4: uuidv4 } = require("uuid");

module.exports.createProduct = async (event) => {
  const id = uuidv4();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 3 > 11 ? date.getMonth() + 3 - 12 : date.getMonth() + 3
  ).padStart(2, "0");
  const ttl = new Date(`${year}-${month}`);

  try {
    const res = await db.putItem({
      TableName: "productTable",
      Item: marshall(
        {
          productId: id,
          familyId: event.queryStringParameters?.familyId,
          productName: event.queryStringParameters?.productName,
          createdAt: date.getTime(),
          ttl: ttl.getTime(),
          category: event.queryStringParameters?.category,
          creatorId: event.queryStringParameters?.creatorId,
          buyerId: event.queryStringParameters?.buyerId,
          price: event.queryStringParameters?.price,
          amount: event.queryStringParameters?.amount,
          message: event.queryStringParameters?.message,
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
