import { marshall } from "@aws-sdk/util-dynamodb";
import { db } from "../library/dynamodb";

module.exports.joinFamily = async (event) => {
  try {
    const { Item: item } = await db.getItem({
      TableName: "familyTable",
      Key: marshall({ id: event.pathParameters.id }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "unsupported",
      }),
    };
  }
};
