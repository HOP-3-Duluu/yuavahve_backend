const { marshall } = require("@aws-sdk/util-dynamodb");
const db = require("../library/dynamodb");

module.exports.getProduct = async (event) => {
  try {
    await db.scan({ TableName: "usersTable" }, (err, data) => {
      if (err) {
        console.log("Error: ", err);
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      }
    });
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "unsupported",
      }),
    };
  }
};
