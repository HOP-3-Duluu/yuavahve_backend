const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.getFamily = async (event) => {
  try {
    const { Item: item } = await db.getItem({
      TableName: "familyTable",
      Key: marshall({ familyId: event.pathParameters.id }),
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
