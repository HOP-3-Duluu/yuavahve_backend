import { marshall } from "@aws-sdk/util-dynamodb";
import { db } from "../library/dynamodb";
const crypto = require("crypto");

module.exports.createFamily = async (event) => {
  const id = crypto.randomBytes(16).toString("hex");
  try {
    const res = await db.putItem({
      TableName: "familyTable",
      Item: marshall({
        id: id,
        familyName: event.params.name,
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: res,
      }),
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
