const amazonCognitoIdentity = require('amazon-cognito-identity-js');
const { delay } = require('../utils/shared');

require('dotenv').config();
const { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } = process.env;

const poolData = {
  UserPoolId: COGNITO_USER_POOL_ID,
  ClientId: COGNITO_CLIENT_ID,
};
const userPool = new amazonCognitoIdentity.CognitoUserPool(poolData);

const registerUser = async (user, password, attributes) => {
  let attributeList = [];

  attributes.forEach((attr) => {
    const attribute = new amazonCognitoIdentity.CognitoUserAttribute({
      Name: attr.name,
      Value: attr.value,
    });

    attributeList = [...attributeList, attribute];
  });

  let cognitoUser;
  let cognitoError;
  userPool.signUp(user, password, attributeList, null, (err, result) => {
    if (err) {
      cognitoError = err.message || JSON.stringify(err);
      console.log(err);
      return;
    }

    cognitoUser = result.user;
    console.log(cognitoUser);
  });

  await delay(1500);
  return [cognitoError, cognitoUser];
};

module.exports = { registerUser };
