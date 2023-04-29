const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const db = new DynamoDB({ region: "ap-southeast-1" });

module.exports = db;
