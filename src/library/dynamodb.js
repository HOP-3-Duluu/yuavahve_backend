import { DynamoDB } from "@aws-sdk/client-dynamodb";

let options = {};
if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

export const db = new DynamoDB(options);
