const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const awscred = require("awscred");

awscred.loadCredentials((err, creds) => {
  if (err) throw err;

  const db = new DynamoDB({
    region: "localhost",
    endpoint: "http://localhost:8000",
    credentials: creds,
  });

  module.exports = db;
});
