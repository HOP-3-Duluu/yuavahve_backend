const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.createFamily = async (event) => {
  const id = require("crypto").randomBytes(16).toString("hex");
  try {
    const familyName = event.params && event.params?.name;
    const res = await db.putItem({
      TableName: "familyTable",
      Item: marshall(
        {
          id: id,
          familyName: familyName,
        },
        { removeUndefinedValues: true }
      ),
    });
    console.log("Item added:", res);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Item added",
      }),
    };
  } catch (e) {
    console.error("Error:", e);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Error adding item",
      }),
    };
  }
};
