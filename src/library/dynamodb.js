const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const db = new DynamoDB({
  region: "localhost",
  endpoint: "http://localhost:8000",
});

module.exports = db;
