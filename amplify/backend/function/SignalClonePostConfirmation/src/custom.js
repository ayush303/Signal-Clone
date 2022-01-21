const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

const tableName = process.env.USERTABLE;
exports.handler = async (event) => {
  // event will contain event.request.userAttributes.(sub,email)
  // insert code to be executed by your lambda trigger

  if (!event?.request?.userAttributes?.sub) {
    console.log("No Sub provided");
    return;
  }

  const now = new Date();
  const timestamp = now.getTime();

  const userItem = {
    __typename: { S: 'User' },
    _lastChangedAt: { N: timestamp.toString() },
    _version: { N: "1" },
    createdAt: { S: now.toISOString() },
    id: { S: event.request.userAttributes.sub },
    name: { S: event.request.userAttributes.email },
    updatedAt: { S: now.toISOString() },
  }

  const params = {
    Item: userItem,
    TableName: tableName,
  }
  try {
    await ddb.putItem(params).promise();
    console.log("success");
  } catch (e) {
    console.log(e);
  }
  // save a new user to DynamoDB //
};
